import {template} from '@babel/core';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

import React, {Component, isValidElement, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  FlatList,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
  Pressable,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import NumericInput from 'react-native-numeric-input';
import MenuFunction from '../screens/MenuFunction';
import {connect} from 'react-redux';

const cross_icon = require('../assets/image/close_icon.png');

import {create, PREDEF_RES} from 'react-native-pixel-perfect';
// import NumericInput, {calcSize} from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

// Generate required css
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import {
  addToCart,
  increaseQty,
  getMainCat,
  manage_qty,
  removeToCart,
  add_main_cat_id,
  main_cat_name,
} from '../reducers/cartItems/actions';
import {addLoginToken} from '../reducers/UserReducer/user_actions';
import {BottomSheet} from 'react-native-btr';
import Cart from './Cart';

var back_arrow = require('../assets/image/back_arrow.png');
var vag_icon = require('../assets/image/vag.png');
var spoon_icon = require('../assets/image/spoon.png');
var selected_circle = require('../assets/image/green_checkbox.jpg');
var non_selected_circle = require('../assets/image/white_check_box.png');

const Itemm = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  borderColor,
  borderWidth,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.item_menu,
      {
        justifyContent: 'space-between',
     
      },
        backgroundColor,
        textColor,
        borderColor,borderWidth
    ]}>
    <Text style={[styles.title_menu]}>{item.name}</Text>
    <Text style={[styles.subtitle]}>{item.total_products} OPTION AVAILABLE</Text>
  </TouchableOpacity>
);

const Item = ({
  item,
  onPress,
  // backgroundColor,
  // textColor,
  // borderColor,
  // borderWidth,
  img_src,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      {
        marginVertical: 11,
        marginHorizontal: 12,
        borderRadius: 8,
        width: '100%',
      },
      // backgroundColor,
      // borderColor,
      // borderWidth,
    ]}>
    <View
      style={{
        flexDirection: 'column',
        // justifyContent: 'space-between',
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../assets/image/vag.png')}
            style={{height: 12, width: 12, alignSelf: 'center'}}
          />

          {/* <Text style={[styles.title, textColor, {alignSelf: 'center'}]}>
          {item.topping_price == '0' ? null : item.topping_price}
        </Text> */}
          <Text style={[styles.title, {alignSelf: 'center'}]}>
            {item.topping_name}
            <View style={{flex: 0.1}}></View>
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}>
          <Text style={[styles.title, {alignSelf: 'center'}]}>
            ₹ {item.topping_price}
            <View style={{flex: 0.1}}></View>
          </Text>
          <Image
            source={img_src}
            style={{
              height: 20,
              width: 20,
              marginHorizontal: 8,
            }}
          />
        </View>
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'space-between'}}></View>
    </View>
  </TouchableOpacity>
);

const Item_one_array = ({
  item,
  onPress,
  // backgroundColor,
  // textColor,
  // borderColor,
  // borderWidth,
  img_src,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      marginVertical: 11,
      marginHorizontal: 12,
      borderRadius: 8,
      width: '100%',
    }}>
    <View
      style={{
        flexDirection: 'column',
        // justifyContent: 'center',
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../assets/image/vag.png')}
            style={{
              height: 12,
              width: 12,
              alignSelf: 'center',
            }}
          />

          {/* <Text style={[styles.title, textColor, {alignSelf: 'center'}]}>
          {item.price == '0' ? null : item.price}
        </Text> */}

          <Text style={[styles.title, {alignSelf: 'center'}]}>{item.name}</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}>
          <Text style={[styles.title, {alignSelf: 'center', marginLeft: 20}]}>
            ₹ {item.price}
          </Text>
          <Image
            source={img_src}
            style={{height: 20, width: 20, marginHorizontal: 8}}
          />
        </View>
      </View>
      {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      
        <View style={{flex: 0.1}}></View>
       
      </View> */}
    </View>
  </TouchableOpacity>
);

const Item_jain = ({
  item,
  onPress,
  // backgroundColor,
  // textColor,
  // borderColor,
  // borderWidth,
  img_src,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      marginVertical: 11,
      marginHorizontal: 12,
      borderRadius: 8,
      width: '100%',
    }}>
    <View
      style={{
        // flexDirection: 'column',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
      }}>
      <Image
        source={require('../assets/image/vag.png')}
        style={{height: 12, width: 12, alignSelf: 'center'}}
      />
      <Image
        source={img_src}
        style={{height: 20, width: 20, marginHorizontal: 8}}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={[styles.title, {alignSelf: 'center'}]}>
          {item.is_option_name}
        </Text>
        <View style={{flex: 0.1}}></View>
      </View>
    </View>
  </TouchableOpacity>
);

const jain_data = [
  {is_option_id: 0, is_option_name: 'Regular'},
  {is_option_id: 1, is_option_name: 'Jain'},
];

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      show: true,
      modalVisible: false,
      cart_modalVisible: this.props.myItems.length == 0 ? false : true,
      listItems: [],
      isLoading: false,
      c_visible: false,
      selectedId: '',
      is_option_selected_id: '',
      is_option_selected_name: '',
      selected_menu_Id: '',
      selected_menu_Name: '',
      MainCat: [],
      Toping_data: [],
      Toping_one_data: [],
      Toping_two_data: [],
      Toping_three_data: [],
      option_jain: '',
      item_name: '',
      item_id: '',
      is_line: 0,
      is_first_title: '',
      cart_bottomsheet: false,
      is_second_title: '',
      item_price: '',
      selected_id_price: '',
      selected_id_name: '',
      selected_topping_array: [],
      selected_one_array_id: [],
      selected_two_array_id: [],
      selected_three_array_id: [],
      // selected_one_array_name: [],
      // selected_two_array_name: [],
      // selected_three_array_name: [],
      // selected_one_array_price: [],
      // selected_two_array_price: [],
      // selected_three_array_price: [],
      topping_text: '',
      topping_one_text: '',
      topping_two_text: '',
      topping_three_text: '',
      is_selected_menu_one: 0,
      is_selected_menu_two: 0,
      is_selected_menu_three: 0,
      is_select_toppings: 0,
      selected_topping_item: {
        topping_id: [],
        // topping_name: '',
        price: 0,
        id: '',
        name: '',
        qty: 1,
        is_option: '',
        selected_one_array_id: [],
        selected_two_array_id: [],
        selected_three_array_id: [],
        topping_text: '',
        topping_one_text: '',
        topping_two_text: '',
        topping_three_text: '',

        // selected_one_array_name: [],
        // selected_two_array_name: [],
        // selected_three_array_name: [],
      },
    };
  }
  renderSeparator = index => (
    <View>
      {index == 6 ? (
        <View
          style={{
            backgroundColor: 'red',
            height: 0.5,
          }}
        />
      ) : null}
    </View>
  );
  get_final_price = p => {
    let sum = 0;
    let topping_price = 0;
    this.state.selected_topping_item &&
      this.state.selected_topping_item.topping_id &&
      this.state.selected_topping_item.topping_id.map(item => {
        topping_price =
          topping_price +
          (typeof parseFloat(item.t_price) == 'number'
            ? parseFloat(item.t_price)
            : 0);
      });
    let selected_one_array_price = 0;
    this.state.selected_topping_item &&
      this.state.selected_topping_item.selected_one_array_id &&
      this.state.selected_topping_item.selected_one_array_id.map(item => {
        selected_one_array_price =
          selected_one_array_price +
          (typeof parseFloat(item.price) == 'number'
            ? parseFloat(item.price)
            : 0);
      });

    let selected_two_array_price = 0;
    this.state.selected_topping_item &&
      this.state.selected_topping_item.selected_two_array_id &&
      this.state.selected_topping_item.selected_two_array_id.map(item => {
        selected_two_array_price =
          selected_two_array_price +
          (typeof parseFloat(item.price) == 'number'
            ? parseFloat(item.price)
            : 0);
      });

    let selected_three_array_price = 0;
    this.state.selected_topping_item &&
      this.state.selected_topping_item.selected_three_array_id &&
      this.state.selected_topping_item.selected_three_array_id.map(item => {
        selected_three_array_price =
          selected_three_array_price +
          (typeof parseFloat(item.price) == 'number'
            ? parseFloat(item.price)
            : 0);
      });

    sum =
      topping_price +
      selected_one_array_price +
      selected_two_array_price +
      selected_three_array_price;
    return sum + (typeof parseFloat(p) == 'number' ? parseFloat(p) : 0);
  };

  get_all_price = () => {
    let sum = 0;
    let topping_price = 0;
    this.state.selected_topping_item &&
      this.state.selected_topping_item.topping_id &&
      this.state.selected_topping_item.topping_id.map(item => {
        topping_price =
          topping_price +
          (typeof parseFloat(item.t_price) == 'number'
            ? parseFloat(item.t_price)
            : 0);
      });
    let selected_one_array_price = 0;
    this.state.selected_topping_item &&
      this.state.selected_topping_item.selected_one_array_id &&
      this.state.selected_topping_item.selected_one_array_id.map(item => {
        selected_one_array_price =
          selected_one_array_price +
          (typeof parseFloat(item.price) == 'number'
            ? parseFloat(item.price)
            : 0);
      });

    let selected_two_array_price = 0;
    this.state.selected_topping_item &&
      this.state.selected_topping_item.selected_two_array_id &&
      this.state.selected_topping_item.selected_two_array_id.map(item => {
        selected_two_array_price =
          selected_two_array_price +
          (typeof parseFloat(item.price) == 'number'
            ? parseFloat(item.price)
            : 0);
      });

    let selected_three_array_price = 0;
    this.state.selected_topping_item &&
      this.state.selected_topping_item.selected_three_array_id &&
      this.state.selected_topping_item.selected_three_array_id.map(item => {
        selected_three_array_price =
          selected_three_array_price +
          (typeof parseFloat(item.price) == 'number'
            ? parseFloat(item.price)
            : 0);
      });

    sum =
      topping_price +
      selected_one_array_price +
      selected_two_array_price +
      selected_three_array_price;
    return sum;
  };

  renderItem_menu = ({item}) => {
    const backgroundColor =
      item.id === this.props.cat_id ? '#F6F9F6' : '#F6F9F6';
    const color = item.id === this.props.cat_id ? 'black' : 'black';
    const borderWidth = item.id === this.props.cat_id ? 2 : 0;
    const borderColor = item.id === this.props.cat_id ? '#51190D' : 'white';

    return (
      <Itemm
        item={item}
        onPress={() => {
          // this.setState({selectedId: item.id, selectedName: item.name});
          this.props.add_main_cat_id(item.id);
          this.props.main_cat_name(item.name);
          this.setState({modalVisible: false});
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        borderWidth={{borderWidth}}
        borderColor={{borderColor}}
      />
    );
  };

  renderItemm = ({item}) => {
    // const backgroundColor = this.state.selected_topping_array.find(
    //   idd => idd.t_id == item.topping_id,
    // )
    //   ? '#DDDDDD'
    //   : 'white';
    // const color = this.state.selected_topping_array.find(
    //   idd => idd.t_id == item.topping_id,
    // )
    //   ? 'black'
    //   : 'black';
    // const borderWidth = this.state.selected_topping_array.find(
    //   idd => idd.t_id == item.topping_id,
    // )
    //   ? 1
    //   : 1;
    // const borderColor = this.state.selected_topping_array.find(
    //   idd => idd.t_id == item.topping_id,
    // )
    //   ? 'black'
    //   : 'black';
    const img_src = this.state.selected_topping_array.find(
      idd => idd.t_id == item.topping_id,
    )
      ? require('../assets/image/green_checkbox.jpg')
      : require('../assets/image/white_check_box.png');
    // console.log('itemmmmmmmmmmmmm', item);
    return (
      <Item
        item={item}
        onPress={() => {
          let arr_id = this.state.selected_topping_array;

          this.setState({
            selected_topping_array:
              this.state.is_select_toppings == 1
                ? arr_id.length !== this.state.is_select_toppings
                  ? [
                      {
                        t_id: item.topping_id,
                        t_name: item.topping_name,
                        t_price: item.topping_price,
                      },
                    ]
                  : arr_id.find(idd => idd.t_id == item.topping_id)
                  ? arr_id.filter(s_item => s_item.t_id != item.topping_id)
                  : [
                      {
                        t_id: item.topping_id,
                        t_name: item.topping_name,
                        t_price: item.topping_price,
                      },
                    ]
                : arr_id.length !== this.state.Toping_data.length
                ? arr_id.find(idd => idd.t_id == item.topping_id)
                  ? arr_id
                      .filter(s_item => s_item.t_id != item.topping_id)
                      .map(id => id)
                  : [
                      ...arr_id,
                      {
                        t_id: item.topping_id,
                        t_name: item.topping_name,
                        t_price: item.topping_price,
                      },
                    ]
                : arr_id
                    .filter(s_item => s_item.t_id != item.topping_id)
                    .map(id => id),
            // selected_id_price: item.topping_price,
            // selected_id_name: item.topping_name,

            selected_topping_item: {
              ...this.state.selected_topping_item,
              topping_id:
                this.state.is_select_toppings == 1
                  ? arr_id.length !== this.state.is_select_toppings
                    ? [
                        {
                          t_id: item.topping_id,
                          t_name: item.topping_name,
                          t_price: item.topping_price,
                        },
                      ]
                    : arr_id.find(idd => idd.t_id == item.topping_id)
                    ? arr_id.filter(s_item => s_item.t_id != item.topping_id)
                    : [
                        {
                          t_id: item.topping_id,
                          t_name: item.topping_name,
                          t_price: item.topping_price,
                        },
                      ]
                  : arr_id.length !== this.state.is_select_toppings
                  ? arr_id.find(idd => idd.t_id == item.topping_id)
                    ? arr_id
                        .filter(s_item => s_item.t_id != item.topping_id)
                        .map(id => id)
                    : [
                        ...arr_id,
                        {
                          t_id: item.topping_id,
                          t_name: item.topping_name,
                          t_price: item.topping_price,
                        },
                      ]
                  : arr_id
                      .filter(s_item => s_item.t_id != item.topping_id)
                      .map(id => id),
              // topping_id: item.topping_id,
              // topping_name: item.topping_name,
              // name: this.state.item_name,
              // // price: this.get_final_price(),
              // id: this.state.item_id,
              // qty: 1,
              // is_option: this.state.selected_topping_item.is_option,
            },
          });
        }}
        // backgroundColor={{backgroundColor}}
        // textColor={{color}}
        // borderWidth={{borderWidth}}
        // borderColor={{borderColor}}
        img_src={img_src}
      />
    );
  };

  renderItem_one_array = ({item}) => {
    // const backgroundColor =
    //   // item.id === this.state.selected_three_array_id ? '#DDDDDD' : 'white';
    //   this.state.selected_one_array_id.find(idd => idd.id == item.id)
    //     ? '#DDDDDD'
    //     : 'white';
    // const color = this.state.selected_one_array_id.find(
    //   idd => idd.id == item.id,
    // )
    //   ? 'black'
    //   : 'black';
    // const borderWidth = this.state.selected_one_array_id.find(
    //   idd => idd.id == item.id,
    // )
    //   ? 1
    //   : 1;
    // const borderColor = this.state.selected_one_array_id.find(
    //   idd => idd.id == item.id,
    // )
    //   ? 'black'
    //   : 'black';
    const img_src = this.state.selected_one_array_id.find(
      idd => idd.id == item.id,
    )
      ? selected_circle
      : non_selected_circle;
    // console.log('itemmmmmmmmmmmmm', item);
    return (
      <Item_one_array
        item={item}
        onPress={() => {
          let arr_id = this.state.selected_one_array_id;
          let arr_name = this.state.selected_three_array_name;
          let arr_price = this.state.selected_three_array_price;

          this.setState({
            selected_one_array_id:
              this.state.is_selected_menu_one == 1
                ? arr_id.length !== this.state.is_selected_menu_one
                  ? [{id: item.id, name: item.name, price: item.price}]
                  : arr_id.find(idd => idd.id == item.id)
                  ? arr_id.filter(s_item => s_item.id != item.id).map(id => id)
                  : [{id: item.id, name: item.name, price: item.price}]
                : arr_id.length !== this.state.is_selected_menu_one
                ? arr_id.find(idd => idd.id == item.id)
                  ? arr_id.filter(s_item => s_item.id != item.id).map(id => id)
                  : [
                      ...arr_id,
                      {id: item.id, name: item.name, price: item.price},
                    ]
                : arr_id.filter(s_item => s_item.id != item.id).map(id => id),

            selected_topping_item: {
              // topping_id: item.topping_id ? item.topping_id : '',
              // topping_name: item.topping_name ? item.topping_name : '',
              // price: this.state.item_price,
              // name: this.state.item_name,
              // id: this.state.item_id,
              // qty: 1,
              ...this.state.selected_topping_item,
              selected_one_array_id:
                this.state.is_selected_menu_one == 1
                  ? arr_id.length !== this.state.is_selected_menu_one
                    ? [{id: item.id, name: item.name, price: item.price}]
                    : arr_id.find(idd => idd.id == item.id)
                    ? arr_id
                        .filter(s_item => s_item.id != item.id)
                        .map(id => id)
                    : [{id: item.id, name: item.name, price: item.price}]
                  : arr_id.length !== this.state.is_selected_menu_one
                  ? arr_id.find(idd => idd.id == item.id)
                    ? arr_id
                        .filter(s_item => s_item.id != item.id)
                        .map(id => id)
                    : [
                        ...arr_id,
                        {id: item.id, name: item.name, price: item.price},
                      ]
                  : arr_id.filter(s_item => s_item.id != item.id).map(id => id),
              // selected_three_array_name:
              //   arr_name.length == this.state.is_selected_menu_three
              //     ? arr_name
              //     : arr_name.includes(item.name)
              //     ? arr_name.filter(s_item => s_item !== item.name)
              //     : [...arr_name, item.name],
            },
          });
        }}
        // backgroundColor={{backgroundColor}}
        // textColor={{color}}
        // borderWidth={{borderWidth}}
        // borderColor={{borderColor}}
        img_src={img_src}
      />
    );
  };

  renderItem_two_array = ({item}) => {
    const backgroundColor =
      // item.id === this.state.selected_three_array_id ? '#DDDDDD' : 'white';
      this.state.selected_two_array_id.find(idd => idd.id == item.id)
        ? '#DDDDDD'
        : 'white';
    const color = this.state.selected_two_array_id.find(
      idd => idd.id == item.id,
    )
      ? 'black'
      : 'black';
    const borderWidth = this.state.selected_two_array_id.find(
      idd => idd.id == item.id,
    )
      ? 1
      : 1;
    const borderColor = this.state.selected_two_array_id.find(
      idd => idd.id == item.id,
    )
      ? 'black'
      : 'black';
    const img_src = this.state.selected_two_array_id.find(
      idd => idd.id == item.id,
    )
      ? selected_circle
      : non_selected_circle;
    // console.log('itemmmmmmmmmmmmm', item);
    return (
      <Item_one_array
        item={item}
        onPress={() => {
          let arr_id = this.state.selected_two_array_id;
          let arr_name = this.state.selected_two_array_name;
          let arr_price = this.state.selected_two_array_price;

          this.setState({
            selected_two_array_id:
              this.state.is_selected_menu_two == 1
                ? arr_id.length !== this.state.is_selected_menu_two
                  ? [{id: item.id, name: item.name, price: item.price}]
                  : arr_id.find(idd => idd.id == item.id)
                  ? arr_id.filter(s_item => s_item.id != item.id).map(id => id)
                  : [{id: item.id, name: item.name, price: item.price}]
                : arr_id.length !== this.state.is_selected_menu_two
                ? arr_id.find(idd => idd.id == item.id)
                  ? arr_id.filter(s_item => s_item.id != item.id).map(id => id)
                  : [
                      ...arr_id,
                      {id: item.id, name: item.name, price: item.price},
                    ]
                : arr_id.filter(s_item => s_item.id != item.id).map(id => id),
            // arr_id.length == this.state.is_selected_menu_three
            //   ? arr_id
            //   : arr_id.find(idd => idd.id == item.id)
            //   ? arr_id.filter(s_item => s_item.id != item.id).map(id => id)
            //   : [
            //       ...arr_id,
            //       {id: item.id, name: item.name, price: item.price},
            //     ],

            // selected_three_array_name:
            //   arr_name.length == this.state.is_selected_menu_three
            //     ? arr_name
            //     : arr_name.includes(item.name)
            //     ? arr_name.filter(s_item => s_item !== item.id)
            //     : [...arr_name, item.name],
            // selected_three_array_price:
            //   arr_price.length == this.state.is_selected_menu_three
            //     ? arr_price
            //     : arr_price.includes(item.price)
            //     ? arr_price.filter(s_item => s_item !== item.id)
            //     : [...arr_price, item.price],
            // selectedId: item.topping_id,
            // selected_id_price: item.topping_price,
            // selected_id_name: item.topping_name,
            selected_topping_item: {
              // topping_id: item.topping_id ? item.topping_id : '',
              // topping_name: item.topping_name ? item.topping_name : '',
              // price: this.state.item_price,
              // name: this.state.item_name,
              // id: this.state.item_id,
              // qty: 1,
              ...this.state.selected_topping_item,
              selected_two_array_id:
                this.state.is_selected_menu_two == 1
                  ? arr_id.length !== this.state.is_selected_menu_two
                    ? [{id: item.id, name: item.name, price: item.price}]
                    : arr_id.find(idd => idd.id == item.id)
                    ? arr_id
                        .filter(s_item => s_item.id != item.id)
                        .map(id => id)
                    : [{id: item.id, name: item.name, price: item.price}]
                  : arr_id.length !== this.state.is_selected_menu_two
                  ? arr_id.find(idd => idd.id == item.id)
                    ? arr_id
                        .filter(s_item => s_item.id != item.id)
                        .map(id => id)
                    : [
                        ...arr_id,
                        {id: item.id, name: item.name, price: item.price},
                      ]
                  : arr_id.filter(s_item => s_item.id != item.id).map(id => id),
              // selected_three_array_name:
              //   arr_name.length == this.state.is_selected_menu_three
              //     ? arr_name
              //     : arr_name.includes(item.name)
              //     ? arr_name.filter(s_item => s_item !== item.name)
              //     : [...arr_name, item.name],
            },
          });
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        borderWidth={{borderWidth}}
        borderColor={{borderColor}}
        img_src={img_src}
      />
    );
  };

  renderItem_three_array = ({item}) => {
    const backgroundColor =
      // item.id === this.state.selected_three_array_id ? '#DDDDDD' : 'white';
      this.state.selected_three_array_id.find(idd => idd.id == item.id)
        ? '#DDDDDD'
        : 'white';
    const color = this.state.selected_three_array_id.find(
      idd => idd.id == item.id,
    )
      ? 'black'
      : 'black';
    const borderWidth = this.state.selected_three_array_id.find(
      idd => idd.id == item.id,
    )
      ? 1
      : 1;
    const borderColor = this.state.selected_three_array_id.find(
      idd => idd.id == item.id,
    )
      ? 'black'
      : 'black';
    const img_src = this.state.selected_three_array_id.find(
      idd => idd.id == item.id,
    )
      ? selected_circle
      : non_selected_circle;
    // console.log('itemmmmmmmmmmmmm', item);
    return (
      <Item_one_array
        item={item}
        onPress={() => {
          let arr_id = this.state.selected_three_array_id;
          let arr_name = this.state.selected_three_array_name;
          let arr_price = this.state.selected_three_array_price;

          this.setState({
            selected_three_array_id:
              this.state.is_selected_menu_three == 1
                ? arr_id.length !== this.state.is_selected_menu_three
                  ? [{id: item.id, name: item.name, price: item.price}]
                  : arr_id.find(idd => idd.id == item.id)
                  ? arr_id.filter(s_item => s_item.id != item.id).map(id => id)
                  : [{id: item.id, name: item.name, price: item.price}]
                : arr_id.length !== this.state.is_selected_menu_three
                ? arr_id.find(idd => idd.id == item.id)
                  ? arr_id.filter(s_item => s_item.id != item.id).map(id => id)
                  : [
                      ...arr_id,
                      {id: item.id, name: item.name, price: item.price},
                    ]
                : arr_id.filter(s_item => s_item.id != item.id).map(id => id),
            // arr_id.length == this.state.is_selected_menu_three
            //   ? arr_id
            //   : arr_id.find(idd => idd.id == item.id)
            //   ? arr_id.filter(s_item => s_item.id != item.id).map(id => id)
            //   : [
            //       ...arr_id,
            //       {id: item.id, name: item.name, price: item.price},
            //     ],

            // selected_three_array_name:
            //   arr_name.length == this.state.is_selected_menu_three
            //     ? arr_name
            //     : arr_name.includes(item.name)
            //     ? arr_name.filter(s_item => s_item !== item.id)
            //     : [...arr_name, item.name],
            // selected_three_array_price:
            //   arr_price.length == this.state.is_selected_menu_three
            //     ? arr_price
            //     : arr_price.includes(item.price)
            //     ? arr_price.filter(s_item => s_item !== item.id)
            //     : [...arr_price, item.price],
            // selectedId: item.topping_id,
            // selected_id_price: item.topping_price,
            // selected_id_name: item.topping_name,
            selected_topping_item: {
              // topping_id: item.topping_id ? item.topping_id : '',
              // topping_name: item.topping_name ? item.topping_name : '',
              // price: this.state.item_price,
              // name: this.state.item_name,
              // id: this.state.item_id,
              // qty: 1,
              ...this.state.selected_topping_item,
              selected_three_array_id:
                this.state.is_selected_menu_three == 1
                  ? arr_id.length !== this.state.is_selected_menu_three
                    ? [{id: item.id, name: item.name, price: item.price}]
                    : arr_id.find(idd => idd.id == item.id)
                    ? arr_id
                        .filter(s_item => s_item.id != item.id)
                        .map(id => id)
                    : [{id: item.id, name: item.name, price: item.price}]
                  : arr_id.length !== this.state.is_selected_menu_three
                  ? arr_id.find(idd => idd.id == item.id)
                    ? arr_id
                        .filter(s_item => s_item.id != item.id)
                        .map(id => id)
                    : [
                        ...arr_id,
                        {id: item.id, name: item.name, price: item.price},
                      ]
                  : arr_id.filter(s_item => s_item.id != item.id).map(id => id),
              // selected_three_array_name:
              //   arr_name.length == this.state.is_selected_menu_three
              //     ? arr_name
              //     : arr_name.includes(item.name)
              //     ? arr_name.filter(s_item => s_item !== item.name)
              //     : [...arr_name, item.name],
            },
          });
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        borderWidth={{borderWidth}}
        borderColor={{borderColor}}
        img_src={img_src}
      />
    );
  };

  render_jain = ({item}) => {
    const backgroundColor =
      item.is_option_id === this.state.is_option_selected_id
        ? '#DDDDDD'
        : 'white';
    const color =
      item.is_option_id === this.state.is_option_selected_id
        ? 'black'
        : 'black';
    const borderWidth =
      item.is_option_id === this.state.is_option_selected_id ? 1 : 1;
    const borderColor =
      item.is_option_id === this.state.is_option_selected_id
        ? 'black'
        : 'black';
    const img_src =
      item.is_option_id === this.state.is_option_selected_id
        ? selected_circle
        : non_selected_circle;

    return (
      <Item_jain
        item={item}
        onPress={() =>
          this.setState({
            is_option_selected_id: item.is_option_id,
            is_option_selected_name: item.is_option_name,
            selected_topping_item: {
              // topping_id: item.topping_id ? item.topping_id : '',
              // topping_name: item.topping_name ? item.topping_name : '',
              // price: this.state.item_price,
              // name: this.state.item_name,
              // id: this.state.item_id,
              // qty: 1,
              ...this.state.selected_topping_item,
              is_option: item.is_option_name,
            },
          })
        }
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        borderWidth={{borderWidth}}
        borderColor={{borderColor}}
        img_src={img_src}
      />
    );
  };

  toggle_c_Bottomsheet = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState(state => ({
      c_visible: !state.c_visible,
    }));
  };
  TotalItemPrice = () => {
    var adding = [];
    {
      this.props.myItems.map(item => adding.push(item.qty * item.price));
    }
    var sum = adding.reduce(function (a, b) {
      return a + b;
    }, 0);

    // alert(sum);
    console.log(adding);
    console.log(sum);
    return sum;
  };

  componentDidMount() {
    this.FetchproductData();
    this.FetchMainCat();
    // this.state.selected_one_array_id.length = Number(
    //   this.state.is_selected_menu_one,
    // );
    // this.state.selected_two_array_id.length = Number(
    //   this.state.is_selected_menu_two,
    // );
    // this.state.selected_three_array_id.length = Number(
    //   this.state.is_selected_menu_three,
    // );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cat_id !== this.props.cat_id) {
      this.setState({listItems: []});
      this.FetchproductData();
      // this.props.cat_name;
    }
  }

  FetchMainCat = () => {
    axios
      .post('https://www.binarygeckos.com/imp/apis/product/get_categories')
      .then(Response => {
        if (Response.data.status == 1) {
          console.log(Response.data.status);
          this.setState({
            MainCat: Response.data.results,
            isLoading: false,
            selected_menu_Id: this.props.cat_id,
            selected_menu_Name: this.props.cat_name,
          });
        } else {
          console.log(Response.data.status);
          this.setState({
            isLoading: false,
            selectedId: this.props.cat_id,
          });
        }
      });
  };
  FetchproductData = () => {
    this.setState({isLoading: true});
    let formData = new FormData();
    formData.append(
      'login_token',
      ';}mh3)G#5KiAA!ba?A}n[Lk^0TOS%Jl}pb4U%t22kG]1id9y[9hr)c(CBOhmTd4w2/v^m3?JAbn75*ZL6',
    );
    formData.append('cat_id', this.props.cat_id);

    axios
      .post(
        'https://www.binarygeckos.com/imp/apis/product/get_product',
        formData,
      )
      .then(Response => {
        if (Response.data.status == 1) {
          console.log(Response.data.status);
          this.setState({
            is_line: Response.data.is_line,
            is_first_title: Response.data.is_first_title
              ? Response.data.is_first_title
              : '',
            is_second_title: Response.data.is_second_title
              ? Response.data.is_second_title
              : '',
            listItems: Response.data.results.map(item => {
              return {
                ...item,
                qty: 1,
              };
            }),
            isLoading: false,
          });
        } else {
          console.log(Response.data.status);
          this.setState({
            isLoading: false,
          });
        }
      });
  };

  // let data = [];
  // updateItems = (items) => {
  //   this.setState({
  //     listItems: this.state.listItems.map(item => {
  //       return {
  //         ...item,
  //         qty: 1,
  //       };
  //     }),
  //     isLoading: false,
  //   });
  // }
  AddBtn = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          {
            item.topping_data.length == 0 &&
            item.is_options == 0 &&
            item.topping_data_array_one.length == 0 &&
            item.topping_data_array_two.length == 0 &&
            item.topping_data_array_three.length == 0
              ? [
                  this.props.addToCart({
                    topping_id: [],
                    // topping_name: '',
                    price: item.price,
                    id: item.id,
                    name: item.name,
                    qty: 1,
                    is_option: '',
                    selected_one_array_id: [],
                    selected_two_array_id: [],
                    selected_three_array_id: [],
                    topping_text: '',
                    topping_one_text: '',
                    topping_two_text: '',
                    topping_three_text: '',
                  }),
                  this.setState({
                    listItems: this.state.listItems.map((item, sindex) => {
                      return {
                        ...item,
                        qty: index == sindex ? 1 : item.qty++,
                      };
                    }),
                  }),
                ]
              : null;
          }

          // {
          //   item.is_options == 1
          //     ? [
          //         this.toggle_c_Bottomsheet(),

          //         this.setState({
          //           // Toping_data: item.topping_data,
          //           option_jain: item.is_options,
          //           item_name: item.name,
          //           item_id: item.id,
          //           item_price: item.price,
          //           // selectedId: item.topping_data[0].topping_id,
          //           // selected_id_price: item.topping_data[0].topping_price,
          //           // selected_id_name: item.topping_data[0].topping_name,
          //           selected_topping_item: {
          //             // topping_id: item.topping_data[0].topping_id,
          //             // topping_name: item.topping_data[0].topping_name,
          //             price: item.price,
          //             id: item.id,
          //             name: item.name,
          //             qty: 1,
          //             is_option: jain_data.is_option_name,
          //           },
          //           is_option_selected_id: jain_data[0].is_option_id,
          //           is_option_selected_name: jain_data[0].is_option_name,

          //           // selected_topping_data: this.state.Toping_data.map(itemm => {
          //           //   itemm.topping_id == this.state.selectedId;
          //           //   return {
          //           //     ...item,
          //           //     qty: 1,
          //           //   };
          //           // }),
          //         }),
          //       ]
          //     : null;
          // }

          {
            item.topping_data.length !== 0 ||
            item.is_options == '1' ||
            item.topping_data_array_one.length !== 0 ||
            item.topping_data_array_two.length !== 0 ||
            item.topping_data_array_three.length !== 0
              ? [
                  this.toggle_c_Bottomsheet(),
                  // this.props.addToCart(this.state.selected_topping_item),

                  this.setState({
                    Toping_data: item.topping_data,
                    Toping_one_data: item.topping_data_array_one
                      ? item.topping_data_array_one
                      : [],
                    Toping_two_data: item.topping_data_array_two
                      ? item.topping_data_array_two
                      : [],
                    Toping_three_data: item.topping_data_array_three
                      ? item.topping_data_array_three
                      : [],

                    topping_text: item.topping_text,
                    topping_one_text: item.first_extra_menu_text,
                    topping_two_text: item.secon_extra_menu_text,
                    topping_three_text: item.three_extra_menu_text,

                    option_jain: item.is_options,
                    item_name: item.name,
                    item_id: item.id,
                    item_price: item.price,

                    //topping is selected
                    is_select_toppings: parseInt(item.is_select_toppings),

                    //is_selected_menu_one
                    is_selected_menu_one: item.is_selected_menu_one
                      ? item.is_selected_menu_one
                      : 0,

                    //is_selected_menu_two
                    is_selected_menu_two: item.is_selected_menu_two
                      ? item.is_selected_menu_two
                      : 0,
                    //is_selected_menu_three
                    is_selected_menu_three: item.is_selected_menu_three
                      ? item.is_selected_menu_three
                      : 0,

                    //for topping one array default first value
                    // selected_one_array_id: [
                    //   item.topping_data_array_one[0]
                    //     ? item.topping_data_array_one[0].id
                    //     : '',
                    // ],
                    // selected_one_array_price: item.topping_data_array_one[0]
                    //   ? item.topping_data_array_one[0].price
                    //   : '',

                    // //for topping two array default first value
                    // selected_two_array_id: [
                    //   item.topping_data_array_two[0]
                    //     ? item.topping_data_array_two[0].id
                    //     : '',
                    // ],
                    // selected_two_array_price: item.topping_data_array_two[0]
                    //   ? item.topping_data_array_two[0].price
                    //   : '',

                    // //for topping three array default first value
                    // selected_three_array_id: [
                    //   item.topping_data_array_three[0]
                    //     ? item.topping_data_array_three[0].id
                    //     : '',
                    // ],
                    // selected_three_array_price: item.topping_data_array_three[0]
                    //   ? item.topping_data_array_three[0].price
                    //   : '',

                    // selectedId: item.topping_data[0]
                    //   ? item.topping_data[0].topping_id
                    //   : '',
                    // selected_id_price: item.topping_data[0]
                    //   ? item.topping_data[0].topping_price
                    //   : item.price,
                    // selected_id_name: item.topping_data[0]
                    //   ? item.topping_data[0].topping_name
                    //   : '',
                    selected_topping_item: {
                      // topping_id: item.topping_data[0]
                      //   ? item.topping_data[0].topping_id
                      //   : '',
                      // topping_name: item.topping_data[0]
                      //   ? item.topping_data[0].topping_name
                      //   : '',
                      // price:
                      //   parseInt(
                      //     item.topping_data[0]
                      //       ? item.topping_data[0].topping_price
                      //       : '0',
                      //   ) + parseInt(item.price),
                      ...this.state.selected_topping_item,
                      price: this.get_final_price(item.price),
                      id: item.id,
                      name: item.name,
                      qty: 1,
                      is_option: jain_data.is_option_name,
                    },
                    is_option_selected_id: jain_data[0].is_option_id,
                    is_option_selected_name: jain_data[0].is_option_name,

                    // selected_topping_data: this.state.Toping_data.map(itemm => {
                    //   itemm.topping_id == this.state.selectedId;
                    //   return {
                    //     ...item,
                    //     qty: 1,
                    //   };
                    // }),
                  }),
                ]
              : null;
          }
        }}
        style={{
          // borderRadius: 5,
          // borderColor: 'black',
          alignSelf: 'center',
          // borderWidth: 1,
          marginRight: 25,
          height: 28,
          width: 75,
          marginTop: item.is_options == 0 && item.topping_data == 0 ? 0 : 8,
          borderWidth: 1,
          borderRadius: 7,
          backgroundColor: '#FDF6F4',
          borderColor: '#FFC4C7',
          // borderBottomWidth: 0,
          // shadowColor: '#FFC4C7',
          // shadowOffset: {width: 0, height: 0.5},
          // shadowOpacity: 0.8,
          // shadowRadius: 2,
          // elevation: 2,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{flex: 0.8, justifyContent: 'center', alignContent: 'center'}}>
          <Text
            style={{
              color: '#EC5865',
              fontSize: 13,
              fontWeight: 'bold',
              alignSelf: 'center',
              alignSelf: 'center',
              marginRight: -8,

              // marginLeft: 10,
              // marginRight: 12,
              // alignItems: 'center',
            }}>
            ADD
          </Text>
        </View>
        <Text
          style={{
            color: '#EC5865',
            fontSize: 15,
            // marginTop: -12,
            // marginLeft: 15,
            opacity: 0.7,
            alignSelf: 'flex-start',
          }}>
          +
        </Text>
      </TouchableOpacity>
    );
  };

  // NumberValue = (value, index) => {
  //   // const [value, setValue] = useState(0);

  //   return (

  //   );
  // };

  ItemView = ({item, index}) => {
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <View
        style={{
          flexDirection: 'column',
          marginVertical: 7,
          marginTop: index == 0 ? -18 : null,
        }}>
        {index == 0 ? (
          <View>
            <View
              style={{
                backgroundColor: 'black',
                height: 0,
                // marginVertical: 5,
                // marginBottom: 30,
              }}
            />
            <Text
              style={{
                fontWeight: 'bold',
                color: '#BE984A',
                fontSize: 14,
                marginTop: 30,
                marginLeft: 12,
                marginVertical: 4,
              }}>
              {this.state.is_first_title}
            </Text>
          </View>
        ) : index == this.state.is_line ? (
          <View>
            <View
              style={{
                backgroundColor: '#BE984A',
                height: 0.8,
                marginVertical: 5,
                marginBottom: 20,
              }}
            />
            <Text
              style={{
                fontWeight: 'bold',
                color: '#BE984A',
                fontSize: 14,
                marginLeft: 12,
                marginVertical: 8,
              }}>
              {this.state.is_second_title}
            </Text>
          </View>
        ) : null}
        {/* {index == 0 ? (
          <Text style={{color: 'black', fontSize: 11}}>
            {this.state.is_first_title}
          </Text>
        ) : index == item.is_line ? (
          <Text style={{color: 'black', fontSize: 11}}>
            {this.state.is_second_title}
          </Text>
        ) : null} */}

        {/* <View style={{flexDirection: 'row'}}></View> */}
        <Image
          source={vag_icon}
          style={{
            height: 12,
            width: 12,
            // alignSelf: 'center',
            marginLeft: 25,
            marginRight: 4,
            marginTop: 3,
          }}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  marginLeft: 25,
                  fontWeight: 'bold',
                  // opacity: 0.9,
                }}>
                {item.name}
              </Text>
            </View>
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
          <View style={{flex: 0.1}}></View>

          {/* {this.AddBtn(item, index)} */}

          <View>
            {this.props.myItems.length == 0 ? (
              this.AddBtn(item, index)
            ) : this.props.myItems.filter(
                newitem => item.id == newitem.id,
              )[0] ? (
              <NumericInput
                containerStyle={styles.number_input}
                value={
                  this.props.myItems.filter(newitem => item.id == newitem.id)[0]
                    ? this.props.myItems.filter(
                        newitem => item.id == newitem.id,
                      )[0].qty
                    : 0
                }
                initValue={
                  this.props.myItems.filter(newitem => item.id == newitem.id)[0]
                    ? this.props.myItems.filter(
                        newitem => item.id == newitem.id,
                      )[0].qty
                    : 1
                }
                onChange={e => {
                  console.log('qty  == ', e);
                  if (
                    this.props.myItems.filter(
                      newitem => item.id == newitem.id,
                    )[0]
                  ) {
                    this.props.manage_qty(
                      e,
                      this.props.myItems.filter(
                        newitem => item.id == newitem.id,
                      )[0].id,
                    );
                  }
                }}
                onLimitReached={e => {
                  if (
                    this.props.myItems.filter(
                      newitem => item.id == newitem.id,
                    )[0]
                  ) {
                    this.props.manage_qty(
                      0,
                      this.props.myItems.filter(
                        newitem => item.id == newitem.id,
                      )[0].id,
                    );
                  }
                }}
                totalWidth={82}
                totalHeight={28}
                iconSize={10}
                minValue={1}
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
            ) : (
              this.AddBtn(item, index)
            )}

            {item.is_options == 0 && item.topping_data == 0 ? null : (
              <Text style={{color: '#ED505C', fontSize: 11, marginLeft: 4}}>
                customisable
              </Text>
            )}
            {/* {item.is_options == 0 && item.topping_data == 0 ? null : (
              <Text style={{color: '#BE984A', fontSize: 12}}>customisable</Text>
            )} */}
          </View>
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            marginLeft: 25,
            marginRight: 25,
            marginTop: 5,
            opacity: 0.4,
          }}>
          {item.description}
        </Text>
      </View>
    );
  };

  render() {
    console.log('topping dataaaaaaaaaa', this.state.selected_topping_array);

    console.log(
      'selected array one iddddddddddd',
      this.state.selected_one_array_id,
    );
    console.log(
      'selected array two iddddddddddd',
      this.state.selected_two_array_id,
    );
    console.log(
      'selected array three iddddddddddd',
      this.state.selected_three_array_id,
    );
    console.log(
      'selected array three nameeeeee',
      this.state.selected_three_array_name,
    );
    console.log(
      'selected array three price',
      this.state.selected_three_array_price,
    );

    // const cat_name = this.props.route.params.cat_name;
    // console.log('topping id', this.state.Toping_data[0]);
    // console.log('first data', this.state.first_data);

    // console.log('selected id   ', this.state.selectedId);
    // console.log('selected price   ', this.state.selected_id_price);
    // console.log('selected name   ', this.state.selected_id_name);
    // console.log('selected item   ', this.state.selected_topping_item);
    // console.log('selected is option   ', jain_data[0].is_option_name);
    // console.log(
    //   'is_opstion_selected_name  ',
    //   this.state.is_option_selected_name,
    // );

    return (
      <SafeAreaView style={style.container}>
        <StatusBar barStyle="light-content" backgroundColor={'black'} />

        <View style={style.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={back_arrow} style={style.back_img} />
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: 'bold',
                marginLeft: 12,
              }}>
              {this.props.cat_name}
            </Text>
          </TouchableOpacity>
          {/* <View style={{flex: 1}}></View> */}
          {/* <Text style={style.txt_heading}>OPEN 24 HOURS</Text> */}
        </View>
        <View style={style.sub_container}>
          <ScrollView>
            <Text
              style={{
                color: 'black',
                fontSize: 22,
                fontWeight: 'bold',
                marginLeft: 25,
                marginTop: 8,
              }}>
              {this.props.cat_name}
            </Text>

            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginTop: 15,
                opacity: 0.1,
              }}
            />
            <View style={{marginBottom: 110, flex: 1, width: '100%'}}>
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
              <FlatList
                // nestedScrollEnabled={true}
                // keyboardShouldPersistTaps="always"
                scrollEnabled={false}
                style={{marginBottom: 20, marginTop: 10}}
                data={this.state.listItems}
                //data defined in constructor
                // ItemSeparatorComponent={this.renderSeparator}
                // ItemSeparatorComponent={ItemSeparatorView}
                //Item Separator View
                renderItem={this.ItemView}
                keyExtractor={(item, index) => index.toString()}></FlatList>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 20,
                  marginBottom: 100,
                }}>
                <Image
                  source={require('../assets/image/logo_main.png')}
                  style={{
                    height: 100,
                    width: 100,
                    resizeMode: 'contain',
                  }}></Image>
                <View style={{alignItems: 'flex-end'}}>
                  <Image
                    source={require('../assets/image/fssai.png')}
                    style={{
                      height: 60,
                      width: 60,
                      resizeMode: 'contain',
                      tintColor: 'gray',
                    }}></Image>
                  <Text style={{fontSize: 12, color: 'gray'}}>
                    Lic No. 1071919000188
                  </Text>
                  <Text style={{fontSize: 12, color: 'gray'}}>
                    Code Version : 2
                  </Text>
                  <Text style={{fontSize: 12, color: 'gray'}}>
                    App Version : 1
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <BottomSheet
            visible={this.state.c_visible}
            //setting the visibility state of the bottom shee
            // onBackButtonPress={this.toggle_c_Bottomsheet}
            //Toggling the visibility state on the click of the back botton
            // onBackdropPress={this.toggleBottomNavigationView}
            //Toggling the visibility state on the clicking out side of the sheet
          >
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.toggle_c_Bottomsheet(),
                    this.setState({
                      // Toping_data: [],
                      // selectedId: [],
                      selected_topping_array: [],
                      selected_one_array_id: [],
                      selected_two_array_id: [],
                      selected_three_array_id: [],
                      selected_topping_item: {
                        topping_id: [],
                        // topping_name: '',
                        price: '',
                        id: '',
                        name: '',
                        qty: 1,
                        is_option: '',
                        selected_one_array_id: [],
                        selected_two_array_id: [],
                        selected_three_array_id: [],
                      },
                    });
                }}
                style={{
                  alignSelf: 'center',
                  // paddingLeft: 35,
                  // paddingVertical: 15,
                  // marginRight: 15,
                  height: 50,
                  width: 50,
                  borderRadius: 50 / 2,
                  marginBottom: 20,
                  backgroundColor: 'black',
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
              <SafeAreaView
                style={{
                  height:
                    this.state.Toping_data.length !== 0 &&
                    this.state.option_jain == '1' &&
                    (this.state.Toping_one_data !== 0 ||
                      this.state.Toping_two_data !== 0 ||
                      this.state.Toping_three_data !== 0)
                      ? 650
                      : 550,
                  backgroundColor: '#FFFFFF',
                  // borderRadius: 12,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: 9,
                  borderTopRightRadius: 9,
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    width: '100%',
                    borderTopLeftRadius: 9,
                    borderTopRightRadius: 9,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderTopLeftRadius: 9,
                      borderTopRightRadius: 9,

                      justifyContent: 'center',
                      height: 80,

                      width: '100%',
                      backgroundColor: '#F2F5FC',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 20,
                      }}>
                      <Image
                        source={require('../assets/image/vag.png')}
                        style={{
                          height: 14,
                          width: 14,
                          alignSelf: 'center',
                          marginLeft: 12,
                        }}
                      />
                      <Text
                        style={{
                          color: '#77787C',
                          fontSize: 17,
                          marginLeft: 8,
                          fontWeight: 'bold',
                          alignSelf: 'center',
                        }}>
                        {this.state.item_name}
                      </Text>
                    </View>

                    {/* <TouchableOpacity
                      onPress={() => {
                        this.toggle_c_Bottomsheet(),
                          this.setState({
                            // Toping_data: [],
                            // selectedId: [],
                            selected_topping_array: [],
                            selected_one_array_id: [],
                            selected_two_array_id: [],
                            selected_three_array_id: [],
                            selected_topping_item: {
                              topping_id: [],
                              // topping_name: '',
                              price: '',
                              id: '',
                              name: '',
                              qty: 1,
                              is_option: '',
                              selected_one_array_id: [],
                              selected_two_array_id: [],
                              selected_three_array_id: [],
                            },
                          });
                      }}
                      style={{
                        alignSelf: 'center',
                        paddingLeft: 35,
                        paddingVertical: 15,
                        marginRight: 15,
                        paddingHorizontal: 10,
                      }}>
                      <Image
                        source={require('../assets/image/close_icon.png')}
                        style={{
                          height: 13,
                          width: 13,
                          alignSelf: 'center',
                          marginRight: 20,
                        }}
                      />
                    </TouchableOpacity>
                */}
                  </View>

                  <ScrollView>
                    {this.state.option_jain == '1' ? (
                      <View>
                        <Text
                          style={{
                            margin: 10,
                            marginBottom: 10,
                            fontWeight: 'bold',
                            alignSelf: 'baseline',
                            marginLeft: 32,
                            marginTop: 15,
                            fontSize: 17,
                          }}>
                          Regular/Jain
                        </Text>

                        <FlatList
                          style={{alignContent: 'center', marginLeft: 20}}
                          data={jain_data}
                          renderItem={this.render_jain}
                          // horizontal
                          keyExtractor={item => item.is_option_id.toString()}
                          extraData={this.state.is_option_selected_id}
                        />
                      </View>
                    ) : null}

                    {this.state.Toping_data == 0 ? null : (
                      <View>
                        <Text
                          style={{
                            margin: 10,
                            marginBottom: 10,
                            fontWeight: 'bold',
                            alignSelf: 'baseline',
                            marginLeft: 32,
                            fontSize: 17,
                            marginTop: 15,
                          }}>
                          {this.state.topping_text == ''
                            ? 'Select'
                            : this.state.topping_text}
                        </Text>
                        <FlatList
                          style={{alignContent: 'center', marginLeft: 20}}
                          data={this.state.Toping_data}
                          renderItem={this.renderItemm}
                          // horizontal
                          keyExtractor={item => item.topping_id.toString()}
                          // extraData={this.state.selectedId}
                        />
                      </View>
                    )}

                    {this.state.Toping_one_data == 0 ? null : (
                      <View>
                        <Text
                          style={{
                            margin: 10,
                            marginBottom: 10,
                            fontWeight: 'bold',
                            alignSelf: 'baseline',
                            marginLeft: 32,
                            fontSize: 17,
                            marginTop: 15,
                          }}>
                          {this.state.topping_one_text}
                        </Text>
                        <FlatList
                          style={{alignContent: 'center', marginLeft: 20}}
                          data={this.state.Toping_one_data}
                          renderItem={this.renderItem_one_array}
                          // horizontal
                          keyExtractor={item => item.id.toString()}
                          extraData={this.state.selected_one_array_id}
                        />
                      </View>
                    )}

                    {this.state.Toping_two_data == 0 ? null : (
                      <View>
                        <Text
                          style={{
                            margin: 10,
                            marginBottom: 10,
                            fontWeight: 'bold',
                            alignSelf: 'baseline',
                            marginLeft: 32,
                            fontSize: 17,
                            marginTop: 15,
                          }}>
                          {this.state.topping_two_text}
                        </Text>
                        <FlatList
                          style={{alignContent: 'center', marginLeft: 20}}
                          data={this.state.Toping_two_data}
                          renderItem={this.renderItem_two_array}
                          // horizontal
                          keyExtractor={item => item.id.toString()}
                          extraData={this.state.selected_two_array_id}
                        />
                      </View>
                    )}

                    {this.state.Toping_three_data == 0 ? null : (
                      <View>
                        <Text
                          style={{
                            margin: 10,
                            marginBottom: 10,
                            fontWeight: 'bold',
                            alignSelf: 'baseline',
                            marginLeft: 32,
                            fontSize: 17,
                            marginTop: 15,
                          }}>
                          {this.state.topping_three_text}
                        </Text>
                        <FlatList
                          style={{
                            alignContent: 'center',
                            marginLeft: 20,
                            marginBottom: 25,
                          }}
                          data={this.state.Toping_three_data}
                          renderItem={this.renderItem_three_array}
                          // horizontal
                          keyExtractor={item => item.id.toString()}
                          extraData={this.state.selected_three_array_id}
                        />
                      </View>
                    )}
                  </ScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.addToCart({
                        ...this.state.selected_topping_item,
                        price: this.get_final_price(this.state.item_price),
                        topping_text: this.state.topping_text,
                        topping_one_text: this.state.topping_one_text,
                        topping_two_text: this.state.topping_two_text,
                        topping_three_text: this.state.topping_three_text,
                      });
                      this.setState({
                        // selectedId: [],
                        selected_topping_array: [],
                        selected_one_array_id: [],
                        selected_two_array_id: [],
                        selected_three_array_id: [],
                        selected_topping_item: {
                          topping_id: [],
                          // topping_name: '',
                          price: 0,
                          id: '',
                          name: '',
                          qty: 1,
                          is_option: '',
                          selected_one_array_id: [],
                          selected_two_array_id: [],
                          selected_three_array_id: [],
                        },
                      });
                      this.toggle_c_Bottomsheet();
                    }}
                    style={{
                      height: 43,
                      marginTop: 10,
                      borderRadius: 3,
                      backgroundColor: '#ED505C',
                      // marginLeft: -5,
                      margin: 15,
                      marginHorizontal: 65,
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          alignSelf: 'center',
                          fontSize: 15,
                        }}>
                        Add{'  '}
                      </Text>

                      <Text
                        style={{
                          color: 'white',
                          alignSelf: 'center',
                          fontSize: 15,
                        }}>
                        ₹{this.get_all_price()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </View>
          </BottomSheet>
        </View>

        <BottomSheet
          // animationType="slide"
          // transparent={true}
          // closeOnClick={false}
          visible={this.state.modalVisible}
          onBackButtonPress={() => {
            this.setState({
              modalVisible: !this.state.modalVisible,
            });
          }}
          onBackdropPress={() => {
            this.setState({
              modalVisible: !this.state.modalVisible,
            });
          }}>
          {/* <TouchableWithoutFeedback //this touchable closes modal
            onPress={() => {
              this.setState({modalVisible: false});
            }}> */}
          <View style={{flex: 1}}>
            {/* {this.renderOptionList()} */}
            <SafeAreaView style={styles.modalView}>
              {/* <TouchableOpacity
                  onPress={() => this.setState({modalVisible: false})}
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
                </TouchableOpacity> */}
              <FlatList
                style={{flex: 1, alignContent: 'center'}}
                showsVerticalScrollIndicator={false}
                data={this.state.MainCat}
                renderItem={this.renderItem_menu}
                keyExtractor={item => item.id.toString()}
                // extraData={this.state.selectedId}
              />
            </SafeAreaView>
          </View>
          {/* </TouchableWithoutFeedback> */}

          {/* <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Hello World!</Text>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={style.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View> */}
          {/* <MenuFunction modalVisible={this.state.modalVisible} /> */}
        </BottomSheet>

        <View
          style={{
            flexDirection: 'column',
            position: 'absolute',
            bottom: 0,
            width: Dimensions.get('screen').width,
          }}>
          <TouchableOpacity
            onPress={() => this.setState({modalVisible: true})}
            style={{
              height: 35,
              width: 108,
              backgroundColor: 'black',
              // position: 'absolute',
              borderRadius: 20,
              justifyContent: 'center',
              alignContent: 'center',
              // left: 0,
              // right: 0,
              bottom: 5,
              elevation: 5,

              alignSelf: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',

                flexDirection: 'row',
              }}>
              <Image
                source={spoon_icon}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: 'white',
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  color: 'white',
                  alignSelf: 'center',
                  marginLeft: 3,
                }}>
                MENU
              </Text>
            </View>
          </TouchableOpacity>
          {this.props.myItems.length == 0 ? null : (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Cart')}
              // onPress={() =>
              //   this.setState({cart_bottomsheet: !this.state.cart_bottomsheet})
              // }
              style={{
                width: '95%',
                height: 60,
                backgroundColor: '#ED505C',
                margin: 6,

                // position: 'absolute',
                justifyContent: 'center',
                alignContent: 'center',
                // left: 0,
                // right: 0,

                borderRadius: 3,

                alignSelf: 'center',
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{margin: 3}}>
                  <View style={{flexDirection: 'row', marginLeft: 8}}>
                    <Text
                      style={{fontSize: 12, color: 'white', marginRight: 3}}>
                      {this.props.myItems.length}
                    </Text>
                    <Text style={{fontSize: 12, color: 'white'}}>Items</Text>
                  </View>
                  <View style={{flexDirection: 'row', marginLeft: 8}}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'white',
                        marginRight: 7,
                        fontWeight: 'bold',
                      }}>
                      ₹{this.TotalItemPrice()}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'white',
                        alignSelf: 'flex-end',
                        marginBottom: 2,
                      }}>
                      Plus taxes
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'white',
                        marginRight: 7,

                        fontWeight: 'bold',
                      }}>
                      View Cart
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
                </View>
              </View>
            </TouchableOpacity>
          )}
          {/* <BottomSheet
            visible={this.state.cart_bottomsheet}
            //setting the visibility state of the bottom shee
            // onBackButtonPress={this.toggle_c_Bottomsheet}
            //Toggling the visibility state on the click of the back botton
            // onBackdropPress={this.toggleBottomNavigationView}
            //Toggling the visibility state on the clicking out side of the sheet
          >
            <View style={{width: 250, height: 400}}>
              <Cart />
            </View>
          </BottomSheet> */}
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  myItems: state.cartItems.items,
  cat_id: state.cartItems.main_cat_id,
  cat_name: state.cartItems.main_cat_name,
  token: state.userDetails.login_token,
});

const mapDispatchToProps = {
  addToCart,
  increaseQty,
  manage_qty,
  removeToCart,
  addToCart,
  increaseQty,
  add_main_cat_id,
  addLoginToken,
  main_cat_name,
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    height: 66,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
    marginBottom: 15,
  },
  back_img: {
    height: 17,
    width: 21,
    tintColor: 'black',
    marginLeft: 14,
    alignSelf: 'center',
  },
  txt_heading: {
    fontSize: 14,
    color: 'white',
    textAlign: 'right',
    alignItems: 'center',
    marginRight: 10,
  },
  sub_container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    marginTop: 10,
  },

  modalView: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 350,
    height: 450,

    shadowColor: '#000',
    marginHorizontal: 45,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

// const Item = ({
//   item,
//   onPress,
//   backgroundColor,
//   textColor,
//   borderColor,
//   borderWidth,
// }) => (
//   <TouchableOpacity
//     onPress={onPress}
//     style={[styles.item, backgroundColor, borderColor, borderWidth]}>
//     <Text style={[styles.title, textColor]}>{item.cat_name}</Text>
//     <Text style={[styles.subtitle, textColor]}>{item.sub_title}</Text>
//   </TouchableOpacity>
// );

// class MenuFunction extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedId: '',
//       MainCat: [],
//     };
//   }

//   componentDidMount() {
//     this.FetchMainCat();
//   }

//   FetchMainCat = () => {
//     axios
//       .post('https://www.binarygeckos.com/imphotel/Api/Product/main_cat')
//       .then(Response => {
//         if (Response.data.status == 1) {
//           console.log(Response.data.status);
//           this.setState({
//             MainCat: Response.data.result,
//             selectedId: this.props.cat_id,
//             isLoading: false,
//           });
//         } else {
//           console.log(Response.data.status);
//           this.setState({
//             isLoading: false,
//           });
//         }
//       });
//   };

//   // const [selectedId, setSelectedId] = useState(null);

//   renderItem = ({item}) => {
//     const backgroundColor =
//       item.id === this.state.selectedId ? '#F6F9F6' : '#F6F9F6';
//     const color = item.id === this.state.selectedId ? 'black' : 'black';
//     const borderWidth = item.id === this.state.selectedId ? 2 : 0;
//     const borderColor = item.id === this.state.selectedId ? '#51190D' : 'white';

//     return (
//       <Item
//         item={item}
//         onPress={() => this.setState({selectedId: item.id})}
//         backgroundColor={{backgroundColor}}
//         textColor={{color}}
//         borderWidth={{borderWidth}}
//         borderColor={{borderColor}}
//       />
//     );
//   };

//   render() {
//     // const idd = this.props.route.params.id;

//     return (
//       <SafeAreaView style={style.modalView}>
//         <FlatList
//           style={{flex: 1, alignContent: 'center'}}
//           showsVerticalScrollIndicator={false}
//           data={this.state.MainCat}
//           renderItem={this.renderItem}
//           keyExtractor={item => item.id.toString()}
//           extraData={this.state.selectedId}
//         />
//       </SafeAreaView>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    height: 120,
    width: 130,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 8,
  },
  item_menu: {
    flex: 1,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
    marginLeft: 8,
  },
  title_menu: {
    fontSize: 17,
    fontWeight:'bold'
  },
  subtitle: {
    fontSize: 14,
    // marginTop: 4,
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
  modalView: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 350,
    height: 450,

    shadowColor: '#000',
    marginHorizontal: 45,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
