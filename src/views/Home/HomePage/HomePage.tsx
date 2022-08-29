import React, {FC} from 'react';
import styles from './HomePage.module.scss';
import Stories from "../../../components/layout/Stories/Stories";
import SharePost from "../../../components/layout/SharePost/SharePost";
import HomeEvents from "../HomeEvents/HomeEvents";
import Posts from "../../../components/layout/Posts/Posts";

const HomePage: FC = (props) => {


    return (
        <section className={styles.home}>
            <div className={styles.container}>
                <div className={styles.leftPart}>
                    <div className={styles.stories}>
                        <Stories/>
                    </div>
                    <div className={styles.share}>
                        <SharePost/>
                    </div>
                    <Posts/>
                </div>
                <div className={styles.rightPart}>
                    <HomeEvents/>
                </div>
            </div>
        </section>
    );
}

export default HomePage;