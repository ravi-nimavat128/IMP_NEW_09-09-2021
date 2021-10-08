import axios from 'axios';
import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Touchable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {is_order_type} from '../reducers/cartItems/actions';

export class ReservationConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t_status: 0,
      isLoading: false,
    };
  }

  _OrderCancel() {
    Alert.alert('', 'Are you sure you want to cancel this booking ? ', [
      {
        text: 'Yes',
        onPress: () => {
          console.log('response', 'clicked _OrderCancel');
          var formData = new FormData();
          formData.append('user_id', this.props.user_id);
          formData.append('booking_id', this.props.route.params.booking_id);

          axios
            .post(
              'http://binarygeckos.com/imp/apis/restaurant/generals/booking_cancel_table',
              formData,
            )
            .then(Response => {
              console.log('response', Response.data);
              if (Response.data.status == 1) {
                {
                  Alert.alert('', 'Booking cancelled successfully ', [
                    {
                      text: 'Ok',
                      onPress: () => {
                        this.props.navigation.replace('MainNavigator');
                      },
                    },
                    {
                      text: 'Close',
                      onPress: () => {
                        this.props.navigation.replace('MainNavigator');
                      },
                      //                style: 'cancel',
                    },
                  ]);
                }

                /// this.props.navigation.replace('MainNavigator');
              } else {
                alert(Response.data.message);
              }
            });
        },
      },
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  }

  componentDidMount() {
    this.get_r_data();
    // this.interval();
    // do {
    //   // code block to be executed
    //   setTimeout(() => {
    //     this.get_r_data();
    //   }, 12000);
    // } while (this.state.t_status !== 1);
  }

  interval = () => {
    var myTimer = setInterval(
      () =>
        this.state.t_status == 1 ? this.get_r_data() : clearInterval(myTimer),
      1000,
    );
  };

  get_r_data = () => {
    var formData = new FormData();
    formData.append('user_id', this.props.user_id);
    formData.append('booking_id', this.props.route.params.booking_id);
    axios
      .post(
        'http://binarygeckos.com/imp/apis/restaurant/generals/check_status_book_table',
        formData,
      )
      .then(Response => {
        if (Response.data.status == 1) {
          if (Response.data.table_status == 1) {
            setTimeout(() => {
              this.get_r_data();
            }, 15000);
          } else {
            this.setState({
              t_status: Response.data.table_status,
            });
            console.log('Table status ', Response.data.table_status);
            if (Response.data.table_status == 2) {
              this.props.navigation.replace('ThankuReservation', {
                booking_id: this.props.route.params.booking_id,
              });
            } else {
              null;
            }
            if (Response.data.table_status == 3) {
              this.props.is_order_type('3');
              this.props.navigation.replace('OrderRejected', {
                booking_id: this.props.route.params.booking_id,
              });
            } else {
              null;
            }
          }
        } else {
          //  alert(Response.data.message);
        }
      });
    console.log(formData);
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
          <View
            style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
            <Text
              style={{
                color: 'black',
                marginTop: 150,
                fontSize: 22,
                textAlign: 'center',
              }}>
              Please wait while the {'\n'}restaurant manager confirms {'\n'}your
              reservation
            </Text>
            <Image
              source={require('../assets/image/gif.gif')}
              style={{height: 270, width: 270, marginTop: 80}}></Image>

            <TouchableOpacity
              onPress={() => this._OrderCancel()}
              style={{
                backgroundColor: '#F10114',
                marginTop: 8,
                height: 55,
                width: '90%',
                marginTop: 150,
                marginLeft: 20,
                marginRight: 20,
                marginHorizontal: 10,
                borderRadius: 5,
                justifyContent: 'center',
                color: '#fff',
              }}>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 18,
                    letterSpacing: 2,
                  }}>
                  Cancel Booking
                </Text>
              </View>
            </TouchableOpacity>

            {/* <ActivityIndicator
              animating={this.state.isLoading}
              color="#BE984A"
              style={{marginTop: 25}}
              size="large"></ActivityIndicator> */}
          </View>
        </ScrollView>
        {/* {this.state.status == 1 ? (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ThankuReservation', {
                booking_id: this.props.route.params.booking_id,
              });
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              width: '90%',
              borderRadius: 8,
              backgroundColor: '#FF9400',
              marginTop: 120,
              alignSelf: 'center',
              marginBottom: 40,
              shadowColor: '#000000',
              shadowOffset: {width: 0, height: 10}, // change this for more shadow
              shadowOpacity: 1,
              shadowRadius: 6,
              elevation: 5,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
              Confirm
            </Text>
          </TouchableOpacity>
        ) : null} */}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.userDetails.user_id,
});

const mapDispatchToProps = {
  is_order_type,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationConfirm);
