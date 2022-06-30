import React from "react";
import "../styles/card.css";
import { useState } from "react";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";

const Card = (props) => {
    const [view, setView] = useState(false);

    const removeRecipe = () => {
        deleteDoc(doc(db, "food", props.recipe.id));
    };

    return (
        <div>
            <div className="card p-3 bg-color60">
                <div className="mb-4">
                    <h3 className="text-color10">Title</h3>
                    <div className="text-white">{props.recipe.title}</div>
                </div>
                <div className="mb-4">
                    <h3 className="text-color10">Description</h3>
                    {/* <p>{recipe.desc}</p> */}
                    <div
                        className="text-white"
                        dangerouslySetInnerHTML={{ __html: props.recipe.desc }}
                    ></div>
                </div>
                {view === true ? (
                    <>
                        <div className="mb-4">
                            <h3 className="text-color10">Ingredients</h3>
                            <div className="text-white">{props.recipe.ingredients}</div>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-color10">Steps</h3>
                            <div className="text-white">{props.recipe.steps}</div>
                        </div>
                    </>
                ) : (
                    <></>
                )}

                <div className="buttons d-flex justify-content-between">
                    <button
                        className="button ui bg-color40 text-white mx-0"
                        onClick={() => {
                            setView(!view);
                        }}
                    >
                        {view === true ? "View Less" : "View More"}
                    </button>
                    <button
                        onClick={() => {
                            removeRecipe();
                        }}
                        className="button ui red mx-0"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
