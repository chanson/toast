import React, { Component } from 'react';
import {
  Animated,
  FlatList,
  ListItem,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion'


import FormItemExpandable from '../../components/form_item_expandable';
import FormItem from '../../components/form_item';
import FormSectionHeaderExpandable from '../../components/form_section_header_expandable';
import FormSectionHeader from '../../components/form_section_header'
import FormSeparator from '../../components/form_separator';
import ListFooter from '../../components/list_footer';
import OnboardingButton from '../../components/onboarding_button';

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
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    marginBottom: 30
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: 48,
    fontWeight: '300',
    paddingBottom: 15
  }
})

class Dashboard extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: [
        {
          data: [
            { field: 'Bride / Groom', key: 'bride_groom_1' },
            { field: 'Bride / Groom', key: 'bride_groom_2' },
            { field: 'Wedding Date', key: 'date' } // FIXME: Datepicker
          ], //FIXME move all props to state; then remove `data` when pressed; store in `collapsed` object
          key: 'details',
          title: 'Wedding Details:'
        },
        {
          data: [
            { field: 'Bride / Groom', key: 'foo_1' },
            { field: 'Bride / Groom', key: 'foo_2' },
            { field: 'Wedding Date', key: 'foo_3' } // FIXME: Datepicker
          ], //FIXME move all props to state; then remove `data` when pressed; store in `collapsed` object
          key: 'foo',
          title: 'Foo:'
        }
      ]
    }
  }

  _renderHeader(section, i, isActive) {
    return (
      <View>
        <FormSectionHeader section={section}/>
      </View>
    );
  }

  _renderContent(section, i, isActive) {
    return (
      <View>
        {section.data.map((item) =>
          <FormItem key={item.key} field={item.field} secure={item.secure} keyboardType={item.keyboardType}>
            {item.field}
          </FormItem>
        )}
      </View>
    );
  }

  _setSection(section) {
    this.setState({ activeSection: section });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentTopWrapper}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.description}>
            Get started by telling us{'\n'}
            a little about your event:
          </Text>
        </View>
        <View style={styles.contentBottomWrapper}>
          <View style={styles.listWrapper}>
            <Accordion
              sections={this.state.sections}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              duration={400}
              onChange={this._setSection.bind(this)}
              style={styles.list}
            />
          </View>
        </View>
      </View>
    )
  }
}

module.exports = Dashboard;
