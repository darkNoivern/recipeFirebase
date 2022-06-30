import React from 'react';
import { useState, useEffect } from 'react';
import { auth } from '../firebase.config';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { collection } from 'firebase/firestore';
import { db } from '../firebase.config';
import { addDoc } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';

const SignIn = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userlist,setUserlist] = useState([]);
    
    const usersCollectionRef = collection(db, "users");
    useEffect(() => {
        onSnapshot(usersCollectionRef, (snapshot) => {
            setUserlist(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });

    }, []);

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                props.toggleUser(true);
                console.log(result);
                const user = auth.currentUser;
                console.log(user.photoURL);

                
                const checkEmailPresent = userlist.find((individual) => {
                    return (individual.email === user.email);
                })
                
                if (checkEmailPresent === undefined) {
                    addDoc(usersCollectionRef, {
                        email: user.email,
                        count: 0,
                    });
                }

                const payloadOBJ = {
                    username: user.displayName,
                    photourl: user.photoURL,
                    emailid: user.email,
                }
                dispatch({
                    type: 'SIGNIN',
                    payload: payloadOBJ,
                });
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <div className="page-bg bg-color60 flexy">
                <button className="ui button bg-color40 text-white" onClick={() => signInWithGoogle()}>SignIn</button>
            </div>
        </>
    );
};

export default SignIn;
