import Link from 'next/link';
import Search from '../Search/';
import styles from './header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a>Bare Knuckle</a>
                </Link>
            </div>
            <Search />
            <nav>
                <ul>
                    <li>
                        <Link href="/fights">
                            <a>Fights</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header >
    )
}
