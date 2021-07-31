import Link from "next/link";
import Pagination from "@/components/Pagination";
import Layout from "@/components/layout";
import Fight from "@/components/FightItem";
import { FaPlus } from 'react-icons/fa'
import { API_URL } from "@/config/index";
import styles from "@/styles/fights.module.css";

export default function FightPage({ fights, pagination }) {
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
            <Pagination pagination={pagination} />
        </Layout>
    )
}

export async function getServerSideProps({ query: { page = 1 } }) {
    const PER_PAGE = 2
    const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE
    const res = await fetch(`${API_URL}/fights?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
    const fights = await res.json();
    return {
        props: {
            fights,
            pagination: {
                page: +page,
                total: await (await fetch(`${API_URL}/fights/count`)).json(),
                PER_PAGE
            }
        },
    }
}