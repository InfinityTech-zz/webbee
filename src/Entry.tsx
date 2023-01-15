import { StyleSheet, StatusBar } from 'react-native'
import { BottomNavigation } from 'react-native-paper';
import React from 'react';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import ManageCategories from './pages/ManageCategories';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export interface EntryProps {
}

const Tab = createBottomTabNavigator();

const Entry = (props: EntryProps) => {

  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Categories"
        component={Categories}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="album" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Manage Categories"
        component={ManageCategories}
        options={{
          tabBarLabel: 'Manage Categories',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-edit" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default Entry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight - 10
  },
});

