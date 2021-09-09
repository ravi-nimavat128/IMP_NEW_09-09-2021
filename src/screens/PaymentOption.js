import React, {Component} from 'react';
import axios from 'axios';
import HTMLView from 'react-native-htmlview';
// import stripe from 'tipsi-stripe';

import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import {connect} from 'react-redux';
import {
  addToCart,
  increaseQty,
  manage_qty,
  removeToCart,
  addOffer,
  remove_full_cart,
  add_all_cart_details,
} from '../reducers/cartItems/actions';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';

var back_arrow = require('../assets/image/back_arrow.png');
var nonselect_circle = require('../assets/image/non_selected_circle.png');
var select_circle = require('../assets/image/checked_circle.png');
var secret_key =
  'sk_test_51IDmWtD1m7XeWX6yeY6oVWAFxW1SVYDU1AnHwtaDbHWzmlj3SnXF2yuLif9gcEZDnZSUOqoRfBbCf1lzAwJwyJYA00mgX0g2Kp';

const CURRENCY = 'IND';
var CARD_TOKEN = null;

class PaymentOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      payment_type: 0,
      privecy_data: '',
      stripe_token: '',
      card_details: {
        // Valid: false,
        name: '',
        number: '',
        expMonth: 0,
        expYear: 0,
        cvc: '',
      },
    };
  }

  PlaceORder = () => {
    this.setState({
      isLoading: true,
    });

    let formData = new FormData();
    formData.append('user_id', this.props.user_id);
    // formData.append('address_id', 1);
    formData.append('product_id', this.props.cart_details.product_id);
    formData.append('amount', this.props.cart_details.amount);
    formData.append('qty', this.props.cart_details.qty);
    formData.append('total', this.props.cart_details.total);
    formData.append('sub_total', this.props.cart_details.sub_total);
    formData.append('total_amount', this.props.cart_details.total_amount);
    // formData.append('latitude', '123');
    // formData.append('longitude', '123');
    formData.append('note', this.props.cart_details.note);
    formData.append('offer_id', this.props.offer.id);
    formData.append('offer_amount', this.props.cart_details.offer_amount);
    formData.append('order_type', this.props.is_order_type);
    formData.append('cgst', this.props.cart_details.cgst);
    formData.append('sgst', this.props.cart_details.sgst);
    formData.append('delivery_fee', this.props.cart_details.delivery_fee);
    formData.append('standard_fee', this.props.cart_details.standard_fee);
    formData.append('address1', this.props.cart_details.address1);
    formData.append('address2', this.props.cart_details.address2);
    formData.append('landmark', this.props.cart_details.landmark);
    formData.append('address_type', this.props.cart_details.address_type);
    formData.append('topping_id', this.props.cart_details.topping_id);
    formData.append(
      'extra_topping_id_one',
      this.props.cart_details.extra_topping_id_one,
    );
    formData.append(
      'extra_topping_id_two',
      this.props.cart_details.extra_topping_id_two,
    );
    formData.append(
      'extra_topping_id_three',
      this.props.cart_details.extra_topping_id_three,
    );
    formData.append('payment_type', this.state.payment_type);

    console.log('My Form Data', JSON.stringify(formData, null, 2));
    // console.log('my id', JSON.stringify(this.props.myItems, null, 2));
    axios
      .post('http://binarygeckos.com/imp/apis/orders/order_place', formData)
      .then(response => {
        if (response.data.status == 1) {
          this.setState({
            isLoading: false,
          });
          // Alert.alert('Status', response.data.message);
          this.props.navigation.navigate('MainNavigator');
          Alert.alert('Your Order Number', response.data.order_no);
          console.log('status ', response.data.message);

          this.props.remove_full_cart();
          this.setState({
            payment_type: 0,
          });
        } else {
          this.setState({
            isLoading: false,
          });
          // Alert.alert('Your Order Number', response.data.order_no);
          Alert.alert('Error', response.data.message);
        }
      })
      .catch(error => console.log(error.message));
  };

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View
    //       style={{
    //         flex: 1,
    //         justifyContent: 'center',
    //         alignContent: 'center',
    //         alignItems: 'center',
    //         backgroundColor: '#00000000',
    //         flexDirection: 'row',
    //       }}>
    //       <ActivityIndicator size="large" color="#BE984A" animating={true} />
    //       <Text style={{color: '#BE984A', fontSize: 20, marginLeft: 10}}>
    //         Loading...
    //       </Text>
    //     </View>
    //   );
    // }
    // const {item} = this.state.Privecy_data;
    console.log('state card details...........', this.state.card_details);
    // console.log(this.PAY_ME());

    console.log(
      'cart details...',
      JSON.stringify(this.props.cart_details, null, 2),
    );

    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={this.state.isLoading}
          //Text with the Spinner
          textContent={'Loading...'}
          size={'large'}
          animation={'fade'}
          cancelable={false}
          color="#BE984A"
          //Text style of the Spinner Text
          textStyle={{color: '#BE984A', fontSize: 20, marginLeft: 10}}
        />
        <View
          style={{
            flexDirection: 'row',
            height: 120,
            alignContent: 'center',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{marginLeft: 15, paddingRight: 15, paddingVertical: 8}}>
              <Image source={back_arrow} style={style.back_img} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                marginTop: 10,
                marginLeft: 15,
              }}>
              Payment Option
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                alignSelf: 'flex-end',
                marginRight: 25,
                color: 'gray',
                fontSize: 15,
              }}>
              to pay
            </Text>
            <Text
              style={{
                alignSelf: 'flex-end',
                marginRight: 15,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              ₹{this.props.cart_details.total_amount}
            </Text>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 8,
            opacity: 0.15,
          }}
        />
        <Pressable
          onPress={() =>
            this.setState({
              payment_type: 2,
            })
          }
          style={{
            width: Dimensions.get('screen').width,
            flexDirection: 'row',
            marginTop: 15,
            marginHorizontal: 10,
          }}>
          <Image
            source={require('../assets/image/money_small_icon.png')}
            style={{height: 30, width: 30}}></Image>
          <View style={{flex: 1, marginHorizontal: 15}}>
            <Text style={{fontSize: 16}}>Cash</Text>
            <Text style={{fontSize: 13, color: 'gray'}}>
              Pay cash on delivery
            </Text>
            <Image
              source={require('../assets/image/money_second.png')}
              style={{height: 20, marginTop: 5, width: 20}}></Image>
            {this.state.payment_type == 2 ? (
              <TouchableOpacity
                onPress={() => this.PlaceORder()}
                style={{
                  borderRadius: 3,
                  height: 45,
                  marginTop: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#BE984A',
                }}>
                <Text style={{color: 'white', fontSize: 16}}>
                  PAY USING CASH
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <Image
            source={
              this.state.payment_type == 2 ? select_circle : nonselect_circle
            }
            style={{height: 15, width: 15, marginRight: 25}}></Image>
        </Pressable>

        <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 8,
            marginTop: 15,
            opacity: 0.15,
          }}
        />
        <Pressable
          onPress={() =>
            this.setState({
              payment_type: 1,
            })
          }
          style={{
            width: Dimensions.get('screen').width,
            flexDirection: 'row',
            marginTop: 15,
            marginHorizontal: 10,
          }}>
          <Image
            source={require('../assets/image/cardd_icon.png')}
            style={{height: 30, width: 30}}></Image>
          <View style={{flex: 1, marginHorizontal: 15}}>
            <Text style={{fontSize: 16}}>Add New Debit/Credit Card</Text>
            <Text style={{fontSize: 13, color: 'gray'}}>
              Save and pay via cards
            </Text>
            <Image
              source={require('../assets/image/all_cards_icon.png')}
              resizeMode="contain"
              style={{height: 20, marginTop: 8, width: 80}}></Image>
            {/* {this.state.payment_type == 1 ? (
              <TouchableOpacity
                style={{
                  borderRadius: 3,
                  height: 45,
                  marginTop: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#BE984A',
                }}>
                <Text style={{color: 'white', fontSize: 16}}>
                  PAY USING CASH
                </Text>
              </TouchableOpacity>
            ) : null} */}
          </View>

          <Image
            source={require('../assets/image/next.png')}
            style={{height: 15, width: 15, marginRight: 25}}></Image>
        </Pressable>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  cart_details: state.cartItems.full_cart_details,
  user_id: state.userDetails.user_id,
  offer: state.cartItems.offer,
  is_order_type: state.cartItems.is_order_type,
});

const mapDispatchToProps = {
  remove_full_cart,
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentOption);

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 120,
    alignContent: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  back_img: {
    height: 17,
    width: 21,
    alignSelf: 'flex-start',
  },
  txt_heading: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
  },
  field: {
    width: 300,
    alignSelf: 'center',
    color: '#449aeb',
    borderColor: '#000',
    borderWidth: 1,
    // width: '100%',
    marginLeft: 20,
    borderRadius: 5,
  },
});

const s = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    marginTop: 60,
  },
  label: {
    color: 'black',
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: 'black',
  },
});
