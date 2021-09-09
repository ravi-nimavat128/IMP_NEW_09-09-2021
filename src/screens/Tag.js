import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Touchable,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {connect} from 'react-redux';

var img = require('../assets/image/img_tag_screen.png');

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offer_data: [],
      isLoading: false,
      copy_text: '',
    };
  }
  componentDidMount() {
    this.getOfferData();
  }
  componentDidUpdate(preState, preProps) {
    if (preState.copy_text !== this.state.copy_text) {
      this.fetchCopiedText();
    }
  }
  fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    this.setState({copy_text: text});
  };

  ItemView = ({item, index}) => {
    return (
      <View
        style={{
          width: Dimensions.get('screen').width,
        }}>
        <ImageBackground
          source={require('../assets/image/coupon3.png')}
          // resizeMode={'contain'}
          style={{
            flexDirection: 'row',
            marginVertical: 8,
            width: Dimensions.get('screen').width,
            height: 120,
          }}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 1, margin: 10, marginLeft: 60}}>
            <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
            <Text style={{fontWeight: 'bold'}}>{item.percentage}%</Text>
            <Text style={{fontSize: 11, color: 'gray', opacity: 0.5}}>
              {item.description}%
            </Text>
            <TouchableOpacity
              onPress={() => Clipboard.setString(item.name)}
              style={{
                alignSelf: 'flex-end',
                backgroundColor:
                  this.state.copy_text == item.name ? 'green' : '#BE984A',
                borderRadius: 5,
                marginTop: 8,
                marginRight: 10,
              }}>
              <Text
                style={{
                  paddingVertical: 3,
                  paddingHorizontal: 20,
                  color: 'white',
                }}>
                {this.state.copy_text == item.name ? 'COPIED' : 'COPY'}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };

  getOfferData = () => {
    this.setState({isLoading: true});
    axios
      .get('https://www.binarygeckos.com/imp/apis/product/get_offers')
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({offer_data: Response.data.results, isLoading: false});
        } else {
          this.setState({isLoading: false});
        }
      });
  };

  render() {
    // console.log(this.state.offer_data);

    return (
      <SafeAreaView style={style.container}>
        {this.state.offer_data == 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
            <Image source={img} style={style.img} />

            <Text style={style.text1}>YOU MISSED IT!</Text>
            <Text style={style.text}>
              No offers are available currently. Please check back later.
            </Text>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
            }}>
            {this.state.offer_data == 0 ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
                <Text
                  style={{
                    color: 'black',
                    fontSize: 14,
                    alignSelf: 'center',
                    marginTop: 130,
                  }}>
                  NO COUPON TO COPY
                </Text>
              </View>
            ) : (
              <FlatList
                style={{flex: 1}}
                data={this.state.offer_data}
                renderItem={this.ItemView}
                keyExtractor={(item, id) => id.toString()}></FlatList>
            )}
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  text: {
    fontSize: 14,
    color: '#000000',
    marginHorizontal: 25,
    textAlign: 'center',
    marginTop: 10,
  },

  text1: {
    fontSize: 16,
    color: '#000000',
  },

  img: {
    height: 93,
    width: 77,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  offer: state.cartItems.offer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
