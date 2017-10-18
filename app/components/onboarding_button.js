import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    height: 44,
    justifyContent: 'center',
    marginBottom: 35,
    width: 300
  },
  buttonText: {
    fontFamily: 'Avenir',
    fontWeight: '300',
    fontSize: 17
  }
});

class OnboardingButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <TouchableOpacity
        onPress={() => this.props.onPress && this.props.onPress()}
        style={styles.button}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

export default OnboardingButton;
