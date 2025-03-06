import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenA from '../screens/ScreenA';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';  
          } else if (route.name === 'Tasks') {
            iconName = 'list';  
          } else if (route.name === 'Settings') {
            iconName = 'gear';  
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tasks" component={ScreenA} />
      <Tab.Screen name="Settings" component={ScreenA} />
    </Tab.Navigator>
  );
}