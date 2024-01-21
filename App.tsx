import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import AttractionDetail from './src/screens/AttractionDetail';
import Gallery from './src/screens/Gallery';
import Map from './src/screens/Map';
import { RootStackParamList } from './src/types/RootStackParams';

const RootStack = createStackNavigator<RootStackParamList>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name='Home' component={Home} />
        <RootStack.Screen
          name='AttractionDetail'
          component={AttractionDetail}
        />
        <RootStack.Screen name='Gallery' component={Gallery} />
        <RootStack.Screen name='Map' component={Map} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
