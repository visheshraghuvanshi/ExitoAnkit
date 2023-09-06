import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../Shared/Colors'
import { AntDesign } from '@expo/vector-icons';

import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup } from "firebase/auth";
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export default function Login() {
  const [user] = useAuthState(auth);
  return (
    <View style={styles.iamgeSize}>
      <Image source={require("./../assets/images/app.png")} />
      <section>{user ? <Xyz /> : <SignIn />}</section>
    </View>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to Exito Ankit</Text>
        <Text style={{ textAlign: "center", marginTop: 40, fontSize: 20 }}>
          Login/SignUp
        </Text>
        <View style={styles.button} onClick={signInWithGoogle}>
          <AntDesign
            name="googleplus"
            size={24}
            color="white"
            style={{ marginRight: 12 }}
          />
          <Text style={{ color: Colors.white }}>Sign In With Google</Text>
        </View>
      </View>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function Xyz() {
  return <div id="tex">Login Successful</div>;
}
const styles = StyleSheet.create({
  iamgeSize: {
    paddingBottom: 190,
    marginTop: -60,
  },
  container: {
    paddingTop: 20,
    marginTop: -25,
    backgroundColor: "#fff",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },

  welcomeText: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 40,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    margin: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
