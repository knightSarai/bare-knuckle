import Link from 'next/link';
import Image from 'next/image';

import styles from './fightItem.module.css'

export default function FightItem({ fight }) {
    return (
        <div className={styles.fight}>
            <div className={styles.img}>
                <Image
                    src={fight.image ? fight.image : "/images/showcase.jpg"}
                    width={170}
                    height={100}
                />
            </div>
            <div className={styles.info}>
                <span>{fight.date} at {fight.time}</span>
                <h3>{fight.name}</h3>
            </div>
            <div className={styles.link}>
                <Link href={`fights/${fight.slug}`}>
                    <a className="btn">Details</a>
                </Link>
            </div>
        </div>
    )
}
