// In App.js in a new project

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { userData } from '../Config/Constants';
import { getData } from '../Config/localStorage';
import LoginScreen from '../Screens/Auth/LoginScreen';
import RegisterScreen from '../Screens/Auth/RegisterScreen';
import HomeScreen from '../Screens/DashBoard/Home';
import AddReportScreen from '../Screens/Reports/AddReports';
import ReportDashBoard from '../Screens/Reports/Index';
import MapScreen from '../Screens/Reports/MapView';
import ReportDetailScreen from '../Screens/Reports/ReportDetail';

import AddIntervention from '../Forms/AddIntervention';
import ForestForm from '../Forms/Forest';
import PlantationForm from '../Forms/Plantation';
import SowingForm1 from '../Forms/Sowing/Form1';
import SowingForm2 from '../Forms/Sowing/Form2';
import SowingForm3 from '../Forms/Sowing/Form3';
import { CameraPage } from '../Screens/Camera/Camera';

const Stack = createNativeStackNavigator();

function Router() {
  const isLogedIn = async () => {
    const user = await getData(userData);
    if (user !== undefined && user !== null) {
      return true;
    } else return false;
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: 'slide_from_right',
        }}
        initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="DashBoard" component={HomeScreen} />
        <Stack.Screen name="AddReportScreen" component={AddReportScreen} />
        <Stack.Screen name="ReportDashBoard" component={ReportDashBoard} />
        <Stack.Screen
          name="ReportDetailScreen"
          component={ReportDetailScreen}
        />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="CameraScreen" component={CameraPage} />
        <Stack.Screen name="ForestForm" component={ForestForm} />
        <Stack.Screen name="PlantationForm" component={PlantationForm} />
        <Stack.Screen name="SowingForm1" component={SowingForm1} />
        <Stack.Screen name="SowingForm2" component={SowingForm2} />
        <Stack.Screen name="SowingForm3" component={SowingForm3} />
        <Stack.Screen name="AddIntervention" component={AddIntervention} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
