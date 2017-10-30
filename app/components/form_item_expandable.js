import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import PropTypes from 'prop-types';

import { TextField } from 'react-native-material-textfield';

const ROW_HEIGHT = 44;
const ANIMATION_DURATION = 300;

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
    height: ROW_HEIGHT
  },
  input: {
    borderBottomWidth: 0,
    marginLeft: 25
  }
});

class FormItemExpandable extends Component {
  constructor(props) {
    console.log('constructor called')
    super(props);
    this.state = { text: '' };
    this._animated = new Animated.Value(0); // FIXME: Should this be 1? How to prevent always sliding open on page load
  }

  componentDidMount() {
    console.log('mounted')
    Animated.timing(this._animated, {
      toValue: 1,
      duration: ANIMATION_DURATION,
    }).start();//() => this.props.onOpenSection(this.props.section)); // FIXME maybe this doesn't need to be here?
  }

  componentWillReceiveProps(newProps) {
    if (newProps.removeSection) {
      Animated.timing(this._animated, {
        toValue: 0,
        duration: ANIMATION_DURATION,
      }).start(() => this.props.onCloseSection(newProps.section));
    }
    // else {
    //   console.log('should be opening')
    //   Animated.timing(this._animated, {
    //     toValue: 1,
    //     duration: ANIMATION_DURATION,
    //   }).start(() => this.props.onOpenSection(newProps.section));
    // }
  }

  // componentWillUnmount() {
  //   console.log('called');
  //   Animated.timing(this._animated, {
  //     toValue: 0,
  //     duration: ANIMATION_DURATION,
  //   }).start(() => {
  //     console.log('started');
  //     setTimeout(() => { console.log('waiting') }, ANIMATION_DURATION )
  //   });
  //   return false;
  // }

  render() {
    const headerStyles = [
      styles.header,
      {
        height: this._animated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, ROW_HEIGHT],
          extrapolate: 'clamp',
        }),
      },
      // { opacity: this._animated },
      // {
      //   transform: [
      //     { scale: this._animated },
      //     {
      //       rotate: this._animated.interpolate({
      //         inputRange: [0, 1],
      //         outputRange: ['35deg', '0deg'],
      //         extrapolate: 'clamp',
      //       })
      //     }
      //   ],
      // },
    ];

    return(
      <Animated.View style={headerStyles}>
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
      </Animated.View>
    );
  }
}

FormItemExpandable.propTypes = {
  secureField: PropTypes.bool,
}

export default FormItemExpandable;
