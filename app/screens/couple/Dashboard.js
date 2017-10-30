import React, { Component } from 'react';
import {
  Animated,
  ListItem,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import FormItemExpandable from '../../components/form_item_expandable';
import FormSectionHeaderExpandable from '../../components/form_section_header_expandable';
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
          title: 'Wedding Details:',
          open: true,
          hiddenData: []
        }
      ]
    }
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
          <Animated.View style={styles.listWrapper}>
            <SectionList
              ItemSeparatorComponent={FormSeparator}
              ListFooterComponent={ListFooter}
              renderSectionHeader={ ({section}) => <FormSectionHeaderExpandable section={section} toggleSection={this._toggleSection}/>}
              renderItem={this._renderItemComponent}
              scrollEnabled={false}
              sections={this.state.sections}
              style={styles.list}
            />
          </Animated.View>
          <OnboardingButton
            text="Let's Go!"
          />
          <OnboardingButton
            text='Skip for Now'
          />
        </View>
      </View>
    )
  }

  _closeSection = (sectionIndex) => {
    // FIXME: might need to make sure this is the max when more items are in the list
    section = this.state.sections[sectionIndex];
    console.log('close called')
    if (section) {
      let newSection = Object.assign({}, section, {
        data: [],
        hiddenData: (section.open ? section.data : section.hiddenData),
        open: false
      })
      console.log(newSection)
      // newSection.hiddenData = JSON.parse ( JSON.stringify(newSection.data) );
      // newSection.data = [];
      // newSection.open = false; // FIXME update RN to latest and try conditionally rendering section list footer OR remove bottom border on header if data is empty...yeah maybe the latter
      this.setState({ sections: [newSection] });
    }
  };

  _openSection = (sectionIndex) => {
    // FIXME: might need to make sure this is the max when more items are in the list
    section = this.state.sections[sectionIndex];
    console.log('open called')
    if (section) {
      console.log('open conditional entered')
      let newSection = Object.assign({}, section, {
        data: (section.open ? section.data : section.hiddenData),
        hiddenData: [],
        open: true
      })
      // newSection.data = JSON.parse ( JSON.stringify(newSection.hiddenData) );
      // newSection.hiddenData = [];
      // newSection.open = true; // FIXME update RN to latest and try conditionally rendering section list footer OR remove bottom border on header if data is empty...yeah maybe the latter
      console.log(newSection)
      this.setState({ sections: [newSection] });
    }
  };

  _toggleSection = (section) => {
    console.log('toggle called');
    if (section.open) {
      console.log('open')
      section.data = section.data.map((item) => {
        return {
          field: item.field,
          key: item.key,
          removeSection: true,//!item.removeSection,
          section: 0
        }
      });
    } else {
      console.log('closed')
      section.data = section.hiddenData.map((item) => {
        return {
          field: item.field,
          key: item.key,
          removeSection: false,//!item.removeSection,
          section: 0
        }
      });
    }
    // section.open = !section.open;
    console.log(section)
    this.setState({ sections: [section] });
  };

  _renderItemComponent = ({item, index, section}) => {
    // console.log(section) FIXME: When upgrading to v0.47+, see if this works; might allow cleaner code
    return(
    <FormItemExpandable
      field={item.field}
      index={index}
      onCloseSection={this._closeSection}
      onOpenSection={this._openSection}
      removeSection={item.removeSection}
      section={item.section}
      secure={item.secure}
    />
  )}
}

module.exports = Dashboard;
