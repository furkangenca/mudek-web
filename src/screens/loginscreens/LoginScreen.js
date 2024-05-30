import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo.png')} style={styles.imagecont} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.studentLoginButton} onPress={() => navigation.navigate('StudentLogin')}>
          <Text style={styles.buttonText}>Öğrenci Girişi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.teacherLoginButton} onPress={() => navigation.navigate('TeacherLogin')}>
          <Text style={styles.buttonText}>Akademisyen Girişi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.mudekLoginButton, styles.lastLoginButton]} onPress={() => navigation.navigate('MudekLogin')}>
          <Text style={styles.buttonText}>MÜDEK Denetleyici Girişi</Text>
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
  imagecont: {
    justifyContent: 'flex-start',
    width: 1600, // Resim genişliği
    height: 150, // Resim yüksekliği
    marginBottom: 50,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  studentLoginButton: {
    paddingHorizontal: 140,
    paddingVertical: 10,
    borderWidth: 1.5, // Kenar çizgisi eklendi
    borderColor: 'gray', // Kenar çizgisi rengi ayarlandı
    backgroundColor: 'transparent', // Arka plan rengi kaldırıldı
  },
  teacherLoginButton: {
    paddingHorizontal: 121,
    paddingVertical: 10,
    borderWidth: 1.5, // Kenar çizgisi eklendi
    borderColor: 'gray', // Kenar çizgisi rengi ayarlandı
    backgroundColor: 'transparent', // Arka plan rengi kaldırıldı
  },
  mudekLoginButton: {
    paddingHorizontal: 100,
    paddingVertical: 10,
    borderWidth: 1.5, // Kenar çizgisi eklendi
    borderColor: 'gray', // Kenar çizgisi rengi ayarlandı
    backgroundColor: 'transparent', // Arka plan rengi kaldırıldı
  },
  lastLoginButton: {
    marginRight: 0, // Son butonun sağ kenar boşluğu kaldırıldı
  },
  buttonText: {
    color: 'black', // Metin rengi siyah yapıldı
    fontSize: 16,
    fontStyle: 'bold',
  },
});

export default LoginScreen;
