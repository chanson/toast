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

import FormItem from '../../components/form_item';
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
          title: 'Wedding Details:'
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
          <View style={styles.listWrapper}>
            <Animated.View>
              <SectionList
                ItemSeparatorComponent={FormSeparator}
                ListFooterComponent={ListFooter}
                renderSectionHeader={ ({section}) => <FormSectionHeaderExpandable section={section} toggleSection={this._toggleSection}/>}
                renderItem={({item}) => <FormItem field={item.field} secure={item.secure}/>}
                scrollEnabled={false}
                sections={this.state.sections}
                style={styles.list}
              />
            </Animated.View>
          </View>
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

  _toggleSection = (section) => {
    console.log(this);
    console.log(this.parentProps);
    console.log(section);
    // newSection = this.state.sections[0];
    // newSection.data = [];
    section.data = []
    this.setState({ sections: [section] });
    // delete this.state.sections[0].data;
    // delete this.state.sections[0].key;
  };

  _renderItemComponent = ({item}) => (
    <ItemComponent item={item} onPress={this._pressItem} />
  );
}

module.exports = Dashboard;
