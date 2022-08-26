import React, {FC} from 'react';
import styles from './HomeEvents.module.scss';
import BlockHeaderBorder from "../../../components/layout/BlockHeaderBorder/BlockHeaderBorder";

const HomeEvents: FC = (props) => {
    return (
        <div className={styles.events}>
            <BlockHeaderBorder icon={<span className={styles.seeAll}>See all</span>}>
                <span className={styles.headline}>Events</span>
            </BlockHeaderBorder>
            <div className={styles.items}>
                <div className={styles.item}>
                    <div className={styles.item__left}>
                        <img src="https://avatarko.ru/img/kartinka/33/muzhchina_spinoj_32846.jpg" alt=""/>
                    </div>
                    <div className={styles.item__right}>
                        <div>Meeting with clients</div>
                        <p>41 madison ave, floor 24 new work, NY 10010</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.item__left}>
                        <img src="https://avatarko.ru/img/kartinka/33/muzhchina_spinoj_32846.jpg" alt=""/>
                    </div>
                    <div className={styles.item__right}>
                        <div>Roadway to road</div>
                        <p>41 madison ave, floor 24 new work, NY 10010</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.item__left}>
                        <img src="https://avatarko.ru/img/kartinka/33/muzhchina_spinoj_32846.jpg" alt=""/>
                    </div>
                    <div className={styles.item__right}>
                        <div>Calling the habbits</div>
                        <p>Floor 24 new work, NY 10010</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeEvents;