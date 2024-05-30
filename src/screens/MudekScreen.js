import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { db } from '../../firebase';

const MudekScreen = () => {
  const navigation = useNavigation();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const querySnapshot = await db.collection('lessons').get();
          const lessonsData = [];
          querySnapshot.forEach((doc) => {
            lessonsData.push(doc.data());
          });
          setLessons(lessonsData);
        } catch (err) {
          setError(err);
        }
        setLoading(false);
      };

      fetchData();
    }, [])
  );

  const goToKriterScreen = () => {
    navigation.navigate('MudekKriter');
  };

  const logout = () => {
    navigation.navigate('Login');
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.imagecont} />
      <Text style={styles.header}>Müdek Denetleyicisi Sayfası</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goToKriterScreen}>
          <Text style={styles.buttonText}>Kriter Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={logout}>
          <Text style={styles.buttonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize:34,
    color: '#041C30',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagecont: {
    width: 1600,
    height: 150,
    marginBottom: 50,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 150,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: 'gray',
    backgroundColor: 'transparent',
  },
  button2: {
    paddingHorizontal: 154,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: 'gray',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontStyle: 'bold',
  },
});

export default MudekScreen;
