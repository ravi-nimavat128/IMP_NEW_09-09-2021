import React, {Component} from 'react';
import moment from 'moment';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import HorizontalDatePicker from '@logisticinfotech/react-native-horizontal-date-picker';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import {Toast, DURATION, POSTION} from 'rn-simple-toast';
import DatePicker from 'react-native-date-picker';

// import DatePicker from 'react-horizontal-datepicker';
// import '../Components/App.css';
// import DatePicker from 'react-native-date-picker';

const time_data = [
  {
    name: '16:30',
    id: 1,
  },
  {
    name: '17:00',
    id: 2,
  },
  {
    name: '17:30',
    id: 3,
  },
  {
    name: '18:00',
    id: 4,
  },
  {
    name: '18:30',
    id: 5,
  },
  {
    name: '19:00',
    id: 6,
  },
  {
    name: '19:30',
    id: 7,
  },
  {
    name: '20:00',
    id: 8,
  },
  {
    name: '20:30',
    id: 9,
  },
];

export class ReservationDateTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guest_count: 0,
      date: new Date(),
      new_date: null,
      selected_time_name: '',
      selected_time_id: 0,
      booking_id: '',
      toastRef: null,
    };
  }
  onDateSelected = val => {
    console.log(val);
    this.setState({new_date: val});
  };

  set_time = date => {
    this.setState({new_date: moment(date).format('lll')});
  };

  book_table = () => {
    this.setState({isLoading: true});

    var formData = new FormData();
    formData.append('user_id', this.props.user_id);
    formData.append('restaurant_id', this.props.route.params.id);
    formData.append('total_guests', this.state.guest_count);
    formData.append('book_date_time', this.state.new_date);
    // formData.append('book_time', this.state.new_date);
    axios
      .post(
        'http://binarygeckos.com/imp/apis/restaurant/generals/book_table',
        formData,
      )
      .then(Response => {
        if (Response.data.status == 1) {
          console.log(Response.data.status);
          this.setState({
            isLoading: false,
            // booking_id: Response.data.booking_id,
          });
          this.props.navigation.replace('ResevertionConfirm', {
            booking_id: Response.data.booking_id,
          });
        } else {
          alert(Response.data.message);
          this.setState({
            isLoading: false,
          });
        }
      });
  };

  // onDateSelected = date => {
  //   this.setState({
  //     new_date: moment(date).format('DD-MM-YYYY'),
  //   });
  //   // this.date_change(date);
  // };

  render() {
    console.log('*******************************');
    console.log('Selected Date', this.state.new_date);
    // console.log('selected time name', this.state.selected_time_name);
    // console.log('guest', this.state.guest_count);
    console.log('*******************************');

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Toast ref={_ref => (this.state.toastRef = _ref)} />

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
          <View style={{flex: 1, marginBottom: 120}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 45,
                borderRadius: 12,
                borderColor: 'black',
                borderWidth: 1,
                height: 95,
                marginHorizontal: 25,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: 'black',
                  marginLeft: 25,
                }}>
                Guests
              </Text>

              <View
                style={{
                  flexDirection: 'row',

                  borderRadius: 10,
                  borderColor: 'black',
                  borderWidth: 1,
                  width: 95,
                  height: 40,
                  marginHorizontal: 25,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  disabled={this.state.guest_count == 0 ? true : false}
                  onPress={() =>
                    this.setState({guest_count: this.state.guest_count - 1})
                  }
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 20}}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    {this.state.guest_count}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({guest_count: this.state.guest_count + 1})
                  }
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 17}}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                // flexDirection: 'row',
                marginTop: 45,
                borderRadius: 12,
                borderColor: 'black',
                borderWidth: 1,

                marginHorizontal: 25,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: 'black',
                  alignSelf: 'baseline',
                  marginTop: 20,
                  marginLeft: 25,
                }}>
                Date {'&'} Time
              </Text>

              {/* <DatePicker
                date={this.state.date}
                androidVariant="iosClone"
                // fadeToColor="transparent"
                mode="date"
                dividerHeight={5}
                style={{marginBottom: 20, flex: 1, marginTop: 20}}
                onDateChange={datee => {
                  // this.setState({date: datee});
                  this.date_change(datee);
                }}
              /> */}

              {/* <HorizontalDatePicker
                pickerType={'date'}
                isShowYear={false}
                datePickerContainerStyle={{
                  marginTop: 15,
                  marginBottom: 30,
                  backgroundColor: 'null',
                }}
                selectedTextStyle={{fontWeight: 'bold', color: 'black'}}
                onDateSelected={date => this.onDateSelected(date)}
              /> */}
              <DatePicker
                style={{marginVertical: 20, flex: 1}}
                date={this.state.date}
                minimumDate={this.state.date}
                onDateChange={date => this.set_time(date)}
              />
            </View>

            {/* <View
              style={{
                // flexDirection: 'row',
                marginTop: 45,
                borderRadius: 12,
                borderColor: 'black',
                borderWidth: 1,
                // height: 250,

                marginHorizontal: 25,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: 'black',
                  marginLeft: 25,
                  alignSelf: 'baseline',
                  marginTop: 25,
                  marginBottom: 10,
                }}>
                Time
              </Text>
              <View
                style={{
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  // width: '60%',
                  flex: 1,

                  marginHorizontal: 24,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                {time_data.map(t => {
                  return (
                    <View>
                      
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            selected_time_id: t.id,
                            selected_time_name: t.name,
                          })
                        }
                        style={{
                          // flex: 1,
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderWidth: 1,
                          marginVertical: 5,

                          backgroundColor:
                            this.state.selected_time_id === t.id
                              ? '#CFCFCF'
                              : '#00000000',
                          marginHorizontal: 5,
                          borderColor:
                            this.state.selected_time_id == t.id
                              ? '#CFCFCF'
                              : 'gray',
                        }}>
                        <Text
                          style={{
                            paddingVertical: 8,
                            fontSize: 15,
                            paddingHorizontal: 22,
                            fontWeight: 'bold',
                            color:
                              this.state.selected_time_id == t.id
                                ? '#fff'
                                : 'black',
                          }}>
                          {t.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
                <View style={{height: 25, width: '100%'}}></View>
              </View>
            </View> */}
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 24,
            marginBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              // width: '90%',
              borderRadius: 16,
              flex: 1,
              marginRight: 8,
              backgroundColor: '#CFCFCF',
              alignSelf: 'center',
              // marginBottom: 40,
              shadowColor: '#000000',
              shadowOffset: {width: 0, height: 10}, // change this for more shadow
              shadowOpacity: 1,
              shadowRadius: 6,
              elevation: 5,
            }}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (this.state.guest_count == 0) {
                // this.state.toastRef.show(
                //   'Please Select Guest',
                //   'red',
                //   DURATION.LONG,
                // );
                alert('Please Select Guest');
              } else if (this.state.new_date == 0) {
                // this.state.toastRef.show(
                //   'Please Select Date & Time',
                //   'red',
                //   DURATION.LONG,
                // );
                alert('Please Select Date & Time');
                // } else if (this.state.selected_time_id == 0) {
                //   this.state.toastRef.show(
                //     'Please Select Time',
                //     'red',
                //     DURATION.LONG,
                //   );
              } else {
                this.book_table();
              }
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              // width: '90%',
              flex: 1,
              borderRadius: 16,
              marginLeft: 8,
              backgroundColor: '#FF9400',
              alignSelf: 'center',
              // marginBottom: 40,
              shadowColor: '#000000',
              shadowOffset: {width: 0, height: 10}, // change this for more shadow
              shadowOpacity: 1,
              shadowRadius: 6,
              elevation: 5,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.userDetails.user_id,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReservationDateTime);
