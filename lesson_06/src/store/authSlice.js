const initialState = {
  isLogin: false,
};

const AUTH_LOGIN = `AUTH_LOGIN`;
const AUTH_LOGOUT = `AUTH_LOGOUT`;

const reducer = (state, { title, payload }) => {
  switch (title) {
    case AUTH_LOGIN:
      return { ...state, isLogin: true };
    case AUTH_LOGOUT:
      return { ...state, isLogin: false };
    default:
      return state;
  }
};

export { reducer, initialState, AUTH_LOGIN, AUTH_LOGOUT };
