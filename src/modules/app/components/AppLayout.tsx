import React from 'react';

import { Routing } from 'modules/routing';
import { useAppState } from 'modules/app';
import { Navigation } from 'components/Navigation';

export const AppLayout: React.FC = () => {
  const [{ theme }] = useAppState();

  const appClassName = theme.showNav
    ? 'app__background app__background--primary app__background--withNav'
    : 'app__background app__background--primary';
  return (
    <>
      <section
        className={appClassName}
        style={{ backgroundColor: theme.color }}
      >
        <Navigation />
        <Routing />
      </section>
      <svg
        width="260"
        height="360"
        viewBox="0 0 251 349"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`app__deco ${theme.shapeClass}`}
      >
        <path />
      </svg>
    </>
  );
};