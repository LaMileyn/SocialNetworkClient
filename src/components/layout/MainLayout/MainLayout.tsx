import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import styles from './MainLayout.module.scss';
import {Outlet, Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import {io} from "socket.io-client";
import {setOnlineUsers, setSocket} from "../../../store/socket/socket.slice";
import FullSectionLoader from "../FullSectionLoader/FullSectionLoader";


const MainLayout: FC = (props) => {

    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.auth)
    const { socket } = useAppSelector(state => state.socket)

    useEffect(() => {
        const socket = io("ws://localhost:5000");
        dispatch(setSocket(socket))
        socket.emit("addUser", user?.userInfo?._id);
        socket.on("getUsers", (data) => {
            dispatch(setOnlineUsers(data))
        });

    }, [dispatch,user])

    const leftRef = useRef<HTMLDivElement>(null);
    const [margin, setMargin] = useState<number>(0)

    useEffect(() => {
        if (leftRef.current) {
            setMargin(leftRef.current?.children[0].clientWidth)
        }
        window.addEventListener("resize", resizeHand)
        return () => window.removeEventListener("resize",resizeHand)
    }, [])

    function resizeHand(){
        setMargin(leftRef!.current!.children[0].clientWidth)
    }
    if (!socket) return <FullSectionLoader size={"large"}/>
    return (
        <>
            <div className={styles.centerLayout}>
                <div ref={leftRef}>
                    <SideBar/>
                </div>
                <div
                    style={{
                        marginLeft: margin + "px"
                    }}
                    className={styles.rightWrapper}
                >
                    <Header/>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}

export default MainLayout;