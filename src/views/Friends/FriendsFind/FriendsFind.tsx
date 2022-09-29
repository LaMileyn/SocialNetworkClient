import React, {FC, useCallback, useEffect, useState} from 'react';
import styles from './FriendsFind.module.scss';
import BlockHeaderBorder from "../../../components/layout/BlockHeaderBorder/BlockHeaderBorder";
import FriendsSearchBar from "../FriendsSearchBar/FriendsSearchBar";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import FriendsList from "../FriendsList/FriendsList";
import {getUsers} from "../../../store/users/users.actions";
import {useParams} from "react-router-dom";

interface IProps {
}

const FriendsFind: FC<IProps> = (props) => {

    const dispatch = useAppDispatch();
    const { id : paramsId } = useParams()
    const [inputValue, setInputValue] = useState<string>("")

    const { user } = useAppSelector( state => state.auth )
    const {users, fetching, error,} = useAppSelector(state => state.users)

    const onChangeInputFunction = useCallback((value: string) => {
        setInputValue(value)
    }, [])

    useEffect( () =>{
        dispatch(getUsers({
            search: "",
            isFriend: false,
            id : paramsId? paramsId: user!.userInfo!._id
        }))
    },[])

    const handleEnterClick = (event : React.KeyboardEvent) =>{
        if (event.key === "Enter"){
            dispatch(getUsers({
                search: inputValue,
                isFriend: false,
                id : paramsId? paramsId: user!.userInfo!._id
            }))
        }
    }

    return (
        <div className={styles.friendsFind}>
            <BlockHeaderBorder>
                Friend Search
            </BlockHeaderBorder>
            <FriendsSearchBar value={inputValue} onChangeInput={onChangeInputFunction} handleEnterClick={handleEnterClick}/>
            <FriendsList data={users || []}/>
        </div>
    );
}

export default FriendsFind;