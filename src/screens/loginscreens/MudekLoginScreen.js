import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Image } from 'react-native';
import { db } from '../../../firebase';

const MudekLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const querySnapshot = await db.collection('mudekmanagement').get();
      let loggedIn = false;

      querySnapshot.forEach(doc => {
        const mudekData = doc.data();
        if (mudekData.email === email && mudekData.password === password) {
          loggedIn = true;
        }
      });

      if (loggedIn) {
        // Giriş başarılı, Mudek ekranına yönlendir
        navigation.navigate('Mudek');
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
      <Text style={styles.header}>MÜDEK Denetleyicisi Girişi</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
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

      <Pressable style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Geri Dön</Text>
      </Pressable>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagecont: {
    justifyContent: 'flex-start',

    width: 1600,
    height: 150,
    marginBottom: 50,
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
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  goBackButton: {
    backgroundColor: '#041C30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default MudekLoginScreen;
