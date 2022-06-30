import React from "react";
import "../styles/recipe.css";
import { db } from "../firebase.config";
import { useState, useEffect } from "react";
import {
    collection,
    onSnapshot,
    doc,
    setDoc,
    addDoc,
    deleteDoc,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";
import Card from "./Card";
import { useSelector } from "react-redux";

const Recipe = () => {

    const substituteData = useSelector(state=>state);
    const email = substituteData.emailid
    const [recipes, setRecipes] = useState([]);
    const [userlist, setUserlist] = useState([]);
    const [popup, setPopup] = useState(false);
    const [alert, setAlert] = useState(false);
    const [form, setForm] = useState({
        title: "",
        desc: "",
        ingredients: "",
        steps: "",
        emailid: email,
    });

    const recipeCollectionRef = collection(db, "food");
    const usersCollectionRef = collection(db, "users");
    // const order = query(recipeCollectionRef,orderBy('count')); 
    useEffect(() => {
        onSnapshot(recipeCollectionRef, (snapshot) => {
        // onSnapshot(order, (snapshot) => {
            console.log(snapshot);
            setRecipes(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });
        onSnapshot(usersCollectionRef, (snapshot) => {
        // onSnapshot(order, (snapshot) => {
            console.log(snapshot);
            setUserlist(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });
    },[]);

    const resetForm = () => {
        setForm({
            title: "",
            desc: "",
            ingredients: "",
            steps: "",
            emailid: email,
        });
    };

    const handleSubmit = (event) => {
        // event.preventDefault();
        if (!form.title || !form.desc || !form.ingredients || !form.steps) {
            setAlert(true);
        } else {
            setAlert(false);
            setPopup(false);
            addDoc(recipeCollectionRef,{
                ...form,createdAt: serverTimestamp()
            });
            console.log("submitted");
            userlist.forEach((user)=>{
                if(user.email===email){
                    console.log(user.email,user.count)
                    // user.count = user.count+1;
                    const updateOBJ = {
                        email: user.email,
                        count: user.count+1,
                    }
                    setDoc(doc(db, 'users', user.id), updateOBJ)
                    console.log(doc(db, 'users', user.id))
                    console.log(user.email,user.count);
                }
            })
            resetForm();
        }
    };

    return (
        <>
            <div className="page-bg bg-color60">
                <h1 className="text-center pb-3 pt-5 text-color20">My recipie</h1>
                <div className="flexy">
                    <button
                        onClick={() => {
                            setPopup(true);
                        }}
                        className="ui button bg-color40 text-color20"
                    >
                        Add Recipe
                    </button>
                </div>
                <div className="store-recipe">
                    <div className="row mx-0">
                        {recipes.map((recipe, index) => {
                            return (
                                <div className="col col-lg-4 col-md-6 col-12 p-5 flexy">
                                    <Card key={index} recipe={recipe} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                {popup && (
                    <div className="popup">
                        <div className="inner-popup bg-color60 p-4">
                            <h1 className="text-white">Add a new recipe</h1>
                            {alert === true ? (
                                <>
                                    <div
                                        className="alert alert-warning d-flex align-items-center"
                                        role="alert"
                                    >
                                        <div>
                                            <i className="fas fa-exclamation-triangle" />
                                            Please fill all fields
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                }}
                            >
                                <div className="form-group mb-3">
                                    <label className="text-white mb-2">Title</label>
                                    <input
                                        className="form-control recipe-input"
                                        type="text"
                                        placeholder="Enter the title..."
                                        value={form.title}
                                        onChange={(event) => {
                                            setAlert(false);
                                            setForm({ ...form, title: event.target.value });
                                        }}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="text-white mb-2">Description</label>
                                    <input
                                        className="form-control recipe-input"
                                        type="text"
                                        placeholder="Enter the description..."
                                        value={form.desc}
                                        onChange={(event) => {
                                            setAlert(false);
                                            setForm({ ...form, desc: event.target.value });
                                        }}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="text-white mb-2">Ingredients</label>
                                    <input
                                        className="form-control recipe-input"
                                        type="text"
                                        placeholder="Enter the ingedients..."
                                        value={form.ingredients}
                                        onChange={(event) => {
                                            setAlert(false);
                                            setForm({ ...form, ingredients: event.target.value });
                                        }}
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="text-white mb-2">Steps</label>
                                    <input
                                        className="form-control recipe-input"
                                        type="text"
                                        placeholder="Enter the steps..."
                                        value={form.steps}
                                        onChange={(event) => {
                                            setAlert(false);
                                            setForm({ ...form, steps: event.target.value });
                                        }}
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button
                                        onClick={() => {
                                            handleSubmit();
                                        }}
                                        className="ui button primary"
                                    >
                                        Add Recipe
                                    </button>
                                    <button
                                        onClick={() => {
                                            resetForm();
                                            setPopup(false);
                                            setAlert(false);
                                        }}
                                        className="button ui red"
                                    >
                                        CLose
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Recipe;
