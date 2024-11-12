import { Tabs } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Colors } from '../../constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
  return (

    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.PRIMARY


    }}>
      <Tabs.Screen name='home'
        options={
          {
            tabBarLabel: 'home',
            tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />
          }

        }

      />
      <Tabs.Screen name='tasks'
        options={{
          tabBarLabel: 'tasks',
          tabBarIcon: ({ color }) => <FontAwesome5 name="tasks" size={24} color={color} />

        }} />
      <Tabs.Screen name='calender'
        options={{
          tabBarLabel: 'calender',
          tabBarIcon: ({ color }) => <AntDesign name="calendar" size={24} color={color} />

        }} />
      <Tabs.Screen name='profile'

        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="face-woman-profile" size={24} color={color} />
        }}

      />



    </Tabs>


  )
}