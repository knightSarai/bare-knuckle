import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/layout/layout.component";
import { API_URL } from "@/config/index";
import styles from "@/styles/fight.module.css"

const deleteFight = (evt) => alert("fight deleted")

export default function FightPage({ fight }) {
    return (
        <Layout>
            <div className={styles.fight}>
                <div className={styles.controls}>
                    <Link href={`/fights/edit/${fight.id}`}>
                        <a>
                            <FaPencilAlt /> Edit Fight
                        </a>
                    </Link>
                    <a
                        href="#"
                        className={styles.delete}
                        onClick={deleteFight}
                    >
                        <FaTimes /> Delete Fight
                    </a>
                </div>
                <span >
                    {fight.date} at {fight.time}
                </span>
                <h1>{fight.name}</h1>
                {fight.image && (
                    <div className={styles.image}>
                        <Image src={fight.image} width={960} height={600} />
                    </div>
                )}
                <h3>Fighters:</h3>
                <p>{fight.fighters}</p>
                <h3>Description</h3>
                <p>{fight.description}</p>
                <h3>Venue: {fight.venue}</h3>
                <p>{fight.address}</p>

                {/* <EventMap evt={evt} /> */}

                <Link href='/fights'>
                    <a className={styles.back}>{'<'} Go Back</a>
                </Link>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ query: { slug } }) {
    const res = await fetch(`${API_URL}/api/fights/${slug}`);
    const fights = await res.json();
    return {
        props: {
            fight: fights[0]
        }
    }
}