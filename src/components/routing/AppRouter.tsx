import React, {FC} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import HomePage from "../../views/Home/HomePage/HomePage";
import MessagesPage from "../../views/Messages/MessagesPage/MessagesPage";
import ProfilePage from "../../views/Profile/ProfilePage/ProfilePage";
import FriendsPage from "../../views/Friends/FriendsPage/FriendsPage";
import AuthPage from "../../views/Auth/AuthPage/AuthPage";


const AppRouter : FC = (props) => {
    return (
        <Routes>
            <Route path="/login" element={<AuthPage/>}/>
            <Route path="/register" element={<AuthPage/>}/>
            {/*<Route path="/" element={*/}
            {/*    <RequireAuth>*/}
            {/*        <MainLayout/>*/}
            {/*    </RequireAuth>*/}
            {/*}>*/}
            {/*    <Route index element={<Navigate to={"/feed"}/>}/>*/}
            {/*    <Route path="feed" element={<HomePage/>}/>*/}
            {/*    <Route path="messages" element={<MessagesPage/>}/>*/}
            {/*    <Route path="profile/:id/" element={<ProfilePage/>}/>*/}
            {/*    <Route path="friends/:id/*" element={<FriendsPage/>}/>*/}
            {/*</Route>*/}
        </Routes>
    );
}

export default AppRouter;