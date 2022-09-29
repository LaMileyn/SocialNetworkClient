import React, {FC} from 'react';
import styles from "../../MessagesDialogs/MessagesDialogs.module.scss";
import Dialog from "../../../../components/layout/Dialog/Dialog";
import {IConversation} from "../../../../models";
import {useAppSelector} from "../../../../utils/hooks";
import FullSectionLoader from "../../../../components/layout/FullSectionLoader/FullSectionLoader";


interface IProps {

}

const DialogsList: FC<IProps> = () => {

    const { conversations : { data : dialogs, fetching }} = useAppSelector( state => state.chat)

    if (fetching) return <FullSectionLoader size={"small"}/>
    return (
        <div className={styles.dialodsItems}>
            {
                dialogs && dialogs.length === 0 &&
                <div className={styles.empty}>
                    <p className={styles.empty__title}>Your dialogs list is empty.</p>
                    <p className={styles.empty__link}>Create first dialog</p>
                </div>
            }
            {
                dialogs && dialogs.map( (dialog) =>{
                    return <Dialog dialog={dialog} key={dialog._id}/>
                })
            }
        </div>
    );
}

export default DialogsList;