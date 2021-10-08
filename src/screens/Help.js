import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

var back_arrow = require('../assets/image/back_arrow.png');

const Help = ({navigation}) => {
  return (
    <SafeAreaView
      style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
      <View style={style.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row'}}>
          <Image source={back_arrow} style={style.back_img} />
        </TouchableOpacity>
        <Text style={style.txt_heading}>Help</Text>
      </View>

      <View
        style={{
          borderBottomColor: '#000000',
          borderBottomWidth: 1,
          marginBottom: 31,
          opacity: 0.15,
        }}
      />
      <TouchableOpacity
        style={style.fild_main}
        onPress={() => navigation.navigate('AboutUs')}>
        <View style={{flex: 2, flexDirection: 'column'}}>
          <Text style={style.text_all}>About Us</Text>
        </View>
        <View
          style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/image/next.png')}
            style={{
              height: 16,
              width: 9,
              alignSelf: 'flex-end',
            }}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: '#EAEAEA',
          marginTop: 10,
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
      />

      <TouchableOpacity
        style={style.fild_main}
        onPress={() => navigation.navigate('ContectUs')}>
        <View style={{flex: 2, flexDirection: 'column'}}>
          <Text style={style.text_all}>Contact Us</Text>
        </View>
        <View
          style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/image/next.png')}
            style={{
              height: 16,
              width: 9,
              alignSelf: 'flex-end',
            }}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: '#EAEAEA',
          marginTop: 10,
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
      />

      <TouchableOpacity
        style={style.fild_main}
        onPress={() => navigation.navigate('PrivacyPolicy')}>
        <View style={{flex: 2, flexDirection: 'column'}}>
          <Text style={style.text_all}>Privacy Policy</Text>
        </View>
        <View
          style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/image/next.png')}
            style={{
              height: 16,
              width: 9,
              alignSelf: 'flex-end',
            }}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: '#EAEAEA',
          marginTop: 10,
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
      />

      <TouchableOpacity
        style={style.fild_main}
        onPress={() => navigation.navigate('TermsCondition')}>
        <View style={{flex: 2, flexDirection: 'column'}}>
          <Text style={style.text_all}>Terms {'&'} Condition</Text>
        </View>
        <View
          style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/image/next.png')}
            style={{
              height: 16,
              width: 9,
              alignSelf: 'flex-end',
            }}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: '#EAEAEA',
          marginTop: 10,
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
      />

      <TouchableOpacity
        style={style.fild_main}
        onPress={() => navigation.navigate('ReturnRefund')}>
        <View style={{flex: 2, flexDirection: 'column'}}>
          <Text style={style.text_all}>
            Return, Refund {'&'} Cancellation Policy
          </Text>
        </View>
        <View
          style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/image/next.png')}
            style={{
              height: 16,
              width: 9,
              alignSelf: 'flex-end',
            }}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: '#EAEAEA',
          marginTop: 10,
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
      />
    </SafeAreaView>
  );
};

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
    marginLeft: 18,
    marginTop: 18,
  },
  fild_main: {
    flexDirection: 'row',
    marginTop: 17,
    marginRight: 26,
  },

  text_all: {
    fontSize: 15,
    textAlign: 'left',
    color: 'black',
    marginLeft: 28,
  },
});

export default Help;
