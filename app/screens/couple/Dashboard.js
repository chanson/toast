import React, { Component } from 'react'
import {
  ActivityIndicator,
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
import firebase from 'react-native-firebase'
import moment from 'moment'

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
    drawerLabel: 'Dashboard',
    title: '276 Days to Go!'
  }

  constructor(props) {
    super(props);
    this._navigateTask = this._navigateTask.bind(this);
    this.state = {
      loaded: false,
      months: []
    }
  }

  componentDidMount() {
    this._buildChecklists()
  }

  _buildChecklists() {
    let months = {}

    // FIXME: move to util
    // FIXME: subscribe and set loader until results are present, then unsubscribe
    // FIXME: use wedding date if exists
    firebase.firestore().collection('wedding_todos').where('user_id', '==', firebase.auth().currentUser.uid).get().then((item) => {
      item.forEach((doc) => {
        const todo = doc.data()
        let dueDate = moment().add(todo.days_before_wedding, 'days')

        if(todo.date !== undefined && todo.date !== '' && todo.date !== null) {
          console.log(todo.date)
          dueDate = moment(todo.date)//, 'MM/DD/YYYY')
        }
        const dateKey = dueDate.format('MMMM[_]YYYY')
        const data = {
          daysBefore: todo.days_before_wedding,
          date: todo.date,
          complete: todo.complete,
          id: doc.id,
          key: doc.id,
          task: todo.text
        }

        let monthDate = months[dateKey]
        if (monthDate === undefined) {
          monthDate = [data]
        } else {
          monthDate = monthDate.concat(data)
        }

        months = {
          ...months,
          [dateKey]: monthDate
        }
      })

      const formattedMonths = Object.keys(months).map(function(key) {
        return {
          data: months[key],
          key: key,
          title: key.replace('_', ' ') + ':'
        }
      })

      this.setState({
        ...this.state,
        loaded: true,
        months: formattedMonths
      })
    })
  }

  _renderHeader(month, i, isActive) {
    return (
      <View>
        <ExpandableHeader section={month}/>
      </View>
    );
  }

  _navigateTask = (id) => {
    this.props.navigation.navigate('Venue', { todoId: id })
  }

  _renderContent(month, i, isActive) {
    return (
      <View style={{height: month.data.length * 47}}>
        {month.data.map((item) => {
          // FIXME: move date logic to util
          let diffBound = 'months'
          const base = firebase.auth().currentUser.createdAt
          const baseDate = moment(base)
          let dueDate = item.date
          let displayDate = ''

          if(dueDate == undefined || dueDate == null ) {
            dueDate = moment(base).add(item.daysBefore, 'days')

            if (item.daysBefore < 14) {
              diffBound = 'days'
            } else if (item.daysBefore < 30) {
              diffBound = 'weeks'
            } else {
              diffBound = 'months'
            }

            displayDate = `${dueDate.diff(baseDate, diffBound)} ${diffBound} before`
          } else {
            displayDate = moment(dueDate).format('MM/DD/YYYY')
          }


          return (
            <ChecklistItem
              isChecked={item.complete}
              date={displayDate}
              id={item.id}
              key={item.key}
              task={item.task}
              rightComponent={
                <TouchableOpacity
                  onPress={() => this._navigateTask(item.id)}
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
        )}
      </View>
    )
  }

  _setSection(section) {
    this.setState({ activeSection: section });
  }

  render() {
    let content = <ActivityIndicator size='large' color='#0000ff' />

    if (this.state.loaded) {
      content = (
        <View style={styles.listWrapper}>
          <AddableHeader title='Wedding Checklist:' navigation={this.props.navigation}/>
          <Accordion
            sections={this.state.months}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent.bind(this)}
            duration={400}
            onChange={this._setSection.bind(this)}
            style={styles.list}
          />
        </View>
      )
    }

    // <Header
    //   leftComponent={{ icon: 'menu', color: '#000', onPress: () => this.props.navigation.navigate('DrawerOpen') }}
    //   centerComponent={{ text: '276 Days to Go!', style: { color: '#000', fontFamily: 'Avenir', fontWeight: '300', fontSize: 17 } }}
    //   rightComponent={{ icon: 'face', color: '#000' }}
    //   outerContainerStyles={styles.header}
    // />

    return (
      <View style={styles.container}>

        <View style={styles.contentWrapper}>
          {content}
        </View>
      </View>
    )
  }
}

module.exports = Dashboard;
