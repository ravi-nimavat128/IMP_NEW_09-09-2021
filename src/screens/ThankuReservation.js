import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {is_order_type} from '../reducers/cartItems/actions';

export class ThankuReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <TouchableOpacity
          style={{marginTop: 15, alignSelf: 'baseline'}}
          onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../assets/image/back_arrow.png')}
            style={{
              height: 20,
              width: 30,
              marginLeft: 20,
              resizeMode: 'contain',
            }}></Image>
        </TouchableOpacity>
        <ScrollView>
          <View
            style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
            <Image
              source={require('../assets/image/thanku_reservation.png')}
              style={{height: 170, width: 170, marginTop: 110}}></Image>

            <Text style={{color: 'black', marginTop: 60, fontSize: 22}}>
              Thank you for your reservation!
            </Text>
            <Text style={{color: 'black', marginTop: 60, fontSize: 22}}>
              Booking ID : {this.props.route.params.booking_id}
            </Text>
            <Text
              style={{
                color: 'black',
                marginTop: 60,
                fontSize: 17,
                marginHorizontal: 60,
                textAlign: 'center',
              }}>
              Please note that your table reservation will be cancelled if you
              arrive lete at the restaurant
            </Text>

            <TouchableOpacity
              onPress={() => {
                this.props.is_order_type('3');
                this.props.navigation.replace('MainNavigator');
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                width: '90%',
                borderRadius: 8,
                backgroundColor: '#FF9400',
                marginTop: 120,
                marginBottom: 30,
                shadowColor: '#000000',
                shadowOffset: {width: 0, height: 10}, // change this for more shadow
                shadowOpacity: 1,
                shadowRadius: 6,
                elevation: 5,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                Book more table
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  is_order_type,
};

export default connect(mapStateToProps, mapDispatchToProps)(ThankuReservation);
