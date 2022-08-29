import React, {Dispatch, FC, SetStateAction} from 'react';
import {Modal} from "@mui/material";
import styles from './AppModal.module.scss';


interface IProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    children: JSX.Element
}

const AppModal: FC<IProps> = ({open, setOpen, children}) => {

    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={styles.modal}>
                {children}
            </div>
        </Modal>
    );
}

export default AppModal;