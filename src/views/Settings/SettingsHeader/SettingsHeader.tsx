import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import BlockHeaderBorder from "../../../components/layout/BlockHeaderBorder/BlockHeaderBorder";
import styles from './SettingsHeader.module.scss';
import {ArrowBack} from "@mui/icons-material";
import {IconButton} from "@mui/material";

interface IProps {
    headerTitle: string
}

const SettingsHeader: FC<IProps> = ({headerTitle}) => {
    const navigate = useNavigate();

    return (
        <div className={styles.header}>
            <BlockHeaderBorder>
                <div className={styles.withArrow}>
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBack/>
                    </IconButton>
                    <span>{headerTitle}</span>
                </div>
            </BlockHeaderBorder>
        </div>
    );
}

export default SettingsHeader;