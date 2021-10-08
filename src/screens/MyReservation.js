import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import {connect} from 'react-redux';
import {CancelOrder} from './CancelOrder';
import cart2 from './cart2';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

var sttatus = require('../assets/image/STATTUS.png');
var senso = require('../assets/image/SENSO.png');
var courtyard = require('../assets/image/COURTYARD.png');
var back_arrow = require('../assets/image/back_arrow.png');

const DATA = [
  {
    id: 1,
    img: sttatus,
    h_name: 'Sttatus',
    name: 'Ravi Nimavat',
    r_no: 123,
    date: '17 - 09 - 2021',
    no_of_person: 9,
  },
  {
    id: 2,
    img: senso,
    h_name: 'Senso',
    name: 'Varshid Patel',
    r_no: 234,
    date: '17 - 09 - 2021',
    no_of_person: 3,
  },
  {
    id: 3,
    img: courtyard,
    h_name: 'Courtyard',
    name: 'Anand Kamani',
    r_no: 567,
    date: '17 - 09 - 2021',
    no_of_person: 7,
  },
];

export class MyReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cancel_visible: false,
      isLoading: false,
      orderList: [],
    };
  }

  _OrderCancel(booking_id) {
    Alert.alert('', 'Are you sure to cancel this booking ?', [
      {
        text: 'Yes',
        onPress: () => {
          console.log('response', 'clicked _OrderCancel');
          var formData = new FormData();
          formData.append('user_id', this.props.user_id);
          formData.append('booking_id', booking_id);

          console.log('param', formData);

          axios
            .post(
              'http://binarygeckos.com/imp/apis/hotel/restaurant/cancel_restaurant_booking_table',
              formData,
            )
            .then(Response => {
              console.log('response', Response.data);
              if (Response.data.status == 1) {
                {
                  Alert.alert('', 'Booking Cancelled successfully', [
                    {
                      text: 'Ok',
                      onPress: () => {
                        //this.props.navigation.replace('MainNavigator');
                        this.props.navigation.navigate('CancelOrder', {
                          booking_id: booking_id,
                        });
                      },
                    },
                    {
                      text: 'Close',
                      onPress: () => {
                        this.props.navigation.replace('MainNavigator');
                      },
                      //                style: 'cancel',
                    },
                  ]);
                }

                /// this.props.navigation.replace('MainNavigator');
              } else {
                alert(Response.data.message);
              }
            });
        },
      },
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
        //                style: 'cancel',
      },
    ]);
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      // your logic will go here
      this._orderHisotyr();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  _orderHisotyr() {
    this.setState({
      isLoading: true,
    });

    let formData = new FormData();
    formData.append('user_id', this.props.user_id);
    console.log('param', formData);
    axios
      .post(
        'http://binarygeckos.com/imp/apis/hotel/restaurant/get_restaurant_booking_tables',
        formData,
      )
      .then(Response => {
        console.log('response', Response.data);
        this.setState({
          isLoading: false,
        });
        if (Response.data.status == 1) {
          this.setState({
            orderList: Response.data.result ? Response.data.result : [],
          });
        } else {
          Alert.alert(Response.data.message);
        }
      });
  }

  toggleBottomaddressView = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState(state => ({
      cancel_visible: !state.cancel_visible,
    }));
  };

  renderItem = ({item, index}) => {
    return (
      <View>
        <View
          style={{
            marginHorizontal: 15,
            //   borderRadius: 5,
            marginBottom: 10,
            backgroundColor: 'white',
            flexDirection: 'row',
            //   shadowColor: 'gray',
            //   shadowOffset: {width: 5, height: 5},
            //   shadowOpacity: 1,
            //   shadowRadius: 5,
            //   elevation: 6,
          }}>
          <View
            style={{
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              marginVertical: 5,
              alignItems: 'center',
              marginLeft: 15,
            }}>
            <Image
              source={{uri: item.restaurant_icon}}
              style={{
                height: 65,
                width: 80,
                //   resizeMode: 'contain',
                // borderColor: 'gray',
                // borderWidth: 1,
              }}></Image>
          </View>
          <View style={{marginLeft: 20}}>
            <View style={{marginTop: 15}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {item.user_name} x {item.total_guests}
              </Text>
              <Text style={{fontSize: 16, marginTop: 5}}>
                {item.restaurant_name}
              </Text>
              <Text style={{fontSize: 16, marginTop: 5}}>
                Booking id : {item.id}
              </Text>
              <Text style={{fontSize: 16, marginTop: 5}}>
                Date : {item.book_date_time}
              </Text>
            </View>

            <View style={{marginTop: 5, fontSize: 16}}>
              {item.status == 1 ? (
                <Text style={{fontSize: 16}}>Booking Pending</Text>
              ) : null}
              {item.status == 2 ? (
                <Text style={{fontSize: 16}}>Booking Confirmed</Text>
              ) : null}
              {item.status == 3 ? (
                <Text style={{fontSize: 16}}>Booking Rejected</Text>
              ) : null}
              {item.status == 4 ? (
                <Text style={{fontSize: 16}}>Booking Cancled</Text>
              ) : null}
            </View>

            <View>
              {item.status == 1 || item.status == 2 ? (
                <View
                  style={{
                    //   marginLeft: 25,
                    marginTop: 10,
                    marginBottom: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'gray',
                      borderRadius: 8,
                      height: 35,
                      width: 80,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'white'}}>Modify</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this._OrderCancel(item.booking_no)}
                    style={{
                      marginLeft: 15,
                      backgroundColor: '#F10114',
                      borderRadius: 8,
                      height: 35,
                      width: 80,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'white'}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
        </View>
        <View
          style={{
            width: Dimensions.get('screen').width,
            height: 1,
            backgroundColor: 'gray',
            marginTop: 5,
            marginBottom: 10,
          }}></View>
      </View>
    );
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

        <View style={style.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{flexDirection: 'row'}}>
            <Image source={back_arrow} style={style.back_img} />
          </TouchableOpacity>
          <Text style={style.txt_heading}>My Reservation</Text>
        </View>
        <View>
          <FlatList
            data={this.state.orderList}
            style={{marginBottom: 70, marginTop: 20}}
            showsVerticalScrollIndicator={false}
            renderItem={this.renderItem}
            keyExtractor={id => id.toString()}></FlatList>
        </View>

        <View>
          <BottomSheet visible={this.state.cancel_visible}>
            <View
              style={{
                width: Dimensions.get('screen').width,
                height: '88%',
                borderRadius: 15,
              }}>
              <Pressable
                onPress={() => {
                  this.setState({
                    cancel_visible: !this.state.cancel_visible,
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
              </Pressable>

              <View style={{borderRadius: 15, flex: 1}}>
                <CancelOrder />
              </View>
            </View>
          </BottomSheet>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.userDetails.user_id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyReservation);
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
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,

    marginLeft: 20,
  },
});
