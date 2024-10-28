import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { BASE_URL } from '../../constants/app';

const FormScreen = () => {
  const [asteroidId, setAsteroidId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchAsteroid = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${asteroidId}?api_key=1EOFGYl3IT4gKGiMeOUaoTGzk8OmRrE0KGqemoay`);
      const data = await response.json();
      router.push({ pathname: "/app/(tabs)/explore", params: { data } });
    } catch (err) {
      setError('Invalid Asteroid ID');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Asteroid ID"
        value={asteroidId}
        onChangeText={setAsteroidId}
        style={styles.input}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Submit" onPress={fetchAsteroid} disabled={!asteroidId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 },
  error: { color: 'red', marginTop: 10 },
});

export default FormScreen;
