import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';

var sttatus = require('../assets/image/STATTUS.png');
var senso = require('../assets/image/SENSO.png');
var courtyard = require('../assets/image/COURTYARD.png');
var back_arrow = require('../assets/image/back_arrow.png');

const DATA = [
  {
    id: 1,
    img: sttatus,
    h_name: 'Sttatus',
    name: 'Ravi Nimavat',
    r_no: 123,
    date: '17 - 09 - 2021',
    no_of_person: 9,
  },
  {
    id: 2,
    img: senso,
    h_name: 'Senso',
    name: 'Varshid Patel',
    r_no: 234,
    date: '17 - 09 - 2021',
    no_of_person: 3,
  },
  {
    id: 3,
    img: courtyard,
    h_name: 'Courtyard',
    name: 'Anand Kamani',
    r_no: 567,
    date: '17 - 09 - 2021',
    no_of_person: 7,
  },
];

export class MyReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItem = ({item, index}) => {
    return (
      <View>
        <View
          style={{
            marginHorizontal: 15,
            //   borderRadius: 5,
            marginBottom: 10,
            backgroundColor: 'white',
            flexDirection: 'row',
            //   shadowColor: 'gray',
            //   shadowOffset: {width: 5, height: 5},
            //   shadowOpacity: 1,
            //   shadowRadius: 5,
            //   elevation: 6,
          }}>
          <View
            style={{
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              marginVertical: 5,
              alignItems: 'center',
              marginLeft: 15,
            }}>
            <Image
              source={item.img}
              style={{
                height: 65,
                width: 80,
                //   resizeMode: 'contain',
                // borderColor: 'gray',
                // borderWidth: 1,
              }}></Image>
          </View>
          <View style={{marginLeft: 20}}>
            <View style={{marginTop: 15}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {item.name} x {item.no_of_person}
              </Text>
              <Text style={{fontSize: 16, marginTop: 5}}>{item.h_name}</Text>
              <Text style={{fontSize: 16, marginTop: 5}}>
                Booking id : {item.r_no}
              </Text>
              <Text style={{fontSize: 16, marginTop: 5}}>
                Date : {item.date}
              </Text>
            </View>
            <View
              style={{
                //   marginLeft: 25,
                marginTop: 10,
                marginBottom: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'gray',
                  borderRadius: 8,
                  height: 35,
                  width: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white'}}>Modify</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  backgroundColor: '#ED505C',
                  borderRadius: 8,
                  height: 35,
                  width: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            width: Dimensions.get('screen').width,
            height: 1,
            backgroundColor: 'gray',
            marginTop: 5,
            marginBottom: 10,
          }}></View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={style.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{flexDirection: 'row'}}>
            <Image source={back_arrow} style={style.back_img} />
          </TouchableOpacity>
          <Text style={style.txt_heading}>My Reservation</Text>
        </View>
        <View>
          <FlatList
            data={DATA}
            style={{marginBottom: 70, marginTop: 20}}
            showsVerticalScrollIndicator={false}
            renderItem={this.renderItem}
            keyExtractor={id => id.toString()}></FlatList>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyReservation);
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
