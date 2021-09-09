import React, {Component} from 'react';
import axios from 'axios';
import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Touchable,
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';

var back_arrow = require('../assets/image/back_arrow.png');
import {
  addToCart,
  increaseQty,
  getMainCat,
  manage_qty,
  removeToCart,
  add_main_cat_id,
  main_cat_name,
  addOffer,
} from '../reducers/cartItems/actions';

class ApplyCoupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offer_data: [],
      isLoading: true,
      txt_offer: '',
      offer: [],
    };
  }

  ItemView = ({item, index}) => {
    console.log(JSON.stringify(item, null, 2));
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            justifyContent: 'space-between',
          }}>
          <ImageBackground
            source={require('../assets/image/offer_img.png')}
            style={{
              height: 50,
              alignSelf: 'center',
              width: 180,
              marginLeft: 1,
              justifyContent: 'center',
            }}
            resizeMode={'contain'}>
            <Text
              style={{
                alignSelf: 'flex-end',
                marginRight: 42,
                fontWeight: 'bold',
                fontSize: 13,
              }}>
              {item.name}
            </Text>
          </ImageBackground>

          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => {
              this.props.addOffer(item);
              this.props.navigation.goBack();
            }}>
            <Text
              style={{
                color: '#BE984A',
                fontWeight: 'bold',
                marginRight: 15,
                margin: 10,
              }}>
              APPLY
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{marginLeft: 25, fontWeight: 'bold', fontSize: 17}}>
          {item.percentage}% OFF
        </Text>
        <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            opacity: 0.2,
            marginTop: 8,
            marginHorizontal: 10,
            marginBottom: 10,
          }}></View>
        <Text style={{marginLeft: 25, fontSize: 14}}>{item.description}</Text>
        <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            opacity: 0.2,
            marginTop: 8,

            marginBottom: 10,
          }}></View>
      </View>
    );
  };

  componentDidMount() {
    this.getOfferData();
  }

  CheckCoupon = () => {
    let formData = new FormData();
    formData.append('offer_name', this.state.txt_offer);

    axios
      .post(
        'https://www.binarygeckos.com/imp/apis/product/get_single_offer_details',
        formData,
      )
      .then(Response => {
        if (Response.data.status == 1) {
          this.props.addOffer({
            id: Response.data.id,
            name: Response.data.name,
            percentage: Response.data.percentage,
            description: Response.data.description,
            attchment: Response.data.attchment,
          });
          this.props.navigation.goBack();
        } else {
          Alert.alert('', Response.data.message);
        }
      });
  };

  getOfferData = () => {
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
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <ActivityIndicator size="large" color="#BE984A" animating={true} />
          <Text style={{color: '#BE984A', fontSize: 20, marginLeft: 10}}>
            Loading...
          </Text>
        </View>
      );
    }

    // console.log('offer data', JSON.stringify(this.state.offer_data, null, 2));
    console.log('offer data', JSON.stringify(this.props.offer, null, 2));

    return (
      <SafeAreaView style={styles.main_container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{flexDirection: 'row'}}>
            <Image source={back_arrow} style={styles.back_img} />
          </TouchableOpacity>
          <Text style={styles.txt_heading}>Apply Coupon</Text>
        </View>

        <View style={styles.main_coupon}>
          <View style={styles.sub_coupon}>
            <TextInput
              onChangeText={text => this.setState({txt_offer: text})}
              placeholder="Past / Enter Coupon Code"
              style={styles.txt_input}></TextInput>
            <TouchableOpacity
              onPress={() => {
                this.CheckCoupon();
              }}
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#BE984A', fontSize: 16, marginRight: 25}}>
                APPLY
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1}}>
          {this.state.offer_data == 0 ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
            <View>
              <FlatList
                // style={{flex: 1}}
                data={this.state.offer_data}
                renderItem={this.ItemView}
                keyExtractor={(item, id) => id.toString()}></FlatList>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  offer: state.cartItems.offer,
});

const mapDispatchToProps = {
  addOffer,
};

// export default connect(mapDispatchToProps, mapStateToProps)(ApplyCoupon);

export default connect(mapStateToProps, mapDispatchToProps)(ApplyCoupon);

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: 'white',
  },
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
  main_coupon: {
    height: 110,
    backgroundColor: '#F5F8F5',
  },
  sub_coupon: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    borderColor: '#BFC2BF',
    borderWidth: 1,
    borderRadius: 5,
  },
  txt_input: {
    marginLeft: 15,
    flex: 1,
  },
});
