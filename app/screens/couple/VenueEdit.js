import React, { Component } from 'react';
import {
  Image,
  ListItem,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Header } from 'react-native-elements'

import AddableHeader from '../../components/addable_header'
import ChecklistItem from '../../components/checklist_item'

import FormItem from '../../components/form_item';
import FormSectionHeader from '../../components/form_section_header';
import FormSeparator from '../../components/form_separator';
import ListFooter from '../../components/list_footer';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  contentWrapper: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 20
  },
  description: {
    fontFamily: 'Avenir',
    fontSize: 17,
    fontWeight: '300'
  },
  header: {
    backgroundColor: '#92D6EA'
  },
  headerText: {
    color: '#000',
    fontFamily: 'Avenir',
    fontSize: 17,
    fontWeight: '300'
  },
  dollarsWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1
  },
  list: {
    alignSelf: 'stretch',
    borderBottomColor: '#CCCCCC'
  },
  listWrapper: {
    flexDirection: 'row'
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: 48,
    fontWeight: '300',
    paddingBottom: 15
  }
});

class VenueEdit extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ text: 'Cancel', style: styles.headerText }}
          centerComponent={{ text: 'The Venue - Edit', style: styles.headerText }}
          rightComponent={{ text: 'Save', style: styles.headerText }}
          outerContainerStyles={styles.header}
        />
        <View style={styles.contentWrapper}>
          <View style={styles.listWrapper}>
            <SectionList
              ItemSeparatorComponent={FormSeparator}
              ListFooterComponent={ListFooter}
              renderSectionHeader={FormSectionHeader}
              renderItem={({item}) => <FormItem field={item.field} secure={item.secure} keyboardType={item.keyboardType}/>}
              scrollEnabled={false}
              sections={[
                {
                  data: [
                    { field: 'Facility Name', key: 'facility_name' },
                    { field: 'Contact Name', key: 'contact_name' },
                    { field: 'Contact Email', keyboardType: 'email-address', key: 'email' },
                    { field: 'Address', key: 'address' },
                    { field: 'City', key: 'city' },
                    { field: 'State', key: 'state' },
                    { field: 'Zip', key: 'zip' }
                  ],
                  key: 'details',
                  title: 'Vendor Details:'
                }
              ]}
              style={styles.list}
            />
          </View>
          <AddableHeader/>
          <View style={[styles.list, {height: 47}]}>
            <ChecklistItem
              isChecked={false}
              key='pay1'
              task='04/01/18'
              rightComponent={
                <View style={styles.dollarsWrapper}>
                  <Text>$200</Text>
                </View>
              }
            />
          </View>
        </View>
      </View>
    )
  }
}

module.exports = VenueEdit;
