import React, { Component } from 'react';

import TodoForm from '../../components/todo_form'

class NewPayment extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#92D6EA',
      paddingHorizontal: 15
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontFamily: 'Avenir',
      fontWeight: '300',
      fontSize: 17
    },
    title: 'New Payment'
  }

  render() {
    return (
      <TodoForm
        navigation={this.props.navigation}
        todoName='Amount'
        title='Add New Payment:'
        submitText='Add Payment'
      />
    )
  }
}

module.exports = NewPayment
