# 📘 MÜDEK Management System

The **MÜDEK Management System** is a web-based application built using **React Native** and **Expo for Web**. It is designed to support the definition, evaluation, and continuous improvement of engineering education programs in accordance with **MÜDEK accreditation standards**.

This platform enables instructors, students, and administrators to efficiently manage academic data, monitor progress, and ensure compliance with quality assurance criteria.

> ⚠️ **Note:** Although built with React Native and Expo, this project is configured specifically for **web browsers**. It is **not optimized for mobile usage**.

---

## 🧩 Features

- 🔐 **MÜDEK Administrator Login**  
  Manages accreditation workflows, defines evaluation standards, and updates system content.

- 👨‍🏫 **Instructor Login**  
  Adds and updates course details, records exam grades, and evaluates student performance based on administrator-defined criteria.

- 🎓 **Student Login**  
  Views course schedules, exam results, and academic evaluations in a secure environment.

- 🔒 **Data Security and Privacy**  
  All user data is securely stored via Firebase and is accessible only to authorized roles.

---

## ⚙️ Technologies Used

- **React Native** – Cross-platform development framework  
- **Expo for Web** – Web deployment toolkit for React Native  
- **Firebase** – Backend services (Authentication, Firestore, Storage)  

---

## 🚀 Getting Started

### 📁 Setup

1. **Clone the repository**
```bash
git clone https://github.com/furkangenca/Mudek---Web.git
cd Mudek---Web
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a `firebase.js` file in the root directory**  
Add your Firebase configuration to enable database and authentication features.

4. **Start the project (Web only)**
```bash
npx expo start --web
```

### 🔑 Authentication Notes

- **Instructor** and **MÜDEK Administrator** logins are controlled by verifying credentials stored in Firebase collections named `teachers` and `mudekmanagement`.
- No self-registration is available for these roles.

---

## 🧭 Usage Overview

1. **MÜDEK Administrator**
   - Define standards
   - Store course data
   - Set evaluation criteria

2. **Instructor**
   - Enter and update course data
   - Record exam scores
   - Evaluate students

3. **Student**
   - View grades and course schedules
   - Monitor academic progress

---

## 🎨 Design and Interface

### 🧑‍🎓 Student Information Area

<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/b95ec446-650d-48b5-a827-d84ac34ade4f" width="850">
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/54f5cf66-3a61-4a86-907f-24a48b111157" width="850">

### 👨‍🏫 Instructor Evaluation Screens

<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/3d908e41-dac0-4ee7-b721-25d2a5080d50" width="850">
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/60f0c262-b66e-4886-8e56-1470814d4786" width="850">
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/1d72b8e8-1023-4188-bd37-598764e74d58" width="850">

### 🧑‍💼 MÜDEK Administrator Panel

<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/5ea711a4-4f43-4de4-8ffd-1e325160d173" width="850">
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/774f71ae-c5bf-4451-80d3-429e8d71287b" width="850">

---

## 📌 Summary

This project provides a structured and reliable tool for managing academic assessment processes under MÜDEK standards. Its browser-first design and Firebase backend make it suitable for web-based usage in educational environments.

