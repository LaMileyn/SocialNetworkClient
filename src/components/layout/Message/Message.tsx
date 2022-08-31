import React, {FC} from 'react';
import {IMessage} from "../../../models";


interface IProps {
    message : IMessage
}

const Message: FC<IProps> = ({ message }) => {
    return (
        <div> message </div>
    );
}

export default Message;