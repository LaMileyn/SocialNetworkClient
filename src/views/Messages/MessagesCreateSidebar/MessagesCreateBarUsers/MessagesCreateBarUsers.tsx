import React, {FC, useState} from 'react';
import {IUser, UserDto} from "../../../../models";
import styles from "../MessagesCreateSidebar.module.scss";
import {Avatar, Chip, IconButton, Stack} from "@mui/material";
import {Close} from "@mui/icons-material";
import UsersList from "./UsersList/UsersList";


interface IProps {
    selectedPeople: IUser[],
    removeFromSelected: (id: string) => void,
    addToSelected: (user: IUser) => void,
    user: UserDto | null
}

const MessagesCreateBarUsers: FC<IProps> = ({selectedPeople, removeFromSelected, addToSelected, user}) => {

    const [peopleSearchValue, setPeopleSearchValue] = useState<string>("");

    return (
        <div className={styles.invites}>
            <div className={styles.search}>
                <div className={styles.inputWrapper}
                     style={{flexWrap: selectedPeople.length === 0 ? "nowrap" : "wrap"}}>
                    {
                        selectedPeople.length > 0 && <Stack direction="row" spacing={1} className={styles.stack}>
                            {
                                selectedPeople.map((el) => {
                                    return <Chip
                                        key={el._id}
                                        sx={{color: "var(--color-text-main)"}}
                                        onClick={() => removeFromSelected(el._id)}
                                        className={styles.chip}
                                        avatar={<Avatar alt="Natacha" src={"/images/" + el.profilePicture}/>}
                                        label={
                                            <>
                                                {el.username}
                                                <IconButton className={styles.chipCloseBtn}>
                                                    <Close className={styles.chipCloseIcon}/>
                                                </IconButton>
                                            </>
                                        }
                                        variant="outlined"
                                    />
                                })
                            }
                        </Stack>
                    }
                    <input type="text" placeholder={"Введите имя или фамилию"} value={peopleSearchValue}
                           onChange={(e) => setPeopleSearchValue(e.currentTarget.value)}/>
                    {
                        selectedPeople.length === 0 &&
                        <IconButton className={styles.erasor}
                                    style={{opacity: peopleSearchValue.length > 0 ? "1" : "0"}}>
                            <Close/>
                        </IconButton>
                    }
                </div>
            </div>
            <UsersList user={user} peopleSearchValue={peopleSearchValue} selectedPeople={selectedPeople} addToSelected={addToSelected}
                       removeFromSelected={removeFromSelected}/>
        </div>
    );
}

export default React.memo(MessagesCreateBarUsers);