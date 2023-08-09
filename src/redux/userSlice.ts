import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    _id: "",
    username: "",
    name: "",
    email: "",
    auth: false,
}


export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {

        setUser: (state,action) => {
            const {_id, username, email, name, auth} = action.payload;
            state._id = _id;
            state.username = username;
            state.email = email;
            state.name = name;
            state.auth = auth;
        },

        resetUser: (state) => {
            state._id = "";
            state.username = "";
            state.email = "";
            state.name = "";
            state.auth = false;
        },

    }
})


export const {setUser, resetUser} = userSlice.actions;

export default userSlice.reducer;