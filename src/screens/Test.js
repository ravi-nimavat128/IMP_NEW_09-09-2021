import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import DatePicker from 'react-native-date-picker';

export class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Date: new Date(),
      open: false,
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Button
          title="Open"
          style={{height: 40, backgroundColor: 'red', width: 100}}
          onPress={() => this.setState({open: true})}
        />

        <DatePicker
          modal={true}
          open={this.state.open}
          date={this.state.Date}
          onConfirm={date => {
            this.setState({open: false});
            this.setState({Date: date});
          }}
          onCancel={() => {
            this.setState({
              open: false,
            });
          }}
        />
      </View>
    );
  }
}

export default Test;
