import { Tabs } from 'expo-router';

import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#0f0f0f',
          borderTopColor: '#222222',
        },
        tabBarActiveTintColor: '#00C853',
        tabBarInactiveTintColor: '#666666',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: () => <Text>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="buddy"
        options={{
          title: 'Find Buddy',
          tabBarIcon: () => <Text>🤝</Text>,
        }}
      />
      <Tabs.Screen
        name="courts"
        options={{
          title: 'Courts',
          tabBarIcon: () => <Text>📍</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: () => <Text>👤</Text>,
        }}
      />
    </Tabs>
  );
}