import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Touchable,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

// var img1 = require('../assets/image/AMBIENCE.png');
var img2 = require('../assets/image/COURTYARD.png');
// var img3 = require('../assets/image/DELICACY.png');
// var img4 = require('../assets/image/ELEGANCE.png');
// var img5 = require('../assets/image/EXPRESSION.png');
// var img6 = require('../assets/image/FITNEZZ.png');
// var img7 = require('../assets/image/IMPRESSION.png');
// var img8 = require('../assets/image/LEGEND.png');
// var img9 = require('../assets/image/MAYFAIR.png');
// var img10 = require('../assets/image/MEZZO_MEZZO.png');
// var img11 = require('../assets/image/OASIS.png');
// var img12 = require('../assets/image/OPULENCE.png');
// var img13 = require('../assets/image/OUTLOOK.png');
// var img14 = require('../assets/image/REFLECTION.png');
// var img15 = require('../assets/image/REGAL_ROOM.png');
// var img16 = require('../assets/image/REGENT ROOM.png');
var img17 = require('../assets/image/SENSO.png');
var img18 = require('../assets/image/STATTUS.png');
// var img19 = require('../assets/image/VOGUE.png');

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
            r_data: Response.data.result,
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
        {index == 0 ? (
          <View
            style={{
              marginVertical: 10,
              height: 150,
              width: 250,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#421615', fontWeight: 'bold', fontSize: 30}}>
              {' '}
              Select Restaurant
            </Text>
          </View>
        ) : null}
        <View
          style={{
            flex: 1,
            width: Dimensions.get('screen').width / 1.1,
            backgroundColor: 'gray',
            height: 1,
          }}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('ReserveTable', {
              name: item.name,
              id: item.id,
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
