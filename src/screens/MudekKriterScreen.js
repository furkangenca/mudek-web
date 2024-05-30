import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, Picker } from 'react-native';
import { db } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const MudekKriterScreen = () => {
    const navigation = useNavigation();

    const [inputText, setInputText] = useState('');
    const [lessonOptions, setLessonOptions] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await db.collection('lessons').get();
                const options = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    Object.entries(data).forEach(([field, value]) => {
                        if (field.startsWith('ders')) {
                            options.push({ value, label: value });
                        }
                    });
                });
                setLessonOptions(options);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleAddKriter = async () => {
        if (inputText.trim() !== '') {
            try {
                await db.collection('kriters').add({
                    kriter: inputText,
                    lesson: selectedLesson,
                });
                setInputText('');
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        }
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
            <Text style={styles.label}>Ders Seçiniz:</Text>
            <Picker
                selectedValue={selectedLesson}
                onValueChange={(itemValue) => setSelectedLesson(itemValue)}
                style={styles.select}
            >
                <Picker.Item label="Ders Seçiniz" value="" />
                {lessonOptions.map(option => (
                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
            </Picker>
            <TextInput
                placeholder="Kriter Giriniz"
                value={inputText}
                onChangeText={setInputText}
                style={styles.input}
            />
            <Pressable style={styles.addButton} onPress={handleAddKriter}>
                <Text style={styles.buttonText}>Kriter Ekle</Text>
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
        marginBottom: 50,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    select: {
        width: '30%',
        height: 40,
        marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 1,
    },
    input: {
        width: '30%',
        height: 40,
        marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
    },
    addButton: {
        backgroundColor: '#041C30',
        width: '10%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    goBackButton: {
        backgroundColor: '#041C30',
        width: '10%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
});

export default MudekKriterScreen;
