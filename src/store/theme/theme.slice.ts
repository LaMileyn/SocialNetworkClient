import {createSlice} from "@reduxjs/toolkit";

// get theme from local Storage
// if we do not have anything --> trying to get from system settings
// else ---> using dark theme ....//
const getTheme = () => {
    //getting from local storage
    const theme = `${window?.localStorage?.getItem("theme")}`
    if (["light","dark"].includes(theme)) return theme
    // trying system
    const userMedia = window.matchMedia('(prefers-color-scheme: light)')
    if ( userMedia.matches ) return "light"
    return "dark"
}

type themeState = string
interface IAction {
    payload : string
}
const initialState : themeState = getTheme()

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        set: (state,action : IAction ) => action.payload
    },
})
export const { set } = themeSlice.actions
export default themeSlice.reducer