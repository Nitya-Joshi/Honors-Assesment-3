import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const API_KEY = 'aEO0M36RZtXahV2Lp5FfYvTcIZraBJj22vm3N81t';
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/neo/';

const App: React.FC = () => {
  const [asteroidId, setAsteroidId] = useState('');
  const [asteroidData, setAsteroidData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchAsteroidData = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}${id}?api_key=${API_KEY}`);
      setAsteroidData(response.data);
    } catch (error) {
      alert('Asteroid not found. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomAsteroid = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}browse?api_key=${API_KEY}`);
      const asteroids = response.data.near_earth_objects;
      const randomAsteroid = asteroids[Math.floor(Math.random() * asteroids.length)];
      fetchAsteroidData(randomAsteroid.id);
    } catch (error) {
      alert('Error fetching random asteroid. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asteroid Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Search Here"
        value={asteroidId}
        onChangeText={setAsteroidId}
      />
      <Button
        title="Submit"
        onPress={() => fetchAsteroidData(asteroidId)}
        disabled={!asteroidId}
      />
      <View style={styles.separator} />
      <Button title="Random Asteroid" onPress={fetchRandomAsteroid} />
      
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
      
      {asteroidData && (
        <View style={styles.asteroidInfo}>
          <Text style={styles.infoText}>Name: {asteroidData.name}</Text>
          <Text style={styles.infoText}>NASA JPL URL: {asteroidData.nasa_jpl_url}</Text>
          <Text style={styles.infoText}>
            Potentially Hazardous: {asteroidData.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  separator: {
    height: 10,
  },
  loader: {
    marginTop: 20,
  },
  asteroidInfo: {
    marginTop: 20,
    backgroundColor: '#e3e3e3',
    padding: 15,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;
