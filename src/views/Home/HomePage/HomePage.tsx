import React, {FC} from 'react';
import styles from './HomePage.module.scss';
import Stories from "../../../components/layout/Stories/Stories";
import SharePost from "../../../components/layout/SharePost/SharePost";
import Post from "../../../components/layout/Post/Post";
import HomeEvents from "../HomeEvents/HomeEvents";

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
                    <div className={styles.posts}>
                        {
                            [...Array(5)].map((el, index) => (
                                <div key={index} className={styles.post}>
                                    <Post/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.rightPart}>
                    <HomeEvents/>
                </div>
            </div>
        </section>
    );
}

export default HomePage;