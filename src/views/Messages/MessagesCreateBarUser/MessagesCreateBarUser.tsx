import React, {FC, useMemo} from 'react';
import styles from './MessagesCreateBarUser.module.scss';
import {Avatar, Checkbox} from "@mui/material";
import {IUser} from "../../../models";

interface IProps {
    addNewPerson : ( user : IUser ) => void,
    user : IUser,
    selectedPeople : IUser[],
    removeFromSelected :  ( id : string) => void
}

const MessagesCreateBarUser: FC<IProps> = ({ addNewPerson, user, selectedPeople,removeFromSelected }) => {

    const clickPersonHandler = () =>{
        !checked ? addNewPerson(user) : removeFromSelected(user._id)
    }
    const checked = useMemo( () =>{
        return Boolean(selectedPeople.find( person => user._id === person._id))
    },[selectedPeople])

    return (
        <div className={styles.personItem} onClick={clickPersonHandler}>
            <div className={styles.left}>
                <Avatar src={"/images/" + user.profilePicture}  sx={{ width : 45, height : 45}}/>
                <div className={styles.name}>{user.username}</div>
            </div>
            <div className={styles.checkbox}>
                <Checkbox
                    checked={checked}
                    sx={{ color : "var(--color-grey-low)"}}
                    inputProps={{'aria-label': 'controlled'}}
                />
            </div>
        </div>
    );
}

export default MessagesCreateBarUser;