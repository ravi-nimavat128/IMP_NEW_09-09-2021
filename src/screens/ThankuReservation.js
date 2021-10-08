import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {is_order_type} from '../reducers/cartItems/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
export class ThankuReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      booking_id: this.props.route.params.booking_id,
      restaurant_name: '',
      total_guests: '',
      book_time: '',
      restaurant_icon: '',
      book_date: '',
      book_month: '',
      restaurant_location: '',
      restaurant_mobile_no: '',
      menu: '',
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    this.setState({
      isLoading: true,
    });
    let formData = new FormData();
    formData.append('booking_id', this.state.booking_id);

    axios
      .post(
        'http://binarygeckos.com/imp/apis/hotel/restaurant/check_restaurant_booking_table_status',
        formData,
      )
      .then(Response => {
        this.setState({
          isLoading: false,
        });
        if (Response.data.status == 1) {
          this.setState({
            restaurant_name: Response.data.restaurant_name,
            total_guests: Response.data.total_guests,
            book_time: Response.data.book_time,
            restaurant_icon: Response.data.restaurant_icon,
            book_date: Response.data.book_date,
            book_month: Response.data.book_month,
            restaurant_location: Response.data.restaurant_location,
            restaurant_mobile_no: Response.data.restaurant_mobile_no,
            menu: Response.data.menu,
          });
        } else {
          Alert.alert(Response.data.message);
        }
      });
  }

  dialCall = restaurant_mobile_no => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + restaurant_mobile_no + '}';
    } else {
      phoneNumber = 'telprompt:${' + restaurant_mobile_no + '}';
    }

    Linking.openURL(phoneNumber);
  };

  render() {
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
        <ScrollView>
          <View
            style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
            <Image
              source={require('../assets/image/thanku_reservation.png')}
              style={{height: 80, width: 80, marginTop: 70}}></Image>

            <Text
              style={{
                color: 'black',
                marginTop: 20,
                fontSize: 24,
              }}>
              Reservation confirmed
            </Text>
            <Text style={{marginTop: 15, fontSize: 18, color: 'gray'}}>
              Email sent to
            </Text>
            <Text style={{fontSize: 20, color: 'black'}}>
              {this.props.email}
            </Text>

            <View
              style={{
                alignSelf: 'stretch',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                marginTop: 50,
                marginBottom: 10,
              }}
            />

            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Text style={{fontSize: 40, fontWeight: 'bold'}}>
                  {' '}
                  {this.state.book_date}
                </Text>
                <Text style={{color: 'gray', fontWeight: 'bold'}}>
                  {' '}
                  {this.state.book_month}
                </Text>
              </View>

              <View
                style={{
                  flex: 3,
                  paddingTop: 15,
                }}>
                <Text style={{fontSize: 24}}>{this.state.restaurant_name}</Text>
                <Text style={{color: 'gray', fontSize: 18}}>
                  Party of {this.state.total_guests}
                </Text>
                <Text style={{color: 'gray', fontSize: 18}}>
                  {this.state.book_time}
                </Text>
              </View>
            </View>

            <View
              style={{
                alignSelf: 'stretch',
                borderBottomWidth: 1,
                borderBottomColor: '#000',
                marginTop: 25,
              }}
            />

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: 50,
                marginLeft: 50,
                marginRight: 50,
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.dialCall(this.state.restaurant_mobile_no)}
                  style={{alignItems: 'center', alignSelf: 'center'}}>
                  <Image
                    source={require('../assets/image/call_icon.png')}
                    style={{height: 40, width: 40}}></Image>
                  <Text style={{marginTop: 10, fontSize: 16, color: 'black'}}>
                    Call
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{flex: 1, alignItems: 'center', alignSelf: 'center'}}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(this.state.menu)}>
                  <Image
                    source={require('../assets/image/menu_kitchen.png')}
                    style={{height: 40, width: 40}}></Image>
                  <Text style={{marginTop: 10, fontSize: 16, color: 'black'}}>
                    Menu
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{flex: 1, alignItems: 'center', alignSelf: 'center'}}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(this.state.restaurant_location)
                  }>
                  <Image
                    source={require('../assets/image/direction.png')}
                    style={{
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}></Image>
                  <Text style={{marginTop: 10, fontSize: 16, color: 'black'}}>
                    Directions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={{color: 'black', marginTop: 60, fontSize: 22}}>
              Booking ID : {this.props.route.params.booking_id}
            </Text>
            {/*  <Text
              style={{
                color: 'black',
                marginTop: 60,
                fontSize: 17,
                marginHorizontal: 60,
                textAlign: 'center',
              }}>
              Please note that your table reservation will be cancelled if you
              arrive lete at the restaurant
            </Text> */}

            <TouchableOpacity
              onPress={() => {
                this.props.is_order_type('3');
                this.props.navigation.replace('MainNavigator');
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                width: '90%',
                borderRadius: 8,
                backgroundColor: '#F10114',
                marginTop: 50,
                marginBottom: 30,
                shadowColor: '#000000',
                shadowOffset: {width: 0, height: 10}, // change this for more shadow
                shadowOpacity: 1,
                shadowRadius: 6,
                elevation: 5,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                Book more table
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  email: state.userDetails.email,
});

const mapDispatchToProps = {
  is_order_type,
};

export default connect(mapStateToProps, mapDispatchToProps)(ThankuReservation);
