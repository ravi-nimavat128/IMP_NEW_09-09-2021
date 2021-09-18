import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {TouchableOpacity} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
var banner_img = require('../assets/image/banner1.png');
import {AppDimensions} from '../constants/AppDimensions';

import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from '../Components/CarouselCardItem';
import {is_order_type} from '../reducers/cartItems/actions';
import CarouselCardItem3, {
  SLIDER_WIDTH3,
  ITEM_WIDTH3,
} from '../Components/CarouselCardItem3';
const slider_data = [
  {
    cat_name: 'MOCKTAILS',
    option: '11 options available',
    imgUrl: banner_img,
  },
  {
    cat_name: 'SHAKE',
    option: '13 options available',
    imgUrl: banner_img,
  },
  {
    cat_name: 'COFFEE',
    option: '11 options available',
    imgUrl: banner_img,
  },
  {
    cat_name: 'DESSERTS',
    option: '12 options available',
    imgUrl: banner_img,
  },
];
export class Add_rest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: false,
      refreshing: false,
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginTop: 50,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                // this.props.is_order_type('1');
                // this.props.navigation.replace('MainNavigator');

                this.props.navigation.navigate('Dinein');
              }}
              style={{
                marginTop: 50,
                width: '80%',
                height: 65,
                borderRadius: 8,
                backgroundColor: '#CA0227',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 26, color: 'white', fontWeight: 'bold'}}>
                NEW RESERVATION
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('MyReservation');
              }}
              style={{
                marginTop: 20,
                width: '80%',
                height: 65,
                borderRadius: 8,
                backgroundColor: '#CA0227',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 26, color: 'white', fontWeight: 'bold'}}>
                MY RESERVATIONS
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 6, marginTop: 100}}>
            <Carousel
              layout="default"
              layoutCardOffset={9}
              // ref={isCarousel}
              data={slider_data}
              renderItem={CarouselCardItem3}
              sliderWidth={AppDimensions.width}
              // infinite={true}
              loop={true}
              autoplay={true}
              autoplayInterval={3000}
              itemWidth={AppDimensions.width}
              inactiveSlideShift={0}
              onSnapToItem={index => this.setState({slider_dot: index})}
              useScrollView={true}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  is_order_type,
};

export default connect(mapStateToProps, mapDispatchToProps)(Add_rest);
