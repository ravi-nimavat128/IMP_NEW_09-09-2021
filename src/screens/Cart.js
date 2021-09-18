import React, {Component} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  TextInput,
  Touchable,
  ScrollView,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
} from 'react-native-popup-dialog';
import {
  addToCart,
  increaseQty,
  manage_qty,
  removeToCart,
  addOffer,
  remove_full_cart,
  add_all_cart_details,
  is_order_type,
} from '../reducers/cartItems/actions';
import {BottomSheet} from 'react-native-btr';

import {
  addLoginToken,
  addEmail,
  addPhoneNumber,
  addUserId,
  addUserName,
  Logout,
  add_is_vip,
} from '../reducers/UserReducer/user_actions';
var vag_icon = require('../assets/image/vag.png');

import NumericInput from 'react-native-numeric-input';
import axios from 'axios';
var img = require('../assets/image/img_cart_screen.png');
const cross_icon = require('../assets/image/close_icon.png');

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      show: true,
      spacial_cooking: '',
      modalVisible: false,
      listItems: [],
      isLoading: true,
      visible_tax: false,
      Alert_Visibility: false,
      CGST: 0,
      SGST: 0,
      delivery_fee: 0,
      standard_fee: 0,
      product_ids: [],
      total_qty: [],
      all_price: [],
      all_price_qty_total: [],
      sub_total: 0,
      final_total: 0,

      topping_ids: [],
      topping_array_one_ids: [],
      topping_array_two_ids: [],
      topping_array_three_ids: [],

      visible: false,
      address_visible: false,
      value: '',
      otpVisible: true,
      code: '',
      otp_btn_visible: false,
      login_token: '',
      mo_number: '',
      user_id: '',
      user_name: '',
      email: '',
      is_vip: '',
      my_account_visible: false,
      address_data: [],
      selected_address_iddd: [],
      idddd: null,
      selected_address: {
        id: '',
        landmark: '',
        address1: '',
        address2: '',
        type: '',
        lat: 0,
        long: 0,
      },

      takeaway_pickup_visible: false,
      // myNewItems: null,
    };
  }
  componentDidMount() {
    this.TextDeliveryCharge();
    this._getAddresses();
    this.get_produst_ids();
    // this.TotalItemPrice();
    // this.setState({
    //   idddd: this.state.selected_address_iddd[0]
    //     ? this.state.selected_address_iddd[0]
    //     : '',
    // });

    this.onFocusSubscribe = this.props.navigation.addListener('focus', () => {
      // Your code
      this._getAddresses();
      this.get_produst_ids();
    });
  }

  getSingleAddress = address_id => {
    let formdata = new FormData();
    formdata.append('address_id', address_id);
    console.log('form_data', formdata);

    axios
      .post(
        'https://www.binarygeckos.com/imp/apis/address/get_single_addres',
        formdata,
      )
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            selected_address: {
              id: Response.data.id,
              address1: Response.data.address1,
              address2: Response.data.address2,
              landmark: Response.data.landmark,
              type: Response.data.type,
              lat: Response.data.lat,
              long: Response.data.long,
            },

            // address_data: Response.data.result ? Response.data.result : [],
            // isLoading: false,
          });
          // this.setState({
          //   id: Response.data.id,
          //   address1: Response.data.address1,
          //   address2: Response.data.address2,
          //   landmark: Response.data.landmark,
          //   type: Response.data.type,
          //   lat: Response.data.lat,
          //   long: Response.data.long,
          // })
          // Alert.alert('', Response.data.message);
        } else {
          this.setState({
            isLoading: false,
          });
          // Alert.alert('', Response.data.message);

          // Alert.alert('', Response.data.message);
        }
      });
    console.log('form data', formdata);
  };

  _getAddresses = () => {
    this.setState({address_data: []});
    let formdata = new FormData();
    formdata.append('user_id', this.props.user_id);

    axios
      .post(
        'https://www.binarygeckos.com/imp/apis/address/get_my_address',
        formdata,
      )
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            address_data: Response.data.result ? Response.data.result : [],
            selected_address_iddd: Response.data.result.map(i => i.id),

            isLoading: false,
          });
          this.state.selected_address_iddd.length < 1
            ? null
            : this.getSingleAddress(this.state.selected_address_iddd[0]);
        } else {
          this.setState({
            isLoading: false,
          });
          // Alert.alert('', Response.data.message);
        }
      });
  };

  LoginFun = () => {
    var formData = new FormData();
    formData.append('mobile_no', this.state.value);
    formData.append('device_id', this.props.token);
    axios
      .post('https://www.binarygeckos.com/imp/apis/auth/login_signup', formData)
      .then(Response => {
        if (Response.data.status == 1) {
          // this.props.addLoginToken(Response.data.login_token);
          // this.props.addEmail(Response.data.email);
          // this.props.addPhoneNumber(Response.data.mobile_no);
          // this.props.addUserId(Response.data.user_id);
          // this.props.addUserName(Response.data.name);

          this.setState({
            login_token: Response.data.login_token,
            mo_number: Response.data.mobile_no,
            user_id: Response.data.user_id,
            user_name: Response.data.name,
            email: Response.data.email,
            is_vip: Response.data.is_vip,
          });

          console.log(Response.data.status);
          this.setState({
            otp: Response.data.otp,
          });
        } else {
          console.log(Response.data.status);
        }
      });
  };

  Check_OTP = () => {
    var formData = new FormData();
    formData.append('mobile_no', this.state.mo_number);
    formData.append('otp', this.state.code);
    axios
      .post('https://www.binarygeckos.com/imp/apis/auth/check_otp', formData)
      .then(Response => {
        if (Response.data.status == 1) {
          this.props.addLoginToken(this.state.login_token);
          this.props.addEmail(this.state.email);
          this.props.addPhoneNumber(this.state.mo_number);
          this.props.addUserId(this.state.user_id);
          this.props.addUserName(this.state.user_name);
          this.props.add_is_vip(this.state.is_vip);
          // {
          //   this.props.uname === null
          //     ? this.props.navigation.navigate('SignUp')
          //     : null;
          // }
          if (this.props.uname === '') {
            this.props.navigation.navigate('SignUp');
          } else {
            null;
          }
        } else {
          Alert.alert('', Response.data.message);
        }
      });
  };

  toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState(state => ({
      visible: !state.visible,
    }));
  };
  toggleBottomaddressView = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState(state => ({
      address_visible: !state.address_visible,
    }));
  };
  OtpToggal = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState(state => ({
      otpVisible: !state.otpVisible,
    }));
  };

  // componentDidUpdate(preState, preProps) {
  //   if (preProps.myItems !== this.props.myItems) {
  //     this.get_produst_ids();
  //   }
  // }

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }

  TextDeliveryCharge = () => {
    axios
      .get('https://www.binarygeckos.com/imp/apis/general/tax_delivery_charges')
      .then(response => {
        if (response.data.status == 1) {
          this.setState({
            CGST: response.data.cgst,
            SGST: response.data.sgst,
            delivery_fee: response.data.delivery_fee,
            standard_fee: response.data.standard_fee,
          });
        } else {
        }
      })
      .catch(error => console.log(error));
  };

  get_produst_ids = () => {
    this.setState({
      produst_ids: this.props.myItems.map(i => i.id).join(','),
      total_qty: this.props.myItems.map(i => i.qty).join(','),
      all_price: this.props.myItems.map(i => i.price).join(','),
      // topping_ids: this.props.myItems
      //   .map(i => (i.topping_id !== [] ? 0 : i.topping_id.map(ii => ii.t_id)))
      //   .join(','),

      topping_ids: this.props.myItems
        .map(i =>
          i.topping_id == [] ? 0 : i.topping_id.map(t_item => t_item.t_id),
        )
        .join(','),
      topping_array_one_ids: this.props.myItems
        .map(i =>
          i.selected_one_array_id == []
            ? 0
            : i.selected_one_array_id.map(t_item => t_item.id),
        )
        .join(','),
      topping_array_two_ids: this.props.myItems
        .map(i =>
          i.selected_two_array_id == []
            ? 0
            : i.selected_two_array_id.map(t_item => t_item.id),
        )
        .join(','),
      topping_array_three_ids: this.props.myItems
        .map(i =>
          i.selected_three_array_id == []
            ? 0
            : i.selected_three_array_id.map(t_item => t_item.id),
        )
        .join(','),
      all_price_qty_total: this.props.myItems
        .map(i => i.qty * i.price)
        .join(','),
    });
  };

  TotalTEX = () => {
    let CGST = this.TotalCGST();
    let SGST = this.TotalSGST();
    let delivery_fee = this.state.delivery_fee;
    let standard_fee = this.state.standard_fee;

    let total_tax =
      parseFloat(CGST) +
      parseFloat(SGST) +
      parseInt(delivery_fee) +
      parseInt(standard_fee);

    return total_tax.toFixed(2).toString();
  };

  TotalCGST = () => {
    var CGST = (this.TotalItemPrice() * this.state.CGST) / 100;

    return this.props.is_vipp == '1' ? 0 : CGST.toFixed(2).toString();
  };
  TotalSGST = () => {
    var SGST = (this.TotalItemPrice() * this.state.SGST) / 100;

    return this.props.is_vipp == '1' ? 0 : SGST.toFixed(2).toString();
  };

  TotalItemPrice = () => {
    var adding = [];
    {
      this.props.myItems.map(item => adding.push(item.qty * item.price));
    }
    var sum = adding.reduce(function (a, b) {
      return a + b;
    }, 0);

    return this.props.is_vipp == '1' ? 0 : sum.toString();
  };
  TotalDiscountPrice = () => {
    var adding = [];
    {
      this.props.myItems.map(item => adding.push(item.qty * item.price));
    }
    var sum = adding.reduce(function (a, b) {
      return a + b;
    }, 0);

    var discount = (sum / 100) * parseInt(this.props.offer.percentage);

    return discount.toFixed(2).toString();
  };
  TOPay = () => {
    var adding = [];
    {
      this.props.myItems.map(item => adding.push(item.qty * item.price));
    }
    var sum = adding.reduce(function (a, b) {
      return a + b;
    }, 0);

    var discount = (sum / 100) * parseInt(this.props.offer.percentage);

    return this.props.is_vipp == '1'
      ? 0
      : (sum + parseFloat(this.TotalTEX()) - discount).toFixed(2).toString();
  };

  NewPlaceOrder = () => {
    let formData = new FormData();
    formData.append('user_id', '4');
    formData.append('product_id', 1);
    formData.append('amount', 10);
    formData.append('qty', 1);
    formData.append('total', 10);
    formData.append('sub_total', '10');
    formData.append('total_amount', '20');
    formData.append('latitude', '123');
    formData.append('longitude', '123');
    axios
      .post('http://binarygeckos.com/imp/apis/orders/order_place', formData)

      .then(response => {
        if (response.data.status == 1) {
          Alert.alert('done');
          // this.setState({
          //   CGST: response.data.cgst,
          //   SGST: response.data.sgst,
          //   delivery_fee: response.data.delivery_fee,
          //   standard_fee: response.data.standard_fee,
          // });
        } else {
        }
      });
  };

  PlaceORder = () => {
    let formData = new FormData();
    formData.append('user_id', this.props.user_id);
    // formData.append('address_id', 1);
    formData.append('product_id', this.props.myItems.map(i => i.id).join(','));
    formData.append('amount', this.props.myItems.map(i => i.price).join(','));
    formData.append('qty', this.props.myItems.map(i => i.qty).join(','));
    formData.append(
      'total',
      this.props.myItems.map(i => i.qty * i.price).join(','),
    );
    formData.append('sub_total', this.TotalItemPrice());
    formData.append('total_amount', this.TOPay());
    // formData.append('latitude', '123');
    // formData.append('longitude', '123');
    formData.append('note', this.state.spacial_cooking);
    formData.append('offer_id', this.props.offer.id);
    formData.append('offer_amount', this.TotalDiscountPrice());
    formData.append('order_type', this.props.is_order_type);
    formData.append('cgst', this.TotalCGST());
    formData.append('sgst', this.TotalSGST());
    formData.append('delivery_fee', this.state.delivery_fee.toString());
    formData.append('standard_fee', this.state.standard_fee.toString());
    formData.append(
      'address1',
      this.state.selected_address.address1.toString(),
    );
    formData.append(
      'address2',
      this.state.selected_address.address2.toString(),
    );
    formData.append(
      'landmark',
      this.state.selected_address.landmark.toString(),
    );
    formData.append(
      'address_type',
      this.state.selected_address.type.toString(),
    );
    formData.append('topping_id', this.state.topping_ids.toString());
    formData.append(
      'extra_topping_id_one',
      this.state.topping_array_one_ids.toString(),
    );
    formData.append(
      'extra_topping_id_two',
      this.state.topping_array_two_ids.toString(),
    );
    formData.append(
      'extra_topping_id_three',
      this.state.topping_array_two_ids.toString(),
    );

    console.log('My Form Data  ', JSON.stringify(formData, null, 2));
    // console.log('my id', JSON.stringify(this.props.myItems, null, 2));
    axios
      .post('http://binarygeckos.com/imp/apis/orders/order_place', formData)
      .then(response => {
        if (response.data.status == 1) {
          // Alert.alert('Status', response.data.message);
          Alert.alert('Your Order Number', response.data.order_no);
          console.log('status ', response.data.message);
          this.props.remove_full_cart();
        } else {
          // Alert.alert('Your Order Number', response.data.order_no);
          Alert.alert('Error', response.data.message);
        }
      })
      .catch(error => console.log(error.message));
  };

  AddressItemView = ({item, index}) => {
    return (
      <View style={{marginHorizontal: 15}}>
        <TouchableOpacity
          onPress={() => {
            this.getSingleAddress(
              // this.state.selected_address_iddd.map(i => i.id)
              //   ? this.state.selected_address_iddd.map(i => i.id)
              item.id,
            );
            this.toggleBottomaddressView();
          }}>
          {item.type == 1 ? (
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/image/house_icon.png')}
                style={{
                  height: 10,
                  width: 10,
                  tintColor: '#BE984A',
                  alignSelf: 'center',
                }}
              />
              <Text style={{fontSize: 15, alignSelf: 'center', marginLeft: 8}}>
                home
              </Text>
            </View>
          ) : null}
          {item.type == 2 ? (
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/image/brefcase_icon.png')}
                style={{
                  height: 10,
                  width: 10,
                  tintColor: '#BE984A',
                  alignSelf: 'center',
                }}
              />
              <Text style={{fontSize: 15, alignSelf: 'center', marginLeft: 8}}>
                work
              </Text>
            </View>
          ) : null}

          {item.type == 3 ? (
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/image/location_icon.png')}
                style={{
                  height: 10,
                  width: 10,
                  tintColor: '#BE984A',
                  alignSelf: 'center',
                }}
              />
              <Text style={{fontSize: 15, alignSelf: 'center', marginLeft: 8}}>
                other
              </Text>
            </View>
          ) : null}

          <Text style={{fontSize: 13}}>{item.address1}</Text>
          <View
            style={{
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              marginVertical: 12,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // NumberValue = (value, index) => {
  //   // const [value, setValue] = useState(0);

  //   return (
  //     <NumericInput
  //       containerStyle={style.number_input}
  //       value={value}
  //       onChange={value => {
  //         this.setState({
  //           listItems: this.props.myItems.map((item, sindex) => {
  //             return {...item, qty: index == sindex ? value : item.qty};
  //           }),
  //         });
  //       }}
  //       onLimitReached={(isMax, msg) => console.log(isMax, msg)}
  //       totalWidth={82}
  //       totalHeight={28}
  //       iconSize={10}
  //       minValue={1}
  //       borderColor={'#00000000'}
  //       inputStyle={{
  //         backgroundColor: '#C8B9B2',
  //         color: 'black',
  //         alignSelf: 'center',
  //         height: 26,
  //         justifyContent: 'center',
  //       }}
  //       rounded
  //       type={'plus-minus'}
  //       step={1}
  //       valueType="real"
  //       textColor="#B0228C"
  //       iconStyle={{color: 'black'}}
  //     />
  //   );
  // };

  ItemView = ({item, index}) => {
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <View style={{flexDirection: 'column', marginTop: 8}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={vag_icon}
                style={{
                  height: 12,
                  width: 12,
                  alignSelf: 'center',
                  marginLeft: 10,
                  marginRight: 4,
                }}
              />
              <Text style={{color: 'black', fontSize: 16}}>{item.name}</Text>
            </View>

            {/* {item.topping_text == '' ? null : (
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  marginLeft: 27,
                  opacity: 0.8,
                  marginTop: 3,
                }}>
                {item.topping_text}:{item.topping_id.map(i => i.t_name)}
              </Text>
            )} */}

            {/* <Text>{JSON.stringify(item)}</Text> */}

            {/* <Text> {JSON.stringify(item)}</Text> */}
            {/* {console.log('item data', JSON.stringify(item, null, 2))} */}

            {item.topping_text == '' ? null : (
              <View>
                {item.topping_id.map(i => (
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 11,
                      marginLeft: 27,
                      opacity: 0.8,
                      marginTop: 3,
                    }}>
                    {item.topping_text} : {i.t_name}
                  </Text>
                ))}
              </View>
            )}

            {item.topping_one_text == '' ? null : (
              <View>
                {item.selected_one_array_id.map(i => (
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 12,
                      marginLeft: 27,
                      opacity: 0.8,
                      marginTop: 3,
                    }}>
                    {item.topping_one_text} : {i.name}
                  </Text>
                ))}
              </View>
            )}
            {item.topping_two_text == '' ? null : (
              <View>
                {item.selected_two_array_id.map(i => (
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 12,
                      marginLeft: 27,
                      opacity: 0.8,
                      marginTop: 3,
                    }}>
                    {item.topping_two_text} : {i.name}
                  </Text>
                ))}
              </View>
            )}
            {item.topping_three_text == '' ? null : (
              <View>
                {item.selected_three_array_id.map(i => (
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 12,
                      marginLeft: 27,
                      opacity: 0.8,
                      marginTop: 3,
                    }}>
                    {item.topping_three_text} : {i.name}
                  </Text>
                ))}
              </View>
            )}

            {/* {item.topping_text == '' ? null : (
              <View>
                {item.topping_id.map(i => {
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 12,
                      marginLeft: 27,
                      opacity: 0.8,
                      marginTop: 3,
                    }}>
                    {i.topping_text}: {item.topping_id.map(name => name.t_name)}
                  </Text>;
                })}
              </View>
            )} */}
            {item.is_option == null || item.is_option == '' ? null : (
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  marginLeft: 27,
                  opacity: 0.6,
                  marginTop: 3,
                }}>
                Regular/ Jain : {item.is_option}
              </Text>
            )}
            <Text
              style={{
                color: '#000000',
                fontSize: 15,
                marginLeft: 27,
                marginTop: 5,
              }}>
              ₹{item.price}
            </Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <NumericInput
              containerStyle={style.number_input}
              value={item.qty}
              onChange={e => {
                this.props.manage_qty(e, item.id);
                this.get_produst_ids();
              }}
              // onLimitReached={e => this.props.removeToCart(item.id)}
              totalWidth={82}
              initValue={item.qty}
              totalHeight={28}
              iconSize={10}
              minValue={0}
              borderColor={'#00000000'}
              inputStyle={{
                backgroundColor: '#C8B9B2',
                color: 'black',
                alignSelf: 'center',
                height: 26,
                justifyContent: 'center',
              }}
              rounded
              type={'plus-minus'}
              step={1}
              valueType="real"
              textColor="#B0228C"
              iconStyle={{color: 'black'}}
            />

            <Text
              style={{
                fontSize: 15,
                color: 'black',
                alignSelf: 'flex-end',
                marginRight: 15,
                marginTop: 10,
              }}>
              ₹{item.qty * item.price}
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 10,
            marginLeft: 25,
            marginRight: 25,
            marginTop: 10,
            opacity: 0.4,
          }}>
          {item.description}
        </Text>
      </View>
    );
  };

  render() {
    // console.log('cart array' + JSON.stringify(this.props.myItems, null, 2));
    // console.log('topping ids', this.state.topping_ids);
    // console.log('topping array one ids', this.state.topping_array_one_ids);
    // console.log('topping array two ids', this.state.topping_array_two_ids);
    // console.log('topping array three ids', this.state.topping_array_three_ids);
    // console.log('User id', this.props.user_id);
    // console.log('product ids  ', this.state.produst_ids);
    // console.log('all price  ', this.state.all_price);
    // console.log('total_qty  ', this.state.total_qty);
    // console.log('sub_total  ', this.TotalItemPrice());
    // console.log('final_total  ', this.TOPay());
    // console.log('vip number  ', this.props.is_vipp);
    // console.log('total price * qty  ', this.state.all_price_qty_total);
    console.log('is order type', this.props.is_order);

    // this.getSingleAddress(this.state.selected_address_iddd[0]);

    console.log('selected_address_data  ', this.state.selected_address);
    console.log('first iddddddddd', this.state.selected_address_iddd[0]);

    console.log('iddddd  ', this.state.selected_address_iddd);
    console.log(
      'all address data  ',
      JSON.stringify(this.state.selected_address_iddd, null, 2),
    );

    return (
      <SafeAreaView style={style.container}>
        {this.props.myItems.length > 0 ? (
          <SafeAreaView style={style.cart_container}>
            <StatusBar barStyle="light-content" backgroundColor={'black'} />

            {/* <View style={style.header}>
              <View style={{flex: 1}}></View>
              <Text style={style.txt_heading}>OPEN 24 HOURS</Text>
            </View> */}
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'white',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                width: '100%',

                // marginTop: 50,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 25,
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // width: '100%',
                  marginTop: 25,
                  marginBottom: 15,
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    flex: 0.7,
                    fontSize: 15,
                    color: 'black',
                    fontWeight: 'bold',
                    marginLeft: 8,
                  }}>
                  Cart
                </Text>
                <View
                  style={{
                    flex: 1,
                    borderRadius: 8,
                    height: 40,
                    backgroundColor: '#A9B5B1',
                    flexDirection: 'row',
                    // width: 100,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.props.is_order_type('1')}
                    style={{
                      flex: 1,
                      backgroundColor:
                        this.props.is_order == '1' ? '#ED505C' : '#00000000',
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: this.props.is_order == '1' ? 'white' : 'black',
                      }}>
                      DELIVERY
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.is_order_type('2')}
                    style={{
                      flex: 1,
                      backgroundColor:
                        this.props.is_order == '2' ? '#ED505C' : '#00000000',
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: this.props.is_order == '2' ? 'white' : 'black',
                      }}>
                      TAKEAWAY
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView style={{marginBottom: 90}}>
                <View>
                  <FlatList
                    style={{marginTop: 20}}
                    scrollEnabled={false}
                    // style={{marginBottom: 20, marginTop: 10}}
                    data={this.props.myItems}
                    //data defined in constructor
                    // ItemSeparatorComponent={ItemSeparatorView}
                    //Item Separator View
                    renderItem={this.ItemView}
                    keyExtractor={(item, index) => index.toString()}></FlatList>
                </View>
                <View
                  style={{
                    borderBottomColor: '#F6F9F6',
                    borderBottomWidth: 1,
                    marginTop: 15,
                  }}
                />
                <View style={{height: 60}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <Image
                      source={require('../assets/image/menu_list.png')}
                      style={{
                        height: 20,
                        width: 20,
                        alignSelf: 'center',
                        marginLeft: 15,
                        marginRight: 10,
                      }}
                    />
                    <TextInput
                      style={{alignSelf: 'center'}}
                      onChangeText={text =>
                        this.setState({spacial_cooking: text})
                      }
                      placeholder={
                        'Any special cooking request? Eg. Pizza Crispy'
                      }></TextInput>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: '#F6F9F6',
                    borderBottomWidth: 8,
                    marginTop: 10,
                  }}
                />
                <View>
                  {this.props.offer.id !== '' ? (
                    <View
                      style={{
                        backgroundColor: '#F4FEFA',
                        padding: 15,
                      }}>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            color: 'green',
                            alignSelf: 'center',
                            fontSize: 16,
                          }}>
                          Discount coupon applied:
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.addOffer({
                              id: '',
                              name: '',
                              percentage: '0',
                              description: '',
                              attchment: '',
                            })
                          }
                          style={{padding: 8, alignSelf: 'center'}}>
                          <Image
                            source={require('../assets/image/close_icon.png')}
                            style={{
                              height: 13,
                              width: 13,
                              alignSelf: 'center',
                            }}></Image>
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={{color: 'black', fontSize: 16, marginTop: 6}}>
                        {this.props.offer.name}
                      </Text>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 15,
                          opacity: 0.4,
                          marginTop: 5,
                        }}>
                        {this.props.offer.description}
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('ApplyCoupon')
                      }>
                      <View style={{flexDirection: 'row', marginVertical: 15}}>
                        <Image
                          source={require('../assets/image/coupon_code.png')}
                          style={{
                            height: 22,
                            width: 22,
                            alignSelf: 'center',
                            marginLeft: 15,
                            marginRight: 10,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 17,
                            color: 'red',
                            alignSelf: 'center',
                          }}>
                          Apply Coupon Code
                        </Text>
                        <View style={{flex: 1}}></View>
                        <Image
                          source={require('../assets/image/next.png')}
                          style={{
                            height: 15,
                            width: 15,
                            alignSelf: 'center',
                            marginRight: 20,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  )}

                  <View
                    style={{
                      borderBottomColor: '#F6F9F6',
                      borderBottomWidth: 8,
                      marginBottom: 15,
                    }}
                  />
                </View>
                <View style={{margin: 10}}>
                  <Text style={{color: 'black', fontSize: 16}}>
                    Bill Details
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginEnd: 10,
                      marginTop: 8,
                    }}>
                    <Text style={{color: 'black', fontSize: 14}}>
                      Item Total
                    </Text>
                    <Text style={{color: 'black', fontSize: 14}}>
                      ₹{this.TotalItemPrice()}
                    </Text>
                  </View>

                  {this.props.offer.id !== '' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginEnd: 10,
                        marginTop: 8,
                      }}>
                      <Text style={{color: 'green', fontSize: 14}}>
                        Total Discount
                      </Text>
                      <Text style={{color: 'green', fontSize: 14}}>
                        - ₹{this.TotalDiscountPrice()}
                      </Text>
                    </View>
                  ) : null}

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginEnd: 10,
                      marginTop: 8,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: 'black', fontSize: 14}}>
                        Taxes And Charges
                      </Text>
                      <Dialog
                        visible={this.state.visible_tax}
                        dialogAnimation={
                          new SlideAnimation({
                            slideFrom: 'bottom',
                          })
                        }
                        footer={
                          <DialogFooter bordered={false}>
                            <DialogButton
                              text="CANCEL"
                              textStyle={{fontSize: 15, color: '#BE984A'}}
                              onPress={() => {
                                this.setState({visible_tax: false});
                              }}
                            />
                          </DialogFooter>
                        }
                        rounded
                        onTouchOutside={() => {
                          this.setState({visible_tax: false});
                        }}
                        onHardwareBackPress={() => true}>
                        <DialogContent
                          style={{
                            width: Dimensions.get('window').width / 1.1,
                            marginTop: 15,
                          }}>
                          <View style={{flexDirection: 'column'}}>
                            <Text style={{fontSize: 16}}>
                              Taxes And Charges
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 15,
                              }}>
                              <Text style={{fontSize: 16}}>CGST</Text>
                              <Text style={{fontSize: 16}}>
                                ₹
                                {/* {(this.TotalItemPrice() * this.state.CGST) /
                                  100} */}
                                {this.TotalCGST()}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 5,
                              }}>
                              <Text style={{fontSize: 16}}>SGST</Text>
                              <Text style={{fontSize: 16}}>
                                ₹{this.TotalSGST()}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 5,
                              }}>
                              <Text style={{fontSize: 16}}>delivery_fee</Text>
                              <Text style={{fontSize: 16}}>
                                ₹{this.state.delivery_fee}
                              </Text>
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 5,
                              }}>
                              <Text style={{fontSize: 16}}>standard_fee</Text>
                              <Text style={{fontSize: 16}}>
                                ₹{this.state.standard_fee}
                              </Text>
                            </View>
                            <View
                              style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                                marginTop: 8,
                                opacity: 0.2,
                              }}
                            />
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 5,
                              }}>
                              <Text style={{fontSize: 14}}>Total</Text>
                              <Text style={{fontSize: 16}}>
                                ₹
                                {/* {parseInt(this.TotalCGST()) +
                                  parseInt(this.TotalSGST()) +
                                  parseInt(this.state.standard_fee) +
                                  parseInt(this.state.delivery_fee)} */}
                                {this.TotalTEX()}
                              </Text>
                            </View>
                          </View>
                        </DialogContent>
                      </Dialog>

                      <TouchableOpacity
                        style={{alignSelf: 'center'}}
                        onPress={() => {
                          this.setState({visible: true});
                        }}>
                        <Image
                          source={require('../assets/image/info.png')}
                          style={{
                            height: 10,
                            width: 10,
                            alignSelf: 'center',
                            marginLeft: 4,
                            opacity: 0.4,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={{color: 'black', fontSize: 14}}>
                      ₹
                      {/* {parseInt(this.state.CGST) +
                        parseInt(this.state.SGST) +
                        parseInt(this.state.standard_fee) +
                        parseInt(this.state.delivery_fee)} */}
                      {this.TotalTEX()}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      marginTop: 12,
                      opacity: 0.1,
                      marginHorizontal: 15,
                      marginBottom: 12,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginEnd: 10,
                    }}>
                    <Text style={{color: 'black', fontSize: 14}}>To Pay</Text>
                    {/* {this.state.is_vip == '1' ? (
                      <Text style={{color: 'black', fontSize: 14}}>₹ 0</Text>
                    ) : (
                      <Text style={{color: 'black', fontSize: 14}}>
                        ₹{this.TOPay()}
                      </Text>
                    )} */}
                    <Text style={{color: 'black', fontSize: 14}}>
                      ₹{this.TOPay()}
                    </Text>
                  </View>
                  {this.props.offer.id !== '' ? (
                    <View
                      style={{
                        backgroundColor: '#E3F6E9',
                        padding: 7,
                        marginTop: 10,
                        margin: 2,
                        borderColor: 'green',
                        borderWidth: 1,
                        borderRadius: 4,
                      }}>
                      <Text style={{color: 'green', alignSelf: 'center'}}>
                        You have saved ₹{this.TotalDiscountPrice()} on the bill.
                      </Text>
                    </View>
                  ) : null}

                  <Text
                    style={{
                      color: '#ED505C',
                      fontSize: 13,
                      marginTop: 15,
                      marginBottom: 250,
                    }}>
                    Order once placed cannot be cancelled and are non-refundable
                  </Text>
                </View>
              </ScrollView>

              <View
                style={{
                  flexDirection: 'column',
                  position: 'absolute',
                  bottom: 0,
                  width: Dimensions.get('screen').width,
                }}>
                {this.props.user_id == '' ? (
                  <TouchableOpacity
                    onPress={() => {
                      // this.get_produst_ids(() => this.PlaceORder());
                      // this.TOPay();
                      // this.TotalItemPrice();
                      // this.PlaceORder();
                      // this.NewPlaceOrder();
                      // this.props.navigation.navigate('Profile');
                      this.toggleBottomNavigationView();
                    }}
                    style={{
                      backgroundColor: 'gray',
                      marginTop: 8,
                      height: 60,
                      marginBottom: 70,
                      marginHorizontal: 10,
                      borderRadius: 5,
                      justifyContent: 'center',
                    }}>
                    <BottomSheet
                      visible={this.state.visible}
                      //setting the visibility state of the bottom shee
                      onBackButtonPress={this.toggleBottomNavigationView}
                      //Toggling the visibility state on the click of the back botton
                      // onBackdropPress={this.toggleBottomNavigationView}
                      //Toggling the visibility state on the clicking out side of the sheet
                    >
                      <SafeAreaView style={style.bottomNavigationView}>
                        {this.state.otpVisible == true ? (
                          <View style={style.login_view}>
                            <TouchableOpacity
                              onPress={() => this.toggleBottomNavigationView()}
                              style={{
                                width: 60,
                                alignSelf: 'flex-end',
                                height: 60,
                              }}>
                              <Image
                                source={cross_icon}
                                style={{
                                  alignSelf: 'flex-end',
                                  margin: 15,
                                  height: 15,
                                  width: 15,
                                }}></Image>
                            </TouchableOpacity>
                            <Text style={style.txt_heading}>
                              ENTER YOUR MOBILE NUMBER
                            </Text>
                            <Text style={style.txt_10_digits}>
                              10 - digit phone number
                            </Text>
                            <View style={style.enter_number_view}>
                              <Text
                                style={{
                                  fontSize: 17,
                                  color: 'black',
                                  marginRight: 5,
                                  alignSelf: 'center',
                                }}>
                                +91
                              </Text>
                              <TextInput
                                style={style.input_number}
                                autoCompleteType="cc-number"
                                textContentType="telephoneNumber"
                                dataDetectorTypes="phoneNumber"
                                keyboardType="phone-pad"
                                placeholder="Enter Mobile Number"
                                autoFocus
                                maxLength={10}
                                onChangeText={text =>
                                  this.setState({
                                    value: text,
                                  })
                                }
                                // value={this.state.value}
                              ></TextInput>
                            </View>
                            <View
                              style={{
                                borderBottomColor: '#000000',
                                marginTop: 3,
                                marginHorizontal: 10,
                                borderBottomWidth: 1,
                              }}
                            />
                            <View
                              style={{
                                borderRadius: 6,
                                marginHorizontal: 26,
                                marginTop: 25,
                              }}>
                              <TouchableOpacity
                                disabled={
                                  this.state.value.length == 10 ? false : true
                                }
                                onPress={() => {
                                  this.LoginFun();
                                  this.OtpToggal();
                                }}
                                style={{
                                  backgroundColor:
                                    this.state.value.length == 10
                                      ? '#BE984A'
                                      : '#D1B989',
                                  borderRadius: 5,
                                  justifyContent: 'center',
                                  marginTop: 15,
                                }}>
                                <Text
                                  style={{
                                    padding: 10,
                                    alignSelf: 'center',
                                    fontSize: 15,
                                    color: 'white',
                                  }}>
                                  Login
                                </Text>
                              </TouchableOpacity>
                              {/* <Button
                        onPress={() => {
                          // this.LoginFun();
                          this.OtpToggal();
                        }}
                        title="GET OTP"
                        color={
                          this.state.value.length == 1 ? '#BE984A' : '#DDDDDD'
                        }
                        // visible={inputChangeHandler}
                        // disabled={this.state.value.length == 1 ? false : true}
                      /> */}
                            </View>
                          </View>
                        ) : (
                          <View style={style.login_view}>
                            <TouchableOpacity
                              onPress={() => this.toggleBottomNavigationView()}
                              style={{
                                width: 60,
                                alignSelf: 'flex-end',
                                height: 60,
                              }}>
                              <Image
                                source={cross_icon}
                                style={{
                                  alignSelf: 'flex-end',
                                  margin: 15,
                                  height: 15,
                                  width: 15,
                                }}></Image>
                            </TouchableOpacity>
                            <Text
                              style={{
                                fontSize: 20,
                                color: 'black',
                                margin: 20,
                              }}>
                              ENTER OTP
                            </Text>
                            <View style={{flex: 1, margin: 35}}>
                              <OTPInputView
                                style={{
                                  width: '80%',
                                  height: '20%',
                                  color: 'black',
                                  alignSelf: 'center',
                                }}
                                pinCount={4}
                                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                onCodeChanged={code => this.setState({code})}
                                // codeInputFieldStyle={style.borderStyleBase}
                                codeInputHighlightStyle={
                                  style.borderStyleHighLighted
                                }
                                autoFocusOnLoad
                                keyboardType={'number-pad'}
                                codeInputFieldStyle={style.underlineStyleBase}
                                // codeInputHighlightStyle={
                                //   style.underlineStyleHighLighted
                                // }
                                onCodeFilled={code => {
                                  console.log(
                                    `Code is ${code}, you are good to go!`,
                                  );
                                }}
                              />

                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'flex-end',
                                  marginRight: 25,
                                }}>
                                <Text style={{fontSize: 12, color: 'black'}}>
                                  Did not get OTP?{' '}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    this.LoginFun();
                                  }}>
                                  <Text
                                    style={{
                                      alignSelf: 'center',
                                      color: '#BE984A',
                                      fontSize: 13,
                                      fontWeight: 'bold',
                                    }}>
                                    {' '}
                                    RESEND SMS
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              <TouchableOpacity
                                onPress={() => {
                                  this.Check_OTP();
                                  this.OtpToggal();
                                }}
                                disabled={
                                  this.state.code.length == 4 ? false : true
                                }
                                style={{
                                  backgroundColor:
                                    this.state.code.length == 4
                                      ? '#BE984A'
                                      : '#D1B989',
                                  borderRadius: 5,
                                  justifyContent: 'center',
                                  marginTop: 15,
                                }}>
                                <Text
                                  style={{
                                    alignSelf: 'center',
                                    padding: 10,
                                    alignSelf: 'center',
                                    fontSize: 15,
                                    color: 'white',
                                  }}>
                                  PROCEED
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )}
                      </SafeAreaView>
                    </BottomSheet>

                    <View
                      style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <Text
                        style={{fontSize: 18, color: 'white', marginRight: 5}}>
                        PROCEED WITH PHONE NUMBER
                      </Text>
                      <Image
                        source={require('../assets/image/fast_forwed_icon.png')}
                        style={{
                          height: 12,
                          resizeMode: 'center',
                          width: 8,
                          marginTop: 3,
                          marginRight: 20,
                          alignSelf: 'center',
                          tintColor: 'white',
                        }}></Image>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View>
                    {this.state.selected_address.id == '' ? (
                      <View>
                        {this.props.is_order == '1' ? (
                          <TouchableOpacity
                            onPress={() => this.toggleBottomaddressView()}
                            style={{
                              flexDirection: 'row',
                              backgroundColor: 'orange',
                              marginTop: 20,
                              marginHorizontal: 30,
                              height: 50,
                              marginBottom: 10,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 8,
                            }}>
                            <BottomSheet
                              visible={this.state.address_visible}
                              //setting the visibility state of the bottom shee
                              onBackButtonPress={this.toggleBottomaddressView}
                              //Toggling the visibility state on the click of the back botton
                              // onBackdropPress={this.toggleBottomNavigationView}
                              //Toggling the visibility state on the clicking out side of the sheet
                            >
                              <View
                                style={{
                                  flex: 1,
                                  backgroundColor: '#FFFFFF',
                                  borderRadius: 12,
                                  width: '100%',
                                  marginTop: 150,
                                }}>
                                <Text
                                  style={{
                                    color: 'black',
                                    fontSize: 18,
                                    marginTop: 20,
                                    marginLeft: 15,
                                  }}>
                                  Select An Address
                                </Text>
                                <View
                                  style={{
                                    borderBottomColor: 'black',
                                    opacity: 0.4,
                                    borderBottomWidth: 0.8,
                                    marginTop: 15,
                                    marginHorizontal: 15,
                                  }}
                                />
                                <View>
                                  <FlatList
                                    style={{marginTop: 20}}
                                    data={this.state.address_data}
                                    renderItem={this.AddressItemView}
                                    keyExtractor={(item, index) =>
                                      index.toString()
                                    }></FlatList>
                                  <TouchableOpacity
                                    onPress={() =>
                                      this.props.navigation.navigate('Address')
                                    }>
                                    <Text
                                      style={{
                                        marginTop: 15,
                                        color: '#BE984A',
                                        fontSize: 15,
                                        marginLeft: 15,
                                      }}>
                                      +Add Address
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </BottomSheet>

                            <Image
                              source={require('../assets/image/icon_location.png')}
                              style={{
                                height: 20,
                                width: 20,
                                tintColor: 'white',
                              }}></Image>

                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontWeight: 'bold',
                                  fontSize: 16,
                                  marginLeft: 5,
                                }}>
                                SELECT DELIVERY LOCATION
                              </Text>
                              <Image
                                source={require('../assets/image/next.png')}
                                style={{
                                  height: 20,
                                  width: 20,
                                  tintColor: 'white',
                                  // marginLeft: -15,
                                }}></Image>
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <View
                            style={{
                              backgroundColor: '#A9B5B1',
                              paddingVertical: 4,
                              marginHorizontal: 10,
                              borderRadius: 4,
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={require('../assets/image/store_icon.png')}
                              style={{height: 26, width: 26, marginLeft: 10}}
                            />
                            <View style={{marginVertical: 8}}>
                              <Text
                                style={{
                                  marginLeft: 20,
                                  color: 'black',
                                  fontSize: 16,
                                  fontWeight: 'bold',
                                }}>
                                Takeaway
                              </Text>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 13,
                                  marginLeft: 20,
                                }}>
                                The Imperial Place
                              </Text>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 11,
                                  marginLeft: 20,
                                  marginBottom: 4,
                                }}>
                                Dr. Yagnik Road ,Reace Cource, Rajkot, Gujrat
                              </Text>
                            </View>
                          </View>
                        )}
                      </View>
                    ) : (
                      <View>
                        {this.props.is_order == '1' ? (
                          <View
                            //  onPress={() => this.toggleBottomaddressView()}
                            style={{
                              flexDirection: 'row',
                              backgroundColor: '#A9B5B1',
                              marginTop: 20,
                              // height: 40,
                              marginHorizontal: 10,
                              // marginBottom: 10,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 5,
                            }}>
                            <BottomSheet
                              visible={this.state.address_visible}
                              //setting the visibility state of the bottom shee
                              onBackButtonPress={this.toggleBottomaddressView}
                              //Toggling the visibility state on the click of the back botton
                              // onBackdropPress={this.toggleBottomNavigationView}
                              //Toggling the visibility state on the clicking out side of the sheet
                            >
                              <TouchableOpacity
                                onPress={() => {
                                  this.toggleBottomaddressView();
                                }}
                                style={{
                                  alignSelf: 'center',
                                  // paddingLeft: 35,
                                  // paddingVertical: 15,
                                  // marginRight: 15,
                                  height: 50,
                                  width: 50,
                                  borderRadius: 50 / 2,
                                  marginTop: 140,
                                  marginBottom: 20,
                                  backgroundColor: '#181616',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  // paddingHorizontal: 10,
                                }}>
                                <Image
                                  source={require('../assets/image/close_icon.png')}
                                  style={{
                                    height: 13,
                                    width: 13,
                                    alignSelf: 'center',
                                    tintColor: 'white',
                                    // marginRight: 20,
                                  }}
                                />
                              </TouchableOpacity>

                              <View
                                style={{
                                  flex: 1,
                                  backgroundColor: '#FFFFFF',
                                  borderRadius: 12,
                                  width: '100%',
                                  marginTop: 10,
                                }}>
                                <Text
                                  style={{
                                    color: 'black',
                                    fontSize: 18,
                                    marginTop: 20,
                                    marginLeft: 15,
                                  }}>
                                  Select An Address
                                </Text>
                                <View
                                  style={{
                                    borderBottomColor: 'black',
                                    opacity: 0.4,
                                    borderBottomWidth: 0.8,
                                    marginTop: 15,
                                    marginHorizontal: 15,
                                  }}
                                />
                                <View>
                                  <FlatList
                                    style={{marginTop: 20}}
                                    data={this.state.address_data}
                                    renderItem={this.AddressItemView}
                                    keyExtractor={(item, index) =>
                                      index.toString()
                                    }></FlatList>
                                  <TouchableOpacity
                                    onPress={() =>
                                      this.props.navigation.navigate('Address')
                                    }>
                                    <Text
                                      style={{
                                        marginTop: 15,
                                        color: '#BE984A',
                                        fontSize: 15,
                                        marginLeft: 15,
                                      }}>
                                      +Add Address
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </BottomSheet>

                            <Image
                              source={require('../assets/image/food_delivery_icon.png')}
                              style={{
                                height: 30,
                                width: 30,
                                marginLeft: 10,
                                tintColor: 'black',
                                marginVertical: 26,
                              }}></Image>
                            <View style={{alignSelf: 'center', flex: 1}}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontWeight: 'bold',
                                  fontSize: 16,
                                  marginHorizontal: 20,
                                }}>
                                Delivery
                              </Text>
                              <Text
                                style={{
                                  color: 'black',
                                  // fontWeight: 'bold',
                                  fontSize: 14,
                                  marginHorizontal: 20,
                                }}>
                                {this.state.selected_address.address1}
                              </Text>
                              <Text
                                style={{
                                  color: 'black',
                                  // fontWeight: 'bold',
                                  fontSize: 11,
                                  marginHorizontal: 20,
                                }}>
                                {this.state.selected_address.address2}
                              </Text>
                            </View>

                            <TouchableOpacity
                              onPress={() => this.toggleBottomaddressView()}
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 4,
                                backgroundColor: 'white',
                                marginRight: 10,
                              }}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 12,
                                  paddingHorizontal: 8,
                                  paddingVertical: 3,
                                }}>
                                CHANGE
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View
                            style={{
                              backgroundColor: '#A9B5B1',
                              paddingVertical: 4,
                              marginHorizontal: 10,
                              borderRadius: 4,
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={require('../assets/image/store_icon.png')}
                              style={{height: 26, width: 26, marginLeft: 10}}
                            />
                            <View style={{marginVertical: 8}}>
                              <Text
                                style={{
                                  marginLeft: 20,
                                  color: 'black',
                                  fontSize: 16,
                                  fontWeight: 'bold',
                                }}>
                                Takeaway
                              </Text>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 13,
                                  marginLeft: 20,
                                }}>
                                The Imperial Place
                              </Text>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 11,
                                  marginLeft: 20,
                                  marginBottom: 4,
                                }}>
                                Dr. Yagnik Road ,Reace Cource, Rajkot, Gujrat
                              </Text>
                            </View>
                          </View>
                        )}
                      </View>
                    )}

                    <TouchableOpacity
                      onPress={() => {
                        // this.get_produst_ids(() => this.PlaceORder());
                        // this.TOPay();
                        // this.TotalItemPrice();

                        if (this.props.is_order == '2') {
                          this.setState({
                            takeaway_pickup_visible: true,
                          });
                        } else {
                          this.state.selected_address.id == ''
                            ? alert('please select a delivery location')
                            : // : this.PlaceORder();
                              this.props.navigation.navigate('PaymentOption');

                          this.props.add_all_cart_details({
                            product_id: this.props.myItems
                              .map(i => i.id)
                              .join(','),
                            amount: this.props.myItems
                              .map(i => i.price)
                              .join(','),
                            qty: this.props.myItems.map(i => i.qty).join(','),
                            total: this.props.myItems
                              .map(i => i.qty * i.price)
                              .join(','),
                            sub_total: this.TotalItemPrice(),
                            total_amount: this.TOPay(),
                            note: this.state.spacial_cooking,
                            offer_id: this.props.offer.id,
                            offer_amount: this.TotalDiscountPrice(),
                            order_type: this.props.is_order,
                            cgst: this.TotalCGST(),
                            sgst: this.TotalSGST(),
                            delivery_fee: this.state.delivery_fee.toString(),
                            standard_fee: this.state.standard_fee.toString(),
                            address1: this.state.selected_address.address1.toString(),
                            address2: this.state.selected_address.address2.toString(),
                            landmark: this.state.selected_address.landmark.toString(),
                            address_type: this.state.selected_address.type.toString(),
                            topping_id: this.state.topping_ids.toString(),
                            extra_topping_id_one: this.state.topping_array_one_ids.toString(),
                            extra_topping_id_two: this.state.topping_array_two_ids.toString(),
                            extra_topping_id_three: this.state.topping_array_three_ids.toString(),
                          });
                        }

                        // this.NewPlaceOrder();
                      }}
                      style={{
                        backgroundColor: '#ED505C',
                        marginTop: 8,
                        height: 60,
                        marginBottom: 70,
                        marginHorizontal: 25,
                        borderRadius: 5,
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: 'white',
                            // marginRight: 8,
                            // fontWeight:'bold',
                            letterSpacing: 2,
                          }}>
                          Make Payment
                        </Text>
                        <Image
                          source={require('../assets/image/fast_forwed_icon.png')}
                          style={{
                            height: 12,
                            resizeMode: 'center',
                            width: 8,
                            marginTop: 3,
                            marginLeft: 8,
                            // marginRight: 20,
                            alignSelf: 'center',
                            tintColor: 'white',
                          }}></Image>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            <BottomSheet
              visible={this.state.takeaway_pickup_visible}
              //setting the visibility state of the bottom shee
              onBackButtonPress={() => {
                this.setState({
                  takeaway_pickup_visible: !this.state.takeaway_pickup_visible,
                });
              }}
              onBackdropPress={() => {
                this.setState({
                  takeaway_pickup_visible: !this.state.takeaway_pickup_visible,
                });
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <View
                  style={{
                    height: '60%',
                    width: '80%',
                    // marginVertical: 50,
                    // marginHorizontal: 100,
                    borderRadius: 9,
                    backgroundColor: 'white',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      marginTop: 20,
                      marginHorizontal: 10,
                      textAlign: 'center',
                      fontSize: 16,
                    }}>
                    You have to collect the order from{'\n'}
                    {
                      <Text
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        Imperial Palace
                      </Text>
                    }
                    , Dr.Yagnik Road
                  </Text>
                  <Image
                    source={require('../assets/image/takeyaway_image_pickup.png')}
                    style={{
                      height: 150,
                      width: 200,
                      marginTop: 15,
                      marginBottom: 15,
                      marginLeft: 10,
                      resizeMode: 'contain',
                    }}></Image>

                  <Text
                    style={{textAlign: 'center', color: 'black', fontSize: 18}}>
                    Delivery partners are not assigned {'\n'}for pickup orders
                  </Text>
                  <TouchableOpacity
                    style={{
                      width: '90%',
                      marginHorizontal: 15,
                      marginTop: 35,
                      backgroundColor: '#ED505C',
                      height: 50,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Proceed with pickup
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.is_order_type('1');
                      this.setState({takeaway_pickup_visible: false});
                    }}
                    style={{
                      width: '90%',
                      marginHorizontal: 15,
                      marginTop: 20,
                      borderColor: '#ED505C',
                      height: 50,
                      borderWidth: 1,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      Get delivery instead
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheet>
          </SafeAreaView>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              flex: 1,
              alignItems: 'center',
            }}>
            <Image source={img} style={style.img} />
            <Text style={style.text1}>GOOD FOOD. GOOD MOOD</Text>
            <Text style={style.text}>
              Your cart is empty. Add something from our elaborated menu
            </Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  myItems: state.cartItems.items,
  user_id: state.userDetails.user_id,
  offer: state.cartItems.offer,
  // is_order: state.cartItems.is_order_type,

  login_tokenn: state.userDetails.login_token,
  uid: state.userDetails.user_id,
  uname: state.userDetails.user_name,
  uemail: state.userDetails.email,
  umo_number: state.userDetails.mo_number,
  token: state.userDetails.add_pushnotification_token,
  is_vipp: state.userDetails.is_vip,
  is_order: state.cartItems.is_order_type,
  // cart: state.cartItems.currentQty,
});

const mapDispatchToProps = {
  addToCart,
  increaseQty,
  manage_qty,
  removeToCart,
  addOffer,
  remove_full_cart,

  addLoginToken,
  addEmail,
  addPhoneNumber,
  addUserId,
  addUserName,
  Logout,
  add_all_cart_details,
  add_is_vip,
  is_order_type,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    fontSize: 14,
    color: '#000000',
    marginHorizontal: 25,
    textAlign: 'center',
    marginTop: 10,
  },

  text1: {
    fontSize: 16,
    color: '#000000',
  },

  img: {
    maxHeight: 95,
    maxWidth: 94,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cart_container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    height: 25,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  txt_heading: {
    fontSize: 14,
    color: 'black',
    textAlign: 'right',
    alignItems: 'center',
    marginRight: 10,
  },
  number_input: {
    borderRadius: 5,
    borderColor: 'black',
    alignSelf: 'center',
    borderWidth: 1,
    marginRight: 24,
    width: 85,
    justifyContent: 'center',
  },

  bottomNavigationView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    marginTop: 60,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main_view: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '80%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_view: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderColor: '#707070',
    borderWidth: 1,
  },
  txt_heading: {
    fontSize: 16,
    color: '#000000',
    marginTop: 20,
    marginLeft: 23,
  },
  txt_10_digits: {
    fontSize: 14,
    opacity: 0.31,
    color: '#000000',
    marginTop: 29,
    marginLeft: 23,
  },
  enter_number_view: {
    flexDirection: 'row',
    marginTop: 25,
    marginLeft: 22,
  },
  input_number: {
    width: '100%',
    direction: 'ltr',
    fontSize: 17,
    alignSelf: 'center',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#BE984A',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#BE984A',
    fontSize: 18,
    color: '#BE984A',
  },

  underlineStyleHighLighted: {
    borderColor: '#BE984A',
    tintColor: 'pink',
  },
});
