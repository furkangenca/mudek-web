import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Image } from 'react-native';
import { db } from '../../../firebase';

const TeacherLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const querySnapshot = await db.collection('teachers').get();
      let loggedIn = false;

      querySnapshot.forEach(doc => {
        const teacherData = doc.data();
        if (teacherData.email === email && teacherData.password === password) {
          loggedIn = true;
        }
      });

      if (loggedIn) {
        // Giriş başarılı, Teacher ekranına yönlendir
        navigation.navigate('Teacher');
      } else {
        setError('Email veya şifre yanlış.');
      }
    } catch (err) {
      setError('Giriş işlemi sırasında bir hata oluştu: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo.png')} style={styles.imagecont} />
      <Text style={styles.header}>Akademik Personel Girişi</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </Pressable>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Pressable style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Geri Dön</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imagecont: {
    justifyContent: 'flex-start',
    width: 1600, // Resim genişliği
    height: 150, // Resim yüksekliği
    marginBottom: 50,
  },
  header: {
    fontSize: 24,
    color: '#041C30',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#041C30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  goBackButton: {
    backgroundColor: '#041C30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default TeacherLoginScreen;
