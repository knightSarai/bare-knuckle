import { useContext } from 'react';
import Link from 'next/link';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

import AuthContext from '@/context/AuthContext';
import Search from '../Search/';
import styles from './header.module.css';


export default function Header() {
    const { user, logout } = useContext(AuthContext)

    const LoggedInHeader = () => user && (
        <>
            <li>
                <Link href="/account/dashboard">
                    <a>Dashboard</a>
                </Link>
            </li>
        </>
    )

    const AuthenticationHeader = () => {
        if (user) return (
            <li>
                <button
                    className={`btn-secondary btn-icon ${styles.smallFont}`}
                    onClick={() => logout()}
                >
                    <FaSignOutAlt />  Logout
                </button>
            </li>
        )
        return (
            <li>
                <Link href={`/account/login`}>
                    <a className={`btn-secondary btn-icon ${styles.smallFont}`}>
                        <FaSignInAlt /> Login
                    </a>
                </Link>
            </li>
        )
    }

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
                    {LoggedInHeader()}
                    {AuthenticationHeader()}
                </ul>
            </nav>
        </header >
    )
}
