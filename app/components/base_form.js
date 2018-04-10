import React, { Component } from 'react';
import firebase from 'react-native-firebase';

import FormItem from '../components/form_item';

class BaseForm extends Component {
  handleChange(text, field) {
    console.log(field)
    this.setState({
      ...this.state,
      [field]: text
    })
  }

  _signUp = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).
      then((user) => console.log('signup successful') )
  }
}

module.exports = BaseForm;
