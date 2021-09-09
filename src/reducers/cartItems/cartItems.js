import {template} from '@babel/core';
import cart_types from './cart_types';
const initialState = {
  items: [],
  currentQty: 0,
  main_cat_id: '',
  main_cat_name: '',
  login_token: '',
  userId: '',
  offer: {
    id: '',
    name: '',
    percentage: '0',
    description: '',
    attchment: '',
  },
  is_order_type: '1',
  full_cart_details: {
    product_id: '',
    amount: '',
    qty: '',
    total: '',
    sub_total: '',
    total_amount: '',
    note: '',
    offer_id: '',
    offer_amount: '',
    order_type: '',
    cgst: '',
    sgst: '',
    delivery_fee: '',
    standard_fee: '',
    address1: '',
    address2: '',
    landmark: '',
    address_type: '',
    topping_id: '',
    extra_topping_id_one: '',
    extra_topping_id_two: '',
    extra_topping_id_three: '',
  },
};
const cartsItems = (state = initialState, action) => {
  switch (action.type) {
    case cart_types.ADD_TO_CART:
      let isCart = false;

      if (state.items) {
        state.items.map(item => {
          if (item.id === action.payload.id) {
            isCart = true;
          } else {
            isCart = false;
          }
        });
      } else {
        isCart = false;
      }
      // console.log(isCart);
      // item.id === action.payload.id ? true : false;
      //  state.items.ap(item =.map {

      // console.log(' Valueeeeeeeeeeeeeeeeeeeeeeee ' + isCart);
      // const iteamArray = state.items.map(item => {
      //   if (item.id === action.payload.id) {
      //     console.log('its match  ' + item.id);
      //   } else {
      //     console.log('its not match  ' + item.id);
      //   }
      // });
      console.log('ITEM', action.payload);
      return {
        ...state,
        items: isCart
          ? state.items.map(item =>
              item.id == action.payload.id
                ? {...action.payload, qty: item.qty + 1}
                : action.payload,
            )
          : [...state.items, action.payload],
      };
    case cart_types.REMOVE_TO_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
      };

    case cart_types.GET_MAIN_CAT:
      return {
        ...state,
        Main_cat: action.payload,
      };

    case cart_types.MANAGE_QTY:
      console.log(
        'paylod',
        action.id,
        action.qty,
        state.items.map(item =>
          item.id == action.id ? {...item, qty: action.qty} : item,
        ),
        state.items
          .map(item =>
            item.id == action.id ? {...item, qty: action.qty} : item,
          )
          .filter(item => item.id == action.id && item.qty != 0),
      );
      return {
        ...state,
        items: state.items
          .map(item =>
            item.id == action.id ? {...item, qty: action.qty} : item,
          )
          .filter(item => item.qty != 0),
      };

    case cart_types.LOGIN_TOKEN:
      return {
        ...state,
        login_token: action.payload,
      };
    case cart_types.USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case cart_types.MAIN_CAT_ID:
      return {
        ...state,
        main_cat_id: action.payload,
      };
    case cart_types.MAIN_CAT_NAME:
      return {
        ...state,
        main_cat_name: action.payload,
      };
    case cart_types.OFFER:
      return {
        ...state,
        offer: action.payload,
      };
    case cart_types.ADD_ALL_CART_DETAILS:
      return {
        ...state,
        full_cart_details: action.payload,
      };

    case cart_types.REMOVE_OFFER:
      return {
        ...state,
        offer: [],
      };
    case cart_types.REMOVE_FULL_CART:
      return initialState;

    case cart_types.IS_ORDER_TYPE:
      return {
        ...state,
        is_order_type: action.payload,
      };

    default:
      return state;
  }
};

export default cartsItems;
