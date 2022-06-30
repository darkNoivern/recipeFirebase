import React from 'react';
import "../styles/chat.css";
import { db } from "../firebase.config";
import { auth } from '../firebase.config';
import { useState, useEffect } from "react";
import {
    collection,
    onSnapshot,
    // doc,
    addDoc,
    // deleteDoc,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";
import { useSelector } from 'react-redux';

const Chat = () => {

    const substituteData = useSelector(state => state);
    const username = substituteData.currentUser;
    const photourl = substituteData.photourl;
    const email = substituteData.emailid;

    const [chats, setChats] = useState([]);
    const [form, setForm] = useState({
        text: "",
        username: username,
        emailID: email,
        photoURL: photourl,
    });

    const chatCollectionRef = collection(db, "chats");
    const sortRef = query(chatCollectionRef, orderBy('createdAt'));
    useEffect(() => {
        onSnapshot(sortRef, (snapshot) => {
            setChats(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });

    }, []);

    const submitChat = () => {
        if (form.text) {
            addDoc(chatCollectionRef, {
                ...form, createdAt: serverTimestamp()
            });
            console.log("submitted");
            setForm({ ...form, text: "" });
        }
    }

    return (
        <>
            <div className='page-bg bg-color60 pt-4 pb-5 px-lg-5 px-md-4 px-sm-3 px-2'>
                {
                    chats.map((chat, index) => {
                        return (
                            chat.emailID === email ? 
                            <div key={index} className="d-flex justify-content-end my-4">
                                <div className='py-2 px-3 chat-own-message bg-color40 text-dark'>
                                    {chat.text}{/* {chat.username} */}
                                </div>
                                <div className="userdp ms-2">
                                    <img src={chat.photoURL} alt="" />
                                </div>
                            </div>
                             :
                            <div key={index} className="d-flex justify-content-start my-4">
                                <div className="userdp me-2">
                                    <img src={chat.photoURL} alt="" />
                                </div>
                                <div className='py-2 px-3 chat-message text-color40 bg-dark'>
                                    {chat.text}{/* {chat.username} */}
                                </div>
                            </div>
                        )
                    })
                }
                <div className='d-flex type-box justify-content-between mx-lg-5 mx-md-4 mx-sm-3 mx-2'>
                    <input value={form.text} type="text" onChange={(event) => { setForm({ ...form, text: event.target.value }); }} placeholder='Enter your text...' className='form-control text-white bg-color60 chat-input me-4' />
                    <button onClick={() => { submitChat() }} className='send-btn mx-0 button ui bg-color40 text-white'>Send</button>
                </div>
            </div>
        </>
    );
};

export default Chat;
