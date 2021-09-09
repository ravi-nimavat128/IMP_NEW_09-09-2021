import React from 'react';
import {View, Image, Text} from 'react-native';
import {connect} from 'react-redux';

var cart_icon = require('../assets/image/cart_icon.png');
var select_cart_icon = require('../assets/image/select_cart_icon.png');

const CartIcon = props => {
  return (
    <View>
      {/* <View
        style={{
          position: 'absolute',
          height: 20,
          width: 20,
          borderRadius: 15,
          backgroundColor: '#BE984A',
          opacity: 0.8,
          right: -12,
          bottom: 12,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
        }}>
        <Text style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
          0
        </Text>
      </View> */}

      <Image
        source={props.focused ? select_cart_icon : cart_icon}
        style={{
          width: 20,
          height: 20,
          tintColor: props.focused ? '#CA0227' : 'black',
        }}
      />
    </View>
  );
};

// const mapStateToProps = state => {
//   return {
//     cartItems: state,
//   };
// };

export default CartIcon;
