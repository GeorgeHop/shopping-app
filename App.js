import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import {ShoppingLists} from "./screens/ShoppingLists";
import {ShoppingListDetails} from "./screens/ShoppingListDetails";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./redux/store";
import {CreateListModal} from "./components/Modals/CreateListModal";
import {Home} from "./screens/Home";

const Stack = createStackNavigator();

export default function App() {
  return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='Home' component={Home}/>
              <Stack.Screen name='ShoppingListDetails' component={ShoppingListDetails}/>
            </Stack.Navigator>
          </NavigationContainer>
          <CreateListModal/>
        </PersistGate>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
