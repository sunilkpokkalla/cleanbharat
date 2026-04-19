import { Tabs } from 'expo-router';
import { Theme } from '../../constants/Theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Theme.colors.primary,
      }}
    />
  );
}
