import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user";

interface UserState {
    user: User | null;
}

const storedUser = localStorage.getItem("user"); //CONSULTAMOS EL LOCALSTORAGE
const initialState: UserState = {
    user: storedUser ? JSON.parse(storedUser) : null,
};

const userSlice = createSlice({  //ESTE MONITOREA LOS CAMBIOS
    name: "user",
    initialState,
    reducers: {  //SON METODOS PARA QUE CUANDO YO QUIERA LLAMARLOS SE PUEDAN LLAMAR ESAS FUNCIONES
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            if (action.payload) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            } else {
                localStorage.removeItem("user");
            }
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;