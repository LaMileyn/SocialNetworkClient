import React, {Dispatch, FC, SetStateAction} from 'react';
import Picker, {IEmojiData} from 'emoji-picker-react'

interface IProps {
    setValue : Dispatch<SetStateAction<string>>
}

const AppEmoji: FC<IProps> = ({ setValue }) => {

    const handleEmojyClick = (event : React.MouseEvent, data : IEmojiData) =>{
        setValue( prev => prev + data.emoji )
    }
    return (
        <Picker onEmojiClick={handleEmojyClick}/>
    );
}

export default AppEmoji;