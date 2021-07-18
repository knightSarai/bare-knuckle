import Layout from "@/components/layout"
import { API_URL } from "@/config/"
export default function HomePage() {
  return (
    <Layout >
      <h1>knight</h1>
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/get-fights`)
}