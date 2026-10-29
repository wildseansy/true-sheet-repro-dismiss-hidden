import { router } from 'expo-router';
import { Button, ScrollView, StyleSheet } from 'react-native';

import { NavStateReadout } from '../components/NavStateReadout';

export default function Pushed() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <Button title="Close sheet via dismissTo('/')" onPress={() => router.dismissTo('/')} />
      <Button title="Back" onPress={() => router.back()} />
      <NavStateReadout />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 12 },
});
