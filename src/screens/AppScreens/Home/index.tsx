import React from "react";
import { View, Dimensions } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { TabView, SceneMap } from 'react-native-tab-view';
import { Header } from "../../../components";
import UsersDataList from './UsersDataList';
import styles from "./styles";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const Home = ({ navigation }: Props)  => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'USERS' },
    { key: 'second', title: 'OTHER' },
  ]);
  
  const FirstRoute = () => (
    <UsersDataList navigation={navigation} />
  );
  
  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
  );
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const initialLayout = { width: Dimensions.get('window').width };

  return (
    <View style={styles.container}> 
      <Header
        title="Home"
        leftButtonPress={() => navigation.openDrawer()}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View>
  )
}

export default Home;
