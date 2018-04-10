import React, { Component } from 'react';

import TodoForm from '../../components/todo_form'

class NewTodo extends Component {
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
    title: 'New Task'
  }

  render() {
    return (
      <TodoForm
        navigation={this.props.navigation}
        todoName='Name'
        title='Add New Task:'
        submitText='Add Task'
      />
    )
  }
}

module.exports = NewTodo
