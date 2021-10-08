import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Touchable,
  ScrollView,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {connect} from 'react-redux';
import {add_address} from '../reducers/UserReducer/user_actions';

var img = require('../assets/image/img_tag_screen.png');
var back_arrow = require('../assets/image/back_arrow.png');
import Spinner from 'react-native-loading-spinner-overlay';

class ManageAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address_data: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this._getAddresses();

    this.onFocusSubscribe = this.props.navigation.addListener('focus', () => {
      // Your code
      this._getAddresses();
    });
  }
  // componentDidUpdate(preState) {
  //   if (this.state.address_data !== preState.address_data) {
  //     this._getAddresses();
  //   }
  // }
  // componentWillUnmount() {
  //   this._getAddresses();
  // }

  _deleteAddress = id => {
    this.setState({isLoading: true});

    let formdata = new FormData();
    formdata.append('address_id', id);
    axios
      .post(
        'https://www.binarygeckos.com/imp/apis/address/delete_addres',
        formdata,
      )
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({isLoading: false});

          Alert.alert('', 'Address deleted successfully');
          this._getAddresses();
        } else {
          this.setState({isLoading: false});

          alert(Response.data.message);
        }
      });
  };

  _getAddresses = () => {
    this.setState({isLoading: true});

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
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
          });
          // Alert.alert('', Response.data.message);
        }
      });
  };

  ItemView = ({item, index}) => {
    return (
      <View style={{marginHorizontal: 15}}>
        {item.type == 1 ? <Text style={{fontSize: 15}}>home</Text> : null}
        {item.type == 2 ? <Text style={{fontSize: 15}}>work</Text> : null}
        {item.type == 3 ? <Text style={{fontSize: 15}}>other</Text> : null}

        <Text style={{fontSize: 13}}>{item.address1}</Text>
        <View style={{flexDirection: 'row', height: 20, marginTop: 10}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() =>
                this.props.navigation.navigate('EditAddress', item)
              }>
              <Text style={{color: '#BE984A'}}>EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => this._deleteAddress(item.id)}>
              <Text style={{color: '#BE984A'}}>DELETE</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}></View>
        </View>
        <View
          style={{
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
            marginVertical: 12,
          }}
        />
        {console.log('itemmmmmmm', JSON.stringify(item, null, 2))}
      </View>
    );
  };

  render() {
    // console.log(JSON.stringify(this.props.address_data, null, 2));
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
          <Text style={style.txt_heading}>Manage Addresses</Text>
        </View>

        <View
          style={{
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
            opacity: 0.15,
          }}
        />
        {this.state.address_data == 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No Address Found......</Text>
          </View>
        ) : (
          <FlatList
            style={{marginTop: 20}}
            data={this.state.address_data}
            renderItem={this.ItemView}
            keyExtractor={(item, index) => index.toString()}></FlatList>
        )}

        <View
          style={{
            position: 'absolute',
            bottom: 15,
            width: Dimensions.get('screen').width,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Address');
            }}
            style={{
              marginHorizontal: 15,
              borderRadius: 8,
              height: 50,
              backgroundColor: '#BE984A',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 15}}>ADD NEW ADDRESS</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
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
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 18,
    marginTop: 18,
  },
});

const mapStateToProps = state => ({
  user_id: state.userDetails.user_id,
});

const mapDispatchToProps = {
  add_address,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAddress);
