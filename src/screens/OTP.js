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
import OTPInputView from '@twotalltotems/react-native-otp-input';
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
import Spinner from 'react-native-loading-spinner-overlay';

export class OTP extends Component {
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
      isLoading: false,
    };
  }

  LoginFun = () => {
    this.setState({isLoading: true});
    var formData = new FormData();
    formData.append('mobile_no', this.props.route.params.number);
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

          // this.props.navigation.navigate('OTP', {
          //   number: this.state.value,
          //   login_token: Response.data.login_token,
          //   // mo_number: Response.data.mobile_no,
          //   user_id: Response.data.user_id,
          //   user_name: Response.data.name,
          //   email: Response.data.email,
          //   is_vip: Response.data.is_vip,
          // });

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
  Check_OTP = () => {
    this.setState({isLoading: true});

    var formData = new FormData();
    formData.append('mobile_no', this.props.route.params.number);
    formData.append('otp', this.state.code);
    axios
      .post('https://www.binarygeckos.com/imp/apis/auth/check_otp', formData)
      .then(Response => {
        if (Response.data.status == 1) {
          this.props.addLoginToken(this.props.route.params.login_token);
          this.props.addEmail(this.props.route.params.email);
          this.props.addPhoneNumber(this.props.route.params.number);
          this.props.addUserId(this.props.route.params.user_id);
          this.props.addUserName(this.props.route.params.user_name);
          this.props.add_is_vip(this.props.route.params.is_vip);
          // {
          //   this.props.uname === null
          //     ? this.props.navigation.navigate('SignUp')
          //     : null;
          // }
          {
            if (this.props.uname === '') {
              this.props.navigation.replace('SignUp');
            } else {
              this.props.navigation.replace('SelectOrderMode');
            }
          }
          this.setState({isLoading: false});
        } else {
          this.setState({isLoading: false});

          Alert.alert('', Response.data.message);
        }
      });
  };

  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
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

          <Text style={{fontSize: 20, color: 'black', margin: 20}}>
            ENTER OTP
          </Text>
          <View style={{flex: 1, margin: 35}}>
            <OTPInputView
              style={{
                width: '80%',
                height: '20%',
                color: 'black',
                alignSelf: 'center',
              }}
              pinCount={4}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={code => this.setState({code: code})}
              // codeInputFieldStyle={style.borderStyleBase}
              codeInputHighlightStyle={style.borderStyleHighLighted}
              autoFocusOnLoad
              keyboardType={'number-pad'}
              codeInputFieldStyle={style.underlineStyleBase}
              // codeInputHighlightStyle={
              //   style.underlineStyleHighLighted
              // }
              onCodeFilled={code => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />

            <View
              style={{
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginRight: 25,
              }}>
              <Text style={{fontSize: 12, color: 'black'}}>
                Did not get OTP?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.LoginFun();
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#BE984A',
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}>
                  {' '}
                  RESEND SMS
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.Check_OTP();
                // this.OtpToggal();
              }}
              disabled={this.state.code.length == 4 ? false : true}
              style={{
                backgroundColor:
                  this.state.code.length == 4 ? '#BE984A' : '#D1B989',
                borderRadius: 5,
                justifyContent: 'center',
                marginTop: 60,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  padding: 10,
                  alignSelf: 'center',
                  fontSize: 15,
                  color: 'white',
                }}>
                PROCEED
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(OTP);
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
    backgroundColor: 'white',
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
