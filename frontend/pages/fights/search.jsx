import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from "@/components/layout";
import Fight from "@/components/FightItem";
import { API_URL } from "@/config/index";

export default function SearchPage({ fights }) {
    const router = useRouter();
    return (
        <Layout title='Search Result' >
            <Link href='/fights'>Go Back</Link>
            <h1>Search Results for {router.query.term}</h1>
            {fights.length === 0 && <h3>No fights to show</h3>}
            {fights.map(fight => <Fight key={fight.id} fight={fight} />)}
        </Layout>
    )
}

export async function getServerSideProps({ query: { term } }) {
    const query = qs.stringify({
        _where: {
            _or: [
                { name_contains: term },
                { fighters_contains: term },
                { description_contains: term },
                { venue_contains: term },
            ]
        }
    })
    const res = await fetch(`${API_URL}/fights?${query}&_sort=date:ASC`);
    const fights = await res.json();
    return {
        props: { fights },
    }
}