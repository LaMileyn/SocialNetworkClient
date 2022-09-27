import React, {FC, useState} from 'react';
import {useFile} from "../../../../utils/hooks";


interface IProps {
}

const MessagesCreateBarTop: FC<IProps> = (props) => {

    const [chatAvatar, setChatAvatar] = useState<string>("");
    const [newChatName, setNewChatName] = useState<string>("");

    const [handleChangeAvatar, fetchingChatAvatar, errorChatAvatar] = useFile(data => setChatAvatar(data))

    return (
        <div></div>
    );
}

export default MessagesCreateBarTop;