import Link from "next/link";
import Layout from "@/components/layout";
import Fight from "@/components/FightItem";
import { FaPlus } from 'react-icons/fa'
import { API_URL } from "@/config/index";
import styles from "@/styles/fights.module.css";

export default function HomePage({ fights }) {
    return (
        <Layout >
            <div className={styles.fightsHeader}>
                <h1>Fights</h1>
                <Link href="/fights/add">
                    <a><FaPlus /> Add Fight</a>
                </Link>
            </div>
            {fights.length === 0 && <h3>No fights to show</h3>}
            {fights.map(fight => <Fight key={fight.id} fight={fight} />)}
        </Layout>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${API_URL}/fights?_sort=date:ASC`);
    const fights = await res.json();
    return {
        props: { fights },
    }
}