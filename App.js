import React, {Component, useState, useEffect} from 'react';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification from 'react-native-push-notification';
// import Firebase from '@react-native-firebase/app';

import {
  NavigationContainer,
  createAppContainer,
} from '@react-navigation/native';

import {PersistGate} from 'redux-persist/integration/react';
// import Splash from './screens/Splash';
// import Login from './screens/Login';
import BottomNavigator from './src/Navigator/BottomNavigator';
import messaging from '@react-native-firebase/messaging';
import {SafeAreaView} from 'react-native';
import {connect, Provider} from 'react-redux';
import reduxStore from './src/Store/store';

//import stripe from 'tipsi-stripe';

// stripe.setOptions({
//   publishableKey:
//     'pk_test_51IDmWtD1m7XeWX6yn96HJSV3zMOUfDZveG6NF99Wd3b2MxN8pXmxbxswxd5WWdbWpohOSDjNkPVOpHDhQSGwCY9O00oIWGpfob',
//   // merchantId: 'MERCHANT_ID', // Optional
//   androidPayMode: 'test', // Android only
// });

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

function App({navigation, props}) {
  const {store, persistor} = reduxStore();
  const [isCalled, setCalled] = useState(false);
  if (!isCalled) {
    requestUserPermission();
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      messaging()
        .registerDeviceForRemoteMessages()
        .then(value => {
          console.log('REGISTER ', value);
          console.log('REGISTER ', value);
        });
    }
    console.log('REGISTER 2', messaging().isDeviceRegisteredForRemoteMessages);
    setCalled(true);
  }
  // useEffect(() => {
  //   return () => {};
  // }, []);

  // useEffect(() => {
  //   Firebase.initializeApp(this);
  //   PushNotification.configure({
  //     // (optional) Called when Token is generated (iOS and Android)
  //     onRegister: function (token) {
  //       console.log('TOKEN:', token);
  //       this.props.add_pushnotification_token(token);
  //     },

  //     // (required) Called when a remote is received or opened, or local notification is opened
  //     onNotification: function (notification) {
  //       console.log('NOTIFICATION:', notification);

  //       // process the notification

  //       // (required) Called when a remote is received or opened, or local notification is opened
  //       notification.finish(PushNotificationIOS.FetchResult.NoData);
  //     },

  //     // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  //     onAction: function (notification) {
  //       console.log('ACTION:', notification.action);
  //       console.log('NOTIFICATION:', notification);

  //       // process the action
  //     },

  //     // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  //     onRegistrationError: function (err) {
  //       console.error(err.message, err);
  //     },

  //     // IOS ONLY (optional): default: all - Permissions to register.
  //     permissions: {
  //       alert: true,
  //       badge: true,
  //       sound: true,
  //     },

  //     // Should the initial notification be popped automatically
  //     // default: true
  //     popInitialNotification: true,

  //     /**
  //      * (optional) default: true
  //      * - Specified if permissions (ios) and token (android and ios) will requested or not,
  //      * - if not, you must call PushNotificationsHandler.requestPermissions() later
  //      * - if you are not using remote notification or do not have Firebase installed, use this:
  //      *     requestPermissions: Platform.OS === 'ios'
  //      */
  //     requestPermissions: true,
  //   });
  // });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BottomNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}
const mapStateToProps = state => ({});

const mapDispatchToProps = {
  // add_pushnotification_token,
};

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
