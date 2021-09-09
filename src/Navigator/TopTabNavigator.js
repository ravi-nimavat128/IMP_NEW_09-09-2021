// React Native Tab
// https://aboutreact.com/react-native-tab/
import 'react-native-gesture-handler';

import * as React from 'react';
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
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppDimensions} from '../constants/AppDimensions';
import DineIn from '../screens/DineIn';

const Tab = createMaterialTopTabNavigator();

function TopTabNavigator(props) {
  return (
    <View
      style={{
        height: 85,
        width: AppDimensions.width,
        flex: 1,

        backgroundColor: 'white',
      }}>
      <Tab.Navigator
        swipeEnabled={false}
        initialRouteName={
          props.is_order == '2'
            ? 'Takeaway'
            : props.is_order == '3'
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
              props.is_order_type('1');
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
                  Delivery
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
              props.is_order_type('2');
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
                  Takeaway
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
              props.is_order_type('3');
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
                  Dine-in
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

const button1 = () => {
  return (
    <View>
      <TouchableOpacity
        onPress={(e => Alert.alert('delivery'), e.preventDefault())}>
        <Text style={{color: 'black'}}>Delivery</Text>
      </TouchableOpacity>
    </View>
  );
};

const button2 = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => Alert.alert('takeaways')}>
        <Text>Takeaways</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => ({
  is_order: state.cartItems.is_order_type,
  push_token: state.userDetails.add_pushnotification_token,
  token: state.userDetails.add_pushnotification_token,
});

const mapDispatchToProps = {
  is_order_type,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopTabNavigator);

// export default function TopTabNavigator() {
//   return (
//     <NavigationContainer>
//       <MyTabs />
//     </NavigationContainer>
//   );
// }
