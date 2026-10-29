import { router } from 'expo-router';
import { Button, StyleSheet, View } from 'react-native';

import { NavStateReadout } from '../components/NavStateReadout';

export default function Pushed() {
  return (
    <View style={styles.container}>
      <Button title="Close sheet via dismissTo('/')" onPress={() => router.dismissTo('/')} />
      <Button title="Back" onPress={() => router.back()} />
      <NavStateReadout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: 'white' },
});
