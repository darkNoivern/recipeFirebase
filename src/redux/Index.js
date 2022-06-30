const InitialOBJ = {
    loggedin: false,
    currentUser: "",
    photourl: "",
    emailid: "",
};

let InitialState;
if(localStorage.getItem("recipe") === null){
    InitialState = InitialOBJ;
}
else{
    InitialState = JSON.parse(localStorage.getItem("userDetails"))
}

console.log(InitialState)

const rootReducer = (state = InitialState, action) => {
    switch(action.type){
        case 'SIGNIN':
            let newstate = state;
            newstate.loggedin = true;
            newstate.currentUser = action.payload.username;
            newstate.photourl = action.payload.photourl;
            newstate.emailid = action.payload.emailid;
            state = newstate;
            localStorage.setItem("userDetails", JSON.stringify(state));  
            return state;
        case 'LOGOUT':
            state.loggedin = false;
            state.currentUser = "";
            state.photourl = "";
            state.email = "";
            localStorage.setItem("userDetails", JSON.stringify(state));
            return state;
        default: return state;
    }
}

export default rootReducer