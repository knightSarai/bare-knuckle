import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify'
import Layout from "@/components/layout/layout.component";
import { API_URL } from "@/config/index";
import styles from "@/styles/fight.module.css"

import 'react-toastify/dist/ReactToastify.css'
import router from "next/router";

export default function FightPage({ fight }) {
    const deleteFight = async evt => {
        if (confirm(`${fight.name} will be deleted, Are you sure?`)) {
            const res = await fetch(
                `${API_URL}/fights/${fight.id}`,
                { method: 'DELETE' }
            )

            const data = await res.json()

            if (!res.ok) return toast.error(data.message);
            return router.push('/fights')

        }
    }
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
                    {new Date(fight.date).toLocaleDateString('en-JO')} at {fight.time}
                </span>
                <h1>{fight.name}</h1>
                <ToastContainer />
                {fight.image && (
                    <div className={styles.image}>
                        <Image src={fight.image.formats.medium.url} width={960} height={600} />
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
    const res = await fetch(`${API_URL}/fights?slug=${slug}`);
    const fights = await res.json();
    return {
        props: {
            fight: fights[0]
        }
    }
}