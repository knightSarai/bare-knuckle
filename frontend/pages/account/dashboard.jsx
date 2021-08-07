import Link from "next/link";
import Fight from "@/components/FightItem";
import { FaPlus } from 'react-icons/fa'
import Layout from '@/components/layout/';
import { API_URL } from '@/config/index';
import cookieParser from '@/helpers/cookieParser';
import styles from "@/styles/fights.module.css";


export default function Dashboard({ fights }) {
    return (
        <Layout>
            <div className={styles.fightsHeader}>
                <h1>Dashboard</h1>
                <Link href="/fights/add">
                    <a><FaPlus /> Add Fight</a>
                </Link>
            </div>
            <h2>My Fights</h2>
            {fights.length === 0 && <h3>No fights to show</h3>}
            {fights.map(fight => <Fight key={fight.id} fight={fight} />)}
        </Layout>
    )
}

export const getServerSideProps = async ({ req }) => {
    const { token } = cookieParser(req);

    const res = await fetch(`${API_URL}/fights/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    const fights = await res.json();

    return {
        props: {
            fights,
        }
    }
}