import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import PropTypes from 'prop-types';

import { TextField } from 'react-native-material-textfield';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#EBF3F6'
  },
  label: {
    color: '#999999'
  },
  text: {
    fontFamily: 'Avenir',
    fontWeight: '300',
    height: 44
  },
  input: {
    borderBottomWidth: 0,
    marginLeft: 25
  }
});

class FormItem extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return(
      <View style={styles.header}>
        <TextField
          keyboardType={this.props.keyboardType}
          label={this.props.field}
          labelHeight={18}
          inputContainerStyle={styles.input}
          inputContainerPadding={0}
          onChangeText={ (text) => this.setState({ text }) }
          secureTextEntry={this.props.secure}
          value={this.state.text}
        />
      </View>
    );
  }
}

FormItem.propTypes = {
  secureField: PropTypes.bool,
}

export default FormItem;
