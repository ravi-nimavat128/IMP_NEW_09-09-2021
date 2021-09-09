import cart_types from './cart_types';

export const addToCart = payload => ({
  type: cart_types.ADD_TO_CART,
  payload,
});
export const loginToken = payload => ({
  type: cart_types.LOGIN_TOKEN,
  payload,
});
export const userId = payload => ({
  type: cart_types.USER_ID,
  payload,
});

export const removeToCart = id => ({
  type: cart_types.REMOVE_TO_CART,
  id,
});

export const manage_qty = (qty, id) => ({
  type: cart_types.MANAGE_QTY,
  qty: qty,
  id: id,
});
export const add_main_cat_id = payload => ({
  type: cart_types.MAIN_CAT_ID,
  payload,
});
export const main_cat_name = payload => ({
  type: cart_types.MAIN_CAT_NAME,
  payload,
});
export const addOffer = payload => ({
  type: cart_types.OFFER,
  payload,
});
export const removeOffer = payload => ({
  type: cart_types.OFFER,
  payload,
});
export const is_order_type = payload => ({
  type: cart_types.IS_ORDER_TYPE,
  payload,
});
export const remove_full_cart = payload => ({
  type: cart_types.REMOVE_FULL_CART,
});
export const add_all_cart_details = payload => ({
  type: cart_types.ADD_ALL_CART_DETAILS,
  payload,
});
