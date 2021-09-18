import React, {Component} from 'react';
import axios from 'axios';
import HTMLView from 'react-native-htmlview';

import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-paper';
import {
  addPhoneNumber,
  addEmail,
  addUserName,
} from '../reducers/UserReducer/user_actions';
import Spinner from 'react-native-loading-spinner-overlay';

var back_arrow = require('../assets/image/back_arrow.png');

class EditContectInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      phone_number: '',
      full_name: '',
      email: '',
    };
  }

  componentDidMount() {
    // this.FetchPrivecyPolicy();
  }

  UpdateProfile = () => {
    this.setState({
      isLoading: true,
    });
    let formData = new FormData();
    formData.append('mobile_no', this.props.mobile_number);
    formData.append('name', this.props.name);
    formData.append('email', this.props.email);
    axios
      .post(
        'https://www.binarygeckos.com/imp/apis/auth/update_user_profile',
        formData,
      )
      .then(response => {
        if (response.data.status == 1) {
          this.setState({
            isLoading: false,
          });
          Alert.alert('', response.data.message);
          this.props.addEmail(this.state.email);
          this.props.addUserName(this.state.full_name);
          this.props.navigation.goBack();
        } else {
          this.setState({
            isLoading: false,
          });
          Alert.alert('', response.data.message);
        }
      });
  };

  render() {
    console.log('full Name', this.state.full_name);
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={this.state.isLoading}
          //Text with the Spinner
          textContent={'Loading...'}
          size={'large'}
          animation={'fade'}
          cancelable={false}
          color="#ED505C"
          //Text style of the Spinner Text
          textStyle={{color: '#ED505C', fontSize: 20, marginLeft: 10}}
        />
        <View style={style.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{flexDirection: 'row'}}>
            <Image source={back_arrow} style={style.back_img} />
          </TouchableOpacity>
          <Text style={style.txt_heading}>Enter Contact Details</Text>
        </View>

        <View
          style={{
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
            opacity: 0.15,
          }}
        />

        <View
          style={{
            flex: 1,
            marginTop: 20,
            marginHorizontal: 15,
          }}>
          <TextInput
            style={{marginTop: 30}}
            label="Full Name"
            defaultValue={this.props.name}
            // value={this.state.full_name}
            onChangeText={text => this.setState({full_name: text})}
            underlineColorAndroid="transparent"
            selectionColor="#ED505C"
            theme={{colors: {primary: '#ED505C', background: '#00000000'}}}
            keyboardType="default"
          />
          <TextInput
            style={{marginTop: 30}}
            label="10 - Digit Phone Number"
            value={this.props.mobile_number}
            editable={false}
            onChangeText={text => this.props.addPhoneNumber(text)}
            underlineColorAndroid="transparent"
            selectionColor="#ED505C"
            theme={{colors: {primary: '#ED505C', background: '#00000000'}}}
            keyboardType="number-pad"
            maxLength={10}
          />

          <TextInput
            style={{marginTop: 30}}
            label="Email"
            defaultValue={this.props.email}
            // value={this.state.email}
            onChangeText={text => this.setState({email: text})}
            underlineColorAndroid="transparent"
            selectionColor="#ED505C"
            theme={{colors: {primary: '#ED505C', background: '#00000000'}}}
            keyboardType="email-address"
          />

          <TouchableOpacity
            // onPress={() => this.UpdateProfile()}
            disabled={this.props.name.length > 1 ? false : true}
            style={{
              backgroundColor:
                this.props.name.length > 1 ? '#ED505C' : '#ED505C',
              borderRadius: 5,
              justifyContent: 'center',
              marginTop: 35,
              marginHorizontal: 35,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                padding: 10,
                alignSelf: 'center',
                fontSize: 15,
                color: 'white',
              }}>
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  mobile_number: state.userDetails.mo_number,
  loginToken: state.userDetails.login_token,
  name: state.userDetails.user_name,
  email: state.userDetails.email,
});

const mapDispatchToProps = {
  addPhoneNumber,
  addUserName,
  addEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditContectInfo);

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 66,

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
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    marginLeft: 20,
  },
});
