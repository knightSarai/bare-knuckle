import Link from 'next/link';
import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>Copyright &copy; Bare Knuckle 2021</p>
            <p>
                <Link href="/about" >
                    About Bare Knuckle
                </Link>
            </p>
        </footer>
    )
}
