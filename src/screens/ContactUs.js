import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

var back_arrow = require('../assets/image/back_arrow.png');

const ContectUs = ({navigation}) => {
  return (
    <SafeAreaView
      style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
      <View style={style.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row'}}>
          <Image source={back_arrow} style={style.back_img} />
        </TouchableOpacity>
        <Text style={style.txt_heading}>Contact Us</Text>
      </View>

      <View
        style={{
          borderBottomColor: '#000000',
          borderBottomWidth: 1,
          marginBottom: 31,
          opacity: 0.15,
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
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    marginLeft: 20,
  },
});

export default ContectUs;
