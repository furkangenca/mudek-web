import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { db, firebase } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const StudentScoreScreen = () => {
  const [scores, setScores] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const user = firebase.auth().currentUser;

    if (user) {
      const unsubscribe = db.collection('exams')
        .doc(user.uid)
        .onSnapshot(snapshot => {
          const examData = snapshot.data();
          const examScores = [];

          // Her dersin notlarını al
          Object.keys(examData).forEach(key => {
            if (key !== 'studentId') {
              const lessonName = key;
              const lessonScores = examData[key]; // Final ve midterm notları
              examScores.push({ lessonName, ...lessonScores });
            }
          });

          setScores(examScores);
        });

      return () => unsubscribe();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.imagecont} />
      <Text style={styles.header}>Sınav Notlarınız:</Text>

      <ScrollView contentContainerStyle={styles.itemcontainer}>
        {scores.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.lesson}>{item.lessonName}:</Text>
            <Text style={styles.score}>Vize: {item.midterm}</Text>
            <Text style={styles.score}>Final: {item.final}</Text>
          </View>
        ))}
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
  itemcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  item: {
    width: '25%', // Her öğe genişliği, toplam genişliğin yaklaşık yarısı olacak şekilde ayarlanır
    backgroundColor: '#ffffff',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,

  },
  lesson: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: 'bold',
  },
  score: {
    fontSize: 14,
    color: '#495057',
  },
  button: {
    backgroundColor: '#041C30',
    width: '20%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default StudentScoreScreen;
