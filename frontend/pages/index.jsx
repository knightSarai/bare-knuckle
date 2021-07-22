import Layout from "@/components/layout";
import Fight from "@/components/FightItem";
import { API_URL } from "@/config/index";
import Link from "next/link";
export default function HomePage({ fights }) {
  return (
    <Layout >
      <h1>Upcoming Fights</h1>
      {fights.length === 0 && <h3>No fights to show</h3>}
      {fights.map(fight => <Fight key={fight.id} fight={fight} />)}
      {fights.length > 0 && (
        <Link href="/fights">
          <a className="btn-secondary">View All Fights</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/fights`);
  const fights = await res.json();
  return {
    props: { fights: fights.slice(0, 3) },
  }
}