import React, { Component } from 'react'
import {
  Button
} from 'react-native'
import firebase from 'react-native-firebase';

class LogOut extends Component {
  static navigationOptions = {
    drawerLabel: 'Log Out'
  }

  _logOut() {
    firebase.auth().signOut()
  }

  render() {
    return(
      <Button
        onPress={ this._logOut.bind(this) }
        title="Log Out"
      />
    )
  }
}

module.exports = LogOut
