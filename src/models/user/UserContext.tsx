import React from 'react';
import {IUserData} from './User';

const userContext = React.createContext({user: {} as any, setUser: (user : IUserData | null) => {}});

export { userContext };
