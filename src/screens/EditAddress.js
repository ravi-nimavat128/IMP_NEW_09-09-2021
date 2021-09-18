import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
  ToastAndroid,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {add, Value} from 'react-native-reanimated';
import {PermissionsAndroid} from 'react-native';
import {connect} from 'react-redux';
import {add_address} from '../reducers/UserReducer/user_actions';

var img = require('../assets/image/img_tag_screen.png');
const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

// Geocoder.init('AIzaSyAW9o-WOYpnQVmNavdz4Wm9SUso69K9D8s'); // use a valid API key

class EditAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      currentCity: '',
      txt_address: this.props.route.params.address1,
      txt_house_flat: this.props.route.params.address2,
      txt_leandmark: this.props.route.params.landmark,
      address_type: this.props.route.params.type,
      initialRegion: {
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0122,
        longitude: parseFloat(this.props.route.params.long),
        latitude: parseFloat(this.props.route.params.lat),
      },
      marginBottom: 1,
      // locationChosen: false,
    };
  }
  componentDidMount() {
    // this.setState({
    //   address_type: this.props.route.params.type,
    //   txt_address: this.props.route.params.address1,
    //   txt_house_flat: this.props.route.params.address2,
    //   txt_leandmark: this.props.route.params.landmark,
    //   initialRegion: {
    //     latitude: this.props.route.params.lat,
    //     longitude: this.props.route.params.long,
    //   },
    //   address_type: this.props.route.params.type,
    // });
  }

  // "lat": "21.52242112548509",
  // "long": "70.45257953926921",

  _editAddress = () => {
    this.setState({isLoading: true});

    let formData = new FormData();
    formData.append('address_id', this.props.route.params.id);
    formData.append('user_id', this.props.user_id);
    formData.append('landmark', this.state.txt_leandmark);
    formData.append('address1', this.state.txt_address);
    formData.append('address2', this.state.txt_house_flat);
    formData.append('type', this.state.address_type.toString());
    formData.append('lat', this.state.initialRegion.latitude);
    formData.append('long', this.state.initialRegion.longitude);

    axios
      .post(
        'https://www.binarygeckos.com/imp/apis/address/update_address',
        formData,
      )
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({isLoading: false});

          Alert.alert('Success', 'Your address is added successfully');
          this.props.navigation.goBack();
        } else {
          this.setState({isLoading: false});

          Alert.alert('', Response.data.message);
        }
      });
  };

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'MyMapApp needs access to your location',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // this._getCurrentLocation();
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentDidMount() {
    this.requestLocationPermission();
    // requestLocationPermission();

    // this.handleUserLocation();
    // this.handleUserLocation();
    setTimeout(() => this.setState({marginBottom: 0}), 100);
  }

  //
  handleUserLocation = () => {
    Geolocation.getCurrentPosition(
      pos => {
        // Alert.alert(JSON.stringify(pos));
        this.map.animateToRegion({
          ...this.state.initialRegion,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        this.setState({
          initialRegion: {
            ...this.state.initialRegion,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
          // locationChosen: true,
        });

        // this.getAddress(pos.coords.latitude, pos.coords.longitude);
      },
      err => {
        console.log(err);
        alert('Somthing want wrong');
      },
    );
  };

  // getAddress = async (lat, lng) => {
  //   // await Geocoder.fallbackToGoogle('AIzaSyAqABWLW_xFPjE5WQV9AILtPNv6_gv9xLM');

  //   // try {
  //   //   let res = await Geocoder.geocodePosition({lat, lng});
  //   //   let addr = res[0].formattedAddress;
  //   //   let city = res[1].formattedAddress;
  //   //   this.setState({
  //   //     currentAddress: addr,
  //   //     currentCity: city,
  //   //   });
  //   // } catch (error) {
  //   //   alert(error);
  //   // }
  //   Geocoder.geocodePosition({lat, lng})
  //     .then(res => {
  //       // alert(res[0].formattedAddress);
  //       this.setState({
  //         // currentAddress: res[0].formattedAddress,
  //         currentCity: res[1].formattedAddress,
  //       });
  //     })
  //     .catch(error => alert(error));

  //   // Geocoder.from(41.89, 12.49)
  //   //   .then(json => {
  //   //     var addressComponent = json.results[0].address_components[0];
  //   //     console.log(addressComponent);
  //   //   })
  //   //   .catch(error => console.warn(error));
  // };

  onChangeValue = initialRegion => {
    // this.getAddress(
    //   this.state.initialRegion.latitude,
    //   this.state.initialRegion.longitude,
    // );

    // ToastAndroid.show(
    //   JSON.stringify(this.state.currentAddress),
    //   ToastAndroid.SHORT,
    // );
    console.log(
      'map addressssssss',
      JSON.stringify(this.state.initialRegion, null, 2),
    );
    // console.log(JSON.stringify(this.state.currentAddress, null, 2));
    this.setState({
      initialRegion,
    });
  };

  render() {
    // console.disableYellowBox = true;
    console.log('propa address1', this.props.route.params.address1);
    console.log('state address1', this.state.txt_address);
    console.log('props address2', this.props.route.params.address2);
    console.log('state address2', this.state.txt_house_flat);
    console.log('props lat', this.props.route.params.lat);
    console.log('state lat', this.state.initialRegion.latitude);
    console.log('props long', this.props.route.params.long);
    console.log('state long', this.state.initialRegion.longitude);

    console.log('props latitude ......', this.props.route.params.lat);

    console.log(this.state.address_type);
    console.log(
      'initional region ',
      JSON.stringify(this.state.initialRegion, null, 2),
    );

    // "longitude": 70.45257953926921,
    // "latitude": 21.52242112548509

    return (
      <View style={style.container}>
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
        <View style={{flex: 1, marginBottom: -50}}>
          <MapView
            mapType={'standard'}
            provider={PROVIDER_GOOGLE}
            showsPointsOfInterest={true}
            followsUserLocation={true}
            style={{flex: 1, marginBottom: this.state.marginBottom}}
            // region={this.state.initialRegion}
            initialRegion={this.state.initialRegion}
            annotations
            // showsUserLocation={true}
            showsMyLocationButton={true}
            // onRegionChangeComplete={this.onChangeValue}
            ref={ref => (this.map = ref)}>
            {/* <Marker
              coordinate={{latitude: 22.295, longitude: 70.7908}}
              pinColor="red"
            /> */}
          </MapView>

          {/* <View
            style={{
              top: '50%',
              left: '50%',
              marginLeft: -24,
              marginTop: -48,
              position: 'absolute',
            }}>
            <Image
              source={require('../assets/image/map_marker.png')}
              style={{height: 48, width: 48}}></Image>
          </View> */}
        </View>
        <View
          style={{
            flex: 1,
            width: Dimensions.get('screen').width,
            backgroundColor: '#FFF',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <ScrollView>
            {/* <View>
            <View
              style={{
                height: 50,
                width: '100%',
                flexDirection: 'row',
                marginHorizontal: 15,
              }}>
              <Image
                source={require('../assets/image/location_icon.png')}
                style={{
                  height: 18,
                  width: 18,
                  tintColor: '#BE984A',
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  marginRight: 10,
                  marginLeft: 13,
                  marginTop: 5,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                {this.state.currentCity}
              </Text>
            </View>
          </View> */}

            <TextInput
              style={{marginHorizontal: 15, marginTop: 15}}
              placeholder="Address."
              defaultValue={this.state.txt_address}
              onChangeText={txt =>
                this.setState({
                  txt_address: txt,
                })
              }></TextInput>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginHorizontal: 15,
              }}
            />

            <TextInput
              style={{marginHorizontal: 15, marginTop: 15}}
              placeholder="House/ flat/ block No."
              defaultValue={this.state.txt_house_flat}
              onChangeText={txt =>
                this.setState({
                  txt_house_flat: txt,
                })
              }></TextInput>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginHorizontal: 15,
              }}
            />

            <TextInput
              style={{marginHorizontal: 15, marginTop: 15}}
              placeholder="Landmark"
              defaultValue={this.state.txt_leandmark}
              onChangeText={txt =>
                this.setState({
                  txt_leandmark: txt,
                })
              }></TextInput>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginHorizontal: 15,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                height: 50,
                marginTop: 15,
                marginHorizontal: 15,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    address_type: 1,
                  });
                }}
                style={{
                  marginHorizontal: 5,
                  flex: 1,
                  borderColor:
                    this.state.address_type == 1 ? '#BE984A' : 'black',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../assets/image/house_icon.png')}
                  style={{
                    height: 18,
                    width: 18,
                    tintColor:
                      this.state.address_type == 1 ? '#BE984A' : 'black',
                  }}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    color: this.state.address_type == 1 ? '#BE984A' : 'black',
                  }}>
                  HOME
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    address_type: 2,
                  });
                }}
                style={{
                  marginHorizontal: 5,
                  flex: 1,
                  borderColor:
                    this.state.address_type == 2 ? '#BE984A' : 'black',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../assets/image/brefcase_icon.png')}
                  style={{
                    height: 18,
                    width: 18,
                    tintColor:
                      this.state.address_type == 2 ? '#BE984A' : 'black',
                  }}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    color: this.state.address_type == 2 ? '#BE984A' : 'black',
                  }}>
                  WORK
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    address_type: 3,
                  });
                }}
                style={{
                  marginHorizontal: 5,
                  flex: 1,
                  borderColor:
                    this.state.address_type == 3 ? '#BE984A' : 'black',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../assets/image/location_icon.png')}
                  style={{
                    height: 18,
                    width: 18,
                    tintColor:
                      this.state.address_type == 3 ? '#BE984A' : 'black',
                  }}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    color: this.state.address_type == 3 ? '#BE984A' : 'black',
                  }}>
                  OTHER
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this._editAddress()}
                disabled={
                  this.state.txt_address.length >= 1 &&
                  this.state.txt_house_flat.length >= 1 &&
                  this.state.txt_leandmark.length >= 1
                    ? false
                    : true
                }
                style={{
                  backgroundColor:
                    this.state.txt_address.length >= 1 &&
                    this.state.txt_leandmark.length >= 1 &&
                    this.state.txt_house_flat.length >= 1
                      ? '#BE984A'
                      : '#D1B989',
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                  marginHorizontal: 15,
                  marginTop: 15,
                }}>
                <Text style={{color: 'white', fontSize: 16}}>
                  EDIT AND PROCEED
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // height: Dimensions.get('screen').width,
    // width: Dimensions.get('screen').width,
  },
});

const mapStateToProps = state => ({
  user_id: state.userDetails.user_id,
});

const mapDispatchToProps = {
  add_address,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);
