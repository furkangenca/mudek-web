import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Picker, Image, ScrollView } from 'react-native';
import { db, firebase } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const TeacherExamScreen = () => {
    const navigation = useNavigation();

    const [students, setStudents] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [midtermGrade, setMidtermGrade] = useState('');
    const [finalGrade, setFinalGrade] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredStudentList, setFilteredStudentList] = useState([]);

    useEffect(() => {
        const unsubscribeStudents = db.collection('students').onSnapshot(snapshot => {
            const studentData = [];
            snapshot.forEach(doc => {
                studentData.push({ id: doc.id, fullName: doc.data().fullName, schoolNumber: doc.data().schoolNumber });
            });
            setStudents(studentData);
        });

        const unsubscribeLessons = db.collection('lessons').onSnapshot(snapshot => {
            const lessonData = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                Object.keys(data).forEach(key => {
                    if (key.startsWith('ders')) {
                        lessonData.push({ id: doc.id, lessonName: data[key] });
                    }
                });
            });
            console.log('Dersler yüklendi:', lessonData);
            setLessons(lessonData);
        });
        return () => {
            unsubscribeStudents();
            unsubscribeLessons();
        };
    }, []);

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            Alert.alert('Hata', 'Lütfen bir arama terimi girin');
            return;
        }

        try {
            const fullNameQuerySnapshot = await db.collection('students')
                .where('fullName', '>=', searchQuery)
                .where('fullName', '<=', searchQuery + '\uf8ff')
                .get();

            const schoolNumberQuerySnapshot = await db.collection('students')
                .where('schoolNumber', '>=', searchQuery)
                .where('schoolNumber', '<=', searchQuery + '\uf8ff')
                .get();

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

            setFilteredStudentList(studentData);
        } catch (error) {
            console.error('Öğrenciler aranırken hata oluştu:', error);
            Alert.alert('Hata', 'Öğrenciler aranırken bir hata oluştu');
        }
    };

    const handleSubmit = async () => {
        if (!selectedStudent || !selectedLesson) {
            Alert.alert('Hata', 'Lütfen bir öğrenci ve ders seçin');
            return;
        }
    
        // Yalnızca dolu olan alanları ekliyoruz
        const examData = {};
        if (midtermGrade !== '') {
            examData['midterm'] = parseInt(midtermGrade, 10);
        }
        if (finalGrade !== '') {
            examData['final'] = parseInt(finalGrade, 10);
        }
    
        if (Object.keys(examData).length === 0) {
            Alert.alert('Hata', 'Lütfen bir not girin');
            return;
        }
    
        try {
            const studentExamRef = db.collection('exams').doc(selectedStudent.id);
    
            // Önceki notları al
            const doc = await studentExamRef.get();
            let previousData = {};
            if (doc.exists) {
                previousData = doc.data();
            }
    
            // Yeni notlarla önceki notları birleştir
            const newData = {
                ...previousData,
                [selectedLesson]: {
                    ...previousData[selectedLesson],
                    ...examData,
                },
            };
    
            // Belgeyi güncelle
            await studentExamRef.set({
                studentId: selectedStudent.id,
                ...newData,
            }, { merge: true });
    
            Alert.alert('Başarılı', 'Notlar başarıyla güncellendi');
            setSelectedStudent(null);
            setSelectedLesson(null);
            setMidtermGrade('');
            setFinalGrade('');
        } catch (error) {
            console.error('Notlar güncellenirken hata oluştu:', error);
            Alert.alert('Hata', 'Notlar güncellenirken bir hata oluştu');
        }
    };
    
    
    
    
    return (
        <View style={styles.container}>
                <Image source={require('../../assets/logo.png')} style={styles.imagecont} />
            <Text style={styles.header}>Öğrenci Sınav Notları Giriş Sistemi</Text>

            <TextInput
                placeholder="Öğrenci adı veya numarası ile arayın"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
            />
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Ara</Text>
            </TouchableOpacity>

            <ScrollView style={styles.studentListContainer} >
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

            <Picker
                selectedValue={selectedLesson}
                onValueChange={(itemValue) => setSelectedLesson(itemValue)}
                style={styles.picker}
                enabled={!!selectedStudent}
            >
                <Picker.Item label="Ders Seçin" value={null} />
                {lessons.map((lesson) => (
                    <Picker.Item key={lesson.id} label={lesson.lessonName} value={lesson.lessonName} />
                ))}
            </Picker>

            <TextInput
                placeholder="Vize Notu"
                value={midtermGrade}
                onChangeText={setMidtermGrade}
                keyboardType="numeric"
                style={styles.input}
                editable={!!selectedStudent}
            />
            <TextInput
                placeholder="Final Notu"
                value={finalGrade}
                onChangeText={setFinalGrade}
                keyboardType="numeric"
                style={styles.input}
                editable={!!selectedStudent}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={!selectedStudent}>
                <Text style={styles.buttonText}>Not Ver</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Geri Dön</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    imagecont: {
        width: 1600,
        height: 150,
        marginBottom: 50,

    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#041C30'
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        width: '40%',
    },
    button: {
        backgroundColor: '#041C30',
        width: '6%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 5,
        marginBottom:10,
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
        backgroundColor: '#a0a0a0',
    },
    studentText: {
        color: 'white',

        fontStyle: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    picker: {
        width: '30%',
        height: 40,
        marginVertical: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        width: '8%',
        textAlign: 'center',
    },
});

export default TeacherExamScreen;