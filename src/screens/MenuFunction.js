import {template} from '@babel/core';
import axios from 'axios';
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
import {connect} from 'react-redux';

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

var back_arrow = require('../assets/image/back_arrow.png');
var vag_icon = require('../assets/image/vag.png');
var spoon_icon = require('../assets/image/spoon.png');

const Item = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  borderColor,
  borderWidth,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, backgroundColor, borderColor, borderWidth]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
    <Text style={[styles.subtitle, textColor]}>
      {item.total_products} OPTIONS AVAILABLE
    </Text>
  </TouchableOpacity>
);
class MenuFunction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_menu_Id: '',
      selected_menu_Name: '',
      MainCat: [],
      modalVisible: true,
    };
  }

  componentDidMount() {
    this.FetchMainCat();
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
            selectedId: this.props.cat_id,
            selectedName: this.props.cat_name,
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

  // const [selectedId, setSelectedId] = useState(null);

  renderItem = ({item}) => {
    const backgroundColor =
      item.id === this.props.cat_id ? '#F6F9F6' : '#F6F9F6';
    const color = item.id === this.props.cat_id ? 'black' : 'black';
    const borderWidth = item.id === this.props.cat_id ? 2 : 0;
    const borderColor = item.id === this.props.cat_id ? '#51190D' : 'white';

    return (
      <Item
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

  render() {
    // const idd = this.props.route.params.id;
    console.log('catttttttttttttt name', this.props.modalVisible);

    return (
      <SafeAreaView style={styles.modalView}>
        <FlatList
          style={{flex: 1, alignContent: 'center'}}
          showsVerticalScrollIndicator={false}
          data={this.state.MainCat}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
          extraData={this.state.selectedId}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  myItems: state.cartItems.items,
  cat_id: state.cartItems.main_cat_id,
  cat_name: state.cartItems.main_cat_name,
});

const mapDispatchToProps = {
  addToCart,
  increaseQty,
  manage_qty,
  removeToCart,
  addToCart,
  increaseQty,
  add_main_cat_id,
  main_cat_name,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuFunction);

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flex: 1,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 11,
    marginTop: 4,
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
