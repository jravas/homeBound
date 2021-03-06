import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { useSettingsServices } from 'modules/settings';
import { LogOut, useUserServices } from 'modules/user';
import { ActivitySummary } from 'modules/activities';
import { useScoreListener, ScoreTracker } from 'modules/score';
import { ContactSummary } from 'modules/contacts';
import { useAppState } from 'modules/app';
import { Heading, HEADING } from 'components';

const Dashboard: React.FC = () => {
  const [{ userData }] = useUserServices();
  const [{ userSettings }] = useSettingsServices();
  const [, { setAppTheme }] = useAppState();

  useScoreListener(userData);

  React.useEffect(() => {
    if (userData) {
      setAppTheme({
        color: '#F7CE53',
        shapeClass: 'app__deco--default',
        showNav: true,
      });
    }
  }, [setAppTheme, userData]);

  if (!userData) return <Redirect to="/login" />;

  if (userSettings && !userSettings.surveyCompleted)
    return <Redirect to="/welcome" />;

  return (
    <section className="app__content">
      <aside className="u-f--spaceBetween u-sb-12">
        <Heading tag="h1" className={HEADING.PRIMARY.XXLARGE.LIGHT}>
          Stayin'
          <br />
          indoors
        </Heading>
        <ScoreTracker mode="small" />
      </aside>

      <ContactSummary />

      <ActivitySummary />

      <div className="u-sb-16">
        <LogOut />
      </div>
    </section>
  );
};

export { Dashboard };
