// React Native Tab
// https://aboutreact.com/react-native-tab/
import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
/*import
  MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';*/

import DeliveryScreen from '../screens/Delivery';
import TakeawayScreen from '../screens/Takeaway';
import {connect} from 'react-redux';

import {
  addToCart,
  increaseQty,
  manage_qty,
  removeToCart,
  addOffer,
  remove_full_cart,
  is_order_type,
} from '../reducers/cartItems/actions';
import {
  Alert,
  Pressable,
  // TouchableOpacity,
  TouchablePreOpacity,
  Text,
  Touchable,
  View,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppDimensions} from '../constants/AppDimensions';
import DineIn from '../screens/DineIn';
import {BottomSheet} from 'react-native-btr';
import axios from 'axios';

const Tab = createMaterialTopTabNavigator();

// function TopTabNavigator(props) {

class TopTabNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address_visible: false,
      address_data: [],
      selected_address_iddd: [],
      idddd: null,
      selected_address: {
        id: '',
        landmark: '',
        address1: '',
        address2: '',
        type: '',
        lat: 0,
        long: 0,
      },
    };
  }
  toggleBottomaddressView = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState(state => ({
      address_visible: !state.address_visible,
    }));
  };
  getSingleAddress = address_id => {
    let formdata = new FormData();
    formdata.append('address_id', address_id);
    console.log('form_data', formdata);

    axios
      .post(
        'https://www.binarygeckos.com/imp/apis/address/get_single_addres',
        formdata,
      )
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            selected_address: {
              id: Response.data.id,
              address1: Response.data.address1,
              address2: Response.data.address2,
              landmark: Response.data.landmark,
              type: Response.data.type,
              lat: Response.data.lat,
              long: Response.data.long,
            },
          });
        } else {
          this.setState({
            isLoading: false,
          });
          // Alert.alert('', Response.data.message);

          // Alert.alert('', Response.data.message);
        }
      });
    console.log('form data', formdata);
  };

  AddressItemView = ({item, index}) => {
    return (
      <View style={{marginHorizontal: 15}}>
        <Pressable
          onPress={() => {
            this.getSingleAddress(
              // this.state.selected_address_iddd.map(i => i.id)
              //   ? this.state.selected_address_iddd.map(i => i.id)
              item.id,
            );
            console.log('selected id', item.id);
            this.toggleBottomaddressView();
          }}>
          {item.type == 1 ? (
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/image/house_icon.png')}
                style={{
                  height: 10,
                  width: 10,
                  tintColor: '#BE984A',
                  alignSelf: 'center',
                }}
              />
              <Text style={{fontSize: 15, alignSelf: 'center', marginLeft: 8}}>
                home
              </Text>
            </View>
          ) : null}
          {item.type == 2 ? (
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/image/brefcase_icon.png')}
                style={{
                  height: 10,
                  width: 10,
                  tintColor: '#BE984A',
                  alignSelf: 'center',
                }}
              />
              <Text style={{fontSize: 15, alignSelf: 'center', marginLeft: 8}}>
                work
              </Text>
            </View>
          ) : null}

          {item.type == 3 ? (
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/image/location_icon.png')}
                style={{
                  height: 10,
                  width: 10,
                  tintColor: '#BE984A',
                  alignSelf: 'center',
                }}
              />
              <Text style={{fontSize: 15, alignSelf: 'center', marginLeft: 8}}>
                other
              </Text>
            </View>
          ) : null}

          <Text style={{fontSize: 13}}>{item.address1}</Text>
          <View
            style={{
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              marginVertical: 12,
            }}
          />
        </Pressable>
      </View>
    );
  };
  componentDidMount() {
    this._getAddresses();
    // this.get_produst_ids();
    // this.TotalItemPrice();
    // this.setState({
    //   idddd: this.state.selected_address_iddd[0]
    //     ? this.state.selected_address_iddd[0]
    //     : '',
    // });

    this.onFocusSubscribe = this.props.navigation.addListener('focus', () => {
      // Your code
      this._getAddresses();
      // this.get_produst_ids();
    });
  }
  _getAddresses = () => {
    this.setState({address_data: []});
    let formdata = new FormData();
    formdata.append('user_id', this.props.user_id);

    axios
      .post(
        'https://www.binarygeckos.com/imp/apis/address/get_my_address',
        formdata,
      )
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            address_data: Response.data.result ? Response.data.result : [],
            // selected_address_iddd: Response.data.result.map(i => i.id),

            isLoading: false,
          });
          // this.state.selected_address_iddd.length < 1
          //   ? null
          //   : this.getSingleAddress(this.state.selected_address_iddd[0]);
        } else {
          this.setState({
            isLoading: false,
          });
          // Alert.alert('', Response.data.message);
        }
      });
  };

  render() {
    console.log(
      'address_data',
      JSON.stringify(this.state.address_data, null, 2),
    );
    console.log('selected address', this.state.selected_address);
    return (
      <View
        style={{
          height: 85,
          width: AppDimensions.width,
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            backgroundColor: 'black',
            height: 45,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text style={{color: 'white', alignSelf: 'center', marginLeft: 15}}>
            {this.state.selected_address.address1.length !== 0
              ? 'Rajkot'
              : 'No location selected'}
          </Text>
          <Pressable
            onPress={() => this.toggleBottomaddressView()}
            style={{
              height: 25,
              borderRadius: 4,
              borderColor: 'white',
              borderWidth: 1,
              // width: 60,
              alignSelf: 'center',
              marginRight: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 11, marginHorizontal: 5}}>
              {this.state.selected_address.address1.length !== 0
                ? 'CHANGE LOCATION'
                : 'SET LOCATION'}
            </Text>
          </Pressable>
          <BottomSheet
            visible={this.state.address_visible}
            //setting the visibility state of the bottom shee
            onBackButtonPress={this.toggleBottomaddressView}
            //Toggling the visibility state on the click of the back botton
            // onBackdropPress={this.toggleBottomNavigationView}
            //Toggling the visibility state on the clicking out side of the sheet
          >
            <View style={{marginTop: 140}}>
              <Pressable
                onPress={() => {
                  this.toggleBottomaddressView();
                }}
                style={{
                  alignSelf: 'center',
                  // paddingLeft: 35,
                  // paddingVertical: 15,
                  // marginRight: 15,
                  height: 50,
                  width: 50,
                  borderRadius: 50 / 2,
                  marginBottom: 20,
                  backgroundColor: '#181616',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // paddingHorizontal: 10,
                }}>
                <Image
                  source={require('../assets/image/close_icon.png')}
                  style={{
                    height: 13,
                    width: 13,
                    alignSelf: 'center',
                    tintColor: 'white',
                    // marginRight: 20,
                  }}
                />
              </Pressable>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                width: '100%',
                // marginTop: 150,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  marginTop: 20,
                  marginLeft: 15,
                }}>
                Select An Address
              </Text>
              <View
                style={{
                  borderBottomColor: 'black',
                  opacity: 0.4,
                  borderBottomWidth: 0.8,
                  marginTop: 15,
                  marginHorizontal: 15,
                }}
              />
              <View>
                <FlatList
                  style={{marginTop: 20}}
                  data={this.state.address_data}
                  renderItem={this.AddressItemView}
                  keyExtractor={(item, index) => index.toString()}></FlatList>
                <Pressable
                  onPress={() => this.props.navigation.navigate('Address')}>
                  <Text
                    style={{
                      marginTop: 15,
                      color: '#BE984A',
                      fontSize: 15,
                      marginLeft: 15,
                    }}>
                    +Add Address
                  </Text>
                </Pressable>
              </View>
            </View>
          </BottomSheet>
        </View>

        <Tab.Navigator
          swipeEnabled={false}
          initialRouteName={
            this.props.is_order == '2'
              ? 'Takeaway'
              : this.props.is_order == '3'
              ? 'DineIn'
              : 'Delivery'
          }
          // screenOptions={({route}) => ({
          //   tabBarLabel: ({focused, color, size}) => {
          //     if (route.name === 'Delivery') return button1();
          //     if (route.name === 'Takeaway') return button2();
          //   },
          // })}

          tabBarOptions={{
            swipeEnabled: false,
            activeTintColor: '#000000',
            labelStyle: {
              fontSize: 20,
              textTransform: 'capitalize',
            },
            showLabel: true,
            showIcon: true,
            scrollEnabled: false,
            tabStyle: {
              alignSelf: 'center',
              backgroundColor: null,
              height: 85,
              // marginHorizontal: 78,
              // opacity: 0.7,
              // width: AppDimensions.width / 4,
            },

            indicatorStyle: {
              backgroundColor: '#00000000',
              height: '3%',
              marginLeft: 19,
              marginBottom: 8,
              width: '35%',
            },
            // labelStyle: {fontSize: 20, textTransform: 'capitalize'},
          }}>
          <Tab.Screen
            name="Delivery"
            component={DeliveryScreen}
            listeners={{
              tabPress: e => {
                // Prevent default action
                // Alert.alert('Delivery', props.is_order);
                this.props.is_order_type('1');
              },
            }}
            options={{
              // tabBarIcon: ({focused}) => (
              //   <Image
              //     source={require('../assets/image/scooter_icon.png')}
              //     style={{
              //       height: 25,
              //       width: 25,
              //       resizeMode: 'contain',
              //       tintColor: 'black',
              //     }}></Image>
              // ),

              tabBarLabel: ({focused}) => (
                <View
                  style={{
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                  }}>
                  <Image
                    source={require('../assets/image/scooter_icon.png')}
                    style={{
                      height: 25,
                      width: 25,
                      resizeMode: 'contain',
                      tintColor: focused ? '#CA0227' : 'gray',
                    }}></Image>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: focused ? '#CA0227' : 'gray',
                    }}>
                    DELIVERY
                  </Text>
                </View>
              ),
              // tabBarIcon: ({focused, color, size}) => (
              //   <Image
              //     source={require('../assets/image/scooter_icon.png')}
              //     style={{
              //       width: 25,
              //       height: 25,
              //       alignSelf: 'flex-end',
              //       tintColor: focused ? '#CA0227' : 'gray',
              //     }}
              //   />
              // ),

              gestureEnabled: false,
            }}
          />
          <Tab.Screen
            name="Takeaway"
            component={TakeawayScreen}
            listeners={{
              tabPress: e => {
                // Prevent default action
                // alert(props.token);
                this.props.is_order_type('2');
              },
            }}
            options={{
              // tabBarButton: () => (
              //   <TouchableOpacity onPress={() => Alert.alert('askgfasjkhj')}>
              //     <Text>HEllo</Text>
              //   </TouchableOpacity>
              // ),
              // tabBarLabel: 'Takeaway',
              // tabBarLabel: () => (
              //   <View>
              //     <TouchableOpacity
              //       onPress={() => {
              //         Alert.alert('lol');
              //       }}>
              //       <Text>HEllo</Text>
              //     </TouchableOpacity>
              //   </View>
              // ),
              // tabBarLabel: 'Takeaway',
              tabBarLabel: ({focused}) => (
                <View
                  style={{
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                  }}>
                  <Image
                    source={require('../assets/image/take_away_icon.png')}
                    style={{
                      height: 25,
                      width: 25,
                      resizeMode: 'contain',
                      tintColor: focused ? '#CA0227' : 'gray',
                    }}></Image>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: focused ? '#CA0227' : 'gray',
                    }}>
                    TAKEAWAY
                  </Text>
                </View>
              ),
              // tabBarIcon: ({focused, color, size}) => (
              //   <Image
              //     source={require('../assets/image/take_away_icon.png')}
              //     style={{
              //       width: 25,
              //       height: 25,
              //       tintColor: focused ? '#CA0227' : 'gray',
              //     }}
              //   />
              // ),
              gestureEnabled: false,
            }}
          />

          <Tab.Screen
            name="DineIn"
            component={DineIn}
            listeners={{
              tabPress: e => {
                // Prevent default action
                // alert(props.token);
                this.props.is_order_type('3');
              },
            }}
            options={{
              // tabBarButton: () => (
              //   <TouchableOpacity onPress={() => Alert.alert('askgfasjkhj')}>
              //     <Text>HEllo</Text>
              //   </TouchableOpacity>
              // ),
              // tabBarLabel: 'Takeaway',
              // tabBarLabel: () => (
              //   <View>
              //     <TouchableOpacity
              //       onPress={() => {
              //         Alert.alert('lol');
              //       }}>
              //       <Text>HEllo</Text>
              //     </TouchableOpacity>
              //   </View>
              // ),
              // tabBarLabel: 'Takeaway',
              tabBarLabel: ({focused}) => (
                <View
                  style={{
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                  }}>
                  <Image
                    source={require('../assets/image/3rd_icon.png')}
                    style={{
                      height: 25,
                      width: 25,
                      resizeMode: 'contain',
                      tintColor: focused ? '#CA0227' : 'gray',
                    }}></Image>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: focused ? '#CA0227' : 'gray',
                    }}>
                    DINE-IN
                  </Text>
                </View>
              ),
              // tabBarIcon: ({focused, color, size}) => (
              //   <Image
              //     source={require('../assets/image/take_away_icon.png')}
              //     style={{
              //       width: 25,
              //       height: 25,
              //       tintColor: focused ? '#CA0227' : 'gray',
              //     }}
              //   />
              // ),
              gestureEnabled: false,
            }}
          />
        </Tab.Navigator>
      </View>
    );
  }
}

button1 = () => {
  return (
    <View>
      <TouchableOpacity
        onPress={(e => Alert.alert('delivery'), e.preventDefault())}>
        <Text style={{color: 'black'}}>Delivery</Text>
      </TouchableOpacity>
    </View>
  );
};

button2 = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => Alert.alert('takeaways')}>
        <Text>Takeaways</Text>
      </TouchableOpacity>
    </View>
  );
};

mapStateToProps = state => ({
  user_id: state.userDetails.user_id,

  is_order: state.cartItems.is_order_type,
  push_token: state.userDetails.add_pushnotification_token,
  token: state.userDetails.add_pushnotification_token,
});

mapDispatchToProps = {
  is_order_type,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopTabNavigator);
