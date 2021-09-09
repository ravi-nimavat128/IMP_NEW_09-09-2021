import React, {Component} from 'react';
import {Animated, Text, View} from 'react-native';

export class ImageLoading extends Component {
  defaultImageAnimated = new Animated.Value(0);
  ImageAnimated = new Animated.Value(0);

  handelDefaultImageLoad = () => {
    Animated.timing(this.defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  handeImageLoad = () => {
    Animated.timing(this.ImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  render() {
    const {defaultImageSource, source, style, ...props} = this.props;
    return (
      <View>
        <Animated.Image
          {...props}
          source={defaultImageSource}
          style={[
            style,
            {opacity: this.defaultImageAnimated, resizeMode: 'stretch'},
          ]}
          onLoad={this.handelDefaultImageLoad}
          blurRadius={1}></Animated.Image>
        <Animated.Image
          {...props}
          source={source}
          style={[
            style,
            {
              opacity: this.ImageAnimated,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              resizeMode: 'stretch',
            },
          ]}
          onLoad={this.handeImageLoad}
          blurRadius={1}></Animated.Image>
      </View>
    );
  }
}

export default ImageLoading;
