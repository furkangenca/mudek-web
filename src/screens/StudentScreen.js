import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StudentScreen = () => {
  const navigation = useNavigation();

  const goToKriterScreen = () => {
    navigation.navigate('StudentScore');
  };

  const logout = () => {
    navigation.navigate('Login');
  };
  const goToExamScreen = () => {
    navigation.navigate('StudentExam');
  };


  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.imagecont} />
      <Text style = {styles.header}>Öğrenci Bilgilendirme Sayfası</Text>


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goToKriterScreen}>
          <Text style={styles.buttonText}>Girilen Müdek Notları</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3} onPress={goToExamScreen}>
          <Text style={styles.buttonText}>Sınav Notları</Text>
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
    color: '041C30',
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
    paddingHorizontal: 180,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: 'gray',
    backgroundColor: 'transparent',
  },
  button2: {
    paddingHorizontal: 225,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: 'gray',
    backgroundColor: 'transparent',
  },
  button3: {
    paddingHorizontal: 211,
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

export default StudentScreen;
