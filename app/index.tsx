import React from 'react';
import Login from '../components/Login';
import Registration from '../components/Registration';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function LoginPage() {


  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Registration} />
    </Stack.Navigator>
  );
}

