import React, {Component} from 'react';
var back_arrow = require('../assets/image/back_arrow.png');

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Touchable,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

// var img1 = require('../assets/image/AMBIENCE.png');
var img2 = require('../assets/image/COURTYARD.png');

var img17 = require('../assets/image/SENSO.png');
var img18 = require('../assets/image/STATTUS.png');

const Data = [
  {id: 1, img: img2, name: 'Courtyard'},
  {id: 2, img: img17, name: 'Senso'},
  {id: 3, img: img18, name: 'Stattus'},
  // {id: 4, img: img4},
  // {id: 5, img: img5},
  // {id: 6, img: img6},
  // {id: 7, img: img7},
  // {id: 8, img: img8},
  // {id: 9, img: img9},
  // {id: 10, img: img10},
  // {id: 11, img: img11},
  // {id: 12, img: img12},
  // {id: 13, img: img13},
  // {id: 14, img: img14},
  // {id: 15, img: img15},
  // {id: 16, img: img16},
  // {id: 17, img: img17},
  // {id: 18, img: img18},
  // {id: 19, img: img19},
];

export class DineIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      r_data: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    // try {
    //   const products = await RNIap.getProducts(itemSkus);
    //   this.setState({ products });
    // } catch(err) {
    //   console.warn(err); // standardized err.code and err.message available
    // }

    this.get_r_data();
    this.onFocusSubscribe = this.props.navigation.addListener('focus', () => {
      // Your code
      this.get_r_data();
    });
  }

  get_r_data = () => {
    this.setState({isLoading: true, r_data: []});

    var formData = new FormData();
    formData.append('user_id', this.props.user_id);
    axios
      .post(
        'http://binarygeckos.com/imp/apis/restaurant/generals/get_restaurants',
        formData,
      )
      .then(Response => {
        if (Response.data.status == 1) {
          console.log(Response.data.status);
          this.setState({
            r_data: Response.data.result.map(i => {
              return {
                ...i,
                time: '09:00 AM TO 10:00 PM',
              };
            }),

            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
      });
  };

  renderItem = ({item, index}) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {index == 0 ? null : (
          <View
            style={{
              flex: 1,
              width: Dimensions.get('screen').width / 1.1,
              backgroundColor: 'gray',
              height: 1,
            }}
          />
        )}

        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('ReserveTable', {
              name: item.name,
              id: item.id,
              img: item.restaurant_icon,
            })
          }>
          <Image
            source={{uri: item.restaurant_icon}}
            style={{
              marginVertical: 10,
              height: 150,
              width: 250,
              resizeMode: 'contain',
            }}></Image>

          {index == 0 ? (
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'center',
                marginBottom: 25,
              }}>
              11:30AM TO 03:30PM 7:00PM TO 11:30PM
            </Text>
          ) : index == 1 ? (
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'center',
                marginBottom: 25,
              }}>
              24 HOURS
            </Text>
          ) : (
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'center',
                marginBottom: 25,
              }}>
              11:30AM TO 03:30PM{'\n'}7:00PM TO 11:30PM
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    console.log(JSON.stringify(this.state.r_data, null, 2));

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
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

        <View style={style.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{flexDirection: 'row'}}>
            <Image source={back_arrow} style={style.back_img} />
          </TouchableOpacity>
          <Text style={style.txt_heading}>Reservation</Text>
        </View>

        <FlatList
          data={this.state.r_data}
          style={{marginBottom: 70}}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          keyExtractor={id => id.toString()}></FlatList>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.userDetails.user_id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DineIn);
const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 66,
    alignItems: 'center',
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
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    marginLeft: 20,
  },
});
