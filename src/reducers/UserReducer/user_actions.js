import user_types from './user_types';

export const addLoginToken = payload => ({
  type: user_types.LOGIN_TOKEN,
  payload,
});

export const addUserId = payload => ({
  type: user_types.USER_ID,
  payload,
});

export const addUserName = payload => ({
  type: user_types.USER_NAME,
  payload,
});

export const addEmail = payload => ({
  type: user_types.EMAIL,
  payload,
});

export const addPhoneNumber = payload => ({
  type: user_types.MO_NUMBER,
  payload,
});

export const Logout = payload => ({
  type: user_types.LOGOUT,
  payload,
});
export const add_pushnotification_token = payload => ({
  type: user_types.PUSH_TOKEN,
  payload,
});
export const add_is_vip = payload => ({
  type: user_types.IS_VIP,
  payload,
});
