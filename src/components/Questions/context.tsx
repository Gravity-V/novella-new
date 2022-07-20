import React, { createContext } from 'react';

interface IContext {
    setBackground: Function

}

export const Context = createContext<IContext | null>(null)