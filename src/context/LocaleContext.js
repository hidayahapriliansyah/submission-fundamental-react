import React from 'react';

const LocaleContext = React.createContext();

export const LocalProvider = LocaleContext.Provider;
export const LocalConsumer = LocaleContext.Consumer;

export default LocaleContext;
