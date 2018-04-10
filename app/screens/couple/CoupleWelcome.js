import React, { Component } from 'react'
import {
  Image,
  ListItem,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import firebase from 'react-native-firebase'

import BaseForm from '../../components/base_form'
import FormItem from '../../components/form_item'
import FormSectionHeader from '../../components/form_section_header'
import FormSeparator from '../../components/form_separator'
import ListFooter from '../../components/list_footer'
import OnboardingButton from '../../components/onboarding_button'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#92D6EA',
    flex: 1
  },
  contentBottomWrapper: {
    alignItems: 'center',
    flex: 0.7
  },
  contentTopWrapper: {
    alignItems: 'center',
    flex: 0.3,
    paddingTop: 70
  },
  description: {
    fontFamily: 'Avenir',
    fontSize: 17,
    fontWeight: '300'
  },
  list: {
    alignSelf: 'stretch',
    borderBottomColor: '#CCCCCC'
  },
  listWrapper: {
    flexDirection: 'row',
    marginBottom: 30
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: 48,
    fontWeight: '300',
    paddingBottom: 15
  }
});

class CoupleWelcome extends BaseForm {
  static navigationOptions = {
    header: null
  }

  constructor() {
    super()
    this.state = {
      bride_groom_1: '',
      bride_groom_2: '',
      date: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentTopWrapper}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.description}>
            Get started by telling us{'\n'}
            a little about your event:
          </Text>
        </View>
        <View style={styles.contentBottomWrapper}>
          <View style={styles.listWrapper}>
            <SectionList
              ItemSeparatorComponent={FormSeparator}
              ListFooterComponent={ListFooter}
              renderSectionHeader={FormSectionHeader}
              renderItem={({item}) => <FormItem field={item.field} id={item.key} secure={item.secure} keyboardType={item.keyboardType} handleChange={this.handleChange.bind(this)}/>}
              scrollEnabled={false}
              sections={[
                {
                  data: [
                    { field: 'Bride / Groom', key: 'bride_groom_1' },
                    { field: 'Bride / Groom', key: 'bride_groom_2' },
                    { field: 'Wedding Date', key: 'date', datepicker: ture }
                  ],
                  key: 'details',
                  title: 'Wedding Details:'
                }
              ]}
              style={styles.list}
            />
          </View>
          <OnboardingButton
            onPress={ this._createWedding.bind(this) }
            text="Let's Go!"
          />
          <OnboardingButton
            text='Skip for Now'
          />
        </View>
      </View>
    )
  }

  _createWedding = () => {
    // FIXME: Add loader here before kicking off firestore request
    firebase.firestore().collection('weddings').add({
      user_id: this.props.screenProps.user.data().user_auth_uid,
      bride_groom_1: this.state.bride_groom_1,
      bride_groom_2: this.state.bride_groom_2,
      date: this.state.date
    }).then((wedding) => {
      this.props.screenProps.user.ref.update({ wedding_id: wedding.id, completed_ftu: true, completed_ftu_at: new Date() })
      this.props.navigation.navigate('Dashboard')
    })
  }
}

module.exports = CoupleWelcome;
