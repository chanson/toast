import React from 'react'
import { DrawerNavigator, StackNavigator, DrawerItems } from 'react-navigation'
import Landing from '../screens/Landing'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import CoupleWelcome from '../screens/couple/CoupleWelcome'
import CoupleDashboard from '../screens/couple/Dashboard'
import VendorEdit from '../screens/couple/VendorEdit'
import NewTodo from '../screens/couple/NewTodo'
import NewPayment from '../screens/couple/NewPayment'
import LogOut from '../screens/drawer/LogOut'
import TodoNotes from '../screens/couple/TodoNotes'

import {
  ScrollView,
  View
} from 'react-native';

import { Icon } from 'react-native-elements'

const LogOutStack = StackNavigator(
  {
      LogOut: { screen: LogOut },
      Login: { screen: Login }
  },
  {
    initialRouteName: 'LogOut'
  }
)

const DrawerStack = DrawerNavigator(
  {
    Dashboard: { screen: CoupleDashboard }
  },
  {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
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
      headerLeft: <Icon
        name='menu'
        onPress={() => navigation.navigate('DrawerOpen')}
      />,
      headerRight: <Icon
        name='face'
      />
    }),
    contentComponent:(props) => (
      <View style={{flex:1}}>
        <ScrollView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...props} />
          <LogOut/>
        </ScrollView>
      </View>
    )
  }
)

// const Dashboard = StackNavigator(
//   {
//     Dashboard: {
//       screen: CoupleDashboard
//     },
//     // Venue: {
//     //   screen: VendorNav
//     // }
//   },
//   {
//     initialRouteName: 'Dashboard'
//   }
// )

export const VendorNav = StackNavigator(
  {
    Vendor: {
      screen: VendorEdit
    },
    NewTodo: {
      screen: NewPayment
    }
  },
  {
    initialRouteName: 'Vendor',
    headerMode: 'none'
  }
)

export const DashboardNav = StackNavigator(
  {
    DashboardRoot: {
      screen: DrawerStack
    },
    Vendor: {
      screen: VendorNav
    },
    NewTodo: {
      screen: NewTodo
    },
    TodoNotes: {
      screen: TodoNotes
    }
  },
  {
    initialRouteName: 'DashboardRoot'
  }
)

export const WelcomeNav = StackNavigator(
  {
    CoupleWelcome: {
      screen: CoupleWelcome
    },
    DashboardNav: {
      screen: DashboardNav
    }
  },
  {
    headerMode: 'none'
  }
);

export const LandingNav = StackNavigator(
  {
    Landing: {
      screen: Landing
    },
    Signup: {
      screen: Signup
    },
    Login: {
      screen: Login
    },
    WelcomeNav: {
      screen: WelcomeNav
    }
  },
  {
    initialRouteName: 'Landing',
    headerMode: 'float'
  }
);
