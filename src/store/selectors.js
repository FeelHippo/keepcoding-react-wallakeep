export const getSession = state => state.session;

export const isUserRegistered = state => {
  const session = getSession(state);
  return Boolean(session && session.name);
};
