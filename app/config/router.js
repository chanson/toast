import React from 'react';
import { StackNavigator } from 'react-navigation';
import Landing from '../screens/Landing';
import Signup from '../screens/Signup';
import CoupleWelcome from '../screens/couple/CoupleWelcome'
import CoupleDashboard from '../screens/couple/Dashboard'
import VenueEdit from '../screens/couple/VenueEdit'

export const DashboardNav = StackNavigator(
  {
    Dashboard: {
      screen: CoupleDashboard
    },
    Venue: {
      screen: VenueEdit
    }
  },
  {
    initialRouteName: 'Dashboard'
  }
)

export const WelcomeNav = StackNavigator(
  {
    CoupleWelcome: {
      screen: CoupleWelcome
    },
    Dashboard: {
      screen: DashboardNav
    }
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
    WelcomeNav: {
      screen: WelcomeNav
    }
  },
  {
    initialRouteName: 'Landing',
    headerMode: 'float'
  }
);
