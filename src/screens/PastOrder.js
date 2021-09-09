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
  // TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import {TouchableOpacity} from 'react-native-gesture-handler';

import {connect} from 'react-redux';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
} from 'react-native-popup-dialog';
import {TextInput} from 'react-native-paper';
import {
  addPhoneNumber,
  addEmail,
  addUserName,
} from '../reducers/UserReducer/user_actions';

var back_arrow = require('../assets/image/back_arrow.png');

class PastOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      phone_number: '',
      PastOrderData: [],
    };
  }

  componentDidMount() {
    this.getPastOrderData();
  }

  ItemView = ({item, index}) => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            flex: 1,
            marginVertical: 5,
            width: Dimensions.get('screen').width,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 35,
              marginLeft: 70,
              borderTopLeftRadius: 40,
              borderBottomLeftRadius: 40,
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              height: item.isSelected === true ? 160 : 110,
              backgroundColor: 'white',
              width: '80%',
              alignSelf: 'center',

              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.9,
              shadowRadius: 2,
            }}>
            <View>
              <Text
                style={{
                  color: 'gray',
                  opacity: 0.8,
                  fontSize: 10,
                  alignSelf: 'flex-end',
                  marginRight: 15,
                }}>
                PLACED
              </Text>

              <Text
                style={{
                  color: 'gray',
                  opacity: 0.8,
                  fontSize: 9,
                  alignSelf: 'flex-end',
                  marginRight: 12,
                }}>
                {item.order_date}
              </Text>
            </View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 35,
                marginTop: -10,
              }}>
              {item.order_no}
            </Text>

            {item.product_details.slice(0, 2).map(itemm => {
              return (
                <View style={{flexDirection: 'row', marginLeft: 35}}>
                  <Image
                    source={require('../assets/image/vag.png')}
                    style={{height: 10, width: 10, alignSelf: 'center'}}
                    resizeMode={'center'}
                  />
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 12,
                      opacity: 0.7,
                      alignSelf: 'center',
                    }}>
                    {itemm.product_name} X {itemm.qty}
                  </Text>
                </View>
              );
            })}

            <Dialog
              visible={item.visible}
              dialogAnimation={
                new SlideAnimation({
                  slideFrom: 'bottom',
                })
              }
              footer={
                <DialogFooter bordered={false}>
                  <DialogButton
                    text="CANCEL"
                    textStyle={{fontSize: 15, color: '#BE984A'}}
                    onPress={() =>
                      this.setState({
                        PastOrderData: this.state.PastOrderData.map(
                          (item, sindex) => {
                            return {
                              ...item,
                              visible: (index == sindex) === !item.visible,
                              // ? !this.state.PastOrderData.isSelected
                              // : this.state.PastOrderData.isSelected,
                            };
                          },
                        ),
                      })
                    }
                  />
                </DialogFooter>
              }
              rounded
              onTouchOutside={() => {
                this.setState({PastOrderData: false});
              }}
              onHardwareBackPress={() => true}>
              <DialogContent
                style={{
                  width: Dimensions.get('window').width / 1.1,
                  marginTop: 15,
                }}>
                {item.product_details.map(itemm => {
                  // console.log(itemm);
                  return (
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../assets/image/vag.png')}
                        style={{height: 10, width: 10, alignSelf: 'center'}}
                        resizeMode={'center'}
                      />
                      <Text
                        style={{
                          marginLeft: 5,
                          fontSize: 15,
                          opacity: 0.7,
                          alignSelf: 'center',
                        }}>
                        {itemm.product_name} X {itemm.qty}
                      </Text>
                    </View>
                  );
                })}
              </DialogContent>
            </Dialog>
            {item.product_details.length > 2 ? (
              <TouchableOpacity
                style={{
                  marginTop: 5,
                  justifyContent: 'center',
                  width: '50%',
                }}
                onPress={() =>
                  this.setState({
                    PastOrderData: this.state.PastOrderData.map(
                      (item, sindex) => {
                        return {
                          ...item,
                          visible: (index == sindex) === !item.visible,
                          // ? !this.state.PastOrderData.isSelected
                          // : this.state.PastOrderData.isSelected,
                        };
                      },
                    ),
                  })
                }>
                <Text
                  style={{
                    fontSize: 13,
                    opacity: 0.7,
                    color: 'blue',
                    marginLeft: 35,
                    textDecorationLine: 'underline',
                  }}>
                  More...
                </Text>
              </TouchableOpacity>
            ) : null}

            {item.isSelected === true ? (
              <View style={{marginTop: 20}}>
                <Text style={{marginLeft: 35}}>
                  Net Amount : {item.total_amount}
                </Text>
                <Text style={{marginLeft: 35}}>
                  Order Mode :{' '}
                  {item.is_order_type == '1' ? 'Delivery' : 'Takeaway'}
                </Text>
              </View>
            ) : null}
          </View>
          <View
            style={{
              alignSelf: 'center',
              position: 'absolute',
              right: 15,
              width: 45,
              height: 45,

              borderRadius: 45 / 2,

              // zIndex: 100,
            }}>
            <TouchableOpacity
              style={{
                width: 42,
                height: 42,
                borderRadius: 42 / 2,
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.9,
                shadowRadius: 1,
                elevation: 3,
              }}
              onPress={() =>
                this.setState({
                  PastOrderData: this.state.PastOrderData.map(
                    (item, sindex) => {
                      return {
                        ...item,
                        isSelected: (index == sindex) === !item.isSelected,
                        // ? !this.state.PastOrderData.isSelected
                        // : this.state.PastOrderData.isSelected,
                      };
                    },
                  ),
                })
              }>
              <View
                style={{
                  backgroundColor: 'white',
                  width: 42,
                  height: 42,
                  borderRadius: 42 / 2,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/image/next.png')}
                  resizeMode={'center'}
                  style={{
                    width: 17,
                    tintColor: '#BE984A',
                    height: 17,
                    transform:
                      item.isSelected === true
                        ? [{rotate: '180deg'}]
                        : [{rotate: '0deg'}],
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              position: 'absolute',
              left: 20,
              backgroundColor: 'white',
              width: 68,
              marginLeft: 10,
              height: 68,
              borderRadius: 68 / 2,
              justifyContent: 'center',
              alignSelf: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.9,
              shadowRadius: 2,
              elevation: 6,
            }}>
            <Image
              source={require('../assets/image/logo_main.png')}
              resizeMode={'center'}
              style={{
                width: 45,
                height: 45,
                borderRadius: 45 / 2,
                alignSelf: 'center',
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  getPastOrderData = () => {
    this.setState({isLoading: true});

    let formData = new FormData();
    formData.append('user_id', this.props.userid);

    axios
      .post(
        'http://binarygeckos.com/imp/apis/orders/user_complete_orders',
        formData,
      )
      .then(response => {
        if (response.data.status == 1) {
          this.setState({
            isLoading: false,
            PastOrderData: response.data.result.map(item => {
              return {...item, isSelected: false, visible: false};
            }),
          });
        } else {
          alert(response.data.message);
          this.setState({isLoading: false});
        }
      });
  };

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
    // console.log(JSON.stringify(this.state.PastOrderData, null, 2));
    // console.log(JSON.stringify(this.state.clicked, null, 2));
    // console.log(JSON.stringify(this.state.clicked, null, 2));
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
          <Text style={style.txt_heading}>Past Order</Text>
        </View>

        <View
          style={{
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
            opacity: 0.15,
          }}
        />
        {this.state.PastOrderData == 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
              NO PAST ORDERS
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                opacity: 0.4,
              }}>
              All of past order will be shown here.
            </Text>
          </View>
        ) : (
          <ScrollView
            style={{
              flex: 1,
            }}>
            <View
              style={{
                marginVertical: 15,
                backgroundColor: '#BE984A',
                height:
                  this.state.PastOrderData.length >= 4
                    ? '100%'
                    : this.state.PastOrderData.length * 150,
                width: 100,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
                marginHorizontal: 5,
              }}>
              <FlatList
                style={{
                  flex: 1,
                  width: Dimensions.get('screen').width / 1.04,
                  marginRight: 50,
                  marginTop: 15,
                }}
                data={this.state.PastOrderData}
                renderItem={this.ItemView}
                keyExtractor={(item, index) => index.toString()}></FlatList>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  mobile_number: state.userDetails.mo_number,
  loginToken: state.userDetails.login_token,
  name: state.userDetails.user_name,
  email: state.userDetails.email,
  userid: state.userDetails.user_id,
});

const mapDispatchToProps = {
  addPhoneNumber,
  addUserName,
  addEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(PastOrder);

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 66,
    alignItems: 'center',
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
