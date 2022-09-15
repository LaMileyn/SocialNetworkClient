import React, {FC} from 'react';
import styles from "./Squares.module.scss";
import {CameraAltOutlined, GroupOutlined, MusicNoteOutlined, SettingsOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {IUser, UserDto} from "../../../../models";
import SquaresItem from "../SquaresItem/SquaresItem";


interface IProps {
    user : UserDto | null,
    profile : IUser
}
export interface ISquare {
    icon : JSX.Element,
    text : string,
    onClick? : () => void
}
const Squares: FC<IProps> = ({ profile, user }) => {
    const navigate = useNavigate();

    const squares : ISquare[] = [
        { text : "Friends", icon : <GroupOutlined/> },
        { text : "Music", icon : <MusicNoteOutlined/> },
        { text : "Photos", icon : <CameraAltOutlined/> },
    ]
    if (profile._id === user?.userInfo?._id) squares.push({
        text : "Settings", icon : <SettingsOutlined/>, onClick : () => navigate('/settings')
    })
    return (
        <div className={styles.bottomSquares}>
            {
                squares.map( square => (
                    <SquaresItem {...square} key={square.text}/>
                ))
            }
        </div>
    );
}

export default Squares;