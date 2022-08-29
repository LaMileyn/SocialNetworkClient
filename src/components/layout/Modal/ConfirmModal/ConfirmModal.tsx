import React, {Dispatch, FC, SetStateAction} from 'react';
import styles from './ConfirmModal.module.scss';
import AppModal from "../AppModal/AppModal";
import BlockHeaderBorder from "../../BlockHeaderBorder/BlockHeaderBorder";
import {Button, IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";

interface IProps {
    open: boolean,
    text : string,
    onConfirm : () => void,
    setOpen: Dispatch<SetStateAction<boolean>>
}
const ConfirmModal : FC<IProps> = ({ open, setOpen, onConfirm, text}) => {
    return (
        <AppModal open={open} setOpen={setOpen}>
            <div className={styles.modal}>
                <BlockHeaderBorder icon={
                    <IconButton>
                        <Close style={{color: "var(--color-text-main)"}} onClick={() => setOpen(false)}/>
                    </IconButton>
                }>
                    Confirm window
                </BlockHeaderBorder>
                <div className={styles.content}>
                    <p>{text}</p>
                    <div className={styles.buttons}>
                        <Button variant={"outlined"} onClick={ () => setOpen(false)}>Cancel</Button>
                        <Button variant={"contained"} color={"error"} onClick={onConfirm}>Confirm</Button>
                    </div>
                </div>
            </div>
        </AppModal>
    );
}

export default ConfirmModal;