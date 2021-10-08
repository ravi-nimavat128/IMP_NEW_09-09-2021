import React, {Component} from 'react';

import moment from 'moment';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import {Toast, DURATION, POSTION} from 'rn-simple-toast';
import DatePicker from 'react-native-date-picker';

import PickerModal from 'react-native-picker-modal-view';
import {Button, TextInput} from 'react-native-paper';
import {BottomSheet} from 'react-native-btr';
// import DatePicker from 'react-horizontal-datepicker';
// import '../Components/App.css';
// import DatePicker from 'react-native-date-picker';

const party = [
  {
    Id: '1',
    Name: '1',
  },
  {
    Id: '2',
    Name: '2',
  },
  {
    Id: '3',
    Name: '3',
  },
  {
    Id: '4',
    Name: '4',
  },
  {
    Id: '5',
    Name: '5',
  },
  {
    Id: '6',
    Name: '6',
  },
  {
    Id: '7',
    Name: '7',
  },
  {
    Id: '8',
    Name: '8',
  },
  {
    Id: '9',
    Name: '9',
  },
  {
    Id: '10',
    Name: '10',
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
      date11: '',
      showhide_datepicker: false,
      Date: new Date(),
      open: false,
      c_visible: false,
      c_visible_time: false,

      new_date: '',
      new_time: '',
      startDate: moment(new Date()).format('YYYY-MM-DD'),
      starttime: moment(new Date()).format('h:mm:ss'),
    };
  }

  set_time = date => {
    this.setState({new_time: moment(date).format('h:mm:ss')});
  };

  set_date = date => {
    this.setState({new_date: moment(date).format('YYYY-MM-DD')});
  };

  toggle_c_Bottomsheet_time = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState(state => ({
      c_visible_time: !state.c_visible_time,
    }));
  };

  toggle_c_Bottomsheet = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState(state => ({
      c_visible: !state.c_visible,
    }));
  };

  onDateSelected = val => {
    console.log(val);
    this.setState({new_date: val});
  };

  book_table = () => {
    if (this.state.guest_count == 0) {
      alert('Enter party numbers');
    } else if (this.state.new_date == '') {
      alert('Select date');
    } else if (this.state.startDate > this.state.new_date) {
      alert('Invalid date');
    } else if (this.state.new_time == '') {
      alert('Select time');
    } else {
      this.setState({isLoading: true});

      var formData = new FormData();
      formData.append('user_id', this.props.user_id);
      formData.append('restaurant_id', this.props.route.params.id);
      formData.append('total_guests', this.state.guest_count);
      formData.append(
        'book_date_time',
        this.state.new_date + this.state.new_time,
      );
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
    }
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

    const date12 = new Date();
    const open12 = false;

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
            <Image
              style={{
                height: 180,
                width: 180,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
              source={{uri: this.props.route.params.img}}></Image>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{color: 'black', fontSize: 19}}>
                {moment(new Date()).format('lll')}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginLeft: 20,
                marginRight: 20,
                marginTop: 50,
                height: 35,
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginBottom: 15,
                    textAlign: 'center',
                  }}>
                  Party
                </Text>
                <TextInput
                  style={{
                    backgroundColor: 'white',
                    elevation: 10,

                    borderRadius: 5,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',

                    fontSize: 16,
                  }}
                  keyboardType="numeric"
                  onChangeText={guest_count => {
                    this.setState({
                      guest_count: guest_count,
                    });
                  }}
                  placeholder={'Party'}
                  defaultValue={1}></TextInput>
              </View>

              <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginBottom: 15,
                    textAlign: 'center',
                  }}>
                  Date
                </Text>
                <TouchableOpacity
                  onPress={onPress => this.toggle_c_Bottomsheet()}>
                  <Text
                    style={{
                      backgroundColor: 'white',
                      elevation: 10,
                      height: 50,
                      borderRadius: 5,
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignContent: 'center',
                      paddingTop: 12,
                      fontSize: 16,
                    }}>
                    {this.state.new_date == ''
                      ? 'Select Date'
                      : this.state.new_date}
                  </Text>
                </TouchableOpacity>

                {/* <DatePicker
                  style={{width: 200}}
                  date={this.state.date}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate="2016-05-01"
                  maxDate="2016-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={date => {
                    this.setState({date: date});
                  }}
                /> */}
              </View>

              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginBottom: 15,
                    textAlign: 'center',
                  }}>
                  Time
                </Text>
                <TouchableOpacity
                  onPress={onPress => this.toggle_c_Bottomsheet_time()}>
                  <Text
                    style={{
                      backgroundColor: 'white',
                      elevation: 10,
                      height: 50,
                      borderRadius: 5,
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignContent: 'center',
                      paddingTop: 12,
                      fontSize: 16,
                    }}>
                    {this.state.new_time == ''
                      ? 'Select Time'
                      : this.state.new_time}
                  </Text>
                </TouchableOpacity>
              </View>
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

        <BottomSheet
          visible={this.state.c_visible_time}
          onBackButtonPress={this.toggle_c_Bottomsheet_time}
          onBackdropPress={this.toggle_c_Bottomsheet_time}>
          <View>
            <TouchableOpacity
              onPress={() => this.toggle_c_Bottomsheet_time()}
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
                backgroundColor: 'white',
                height: 300,
                alignSelf: 'center',
                alignContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 10,
                  marginTop: 10,
                  fontWeight: 'bold',
                }}>
                Select Time
              </Text>
              <DatePicker
                modal={true}
                open={this.state.open}
                date={this.state.Date}
                mode={'time'}
                minuteInterval={15}
                onDateChange={date => this.set_time(date)}
              />
              <TouchableOpacity
                onPress={() => {
                  if (this.state.new_time == '') {
                    this.setState({
                      new_time: moment(new Date()).format('h:mm:ss'),
                    });
                    this.toggle_c_Bottomsheet_time();
                  } else {
                    this.toggle_c_Bottomsheet_time();
                  }
                }}>
                <Text
                  style={{
                    width: 100,
                    borderRadius: 10,
                    height: 40,
                    color: 'white',
                    marginTop: 10,
                    textAlign: 'center',
                    paddingTop: 10,
                    backgroundColor: '#F10114',
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </BottomSheet>

        <BottomSheet
          visible={this.state.c_visible}
          onBackButtonPress={this.toggle_c_Bottomsheet}
          onBackdropPress={this.toggle_c_Bottomsheet}>
          <View>
            <TouchableOpacity
              onPress={() => this.toggle_c_Bottomsheet()}
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
                backgroundColor: 'white',
                height: 300,
                alignSelf: 'center',
                alignContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 10,
                  marginTop: 10,
                  fontWeight: 'bold',
                }}>
                Select Date
              </Text>
              <DatePicker
                modal={true}
                open={this.state.open}
                date={this.state.Date}
                mode={'date'}
                onDateChange={date => this.set_date(date)}
              />

              <TouchableOpacity
                onPress={() => {
                  if (this.state.new_date == '') {
                    this.setState({
                      new_date: moment(new Date()).format('YYYY-MM-DD'),
                    });
                    this.toggle_c_Bottomsheet();
                  } else {
                    this.toggle_c_Bottomsheet();
                  }
                }}>
                <Text
                  style={{
                    width: 100,
                    borderRadius: 10,
                    height: 40,
                    color: 'white',
                    marginTop: 10,
                    textAlign: 'center',
                    paddingTop: 10,
                    backgroundColor: '#F10114',
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </BottomSheet>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 24,
            marginBottom: 20,
          }}>
          <TouchableOpacity
            onPress={
              () => this.setState({open: true}) //this.props.navigation.goBack()
            }
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              // width: '90%',
              borderRadius: 16,
              flex: 1,
              marginRight: 8,
              backgroundColor: '#D4D4D4',
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
              {
                /*    if (this.state.guest_count == 0) {
                // this.state.toastRef.show(
                //   'Please Select Guest',
                //   'red',
                //   DURATION.LONG,
                // );
                alert('Please Select Guest');
              } else */
              }

              this.book_table();
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              // width: '90%',
              flex: 1,
              borderRadius: 16,
              marginLeft: 8,
              backgroundColor: '#F10114',
              alignSelf: 'center',
              // marginBottom: 40,
              shadowColor: '#000000',
              shadowOffset: {width: 0, height: 10}, // change this for more shadow
              shadowOpacity: 1,
              shadowRadius: 6,
              elevation: 5,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                letterSpacing: 2,
              }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});

const mapStateToProps = state => ({
  user_id: state.userDetails.user_id,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReservationDateTime);
