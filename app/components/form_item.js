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
})

class FormItem extends Component {
  constructor(props) {
    super(props)
    this.state = { text: props.initialValue }
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.text == undefined || this.state.text == '') {
      this.setState({ text: nextProps.initialValue });
    }
  }

  _updateForm = (text) => {
    this.setState({ text }, () => {
      this.props.handleChange(text, this.props.id)
    })
  }

  _openDatePicker = () => {
    this.datepicker.onPressDate()
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
            inputContainerStyle={styles.input}
            inputContainerPadding={0}
            secureTextEntry={this.props.secure}
            value={this.state.text}
            onFocus={this._openDatePicker.bind(this)}
          />
        </View>
      )
    } else {
      return(
        <View style={styles.header}>
          <TextField
            keyboardType={this.props.keyboardType}
            label={this.props.field}
            labelHeight={18}
            inputContainerStyle={styles.input}
            inputContainerPadding={0}
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
