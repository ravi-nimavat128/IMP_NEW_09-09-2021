import React, {Component, useState} from 'react';
import axios from 'axios';
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
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {loginToken, userId} from '../reducers/cartItems/actions';
import {
  addLoginToken,
  addEmail,
  addPhoneNumber,
  addUserId,
  addUserName,
  Logout,
  add_is_vip,
} from '../reducers/UserReducer/user_actions';

import {createStackNavigator} from '@react-navigation/stack';
import {BottomSheet} from 'react-native-btr';
import {SocialIcon} from 'react-native-elements';
import Animated, {color} from 'react-native-reanimated';

// var next_arrow = require('../assets/image/next.svg');
import Help from '../screens/Help';
import Login from '../screens/Login';
import {useTheme} from '@react-navigation/native';
import {connect} from 'react-redux';

const cross_icon = require('../assets/image/close_icon.png');

const Stack = createStackNavigator();

class Profile extends Component {
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
    };
  }

  // const {color} = useTheme();

  // const [visible, setVisible] = useState(false);

  LoginFun = () => {
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
          });

          console.log(Response.data.status);
          this.setState({
            otp: Response.data.otp,
          });
        } else {
          console.log(Response.data.status);
        }
      });
  };

  Check_OTP = () => {
    var formData = new FormData();
    formData.append('mobile_no', this.state.mo_number);
    formData.append('otp', this.state.code);
    axios
      .post('https://www.binarygeckos.com/imp/apis/auth/check_otp', formData)
      .then(Response => {
        if (Response.data.status == 1) {
          this.props.addLoginToken(this.state.login_token);
          this.props.addEmail(this.state.email);
          this.props.addPhoneNumber(this.state.mo_number);
          this.props.addUserId(this.state.user_id);
          this.props.addUserName(this.state.user_name);
          this.props.add_is_vip(this.state.is_vip);
          // {
          //   this.props.uname === null
          //     ? this.props.navigation.navigate('SignUp')
          //     : null;
          // }
          if (this.props.uname === '') {
            this.props.navigation.navigate('SignUp');
          } else {
            null;
          }
        } else {
          Alert.alert('', Response.data.message);
        }
      });
  };

  onComplete = (inputtedPin, clear) => {
    if (val !== this.state.pin) {
      clear();
    } else {
      console.log('Pin is correct');
    }
  };

  toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState(state => ({
      visible: !state.visible,
    }));
  };
  OtpToggal = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState(state => ({
      otpVisible: !state.otpVisible,
    }));
  };

  // list = [
  //   {title: 'List Item 1'},
  //   {title: 'List Item 2'},
  //   {
  //     title: 'Cancel',
  //     containerStyle: {backgroundColor: 'red'},
  //     titleStyle: {color: 'white'},
  //     onPress: () => setIsVisible(false),
  //   },
  // ];

  render() {
    console.log('vip number', this.state.is_vip);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        {this.props.uid == '' ? (
          <SafeAreaView style={style.main}>
            <View style={style.main_img}>
              <Image
                source={require('../assets/image/logo_main.png')}
                style={{width: 140, height: 97}}
              />
            </View>
            <View style={style.profile_details}>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'left',
                  color: 'black',
                  marginLeft: 28,
                }}>
                Account
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'left',
                  marginTop: 5,
                  color: '#B0B0B0',
                  marginLeft: 28,
                  marginBottom: 15,
                }}>
                Login/Create Account to quickly manage order.
              </Text>
              <View style={style.btn_login}>
                <Button
                  title="Login"
                  color="#BE984A"
                  onPress={() => this.toggleBottomNavigationView()}
                />

                <BottomSheet
                  visible={this.state.visible}
                  //setting the visibility state of the bottom shee
                  onBackButtonPress={this.toggleBottomNavigationView}
                  //Toggling the visibility state on the click of the back botton
                  // onBackdropPress={this.toggleBottomNavigationView}
                  //Toggling the visibility state on the clicking out side of the sheet
                >
                  <SafeAreaView style={style.bottomNavigationView}>
                    {this.state.otpVisible == true ? (
                      <View style={style.login_view}>
                        <TouchableOpacity
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
                        </TouchableOpacity>

                        <Text style={style.txt_heading}>
                          ENTER YOUR MOBILE NUMBER
                        </Text>
                        <Text style={style.txt_10_digits}>
                          10 - digit phone number
                        </Text>
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
                            disabled={
                              this.state.value.length == 10 ? false : true
                            }
                            onPress={() => {
                              this.LoginFun();
                              this.OtpToggal();
                            }}
                            style={{
                              backgroundColor:
                                this.state.value.length == 10
                                  ? '#BE984A'
                                  : '#D1B989',
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
                    ) : (
                      <View style={style.login_view}>
                        <TouchableOpacity
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
                        </TouchableOpacity>

                        <Text
                          style={{fontSize: 20, color: 'black', margin: 20}}>
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
                            onCodeChanged={code => this.setState({code})}
                            // codeInputFieldStyle={style.borderStyleBase}
                            codeInputHighlightStyle={
                              style.borderStyleHighLighted
                            }
                            autoFocusOnLoad
                            keyboardType={'number-pad'}
                            codeInputFieldStyle={style.underlineStyleBase}
                            // codeInputHighlightStyle={
                            //   style.underlineStyleHighLighted
                            // }
                            onCodeFilled={code => {
                              console.log(
                                `Code is ${code}, you are good to go!`,
                              );
                            }}
                          />

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                              marginRight: 25,
                            }}>
                            <Text style={{fontSize: 12, color: 'black'}}>
                              Did not get OTP?{' '}
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
                              this.OtpToggal();
                            }}
                            disabled={
                              this.state.code.length == 4 ? false : true
                            }
                            style={{
                              backgroundColor:
                                this.state.code.length == 4
                                  ? '#BE984A'
                                  : '#D1B989',
                              borderRadius: 5,
                              justifyContent: 'center',
                              marginTop: 15,
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
                    )}
                  </SafeAreaView>
                </BottomSheet>
              </View>
              <View
                style={{
                  borderBottomColor: '#EAEAEA',
                  marginTop: 22,
                  marginHorizontal: 26,
                  borderBottomWidth: 1,
                }}
              />
              <TouchableOpacity
                style={style.help_main}
                onPress={() => this.props.navigation.navigate('Help')}>
                <View style={{flex: 2, flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'left',

                      color: 'black',
                      marginLeft: 28,
                    }}>
                    Help
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: 'left',
                      marginTop: 5,
                      color: '#B0B0B0',
                      marginLeft: 28,
                      marginBottom: 15,
                    }}>
                    FAQs {'&'} Links
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/image/next.png')}
                    style={{
                      height: 16,
                      width: 9,
                    }}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  borderBottomColor: '#EAEAEA',
                  marginTop: 22,
                  marginHorizontal: 26,
                  borderBottomWidth: 1,
                }}
              />
            </View>
          </SafeAreaView>
        ) : (
          <SafeAreaView
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Image
                source={require('../assets/image/logo_main.png')}
                style={{height: 40, width: 55, marginLeft: 40}}></Image>
              <View style={{flexDirection: 'column', flex: 1, marginLeft: 30}}>
                <Text>{this.props.uname}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 14, marginTop: 5, opacity: 0.5}}>
                    +91{this.props.umo_number}
                  </Text>
                  <TouchableOpacity
                    style={{marginLeft: 8}}
                    onPress={() =>
                      this.props.navigation.navigate('EditProfile')
                    }>
                    <Text
                      style={{fontSize: 15, marginTop: 5, color: '#BE984A'}}>
                      EDIT
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{alignSelf: 'center', marginRight: 12}}>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      '',
                      'Are you sure you want to logout?',
                      [
                        {
                          text: 'Yes',
                          onPress: () => {
                            this.props.Logout();
                            this.toggleBottomNavigationView();
                          },
                        },
                        {
                          text: 'No',
                          onPress: () => console.log('No button clicked'),
                          style: 'cancel',
                        },
                      ],
                      {
                        cancelable: false,
                      },
                    )
                  }>
                  <Image
                    source={require('../assets/image/logout_icon.png')}
                    style={{height: 35, width: 35}}></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: Dimensions.get('screen').width,
                borderBottomColor: 'gray',
                borderBottomWidth: 8,
                marginTop: 15,
                opacity: 0.1,
              }}
            />

            <TouchableOpacity
              style={style.help_main}
              onPress={() =>
                //Toggling the visibility state of the bottom sheet
                this.setState(state => ({
                  my_account_visible: !state.my_account_visible,
                }))
              }>
              <View style={{flex: 2, flexDirection: 'column'}}>
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: 'left',

                    color: 'black',
                    marginLeft: 28,
                  }}>
                  My Account
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'left',
                    marginTop: 5,
                    color: '#B0B0B0',
                    marginLeft: 28,
                    marginBottom: 15,
                  }}>
                  Address, Payments, Referrals, etc,
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/image/next.png')}
                  style={{
                    height: 12,
                    width: 8,
                  }}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: Dimensions.get('screen').width,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                opacity: 0.1,
              }}
            />
            {this.state.my_account_visible == true ? (
              <View>
                <TouchableOpacity
                  style={style.help_main}
                  onPress={() =>
                    this.props.navigation.navigate('ManageAddress')
                  }>
                  <View style={{flex: 2, flexDirection: 'row'}}>
                    <Image
                      source={require('../assets/image/home_icon.png')}
                      style={{
                        height: 18,
                        width: 18,
                        marginRight: 10,
                        marginLeft: 29,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: 'left',
                        opacity: 0.5,
                        color: 'black',
                      }}>
                      Manage addresses
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../assets/image/next.png')}
                      style={{
                        height: 12,
                        width: 8,
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    width: Dimensions.get('screen').width,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    opacity: 0.1,
                    marginTop: 15,
                  }}
                />
                {/* <TouchableOpacity style={style.help_main}>
                  <View style={{flex: 2, flexDirection: 'row'}}>
                    <Image
                      source={require('../assets/image/card_icon.png')}
                      style={{
                        height: 18,
                        width: 18,
                        marginRight: 10,
                        marginLeft: 29,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: 'left',
                        opacity: 0.5,
                        color: 'black',
                      }}>
                      Payments
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../assets/image/next.png')}
                      style={{
                        height: 12,
                        width: 8,
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    width: Dimensions.get('screen').width,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    opacity: 0.1,
                    marginTop: 15,
                  }}
                /> */}
              </View>
            ) : null}

            <TouchableOpacity
              style={style.help_main}
              onPress={() => this.props.navigation.navigate('MyOrder')}>
              <View style={{flex: 2, flexDirection: 'column'}}>
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: 'left',

                    color: 'black',
                    marginLeft: 28,
                  }}>
                  My Orders
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'left',
                    marginTop: 5,
                    color: '#B0B0B0',
                    marginLeft: 28,
                    marginBottom: 15,
                  }}>
                  See record of My order
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/image/next.png')}
                  style={{
                    height: 12,
                    width: 8,
                  }}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: Dimensions.get('screen').width,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                opacity: 0.1,
              }}
            />

            {/* <TouchableOpacity
              style={style.help_main}
              onPress={() => this.props.navigation.navigate('PastOrder')}>
              <View style={{flex: 2, flexDirection: 'column'}}>
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: 'left',

                    color: 'black',
                    marginLeft: 28,
                  }}>
                  Past Orders
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'left',
                    marginTop: 5,
                    color: '#B0B0B0',
                    marginLeft: 28,
                    marginBottom: 15,
                  }}>
                  See record of past order
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/image/next.png')}
                  style={{
                    height: 12,
                    width: 8,
                  }}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: Dimensions.get('screen').width,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                opacity: 0.1,
              }}
            /> */}

            <TouchableOpacity
              style={style.help_main}
              onPress={() => this.props.navigation.navigate('Help')}>
              <View style={{flex: 2, flexDirection: 'column'}}>
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: 'left',

                    color: 'black',
                    marginLeft: 28,
                  }}>
                  Help
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'left',
                    marginTop: 5,
                    color: '#B0B0B0',
                    marginLeft: 28,
                    marginBottom: 15,
                  }}>
                  FAQs {'&'} Links
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/image/next.png')}
                  style={{
                    height: 12,
                    width: 8,
                  }}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: Dimensions.get('screen').width,
                borderBottomColor: 'gray',
                borderBottomWidth: 8,
                opacity: 0.1,
              }}
            />

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Image
                source={require('../assets/image/logo_main.png')}
                resizeMode={'center'}
                style={{
                  height: 300,
                  width: 300,
                }}></Image>
            </View>
          </SafeAreaView>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

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
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderColor: '#707070',
    borderWidth: 1,
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
// class LoginScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//     };
//   }

//   // const [value, onChangeText] = useState('');
//   render() {
//     return (

//     );
//   }
// }
