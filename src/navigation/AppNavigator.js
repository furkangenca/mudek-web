import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/loginscreens/LoginScreen';
import StudentLoginScreen from '../screens/loginscreens/StudentLoginScreen';
import TeacherLoginScreen from '../screens/loginscreens/TeacherLoginScreen';
import MudekLoginScreen from '../screens/loginscreens/MudekLoginScreen';
import StudentScreen from '../screens/StudentScreen';
import TeacherScreen from '../screens/TeacherScreen';
import MudekScreen from '../screens/MudekScreen';
import StudentSignupScreen from '../screens/loginscreens/StudentSignupScreen';
import MudekKriterScreen from '../screens/MudekKriterScreen';
import TeacherKriterScreen from '../screens/TeacherKriterScreen';
import TeacherExamScreen from '../screens/TeacherExamScreen';
import StudentScoreScreen from '../screens/StudentScoreScreen';
import StudentExamScreen from '../screens/StudentExamScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StudentLogin" component={StudentLoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="TeacherLogin" component={TeacherLoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="MudekLogin" component={MudekLoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="StudentSignup" component={StudentSignupScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Student" component={StudentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StudentExam" component={StudentExamScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StudentScore" component={StudentScoreScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Teacher" component={TeacherScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Mudek" component={MudekScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MudekKriter" component={MudekKriterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TeacherKriter" component={TeacherKriterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TeacherExam" component={TeacherExamScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
