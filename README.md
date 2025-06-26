# MÜDEK Management System

The MÜDEK Management System is an application designed to define, evaluate, and improve the standards of engineering education programs. This system provides an effective solution for instructors and students to organize course information, record exam grades, and perform assessments. It also provides the necessary infrastructure to ensure that evaluations carried out in accordance with MÜDEK standards are conducted reliably and securely.

## Features

- **MÜDEK Administrator Login**: Manages the accreditation process, defines standards, and stores course data. Specifies evaluation criteria and performs system updates.
- **Instructor Login**: Enters, updates, and stores course information. Records exam scores and evaluates students. Assigns points to students based on the criteria set by the MÜDEK administrator.
- **Student Login**: Views course schedules, checks exam results, and tracks academic progress. Accesses personal grades and views related documents.
- **Data Security and Privacy**: User information is securely stored and accessible only by authorized users.

## Technologies Used

- **React Native**: An open-source framework used for mobile app development.
- **Expo**: A toolkit that simplifies developing and running React Native apps.
- **Firebase**: Google’s platform providing services such as user authentication, database management, and file storage.
- **Visual Studio Code**: The development environment used for coding.

## Usage

1. **Register and Login**: Download the app, sign up, and log in.
2. **MÜDEK Administrator**:
   - Define standards and store course data.
   - Set evaluation criteria and apply updates.
3. **Instructors**:
   - Enter, update, and store course information.
   - Record exam scores and evaluate students.
4. **Students**:
   - View course schedules.
   - Check exam results and track academic progress.

## Requirements to Use the Application

- Create a `firebase.js` file in the root directory and configure it with your Firebase project settings to enable database and authentication features.
- You need to install Node.js and run the project via console. Also, make sure to install all the required packages used in the project.
- Instructor and MÜDEK administrator logins are not handled through registration, but by matching the email and password fields in the `teachers` and `mudekmanagement` collections in the Firebase database.

## Design

<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/219d3fdf-6cea-42b8-b1e9-caa8c3d6e3a1" width="850">
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/b1b80eb3-3445-490f-b65b-ea938397f5bc" width="850">

### Student Information Area
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/b95ec446-650d-48b5-a827-d84ac34ade4f" width="850">
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/54f5cf66-3a61-4a86-907f-24a48b111157" width="850">

### Instructor Student Evaluation Screens
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/3d908e41-dac0-4ee7-b721-25d2a5080d50" width="850">
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/60f0c262-b66e-4886-8e56-1470814d4786" width="850">
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/1d72b8e8-1023-4188-bd37-598764e74d58" width="850">

### MÜDEK Inspector Page
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/5ea711a4-4f43-4de4-8ffd-1e325160d173" width="850">
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/774f71ae-c5bf-4451-80d3-429e8d71287b" width="850">
