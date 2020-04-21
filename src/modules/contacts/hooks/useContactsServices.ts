import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';

import { getUserData } from 'modules/user';
import {
  ContactsState,
  getContactsState,
  addUserContact,
  ContactsActionTypes,
  removeUserContact,
  getLastContacts,
} from 'modules/contacts';

type State = ContactsState;

export interface ContactInput {
  date: Date;
  name: string;
  phoneNumber: string;
}

interface Api {
  getLastUserContacts: (n?: number) => void;
  addContact: (contact: ContactInput) => void;
  removeContact: (id: string) => void;
}

export const useContactsServices = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(getUserData());
  const contacts = useSelector(getContactsState());

  const successFunction = React.useCallback(
    (payload: any) => {
      dispatch({
        type: ContactsActionTypes.Success,
        payload,
      });
    },
    [dispatch],
  );

  const errorFunction = React.useCallback(
    (payload: any) => {
      dispatch({
        type: ContactsActionTypes.Error,
        payload,
      });
    },
    [dispatch],
  );

  const getLastUserContacts = React.useCallback(
    async (n?: number) => {
      if (!userData) return;
      dispatch({
        type: ContactsActionTypes.Request,
      });
      const amount = n || 60;
      await getLastContacts(userData, amount, {
        successFunction,
        errorFunction,
      });
    },
    [dispatch, errorFunction, successFunction, userData],
  );

  const addContact = React.useCallback(
    async (contact: ContactInput) => {
      if (userData) {
        await addUserContact(userData, contact);
        await getLastUserContacts();
      }
    },
    [userData, getLastUserContacts],
  );

  const removeContact = React.useCallback(
    async (id: string) => {
      if (userData) {
        await removeUserContact(userData, id);
        await getLastUserContacts();
      }
    },
    [getLastUserContacts, userData],
  );

  const api = React.useMemo(
    () => ({
      getLastUserContacts,
      addContact,
      removeContact,
    }),
    [addContact, removeContact, getLastUserContacts],
  );

  return [contacts, api] as [State, Api];
};
