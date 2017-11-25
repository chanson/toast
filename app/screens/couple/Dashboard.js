import React, { Component } from 'react'
import {
  Animated,
  FlatList,
  ListItem,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Accordion from 'react-native-collapsible/Accordion'
import { Header, Icon } from 'react-native-elements'

import AddableHeader from '../../components/addable_header'
import ChecklistItem from '../../components/checklist_item'
import FormItem from '../../components/form_item'
import ExpandableHeader from '../../components/expandable_header'

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
  iconWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1
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
      months: [
        {
          data: [
            { date: '01/01/18', task: 'Build your Planning Team', id: 1, key: 't1' },
            { date: '01/01/18', task: 'Hire wedding planner  ', id: 1, key: 't2' },
            { date: '01/01/18', task: 'Discuss Budget', id: 1, key: 't3' },
            { date: '01/01/18', task: 'Tour Venues ', id: 1, key: 't4' },
            { date: '01/01/18', task: 'Pick a date', id: 1, key: 't5' },
            { date: '01/01/18', task: 'Start Guest List', id: 1, key: 't6' },
            { date: '01/01/18', task: 'Bridal Party Selection ', id: 1, key: 't7' },
            { date: '01/01/18', task: 'Engagement Party ', id: 1, key: 't8' }
          ],
          key: 'january_2018',
          title: 'January 2018:'
        },
        {
          data: [
            { date: '01/01/18', task: 'Dress Shopping!', id: 1, key: 't9' },
            { date: '01/01/18', task: 'Book Music', id: 1, key: 't10' },
            { date: '01/01/18', task: 'Book Florist ', id: 1, key: 't11' },
            { date: '01/01/18', task: 'Book Photographer & Videographer', id: 1, key: 't12' },
            { date: '01/01/18', task: 'Think about Guest Accommodations ', id: 1, key: 't13' },
            { date: '01/01/18', task: 'Register for gifts.', id: 1, key: 't14' },
            { date: '01/01/18', task: 'Hire Rental company ', id: 1, key: 't15' }
          ],
          key: 'march_2018',
          title: 'March 2018:'
        }
      ]
    }
  }

  _renderHeader(month, i, isActive) {
    return (
      <View>
        <ExpandableHeader section={month}/>
      </View>
    );
  }

  _navigateTask = () => {
    this.props.navigation.navigate('Venue')
  }

  _renderContent(month, i, isActive) {
    return (
      <View style={{height: month.data.length * 47}}>
        {month.data.map((item) =>
          <ChecklistItem
            isChecked={false}
            date={item.date}
            key={item.key}
            task={item.task}
            rightComponent={
              <TouchableOpacity
                onPress={this._navigateTask.bind(this)}
                style={styles.iconWrapper}
              >
                <Icon
                  name='info-outline'
                  type='material-icons'
                />
              </TouchableOpacity>
            }
          />
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
        <Header
          leftComponent={{ icon: 'menu', color: '#000' }}
          centerComponent={{ text: '276 Days to Go!', style: { color: '#000', fontFamily: 'Avenir', fontWeight: '300', fontSize: 17 } }}
          rightComponent={{ icon: 'face', color: '#000' }}
          outerContainerStyles={styles.header}
        />
        <View style={styles.contentWrapper}>
          <View style={styles.listWrapper}>
            <AddableHeader/>
            <Accordion
              sections={this.state.months}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent.bind(this)}
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
