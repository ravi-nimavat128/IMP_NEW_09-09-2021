import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';

export const SLIDER_WIDTH3 = Dimensions.get('window').width;
export const ITEM_WIDTH3 = Math.round(SLIDER_WIDTH3 * 1);

const CarouselCardItem3 = ({item, index}) => {
  return (
    <View style={styles.container} key={index}>
      <ImageBackground
        source={item.imgUrl}
        style={styles.image}
        imageStyle={{resizeMode: 'stretch'}}>
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          {/* <Text
            style={{
              fontSize: 20,
              color: 'white',
              marginRight: 80,
              fontWeight: 'bold',
            }}>
            {item.cat_name}
          </Text> */}
          {/* <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                opacity: 0.5,
                fontWeight: 'bold',
              }}>
              {item.option}
            </Text>
            {/* 
            <Text style={{fontSize: 12, color: 'white', opacity: 0.5}}>
              {item.time}
            </Text> */}
          {/* </View> */}
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // borderRadius: 40,
    width: ITEM_WIDTH3,
    alignSelf: 'center',
    // paddingBottom: 40,
    // shadowColor: '#000',

    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 7,
  },
  image: {
    width: ITEM_WIDTH3,
    borderRadius: 0,

    height: 230,
  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CarouselCardItem3;
