import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Image } from 'react-native';
import { firebase } from '../../../firebase';

const StudentLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // Başarılı girişten sonra Home ekranına yönlendir
      navigation.navigate('Student');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo.png')} style={styles.imagecont} />

     <Text style = {styles.header}>Öğrenci Girişi</Text>

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
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </Pressable>

      
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Pressable style={styles.signupButton} onPress={() => navigation.navigate('StudentSignup')}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </Pressable>
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
    fontSize:34,
    color: '041C30',
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
  signupButton: {
    backgroundColor: '#041C30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
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

export default StudentLoginScreen;
