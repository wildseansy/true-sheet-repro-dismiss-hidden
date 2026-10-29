import { useRootNavigationState } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

type NavState = {
  routes: { name: string; closing?: boolean; state?: NavState }[];
};

// Compact view of the navigation state: route names, nested state in [], `closing` flags.
function describe(state: NavState | undefined): string {
  if (!state) return '';
  return state.routes
    .map((route) => {
      const closing = route.closing ? ' (closing: true)' : '';
      const nested = route.state ? ` [${describe(route.state)}]` : '';
      return `${route.name}${closing}${nested}`;
    })
    .join(', ');
}

export function NavStateReadout() {
  const state = useRootNavigationState() as unknown as NavState;
  return <Text style={styles.readout}>{describe(state)}</Text>;
}

const styles = StyleSheet.create({
  readout: { fontFamily: 'Menlo', fontSize: 12, backgroundColor: '#eee', padding: 8 },
});
