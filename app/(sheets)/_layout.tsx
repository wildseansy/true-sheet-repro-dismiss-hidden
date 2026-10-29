import { Sheet } from '@lodev09/react-native-true-sheet/navigation/expo-router';

export const unstable_settings = {
  anchor: 'index',
};

export default function SheetsLayout() {
  return (
    <Sheet>
      <Sheet.Screen name="index" />
      <Sheet.Screen name="details" options={{ detents: ['auto'] }} />
    </Sheet>
  );
}
