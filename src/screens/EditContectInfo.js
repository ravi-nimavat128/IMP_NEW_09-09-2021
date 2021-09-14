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
                
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContectInfo)
