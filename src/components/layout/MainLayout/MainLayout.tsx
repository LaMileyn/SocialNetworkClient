import React, {FC} from 'react';
import styles from './MainLayout.module.scss';
import {Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";


const MainLayout : FC = (props) => {
    // const dispatch = useAppDispatch()
    // const {user} = useAppSelector(state => state.auth)
    // const { data : { socket }} = useAppSelector(state => state.socket)
    // useEffect(() => {
    //     const socket = io("ws://localhost:5000");
    //     dispatch(setSocket(socket))
    //     socket.emit("addUser", user.userInfo.id);
    //     socket.on("getUsers", (data) => {
    //         dispatch(setOnlineUsers(data))
    //     });
    //
    // }, [dispatch,user])
    //
    // if (!socket) return <CircularProgress variant={"indeterminate"} color={"primary"}/>
    // return (
    //     <>
    //         <Header/>
    //         <div className={styles.centerLayout}>
    //             <SideBar/>
    //             <div className={styles.rightWrapper}>
    //                 <Outlet/>
    //             </div>
    //         </div>
    //     </>
    // );
    return <div>ggg</div>
}

export default MainLayout;