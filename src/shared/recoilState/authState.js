import { atom, selector } from "recoil";
import { useCallback } from "react";

export const authState = atom({
  key: 'authState',
  default: {
    isLogin: false,
    userId: null,
    token: null,
  },
});

export const loginHandler = selector({
  key: 'loginHandler',
  get: ({ get }) => {
    return get(authState);
  },
  set: ({ get, set }, {userId, token}) => {
      set(authState, {
      isLogin: true,
      userId: userId,
      token: token,
    });
    localStorage.setItem('userData',JSON.stringify({userId:userId,token:token}));
  },
});

export const logoutHandler = selector({
  key: 'logoutHandler',
  get: ({ get }) => {
    return get(authState);
  },
  set: ({ get, set }) => {
    set(authState, {
      isLogin: false,
      userId: null,
      token: null,
    });
    localStorage.removeItem('userData')
  },
});
