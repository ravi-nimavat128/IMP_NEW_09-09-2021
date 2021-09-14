import React, { Component } from 'react'
import { View, Text,SafeAreaView,ScrollView,Image,TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class EditContectInfo extends Component {
   constructor(props) {
       super(props) 
       this.state = {
            
       }
   }
   

    render() {
        return (
            <SafeAreaView style={{backgroundColor:'white',flex:1}}>
                     <View style={style.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={back_arrow} style={style.back_img} />
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: 'bold',
                marginLeft: 12,
              }}>
              {this.props.cat_name}
            </Text>
          </TouchableOpacity>
          {/* <View style={{flex: 1}}></View> */}
          {/* <Text style={style.txt_heading}>OPEN 24 HOURS</Text> */}
        </View>
   
   
                
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContectInfo)
