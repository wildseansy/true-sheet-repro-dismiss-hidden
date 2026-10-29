import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Details() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sheet (details)</Text>
      <Button title="Push screen" onPress={() => router.push('/pushed')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 48, gap: 12 },
  title: { fontSize: 18, fontWeight: '600' },
});
