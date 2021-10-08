import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
var banner_img3 = require('../assets/image/rimg2.png');
var banner_img2 = require('../assets/image/rimg3.png');
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {AppDimensions} from '../constants/AppDimensions';
import {Rating, AirbnbRating} from 'react-native-ratings';

import CarouselCardItem2, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from '../Components/CarouselCardItem2';
import blur_img, {SLIDER_WIDTHH, ITEM_WIDTHH} from '../Components/blur_img';
import {black} from 'react-native-paper/lib/typescript/styles/colors';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';

export class ReserveTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider_data: [],
      res_id: 0,
      restaurant_location: '',
      isLoading: false,
      restaurant_mobile_no: '',
      restaurant_icon_blur: '',
      DATA: [],
    };
  }

  componentDidMount() {
    this.get_r_data();
    // this.state.slider_data.length < 1
    //   ? this.setState({
    //       DATA: [{slider_image: this.state.restaurant_icon_blur.toString()}],
    //     })
    //   : null;
  }

  // DATA = [
  //   {
  //     cat_name: 'MOCKTAILS',
  //     option: '11 options available',
  //     slider_image: this.state.restaurant_icon_blur,
  //   },
  //   {
  //     cat_name: 'SHAKE',
  //     option: '13 options available',
  //     slider_image: this.restaurant_icon_blur,
  //   },
  // ];

  dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + this.state.restaurant_mobile_no + '}';
    } else {
      phoneNumber = 'telprompt:${' + this.state.restaurant_mobile_no + '}';
    }

    Linking.openURL(phoneNumber);
  };

  openGps = () => {
    // var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    // const label = 'Custom Label';
    // var url = scheme + `${22.295},${70.7908},(${label})`;
    // Linking.openURL(url);

    // const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    // const latLng = `${21.54},${70.4679}`;
    // const label = 'Imperial Palace Hotal';
    // const url = Platform.select({
    //   ios: `${scheme}${label}@${latLng}`,
    //   android: `${scheme}${latLng}(${label})`,
    // });

    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${21.54},${70.4679}`;
    const label = 'lableeeeeeeeeeeeeeeeeeeeeeeeeeee';
    const url = Platform.select({
      ios: `${scheme}${label}&ll=${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  open_browser = () => {
    Linking.openURL(this.state.restaurant_location.toString()).catch(err =>
      console.error('Error', err),
    );
  };

  get_r_data = () => {
    this.setState({isLoading: true});

    var formData = new FormData();
    formData.append('restaurant_id', this.props.route.params.id);
    axios
      .post(
        'http://binarygeckos.com/imp/apis/restaurant/generals/get_restaurant_details',
        formData,
      )
      .then(Response => {
        if (Response.data.status == 1) {
          console.log(Response.data.status);
          this.setState({
            slider_data: Response.data.restaurant_slider_data,
            res_id: Response.data.id,
            restaurant_location: Response.data.restaurant_location,
            restaurant_mobile_no: Response.data.restaurant_mobile_no,
            DATA: Response.data.restaurant_icon_blur,

            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
      });
  };

  render() {
    console.log('img', this.props.route.params.img);
    console.log(JSON.stringify(this.state.slider_data, null, 2));
    console.log('res iddddddd', JSON.stringify(this.state.res_id, null, 2));
    console.log(
      'blur image',
      JSON.stringify(this.state.restaurant_icon_blur, null, 2),
    );
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
        <TouchableOpacity
          style={{marginTop: 15, alignSelf: 'baseline'}}
          onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../assets/image/back_arrow.png')}
            style={{
              height: 20,
              width: 30,
              marginLeft: 20,
              resizeMode: 'contain',
            }}></Image>
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={{marginTop: 6, marginTop: 30}}>
              {this.state.slider_data.length < 1 ? (
                <Carousel
                  layout="default"
                  layoutCardOffset={9}
                  // ref={isCarousel}
                  data={this.state.DATA}
                  renderItem={
                    // this.state.slider_data.length < 1
                    //   ? blur_img
                    blur_img
                  }
                  sliderWidth={SLIDER_WIDTH}
                  autoplay={true}
                  loop
                  autoplayInterval={3000}
                  itemWidth={ITEM_WIDTH}
                  inactiveSlideShift={0}
                  // onSnapToItem={index => this.setState({slider_dot: index})}
                  useScrollView={true}
                />
              ) : (
                <Carousel
                  layout="default"
                  layoutCardOffset={9}
                  // ref={isCarousel}
                  data={this.state.slider_data}
                  renderItem={
                    // this.state.slider_data.length < 1
                    //   ? blur_img
                    CarouselCardItem2
                  }
                  sliderWidth={SLIDER_WIDTHH}
                  autoplay={true}
                  loop
                  autoplayInterval={3000}
                  itemWidth={ITEM_WIDTHH}
                  inactiveSlideShift={0}
                  // onSnapToItem={index => this.setState({slider_dot: index})}
                  useScrollView={true}
                />
              )}
            </View>

            <Text
              style={{
                marginLeft: 25,
                marginTop: 15,
                color: 'black',
                fontWeight: 'bold',
                fontSize: 28,
              }}>
              {this.props.route.params.name}
            </Text>
            <Rating
              style={{width: 175, marginTop: 10}}
              type="star"
              ratingCount={5}
              imageSize={25}
              readonly
              showRating={false}
              startingValue={5}
              onFinishRating={rating => this.setState({rating: rating})}
            />

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 24,
                marginTop: 25,
              }}>
              <TouchableOpacity
                onPress={() => this.open_browser()}
                style={{
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: 'black',
                  flex: 1,
                  height: 55,
                  marginRight: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  shadowColor: '#000000',
                  shadowOffset: {width: 0, height: 10}, // change this for more shadow
                  shadowOpacity: 1,
                  shadowRadius: 6,
                  elevation: 5,
                }}>
                <Image
                  source={require('../assets/image/up_arrow_black.png')}
                  style={{height: 25, width: 25}}></Image>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginLeft: 10,
                  }}>
                  Get Direction
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.dialCall()}
                style={{
                  marginLeft: 5,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: 'black',
                  flex: 1,
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  shadowColor: '#000000',
                  shadowOffset: {width: 0, height: 10}, // change this for more shadow
                  shadowOpacity: 1,
                  shadowRadius: 6,
                  elevation: 5,
                }}>
                <Image
                  source={require('../assets/image/call_black.png')}
                  style={{height: 25, width: 25}}></Image>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginLeft: 10,
                  }}>
                  Call
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: 'gray',
                opacity: 0.5,
                width: Dimensions.get('screen').width / 1.1,
                alignSelf: 'center',
                marginTop: 80,
              }}></View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('ReservationDateTime', {
              id: this.state.res_id,
              img: this.props.route.params.img,
            })
          }
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: '90%',
            borderRadius: 8,
            backgroundColor: '#F10114',
            alignSelf: 'center',
            marginBottom: 40,
            shadowColor: '#000000',
            shadowOffset: {width: 0, height: 10}, // change this for more shadow
            shadowOpacity: 1,
            shadowRadius: 6,
            elevation: 5,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
            Reserve a table
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.userDetails.user_id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReserveTable);
