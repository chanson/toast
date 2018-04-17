import React, { Component } from 'react'
import {
  DatePickerIOS,
  StyleSheet,
  TextInput,
  View
} from 'react-native'
import PropTypes from 'prop-types'
import DatePicker from 'react-native-datepicker'
import { TextField } from 'react-native-material-textfield'
import moment from 'moment'

const styles = StyleSheet.create({
  error: {
    marginLeft: 25
  },
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
    marginLeft: 25,
    borderBottomWidth: 1
  },
  inputNoError: {
    borderBottomWidth: 0
  }
})

class FormItem extends Component {
  constructor(props) {
    super(props)
    this.state = { text: props.initialValue, error: props.error }
  }

  componentWillReceiveProps(nextProps) {
    let newState = {}

    if(this.state.text == undefined || this.state.text == '') {
      newState['text'] = nextProps.initialValue
    }

    this.setState({
      ...this.state,
      ...newState,
      error: nextProps.error
    })
  }

  _updateForm = (text) => {
    this.setState({ ...this.state, text: text }, () => {
      this.props.handleChange(text, this.props.id)
    })
  }

  _openDatePicker = () => {
    this.datepicker.onPressDate()
  }

  _inputStyle = () => {
    if(this.state.error == '' || this.state.error == undefined) {
      return [styles.input, styles.inputNoError]
    } else {
      return styles.input
    }
  }

  render() {
    if(this.props.datepicker) {
      return(
        <View style={styles.header}>
          <DatePicker
            style={{height: 0}}
            ref={(ref) => this.datepicker = ref}
            date={this.state.text}
            mode='date'
            placeholder='select date'
            format='MM/DD/YYYY'
            minDate={moment().format('MM/DD/YYYY')}
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            onDateChange={this._updateForm.bind(this)}
            showIcon={false}
            customStyles={{
              dateInput: {
                display: 'none'
              }
            }}
          />
          <TextField
            keyboardType={this.props.keyboardType}
            label={this.props.field}
            labelHeight={18}
            inputContainerStyle={this._inputStyle()}
            inputContainerPadding={this.state.error == '' ? 0 : 5}
            secureTextEntry={this.props.secure}
            value={this.state.text}
            titleTextStyle={styles.error}
            error={this.state.error}
            onFocus={this._openDatePicker.bind(this)}
          />
        </View>
      )
    } else {
      return(
        <View style={styles.header}>
          <TextField
            error={this.state.error}
            keyboardType={this.props.keyboardType}
            label={this.props.field}
            labelHeight={18}
            titleTextStyle={styles.error}
            inputContainerStyle={this._inputStyle()}
            inputContainerPadding={this.state.error == '' ? 0 : 5}
            onChangeText={ this._updateForm }
            secureTextEntry={this.props.secure}
            value={this.state.text}
          />
        </View>
      )
    }
  }
}

FormItem.propTypes = {
  secureField: PropTypes.bool,
}

export default FormItem;
