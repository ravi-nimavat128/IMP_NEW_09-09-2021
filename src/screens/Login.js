import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  Button,
  SafeAreaView,
  TextInput,
  Touchable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  addLoginToken,
  addEmail,
  addPhoneNumber,
  addUserId,
  addUserName,
  Logout,
  add_is_vip,
} from '../reducers/UserReducer/user_actions';
import axios from 'axios';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      value: '',
      otpVisible: true,
      code: '',
      otp_btn_visible: false,
      login_token: '',
      mo_number: '',
      user_id: '',
      user_name: '',
      is_vip: '0',
      email: '',
      my_account_visible: false,
      login_status: 0,
      isLoading: false,
    };
  }

  LoginFun = () => {
    this.setState({isLoading: true});

    var formData = new FormData();
    formData.append('mobile_no', this.state.value);
    formData.append('device_id', this.props.token);
    axios
      .post('https://www.binarygeckos.com/imp/apis/auth/login_signup', formData)
      .then(Response => {
        if (Response.data.status == 1) {
          // this.props.addLoginToken(Response.data.login_token);
          // this.props.addEmail(Response.data.email);
          // this.props.addPhoneNumber(Response.data.mobile_no);
          // this.props.addUserId(Response.data.user_id);
          // this.props.addUserName(Response.data.name);

          this.setState({
            login_token: Response.data.login_token,
            mo_number: Response.data.mobile_no,
            user_id: Response.data.user_id,
            user_name: Response.data.name,
            email: Response.data.email,
            is_vip: Response.data.is_vip,
            isLoading: false,
            // login_status: 1,
          });

          this.props.navigation.replace('OTP', {
            number: this.state.value,
            login_token: Response.data.login_token,
            // mo_number: Response.data.mobile_no,
            user_id: Response.data.user_id,
            user_name: Response.data.name,
            email: Response.data.email,
            is_vip: Response.data.is_vip,
          });

          console.log(Response.data.status);
          this.setState({
            otp: Response.data.otp,
          });
        } else {
          this.setState({isLoading: false});
          console.log(Response.data.status);
        }
      });
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
        {/* {this.state.otpVisible == true ? ( */}
        <View style={style.login_view}>
          {/* <TouchableOpacity
          onPress={() => this.toggleBottomNavigationView()}
          style={{
            width: 60,
            alignSelf: 'flex-end',
            height: 60,
          }}>
          <Image
            source={cross_icon}
            style={{
              alignSelf: 'flex-end',
              margin: 15,
              height: 15,
              width: 15,
            }}></Image>
        </TouchableOpacity> */}

          <Text style={style.txt_heading}>ENTER YOUR MOBILE NUMBER</Text>
          <Text style={style.txt_10_digits}>10 - digit phone number</Text>
          <View style={style.enter_number_view}>
            <Text
              style={{
                fontSize: 17,
                color: 'black',
                marginRight: 5,
                alignSelf: 'center',
              }}>
              +91
            </Text>
            <TextInput
              style={style.input_number}
              autoCompleteType="cc-number"
              textContentType="telephoneNumber"
              dataDetectorTypes="phoneNumber"
              keyboardType="phone-pad"
              placeholder="Enter Mobile Number"
              autoFocus
              maxLength={10}
              onChangeText={text =>
                this.setState({
                  value: text,
                })
              }
              // value={this.state.value}
            ></TextInput>
          </View>
          <View
            style={{
              borderBottomColor: '#000000',
              marginTop: 3,
              marginHorizontal: 10,
              borderBottomWidth: 1,
            }}
          />
          <View style={style.btn_getotp}>
            <TouchableOpacity
              disabled={this.state.value.length == 10 ? false : true}
              onPress={() => {
                this.LoginFun();
                // this.OtpToggal();
              }}
              style={{
                backgroundColor:
                  this.state.value.length == 10 ? '#BE984A' : '#D1B989',
                borderRadius: 5,
                justifyContent: 'center',
                marginTop: 15,
              }}>
              <Text
                style={{
                  padding: 10,
                  alignSelf: 'center',
                  fontSize: 15,
                  color: 'white',
                }}>
                Login
              </Text>
            </TouchableOpacity>
            {/* <Button
        onPress={() => {
          // this.LoginFun();
          this.OtpToggal();
        }}
        title="GET OTP"
        color={
          this.state.value.length == 1 ? '#BE984A' : '#DDDDDD'
        }
        // visible={inputChangeHandler}
        // disabled={this.state.value.length == 1 ? false : true}
      /> */}
          </View>
        </View>
        {/* ) : ( */}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  login_tokenn: state.userDetails.login_token,
  uid: state.userDetails.user_id,
  uname: state.userDetails.user_name,
  uemail: state.userDetails.email,
  umo_number: state.userDetails.mo_number,
  token: state.userDetails.add_pushnotification_token,
});

const mapDispatchToProps = {
  addLoginToken,
  addEmail,
  addPhoneNumber,
  addUserId,
  addUserName,
  Logout,
  add_is_vip,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const style = StyleSheet.create({
  main: {
    flex: 1,
  },
  main_img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_details: {
    flex: 0.9,
    flexDirection: 'column',
  },
  btn_login: {
    borderRadius: 6,
    marginHorizontal: 26,
  },
  btn_getotp: {
    borderRadius: 6,
    marginHorizontal: 26,
    marginTop: 25,
  },

  help_main: {
    flexDirection: 'row',
    marginTop: 17,
    marginRight: 26,
  },
  bottomNavigationView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    marginTop: 60,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main_view: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '80%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_view: {
    marginTop: 50,
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  txt_heading: {
    fontSize: 16,
    color: '#000000',
    marginTop: 20,
    marginLeft: 23,
  },
  txt_10_digits: {
    fontSize: 14,
    opacity: 0.31,
    color: '#000000',
    marginTop: 29,
    marginLeft: 23,
  },
  enter_number_view: {
    flexDirection: 'row',
    marginTop: 25,
    marginLeft: 22,
  },
  input_number: {
    width: '100%',
    direction: 'ltr',
    fontSize: 17,
    alignSelf: 'center',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#BE984A',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#BE984A',
    fontSize: 18,
    color: '#BE984A',
  },

  underlineStyleHighLighted: {
    borderColor: '#BE984A',
    tintColor: 'pink',
  },
});
