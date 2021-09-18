import * as React from 'react';
import {View, Text, Button, Image, StatusBar, Keyboard} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {platform} from 'react-native';

import Add_rest from '../screens/Add_rest';
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import TagScreen from '../screens/Tag';
import CartScreen from '../screens/Cart';
import ProfileScreen from '../screens/Profile';
import TopTabNavigator from './TopTabNavigator';
import Splash from '../screens/Splash';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import Help from '../screens/Help';
import AboutUs from '../screens/AboutUs';
import ContactUs from '../screens/ContactUs';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import TermsCondition from '../screens/TermsCondition';
import ReturnRefund from '../screens/ReturnRefund';
import Login from '../screens/Login';
import Order from '../screens/Order';
import ApplyCoupon from '../screens/ApplyCoupon';
import CartIcon from '../Components/CartIcon';
import {connect} from 'react-redux';
import {addToCart} from '../reducers/cartItems/actions';
import SignUp from '../screens/SignUp';
import EditProfile from '../screens/EditProfile';
import PastOrder from '../screens/PastOrder';
import Address from '../screens/Address';
import MyOrder from '../screens/MyOrder';
import ManageAddres from '../screens/ManageAddres';
import EditAddress from '../screens/EditAddress';
import PaymentOption from '../screens/PaymentOption';
import PaymentScreen from '../screens/PaymentScreen';
import OTP from '../screens/OTP';
import SelectOrderMode from '../screens/SelectOrderMode';
import ThankuReservation from '../screens/ThankuReservation';
import ReservationConfirm from '../screens/ReservationConfirm';
import ReserveTable from '../screens/ReserveTable';
import ReservationDateTime from '../screens/ReservationDateTime';
import EditContectInfo from '../screens/EditContectInfo';
import DineIn from '../screens/DineIn';
import MyReservation from '../screens/MyReservation';

var home_icon = require('../assets/image/home_icon.png');
var search_icon = require('../assets/image/search_icon.png');
var tag_icon = require('../assets/image/tag_icon.png');
var cart_icon = require('../assets/image/cart_icon.png');
var profile_icon = require('../assets/image/profile_icon.png');

var select_home_icon = require('../assets/image/select_home_icon.png');
var select_search_icon = require('../assets/image/select_search_icon.png');
var select_tag_icon = require('../assets/image/select_tag_icon.png');
var select_cart_icon = require('../assets/image/select_cart_icon.png');
var select_profile_icon = require('../assets/image/select_profile_icon.png');

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const mapStateToProps = state => ({
  myItems: state.cartItems.items,
});

const mapDispatchToProps = {
  addToCart,
};
const MyTabs = connect(
  mapStateToProps,
  mapDispatchToProps,
)(props => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#BE984A',
        showLabel: false,
        style: {opacity: 0.8, position: 'absolute', height: 70},
      }}>
      <Tab.Screen
        name="Home"
        component={TopTabNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={focused ? select_home_icon : home_icon}
              style={{
                width: 20,
                height: 20,
                // backgroundColor: 'red',
                tintColor: focused ? '#CA0227' : 'black',
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={focused ? select_search_icon : search_icon}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#CA0227' : 'black',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tag"
        component={TagScreen}
        options={{
          tabBarLabel: 'tag',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={focused ? select_tag_icon : tag_icon}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#CA0227' : 'black',
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarBadge: props.myItems.length == 0 ? null : props.myItems.length,
          tabBarBadgeStyle: {
            backgroundColor: '#BE984A',
            marginTop: 10,
            fontWeight: 'bold',
            fontSize: 12,
          },
          tabBarIcon: ({focused, color, size}) => (
            <CartIcon focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={focused ? select_profile_icon : profile_icon}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#CA0227' : 'black',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
});

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />

      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainNavigator"
          component={MyTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ContectUs"
          component={ContactUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TermsCondition"
          component={TermsCondition}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReturnRefund"
          component={ReturnRefund}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Order"
          component={Order}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ApplyCoupon"
          component={ApplyCoupon}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PastOrder"
          component={PastOrder}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyOrder"
          component={MyOrder}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ManageAddress"
          component={ManageAddres}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditAddress"
          component={EditAddress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentOption"
          component={PaymentOption}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectOrderMode"
          component={SelectOrderMode}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ThankuReservation"
          component={ThankuReservation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResevertionConfirm"
          component={ReservationConfirm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReserveTable"
          component={ReserveTable}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReservationDateTime"
          component={ReservationDateTime}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditContectInfo"
          component={EditContectInfo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add_rest"
          component={Add_rest}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dinein"
          component={DineIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyReservation"
          component={MyReservation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
