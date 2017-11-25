import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { CheckBox, } from 'react-native-elements'


const styles = StyleSheet.create({
  checkbox: {
    alignItems: 'flex-start',
    backgroundColor: '#EBF3F6',
    marginLeft: 0,
    marginRight: 0,
    padding: 0
  },
  row: {
    alignItems: 'stretch',
    backgroundColor: '#EBF3F6',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    flex: 1,
    flexDirection: 'row',
    margin: 0,
    paddingHorizontal: 16,
    paddingVertical: 5
  },
  text: {
    fontFamily: 'Avenir',
    fontWeight: '300'
  },
  textWrapper: {
    justifyContent: 'center'
  },
  icon: {

  },
  iconWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1
  }
});

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.isChecked
    }
  }

  _handleCheck = () => {
    console.log('changing')
    this.setState({
      checked: !this.state.checked
    }, () => console.log(this.state))
  }

  render() {
    return(
      <View>
        <CheckBox
          {...this.props}
          checked={this.state.checked}
          onPress={this._handleCheck.bind(this)}
        />
      </View>
    );
  }
}

Checkbox.propTypes = {
}

export default Checkbox;
