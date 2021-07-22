import Layout from "@/components/layout";
import Fight from "@/components/FightItem";
import { API_URL } from "@/config/index";
export default function HomePage({ fights }) {
    return (
        <Layout >
            <h1>Fights</h1>
            {fights.length === 0 && <h3>No fights to show</h3>}
            {fights.map(fight => <Fight key={fight.id} fight={fight} />)}
        </Layout>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${API_URL}/api/fights`);
    const fights = await res.json();
    return {
        props: { fights },
    }
}