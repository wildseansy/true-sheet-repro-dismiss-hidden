import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

import { NavStateReadout } from '../../components/NavStateReadout';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Base screen (index)</Text>
      <Button title="Open sheet" onPress={() => router.push('/details')} />
      <NavStateReadout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80, paddingHorizontal: 16, gap: 12, backgroundColor: 'white' },
  title: { fontSize: 20, fontWeight: '600' },
});
