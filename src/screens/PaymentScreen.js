import React, {Component} from 'react';
import axios from 'axios';
import HTMLView from 'react-native-htmlview';
// import stripe from 'tipsi-stripe';

import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';

var back_arrow = require('../assets/image/back_arrow.png');
var secret_key =
  'sk_test_51IDmWtD1m7XeWX6yeY6oVWAFxW1SVYDU1AnHwtaDbHWzmlj3SnXF2yuLif9gcEZDnZSUOqoRfBbCf1lzAwJwyJYA00mgX0g2Kp';

const CURRENCY = 'IND';
var CARD_TOKEN = null;

class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      privecy_data: '',
      stripe_token: '',
      card_details: {
        // Valid: false,
        name: '',
        number: '',
        expMonth: 0,
        expYear: 0,
        cvc: '',
      },
    };
  }
  handleFieldParamsChange = (valid, params) => {
    console.log(`
      Valid: ${valid}
      Number: ${params.number || '-'}
      Month: ${params.expMonth || '-'}
      Year: ${params.expYear || '-'}
      CVC: ${params.cvc || '-'}
    `);

    this.setState({
      card_details: {
        // Valid: valid,
        number: params.number,
        expMonth: params.expMonth,
        expYear: params.expYear,
        cvc: params.cvc,
      },
    });
  };

  // tokennnn = async () => {
  //   const token = await stripe.createTokenWithCard(this.state.card_details);
  //   console.log(token);
  // };

  isPaymentCardTextFieldFocused = () => this.paymentCardInput.isFocused();

  focusPaymentCardTextField = () => this.paymentCardInput.focus();

  blurPaymentCardTextField = () => this.paymentCardInput.blur();

  resetPaymentCardTextField = () => this.paymentCardInput.setParams({});

  _onChange = formData => {
    /* eslint no-console: 0 */
    console.log('FORM DATAAAAAAAAAAAAA', JSON.stringify(formData, null, 2));

    this.setState({
      card_details: {
        // Valid: formData.valid,
        name: formData.values.name,
        number: formData.values.number,
        expMonth: Number(formData.values.expiry.split('/')[0]),
        expYear: Number(formData.values.expiry.split('/')[1]),
        cvc: formData.values.cvc,
      },
    });
  };

  _onFocus = field => {
    /* eslint no-console: 0 */
    console.log('fieldddddddddddddd', field);
  };

  params = {
    // mandatory
    number: '4242424242424242',
    expMonth: 11,
    expYear: 27,
    cvc: '223',
    // optional
    name: 'Test User',
    currency: 'usd',
    addressLine1: '123 Test Street',
    addressLine2: 'Apt. 5',
    addressCity: 'Test City',
    addressState: 'Test State',
    addressCountry: 'Test Country',
    addressZip: '55555',
  };

  handleCardPayPress = async () => {
    try {
      // options = {
      //   requiredBillingAddressFields: 'full',
      //   prefilledInformation: {
      //     billingAddress: {
      //       name: 'Gunilla Haugeh',
      //       line1: 'Canary Place',
      //       line2: '3',
      //       city: 'Macon',
      //       state: 'Georgia',
      //       country: 'US',
      //       postalCode: '31217',
      //     },
      //   },
      // };
      // const paymentMethod = await stripe.createTokenWithCard(
      //   this.state.card_details,
      // );
      // console.log(
      //   'paymentMethod............',
      //   JSON.stringify(paymentMethod, null, 2),
      //   this.setState({
      //     stripe_token: paymentMethod.tokenId,
      //   }),
      // );
    } catch (error) {
      console.log(error);
    }
  };

  doPayment = async () => {
    fetch(
      'https://us-central1-imperial-palace-5d37c.cloudfunctions.net/CompletePaymentWithStripe',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 450,
          currency: 'inr',
          token: this.state.stripe_token,
        }),
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson, null, 2));
        // alert(responseJson);
      })
      .catch(error => {
        console.error(error);
        alert(error);
        console.log(JSON.stringify(error, null, 2));
      });
  };

  MakePayments = async () => {
    this.setState({
      isLoading: true,
    });

    let formdata = new FormData();
    formdata.append('amount', 100);
    formdata.append('currency', 'inr');
    formdata.append('source', this.state.stripe_token);

    axios
      .post(
        'https://us-central1-imperial-palace-5d37c.cloudfunctions.net/payWithStripe',
      )

      // axios({
      //   method: 'post',
      //   url:
      //     'https://us-central1-imperial-palace-5d37c.cloudfunctions.net/payWithStripe',
      //   body: {
      //     amount: 15,
      //     currency: 'inr',
      //     token: this.state.stripe_token.toString(),
      //   },
      // })
      .then(response => {
        this.setState({
          isLoading: false,
        });
        console.log(response.data);
        alert(response.data);
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
        alert(err);
        this.setState({
          isLoading: false,
        });
      });
  };

  PAY_ME = async () => {
    // if (
    //   this.state.card_details.Valid == false ||
    //   typeof this.state.card_details.Valid == 'undefined'
    // ) {
    //   alert('Invalid Card Details');
    //   return false;
    // }

    // let cardToken;
    // try {
    //   cardToken = await stripe.createTokenWithCard(this.state.card_details);
    //   if (cardToken.error) {
    //     alert('CardToken error');
    //     return;
    //   }
    //   this.setState({
    //     stripe_token: cardToken.tokenId,
    //   });
    //   console.log(
    //     'Tokennnnnnnnnnnnnnnn.....',
    //     JSON.stringify(cardToken, null, 2),
    //   );

    //   console.log('stripe token', this.state.stripe_token);
    // } catch (error) {
    //   console.log('error', error);
    //   return;
    // }
    // token = await stripe.createTokenWithCard(this.state.card_details);
    // console.log(token._U);
    // return token.token;
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
            backgroundColor: '#00000000',
            flexDirection: 'row',
          }}>
          <ActivityIndicator size="large" color="#BE984A" animating={true} />
          <Text style={{color: '#BE984A', fontSize: 20, marginLeft: 10}}>
            Loading...
          </Text>
        </View>
      );
    }
    // const {item} = this.state.Privecy_data;
    console.log('state card details...........', this.state.card_details);
    // console.log(this.PAY_ME());

    console.log(
      'cart details...',
      JSON.stringify(this.props.cart_details, null, 2),
    );

    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
        <View style={style.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{flexDirection: 'row'}}>
            <Image source={back_arrow} style={style.back_img} />
          </TouchableOpacity>
          <Text style={style.txt_heading}>Payment Option</Text>
        </View>

        <View
          style={{
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
            opacity: 0.15,
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* <PaymentCardTextField
            ref={ref => {
              this.paymentCardInput = ref;
            }}
            style={style.field}
            cursorColor={'black'}
            textErrorColor={'black'}
            placeholderColor={'black'}
            numberPlaceholder={'**** **** **** ****'}
            expirationPlaceholder={'MM/YY'}
            cvcPlaceholder={'CVV'}
            disabled={false}
            onParamsChange={this.handleFieldParamsChange}
          /> */}

          <CreditCardInput
            allowScroll
            autoFocus
            requiresCVC
            requiresName
            // requiresPostalCode
            labelStyle={s.label}
            inputStyle={s.input}
            validColor={'black'}
            invalidColor={'red'}
            placeholderColor={'darkgray'}
            onFocus={this._onFocus}
            onChange={this._onChange}
          />
        </View>

        <View style={{flex: 0.5}}>
          <TouchableOpacity
            onPress={() => {
              this.handleCardPayPress();
              // console.log(this.PAY_ME());
            }}
            style={{
              borderWidth: 1,
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 15,
              marginTop: 15,
              borderRadius: 8,
            }}>
            <Text style={{padding: 15}}>Pay Me</Text>
          </TouchableOpacity>
          <Text style={{marginVertical: 8, alignSelf: 'center'}}>
            {this.state.stripe_token}
          </Text>
          <TouchableOpacity
            onPress={() => {
              // this.setState({
              //   isLoading: true,
              // });
              this.doPayment();
              // console.log(this.PAY_ME());
            }}
            style={{
              marginTop: 45,
              borderWidth: 1,
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 15,

              borderRadius: 8,
            }}>
            <Text style={{padding: 15}}>Make Payment</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  cart_details: state.cartItems.full_cart_details,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);

const style = StyleSheet.create({
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
  field: {
    width: 300,
    alignSelf: 'center',
    color: '#449aeb',
    borderColor: '#000',
    borderWidth: 1,
    // width: '100%',
    marginLeft: 20,
    borderRadius: 5,
  },
});

const s = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    marginTop: 60,
  },
  label: {
    color: 'black',
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: 'black',
  },
});
