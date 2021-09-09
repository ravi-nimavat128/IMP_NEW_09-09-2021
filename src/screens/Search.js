import React, {Component, useState} from 'react';
import axios from 'axios';
import NumericInput from 'react-native-numeric-input';

import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Touchable,
  ScrollView,
  FlatList,
  Keyboard,
} from 'react-native';
import {
  addToCart,
  increaseQty,
  getMainCat,
  manage_qty,
  removeToCart,
  main_cat_id,
} from '../reducers/cartItems/actions';
import {BottomSheet} from 'react-native-btr';

import {connect} from 'react-redux';

var circle_close = require('../assets/image/circle_crosss.png');
var search_icon = require('../assets/image/search_iconn.png');
var vag_icon = require('../assets/image/vag.png');
const Item = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  borderColor,
  borderWidth,
  img_src,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, backgroundColor, borderColor, borderWidth]}>
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Image source={img_src} style={{height: 15, width: 15}} />
        <Text style={[styles.title, textColor, {alignSelf: 'center'}]}>
          {item.topping_price == '0' ? null : item.topping_price}
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={[styles.title, textColor, {alignSelf: 'center'}]}>
          {item.topping_name}
          <View style={{flex: 0.1}}></View>
        </Text>
        <Image
          source={require('../assets/image/vag.png')}
          style={{height: 12, width: 12, alignSelf: 'center'}}
        />
      </View>
    </View>
  </TouchableOpacity>
);

const Item_one_array = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  borderColor,
  borderWidth,
  img_src,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, backgroundColor, borderColor, borderWidth]}>
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Image source={img_src} style={{height: 15, width: 15}} />
        <Text style={[styles.title, textColor, {alignSelf: 'center'}]}>
          {item.price == '0' ? null : item.price}
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={[styles.title, textColor, {alignSelf: 'center'}]}>
          {item.name}
        </Text>
        <View style={{flex: 0.1}}></View>
        <Image
          source={require('../assets/image/vag.png')}
          style={{height: 12, width: 12, alignSelf: 'center'}}
        />
      </View>
    </View>
  </TouchableOpacity>
);

const Item_jain = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  borderColor,
  borderWidth,
  img_src,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, backgroundColor, borderColor, borderWidth]}>
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
      }}>
      <Image source={img_src} style={{height: 15, width: 15}} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={[styles.title, textColor, {alignSelf: 'center'}]}>
          {item.is_option_name}
        </Text>
        <View style={{flex: 0.1}}></View>
        <Image
          source={require('../assets/image/vag.png')}
          style={{height: 12, width: 12, alignSelf: 'center'}}
        />
      </View>
    </View>
  </TouchableOpacity>
);
const jain_data = [
  {is_option_id: 0, is_option_name: 'Regular'},
  {is_option_id: 1, is_option_name: 'Jain'},
];

var back_arrow = require('../assets/image/back_arrow.png');
var vag_icon = require('../assets/image/vag.png');
var spoon_icon = require('../assets/image/spoon.png');
var selected_circle = require('../assets/image/selected_circle.png');
var non_selected_circle = require('../assets/image/non_selected_circle.png');

class Search extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      isVisible: true,
      status: '',
      isLoading: true,
      popularVisible: true,
      StatusVisible: false,
      search_data: [],
      isLoading: true,
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

  renderItemm = ({item}) => {
    const backgroundColor = this.state.selected_topping_array.find(
      idd => idd.t_id == item.topping_id,
    )
      ? '#DDDDDD'
      : 'white';
    const color = this.state.selected_topping_array.find(
      idd => idd.t_id == item.topping_id,
    )
      ? 'black'
      : 'black';
    const borderWidth = this.state.selected_topping_array.find(
      idd => idd.t_id == item.topping_id,
    )
      ? 1
      : 1;
    const borderColor = this.state.selected_topping_array.find(
      idd => idd.t_id == item.topping_id,
    )
      ? 'black'
      : 'black';
    const img_src = this.state.selected_topping_array.find(
      idd => idd.t_id == item.topping_id,
    )
      ? selected_circle
      : non_selected_circle;
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
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        borderWidth={{borderWidth}}
        borderColor={{borderColor}}
        img_src={img_src}
      />
    );
  };

  renderItem_one_array = ({item}) => {
    const backgroundColor =
      // item.id === this.state.selected_three_array_id ? '#DDDDDD' : 'white';
      this.state.selected_one_array_id.find(idd => idd.id == item.id)
        ? '#DDDDDD'
        : 'white';
    const color = this.state.selected_one_array_id.find(
      idd => idd.id == item.id,
    )
      ? 'black'
      : 'black';
    const borderWidth = this.state.selected_one_array_id.find(
      idd => idd.id == item.id,
    )
      ? 1
      : 1;
    const borderColor = this.state.selected_one_array_id.find(
      idd => idd.id == item.id,
    )
      ? 'black'
      : 'black';
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
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        borderWidth={{borderWidth}}
        borderColor={{borderColor}}
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
                    search_data: this.state.search_data.map((item, sindex) => {
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
          borderRadius: 5,
          borderColor: 'black',
          alignSelf: 'center',
          borderWidth: 1,
          marginRight: 25,
          height: 28,
          width: 85,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          ADD
        </Text>
        <Text
          style={{
            color: '#BE984A',
            fontSize: 18,
            alignSelf: 'center',
          }}>
          {'   '}+
        </Text>
      </TouchableOpacity>
    );
  };
  // NumberValue = (value, index) => {
  //   // const [value, setValue] = useState(0);

  //   return (
  //     <NumericInput
  //       containerStyle={styles.number_inputt}
  //       value={value}
  //       onChange={value => {
  //         this.setState({
  //           search_data: this.state.search_data.map((item, sindex) => {
  //             return {...item, qty: index == sindex ? value : item.qty};
  //           }),
  //         });
  //       }}
  //       onLimitReached={(isMax, msg) => console.log(isMax, msg)}
  //       totalWidth={82}
  //       totalHeight={28}
  //       iconSize={10}
  //       minValue={0}
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

  // ItemView = ({item, index}) => {
  //   return (
  //     // Single Comes here which will be repeatative for the FlatListItems
  //     <View style={{flexDirection: 'column', marginTop: 8}}>
  //       <View style={{flexDirection: 'row'}}>
  //         <View style={{flex: 1}}>
  //           <View style={{flexDirection: 'row'}}>
  //             <Image
  //               source={vag_icon}
  //               style={{
  //                 height: 12,
  //                 width: 12,
  //                 alignSelf: 'center',
  //                 marginLeft: 10,
  //                 marginRight: 4,
  //               }}
  //             />
  //             <Text style={{color: 'black', fontSize: 15}}>{item.name}</Text>
  //           </View>
  //           <Text
  //             style={{
  //               color: '#000000',
  //               fontSize: 15,
  //               marginLeft: 27,
  //               marginTop: 5,
  //             }}>
  //             ₹{item.price}
  //           </Text>
  //         </View>
  //         <View style={{flex: 0.1}}></View>

  //         {/* {this.AddBtn(item, index)} */}

  //         {this.props.myItems.length == 0 ? (
  //           this.AddBtn(item, index)
  //         ) : this.props.myItems.filter(newitem => item.id == newitem.id)[0] ? (
  //           <NumericInput
  //             containerStyle={styles.number_input}
  //             value={
  //               this.props.myItems.filter(newitem => item.id == newitem.id)[0]
  //                 .qty
  //             }
  //             initValue={
  //               this.props.myItems.filter(newitem => item.id == newitem.id)[0]
  //                 .qty
  //             }
  //             onChange={e =>
  //               this.props.manage_qty(
  //                 e,
  //                 this.props.myItems.filter(newitem => item.id == newitem.id)[0]
  //                   .id,
  //               )
  //             }
  //             onLimitReached={e =>
  //               this.props.removeToCart(
  //                 this.props.myItems.filter(newitem => item.id == newitem.id)[0]
  //                   .id,
  //               )
  //             }
  //             totalWidth={82}
  //             totalHeight={28}
  //             iconSize={10}
  //             minValue={1}
  //             borderColor={'#00000000'}
  //             inputStyle={{
  //               backgroundColor: '#C8B9B2',
  //               color: 'black',
  //               alignSelf: 'center',
  //               height: 26,
  //               justifyContent: 'center',
  //             }}
  //             rounded
  //             type={'plus-minus'}
  //             step={1}
  //             valueType="real"
  //             textColor="#B0228C"
  //             iconStyle={{color: 'black'}}
  //           />
  //         ) : (
  //           this.AddBtn(item, index)
  //         )}
  //       </View>
  //       <Text
  //         style={{
  //           color: 'black',
  //           fontSize: 10,
  //           marginLeft: 25,
  //           marginRight: 25,
  //           marginTop: 10,
  //           opacity: 0.4,
  //         }}>
  //         {item.description}
  //       </Text>
  //     </View>
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
              <Text style={{color: 'black', fontSize: 15}}>{item.name}</Text>
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
              <Text style={{color: '#BE984A', fontSize: 12}}>customisable</Text>
            )}
            {/* {item.is_options == 0 && item.topping_data == 0 ? null : (
              <Text style={{color: '#BE984A', fontSize: 12}}>customisable</Text>
            )} */}
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

  FetchSearchData = () => {
    let formData = new FormData();
    formData.append('product_name', this.state.value);
    axios
      .post(
        'https://www.binarygeckos.com/imp/apis/product/search_product',
        formData,
      )
      .then(response => {
        if (response.data.status == 1) {
          Keyboard.dismiss();
          console.log(response.data.status);
          console.log(response.data.results);

          this.setState({
            isLoading: false,
            status: 1,

            search_data: response.data.results.map(item => {
              return {
                ...item,
                qty: 1,
              };
            }),
          });
        } else {
          console.log(response.data.status);

          this.setState({
            isLoading: false,
            status: 0,
          });
        }
      });
  };

  handleSearch = text => {
    this.setState({value: text});
  };
  toggleFunction = () => {
    this.setState(state => ({
      isVisible: !state.isVisible,
    }));
  };
  popular_toggle = () => {
    this.setState(state => ({
      popularVisible: !state.popularVisible,
    }));
  };
  status_toggle = () => {
    this.setState(state => ({
      StatusVisible: !state.StatusVisible,
    }));
  };

  ClearText = () => {
    //runs on submit and sets the state to nothing.
    this.setState({value: ''});
    this.setState({status: ''});

    // this.setState({status: 0});
  };

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <View style={styles.main_coupon}>
          <View style={styles.sub_coupon}>
            <TextInput
              placeholder="Search"
              style={styles.txt_input}
              onChangeText={this.handleSearch}
              value={this.state.value}></TextInput>

            {this.state.isVisible ? (
              <TouchableOpacity
                onPress={() => {
                  this.toggleFunction();
                  this.FetchSearchData();
                  this.popular_toggle();
                  this.status_toggle();
                }}
                disabled={this.state.value.length > 0 ? false : true}
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: this.state.value.length > 0 ? '#BE984A' : '#E2D2B0',
                    fontSize: 14,
                    marginRight: 25,
                  }}>
                  search...
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.ClearText();
                  this.toggleFunction();
                  this.popular_toggle();
                  this.status_toggle();
                }}
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                {this.state.isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color="#BE984A"
                    animating={true}
                  />
                ) : (
                  <ActivityIndicator
                    size="small"
                    color="#BE984A"
                    animating={false}
                  />
                )}
                <Image
                  source={circle_close}
                  style={{
                    height: 22,
                    width: 22,
                    marginRight: 25,
                    marginLeft: 10,
                  }}></Image>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#F6F9F6',
            borderBottomWidth: 8,
          }}
        />
        <View style={{flex: 1}}>
          {this.state.popularVisible ? (
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                marginTop: 15,
                marginLeft: 15,
              }}>
              {/* popular searchess */}
            </Text>
          ) : null}

          {this.state.StatusVisible ? (
            <View style={{flex: 1, marginBottom: 60}}>
              {this.state.status == 1 ? (
                <View>
                  <FlatList
                    data={this.state.search_data}
                    //data defined in constructor
                    // ItemSeparatorComponent={ItemSeparatorView}
                    //Item Separator View
                    renderItem={this.ItemView}
                    keyExtractor={(item, index) => index.toString()}></FlatList>
                  <BottomSheet
                    visible={this.state.c_visible}
                    //setting the visibility state of the bottom shee
                    // onBackButtonPress={this.toggle_c_Bottomsheet}
                    //Toggling the visibility state on the click of the back botton
                    // onBackdropPress={this.toggleBottomNavigationView}
                    //Toggling the visibility state on the clicking out side of the sheet
                  >
                    <SafeAreaView
                      style={{
                        height:
                          this.state.Toping_data.length !== 0 &&
                          this.state.option_jain == '1' &&
                          (this.state.Toping_one_data !== 0 ||
                            this.state.Toping_two_data !== 0 ||
                            this.state.Toping_three_data !== 0)
                            ? 650
                            : 450,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 12,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
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
                            backgroundColor: '#EBEEEA',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 16,
                              marginLeft: 20,
                              alignSelf: 'center',
                            }}>
                            {this.state.item_name}
                          </Text>
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
                              paddingLeft: 35,
                              paddingVertical: 15,

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
                        </View>

                        <ScrollView>
                          {this.state.option_jain == '1' ? (
                            <View>
                              <Text style={{margin: 10, marginBottom: 10}}>
                                Regular/Jain
                              </Text>

                              <FlatList
                                style={{alignContent: 'center'}}
                                data={jain_data}
                                renderItem={this.render_jain}
                                horizontal
                                keyExtractor={item =>
                                  item.is_option_id.toString()
                                }
                                extraData={this.state.is_option_selected_id}
                              />
                            </View>
                          ) : null}

                          {this.state.Toping_data == 0 ? null : (
                            <View>
                              <Text style={{margin: 10, marginBottom: 10}}>
                                {this.state.topping_text == ''
                                  ? 'Select'
                                  : this.state.topping_text}
                              </Text>
                              <FlatList
                                style={{alignContent: 'center'}}
                                data={this.state.Toping_data}
                                renderItem={this.renderItemm}
                                horizontal
                                keyExtractor={item =>
                                  item.topping_id.toString()
                                }
                                // extraData={this.state.selectedId}
                              />
                            </View>
                          )}

                          {this.state.Toping_one_data == 0 ? null : (
                            <View>
                              <Text style={{margin: 10, marginBottom: 10}}>
                                {this.state.topping_one_text}
                              </Text>
                              <FlatList
                                style={{alignContent: 'center'}}
                                data={this.state.Toping_one_data}
                                renderItem={this.renderItem_one_array}
                                horizontal
                                keyExtractor={item => item.id.toString()}
                                extraData={this.state.selected_one_array_id}
                              />
                            </View>
                          )}

                          {this.state.Toping_two_data == 0 ? null : (
                            <View>
                              <Text style={{margin: 10, marginBottom: 10}}>
                                {this.state.topping_two_text}
                              </Text>
                              <FlatList
                                style={{alignContent: 'center'}}
                                data={this.state.Toping_two_data}
                                renderItem={this.renderItem_two_array}
                                horizontal
                                keyExtractor={item => item.id.toString()}
                                extraData={this.state.selected_two_array_id}
                              />
                            </View>
                          )}

                          {this.state.Toping_three_data == 0 ? null : (
                            <View>
                              <Text style={{margin: 10, marginBottom: 10}}>
                                {this.state.topping_three_text}
                              </Text>
                              <FlatList
                                style={{alignContent: 'center'}}
                                data={this.state.Toping_three_data}
                                renderItem={this.renderItem_three_array}
                                horizontal
                                keyExtractor={item => item.id.toString()}
                                extraData={this.state.selected_three_array_id}
                              />
                            </View>
                          )}

                          <TouchableOpacity
                            onPress={() => {
                              this.props.addToCart({
                                ...this.state.selected_topping_item,
                                price: this.get_final_price(
                                  this.state.item_price,
                                ),
                                topping_text: this.state.topping_text,
                                topping_one_text: this.state.topping_one_text,
                                topping_two_text: this.state.topping_two_text,
                                topping_three_text: this.state
                                  .topping_three_text,
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
                              borderRadius: 4,
                              backgroundColor: '#BE984A',
                              margin: 15,
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
                                Add -{' '}
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
                        </ScrollView>
                      </View>
                    </SafeAreaView>
                  </BottomSheet>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={search_icon}
                    style={{
                      height: 80,
                      width: 80,
                      marginRight: 25,
                      marginLeft: 10,
                      opacity: 0.6,
                    }}
                  />
                  <Text style={{color: 'black', fontSize: 16, marginTop: 20}}>
                    OH SHOOT!
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      marginTop: 20,
                      textAlign: 'center',
                      marginHorizontal: 18,
                      opacity: 0.5,
                    }}>
                    No results found. Please check the spelling or try a
                    different search.
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View style={{flex: 1, marginBottom: 60}}></View>
          )}
        </View>
        {/* {this.status_fun()} */}
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
  main_cat_id,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: 66,

    alignContent: 'center',
    width: '100%',
  },
  back_img: {
    height: 17,
    width: 21,
    marginLeft: 14,
    alignSelf: 'center',
  },
  txt_heading: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    marginLeft: 20,
  },
  main_coupon: {
    height: 110,
  },
  sub_coupon: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    borderColor: '#BFC2BF',
    borderWidth: 1,
    borderRadius: 5,
  },
  txt_input: {
    marginLeft: 15,
    flex: 1,
    fontSize: 18,
  },
  number_inputt: {
    borderRadius: 5,
    borderColor: 'black',
    alignSelf: 'center',
    borderWidth: 1,
    marginRight: 24,
    width: 85,
    justifyContent: 'center',
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
  item: {
    height: 120,
    width: 130,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 8,
  },
  title: {
    fontSize: 12,
  },
});
