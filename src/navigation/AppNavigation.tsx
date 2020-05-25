import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";

import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

import Home from "../screens/AppScreens/Home";
import Blank from "../screens/AppScreens/Blank";
import SideBar from "../screens/AppScreens/SideBar";
import OneItem from '../screens/AppScreens/OneItem';

const MainStack = createStackNavigator(
  {
    Home: { screen: Home }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);


const AppStack = createDrawerNavigator(
  {
    MainStack: { screen: MainStack },
    Blank: { screen: Blank },
    OneItem: { screen: OneItem }
  },
  {
    drawerWidth: width - 50,
    drawerPosition: "left",
    contentComponent: props => <SideBar {...props} />
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AppStack: AppStack
    },
    {
      initialRouteName: "AppStack"
    }
  )
);
