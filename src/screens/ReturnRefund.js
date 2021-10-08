import React, {Component} from 'react';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import HTMLView from 'react-native-htmlview';

var back_arrow = require('../assets/image/back_arrow.png');

export default class ReturnRefund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      refer_data: '',
    };
  }

  componentDidMount() {
    this.FetchRetuenRefer();
  }

  FetchRetuenRefer = () => {
    this.setState({isLoading: true});

    axios
      .get('https://www.binarygeckos.com/imp/apis/general/return_refund_cancle')
      .then(response => {
        if (response.data.status == 1) {
          console.log(response.data.status);

          this.setState({
            isLoading: false,
            // Privecy_data: response,
            refer_data: response.data.data,
          });
        } else {
          console.log(response.data.status);
          alert('Invalid credentials');
        }
      });
  };

  render() {
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
          <Text style={style.txt_heading}>
            Return, Refund {'&'} Cancellation Policy
          </Text>
        </View>

        <View
          style={{
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
            opacity: 0.15,
          }}
        />

        <ScrollView style={{flex: 1}}>
          <HTMLView
            style={{
              fontSize: 18,
              color: 'black',
              marginTop: 10,
              marginLeft: 10,
            }}
            value={this.state.refer_data}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

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
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 18,
  },
});
