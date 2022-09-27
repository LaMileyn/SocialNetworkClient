import React, {FC, useEffect, useMemo, useState} from 'react';
import styles from "../../MessagesCreateSidebar.module.scss";
import MessagesCreateBarUser from "../../../MessagesCreateBarUser/MessagesCreateBarUser";
import {IUser, UserDto} from "../../../../../models";
import {useFetching} from "../../../../../utils/hooks";
import userService from "../../../../../services/user-service";


interface IProps {
    removeFromSelected : ( id : string) => void,
    addToSelected : ( user : IUser ) => void,
    selectedPeople: IUser[],
    peopleSearchValue : string,
    user: UserDto | null
}

const UsersList: FC<IProps> = ({ user, addToSelected, removeFromSelected, selectedPeople, peopleSearchValue }) => {

    const [friends, setFriends] = useState<IUser[]>([])

    const [fetchFriends, isFriendsLoading, error] = useFetching(async () => {
        const {data} = await userService.getFriends(user!.userInfo!._id)
        setFriends(data)
    })

    useEffect(() => {
        fetchFriends()
    }, [])

    const filteredByName = useMemo(() => {
        if (!friends) return []
        if (!peopleSearchValue.length) return friends;
        return friends.filter(el => el.username.indexOf(peopleSearchValue) !== -1)
    }, [friends, peopleSearchValue])

    return (
        <div className={styles.searchResults}>
            {
                filteredByName.length === 0 && <div className={styles.emptyFriends}>
                    <p>No friends was found..</p>
                </div>
            }
            {
                filteredByName.map((friend) => {
                    return (
                        <MessagesCreateBarUser key={friend._id} user={friend}
                                               addNewPerson={addToSelected}
                                               removeFromSelected={removeFromSelected}
                                               selectedPeople={selectedPeople}
                        />
                    )
                })
            }
        </div>
    );
}

export default React.memo(UsersList);