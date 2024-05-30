import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Image } from 'react-native';
import { firebase, db } from '../../../firebase';

const StudentSignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [schoolNumber, setSchoolNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // students koleksiyonuna kayıt ekle
      await db.collection('students').doc(user.uid).set({
        schoolNumber,
        fullName,
        email,
        uid: user.uid,
      });

      // Başarılı kayıttan sonra giriş ekranına yönlendir
      navigation.navigate('Login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo.png')} style={styles.imagecont} />
      <Text style={styles.header}>Öğrenci Hesabı Oluşturun</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Okul Numarası"
        value={schoolNumber}
        onChangeText={setSchoolNumber}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Ad Soyad"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <Pressable style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
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
    width: 1600,
    height: 150,
    marginBottom: 30,
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
  signupButton: {
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
    marginBottom: 20,
  },
});

export default StudentSignupScreen;
