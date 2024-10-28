import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

interface AsteroidData {
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
}

const ExploreScreen = () => {
  const params = useLocalSearchParams();
  const data = params.data as AsteroidData | AsteroidData[];

  const name = Array.isArray(data) ? data[0]?.name : data.name;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name: {name}</Text>
      {/* Other data rendering */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  label: { fontSize: 18, marginVertical: 8 },
});

export default ExploreScreen;
