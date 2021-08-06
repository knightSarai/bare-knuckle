import Link from 'next/link';
import { FaSignInAlt } from 'react-icons/fa'
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
                    <li>
                        <Link href="/account/login">
                            <a className={`btn-secondary btn-icon ${styles.smallFont}`}>
                                <FaSignInAlt /> Login
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header >
    )
}
