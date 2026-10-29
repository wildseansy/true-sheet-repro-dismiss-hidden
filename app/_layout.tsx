import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(sheets)" options={{ headerShown: false }} />
      <Stack.Screen name="pushed" options={{ title: 'Pushed' }} />
    </Stack>
  );
}
