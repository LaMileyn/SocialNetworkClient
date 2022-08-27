import React, {FC} from 'react';
import styles from './ProfileRight.module.scss';
import BlockHeaderBorder from "../../../components/layout/BlockHeaderBorder/BlockHeaderBorder";
import {RefreshRounded} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import FriendSmall from "../../../components/layout/FriendSmall/FriendSmall";

const ProfileRight: FC = (props) => {
    return (
        <div className={styles.profileRight}>
            <BlockHeaderBorder icon={<IconButton><RefreshRounded style={{
                color: "var(--color-text-main)"
            }}/></IconButton>}>
                Friends
            </BlockHeaderBorder>
            <div className={styles.friends}>
                {
                    [...Array(4)].map((el, index) => {
                        return <FriendSmall key={index}/>
                    })
                }
            </div>
            <div className={styles.bottom}>
                <Button>See all</Button>
            </div>
        </div>
    );
}

export default ProfileRight;