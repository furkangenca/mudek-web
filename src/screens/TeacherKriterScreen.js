import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker, TextInput, Alert, Image, ScrollView, Pressable } from 'react-native';
import { db } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const TeacherKriterScreen = () => {
    const navigation = useNavigation();
    const [kriterList, setKriterList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedKriter, setSelectedKriter] = useState(null);
    const [rating, setRating] = useState('');
    const [lesson, setLesson] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredStudentList, setFilteredStudentList] = useState([]);

    useEffect(() => {
        const unsubscribeKriters = db.collection('kriters').onSnapshot(snapshot => {
            const kriterData = [];
            snapshot.forEach(doc => {
                kriterData.push({ id: doc.id, kriter: doc.data().kriter, lesson: doc.data().lesson });
            });
            console.log('Kriterler yüklendi:', kriterData);
            setKriterList(kriterData);
        });

        const unsubscribeStudents = db.collection('students').onSnapshot(snapshot => {
            const studentData = [];
            snapshot.forEach(doc => {
                studentData.push({ id: doc.id, fullName: doc.data().fullName, schoolNumber: doc.data().schoolNumber });
            });
            console.log('Öğrenciler yüklendi:', studentData);
            setStudentList(studentData);
        });

        return () => {
            unsubscribeKriters();
            unsubscribeStudents();
        };
    }, []);

    const handleRatingSubmit = async () => {
        console.log('Rating Submit Pressed');
        if (selectedStudent && selectedKriter && rating !== '') {
            try {
                const parsedRating = parseInt(rating, 10);
                if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 10) {
                    Alert.alert('Hata', 'Lütfen 1-10 arasında geçerli bir puan girin');
                    return;
                }

                console.log('Adding or updating score for student:', selectedStudent.id);

                const selectedKriterDoc = kriterList.find(kriter => kriter.kriter === selectedKriter);
                if (selectedKriterDoc) {
                    setLesson(selectedKriterDoc.lesson);

                    const scoresRef = db.collection('scores');
                    const querySnapshot = await scoresRef
                        .where('studentId', '==', selectedStudent.id)
                        .where('kriter', '==', selectedKriter)
                        .where('lesson', '==', selectedKriterDoc.lesson)
                        .get();

                    if (!querySnapshot.empty) {
                        // Update existing document
                        querySnapshot.forEach(async (doc) => {
                            await scoresRef.doc(doc.id).update({ rating: parsedRating });
                        });
                        console.log('Score successfully updated for student');
                        Alert.alert('Başarılı', 'Puan başarıyla güncellendi');
                    } else {
                        // Add new document
                        await scoresRef.add({
                            studentId: selectedStudent.id,
                            kriter: selectedKriter,
                            lesson: selectedKriterDoc.lesson,
                            rating: parsedRating,
                        });
                        console.log('Score successfully added to student');
                        Alert.alert('Başarılı', 'Puan başarıyla eklendi');
                    }

                    setSelectedStudent(null);
                    setSelectedKriter(null);
                    setRating('');
                    setLesson('');
                } else {
                    Alert.alert('Hata', 'Seçilen kriterin belgesi bulunamadı');
                }
            } catch (error) {
                console.error('Puan eklenirken veya güncellenirken hata oluştu:', error);
                Alert.alert('Hata', 'Puan eklenirken veya güncellenirken bir hata oluştu');
            }
        } else {
            Alert.alert('Hata', 'Lütfen bir öğrenci, kriter seçin ve puan girin');
        }
    };

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            Alert.alert('Hata', 'Lütfen bir arama terimi girin');
            return;
        }

        try {
            // fullName alanına göre sorgu
            const fullNameQuerySnapshot = await db.collection('students')
                .where('fullName', '>=', searchQuery)
                .where('fullName', '<=', searchQuery + '\uf8ff')
                .get();

            // schoolNumber alanına göre sorgu
            const schoolNumberQuerySnapshot = await db.collection('students')
                .where('schoolNumber', '>=', searchQuery)
                .where('schoolNumber', '<=', searchQuery + '\uf8ff')
                .get();

            // Sonuçları birleştir
            const studentData = [];
            const seenIds = new Set();

            fullNameQuerySnapshot.forEach(doc => {
                if (!seenIds.has(doc.id)) {
                    seenIds.add(doc.id);
                    studentData.push({ id: doc.id, fullName: doc.data().fullName, schoolNumber: doc.data().schoolNumber });
                }
            });

            schoolNumberQuerySnapshot.forEach(doc => {
                if (!seenIds.has(doc.id)) {
                    seenIds.add(doc.id);
                    studentData.push({ id: doc.id, fullName: doc.data().fullName, schoolNumber: doc.data().schoolNumber });
                }
            });

            console.log('Arama sonuçları:', studentData);
            setFilteredStudentList(studentData);
        } catch (error) {
            console.error('Öğrenciler aranırken hata oluştu:', error);
            Alert.alert('Hata', 'Öğrenciler aranırken bir hata oluştu');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo.png')} style={styles.imagecont} />
            <Text style={styles.header}>Öğrenci Değerlendirme Sayfası</Text>

            <TextInput
                placeholder="Öğrenci adı veya numarası ile arayın"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
            />
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Ara</Text>
            </TouchableOpacity>

            <ScrollView style={styles.studentListContainer}>
                {filteredStudentList.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.studentItem, selectedStudent && selectedStudent.id === item.id ? styles.selectedStudentItem : null]}
                        onPress={() => setSelectedStudent(item)}
                    >
                        <Text style={styles.studentText}>{`${item.fullName} ${item.schoolNumber}`}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Text style={styles.header2}>Kriter Seçimi ve Puanlama</Text>
            <Picker
                selectedValue={selectedKriter}
                onValueChange={(itemValue) => setSelectedKriter(itemValue)}
                style={styles.picker}
                enabled={!!selectedStudent}
            >
                <Picker.Item label="Kriter Seçin" value={null} />
                {kriterList.map((kriter) => (
                    <Picker.Item key={kriter.id} label={kriter.kriter} value={kriter.kriter} />
                ))}
            </Picker>
            <TextInput
                placeholder="Puan (1-10)"
                value={rating}
                onChangeText={setRating}
                keyboardType="numeric"
                style={styles.input}
                editable={!!selectedStudent}
            />
            <TouchableOpacity style={styles.button} onPress={handleRatingSubmit} disabled={!selectedStudent}>
                <Text style={styles.buttonText}>Puan Ver</Text>
            </TouchableOpacity>

            <Pressable style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Geri Dön</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 34,
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
    header2: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        width: '30%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        width: '30%',
    },
    button: {
        backgroundColor: '#041C30',
        width: '10%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    studentListContainer: {
        width: '15%',
    },
    studentItem: {
        backgroundColor: '#880808',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    selectedStudentItem: {
        backgroundColor: '#d0d0d0',
    },
    studentText: {
        fontStyle: 'bold',
        fontSize: 16,
        textAlign: 'center',
        color: 'white',

    },
    picker: {
        width: '30%',
        height: 40,
        marginVertical: 10,
    },
});

export default TeacherKriterScreen;
