import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { firebase, db } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const StudentScoreScreen = () => {
  const [scores, setScores] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const user = firebase.auth().currentUser;

    if (user) {
      const unsubscribe = db.collection('scores')
        .where('studentId', '==', user.uid)
        .onSnapshot(snapshot => {
          const scoreData = [];
          snapshot.forEach(doc => {
            scoreData.push({ id: doc.id, ...doc.data() });
          });
          setScores(scoreData);
        });

      return () => unsubscribe();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.imagecont} />
      <Text style={styles.header}>Puanlarınız:</Text>

      <ScrollView horizontal>
        <View style={styles.itemContainer}>
          {scores.map((item) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.kriter}>{item.kriter}</Text>
              <Text style={styles.lesson}>Ders: {item.lesson}</Text>
              <Text style={styles.rating}>Puan: {item.rating}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Geri Dön</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  imagecont: {
    width: 1600,
    height: 150,
    marginBottom: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#041C30',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: 200,
  },
  kriter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#041C30',
    marginBottom: 5,
  },
  lesson: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  button: {
    backgroundColor: '#041C30',
    width: '20%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 20,
    marginBottom: 125,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default StudentScoreScreen;
