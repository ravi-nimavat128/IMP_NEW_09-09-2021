import React, {Component, useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

import LinearGradient from 'react-native-linear-gradient';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ImageBackground,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from '../Components/CarouselCardItem';

import Carousel, {Pagination} from 'react-native-snap-carousel';

import {Dimensions} from 'react-native';
import Order from './Order';
import {connect} from 'react-redux';
import {
  addToCart,
  increaseQty,
  getMainCat,
  manage_qty,
  removeToCart,
  add_main_cat_id,
  main_cat_name,
} from '../reducers/cartItems/actions';
import ImageLoading from '../Components/ImageLoading';
import {AppDimensions} from '../constants/AppDimensions';
var img_url = 'https://www.binarygeckos.com/imphotel/upload/';

var banner_img = require('../assets/image/banner1.png');

let deviceWidth = Dimensions.get('window').width;

const slider_data = [
  {
    cat_name: 'MOCKTAILS',
    option: '11 options available',
    imgUrl: banner_img,
  },
  {
    cat_name: 'SHAKE',
    option: '13 options available',
    imgUrl: banner_img,
  },
  {
    cat_name: 'COFFEE',
    option: '11 options available',
    imgUrl: banner_img,
  },
  {
    cat_name: 'DESSERTS',
    option: '12 options available',
    imgUrl: banner_img,
  },
];

class Takeaway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: false,
      refreshing: false,
    };
  }
  componentDidMount() {
    this.FetchMainCat();
  }
  _handleRefresh = () => {
    let formData = new FormData();
    formData.append(
      'login_token',
      ';}mh3)G#5KiAA!ba?A}n[Lk^0TOS%Jl}pb4U%t22kG]1id9y[9hr)c(CBOhmTd4w2/v^m3?JAbn75*ZL6',
    );

    axios
      .post(
        'https://www.binarygeckos.com/imp/apis/product/get_categories',
        formData,
      )
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            isLoading: false,
            dataSource: Response.data.results,
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
      });
  };

  FetchMainCat = () => {
    // let formData = new FormData();
    // formData.append('login_token', this.props.login_token);

    this.setState({isLoading: true});

    axios
      .post(
        'https://www.binarygeckos.com/imp/apis/product/get_categories',
        // formData,
      )
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            isLoading: false,
            dataSource: Response.data.results,
          });
        } else {
          alert(Response.data.message);
          this.setState({
            isLoading: false,
          });
        }
      });
  };

  ItemView = ({item, index}) => {
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('Order', item);
          this.props.add_main_cat_id(item.id);
          this.props.main_cat_name(item.name);
        }}
        style={[
          styles.item,
          {
            flex:
              this.state.dataSource.length % 2 == 1 &&
              this.state.dataSource.length - 1 == index
                ? 0.49
                : 1,
          },
        ]}>
        <ImageLoading
          defaultImageSource={require('../assets/image/logo_main.png')}
          source={{uri: item.image}}
          style={styles.image}
          resizeMode="center">
          {/* <ImageBackground style={styles.image} source={{uri: item.image}}> */}

          {/* </ImageBackground> */}
        </ImageLoading>
        <LinearGradient
          colors={['black', 'transparent']}
          style={[
            styles.linearGradient,
            {
              flex:
                this.state.dataSource.length % 2 == 1 &&
                this.state.dataSource.length - 1 == index
                  ? 0.49
                  : 1,
              width:
                this.state.dataSource.length % 2 == 1 &&
                this.state.dataSource.length - 1 == index
                  ? '50%'
                  : '100%',
            },
          ]}>
          <Text style={styles.title}>{item.name}</Text>
          <Text
            style={{
              fontSize: 12,
              marginLeft: 8,
              marginTop: 3,
              color: 'white',
            }}>
            {item.total_products} options available
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  // const Delivery = () => {
  //   const renderItem = ({item}) => <Item title={(item.title, item.img)} />;

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View
    //       style={{
    //         flex: 1,
    //         justifyContent: 'center',
    //         alignContent: 'center',
    //         alignItems: 'center',
    //         flexDirection: 'row',
    //       }}>
    //       <ActivityIndicator size="large" color="#BE984A" animating={true} />
    //       <Text style={{color: '#BE984A', fontSize: 20, marginLeft: 10}}>
    //         Loading...
    //       </Text>
    //     </View>
    //   );
    // }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Carousel
              layout="default"
              layoutCardOffset={9}
              // ref={isCarousel}
              data={slider_data}
              renderItem={CarouselCardItem}
              sliderWidth={AppDimensions.width}
              loop={true}
              autoplay={true}
              autoplayInterval={3000}
              itemWidth={AppDimensions.width}
              inactiveSlideShift={0}
              onSnapToItem={index => this.setState({slider_dot: index})}
              useScrollView={true}
            />
          </View>

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
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginBottom: 90, marginTop: 5}}
            data={this.state.dataSource}
            //data defined in constructor
            // ItemSeparatorComponent={ItemSeparatorView}
            //Item Separator View
            renderItem={this.ItemView}
            keyExtractor={(item, id) => id.toString()}
            numColumns={2}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={this.state.refreshing}
            //     onRefresh={this._handleRefresh()}
            //   />
            // }
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  login_token: state.cartItems.login_token,
});

const mapDispatchToProps = {
  add_main_cat_id,
  main_cat_name,
};

export default connect(mapStateToProps, mapDispatchToProps)(Takeaway);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  item: {
    flexDirection: 'column',
    margin: 5,
    // width: Dimensions.get('window').width / 2.2,
  },
  title: {
    fontSize: 16,
    marginLeft: 8,
    marginTop: 8,
    color: 'white',
  },
  linearGradient: {
    position: 'absolute',
    height: 90,
    left: 0,
    right: 0,
    top: 0,
  },
  sub_title: {
    fontSize: 10,
    marginLeft: 8,
    marginTop: 3,
    color: 'white',
  },
  image: {
    height: 187,
    width: '100%',
    alignContent: 'center',
    borderRadius: 5,
  },
});
