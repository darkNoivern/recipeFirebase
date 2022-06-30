import React from 'react';
import { db } from "../firebase.config";
import { auth } from '../firebase.config';
import { useState, useEffect } from "react";
import {
    collection,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import '../styles/leaderboard.css'


const Leaderboard = () => {
    const [userlist, setUserlist] = useState([]);

    const chatCollectionRef = collection(db, "users");
    const sortRef = query(chatCollectionRef, orderBy('count', "desc"));
    useEffect(() => {
        onSnapshot(sortRef, (snapshot) => {
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
    return (
        <>
            <div className='page-bg bg-color60'>
                <h1 className='py-3 flexy text-white'>
                    LeaderBoard
                </h1>
                <div className='table-container d-flex justify-content-center px-2'>
                    <table className="table my-2 text-white">
                        <tr>
                            <th className='text-center py-2'>Email</th>
                            <th className='text-center py-2'>Count</th>
                        </tr>
                        {
                            userlist.map((user, index) => {
                                return (
                                    <tr>
                                        <td className='text-center'>{user.email}</td>
                                        <td className='text-center'>{user.count}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        </>
    );
};

export default Leaderboard;
