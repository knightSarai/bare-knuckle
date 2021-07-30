import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import Layout from "@/components/layout";
import { API_URL } from '@/config/index'
import styles from '@/styles/fightForm.module.css'
import 'react-toastify/dist/ReactToastify.css'

export default function AddFightPage({ token }) {
    const [values, setValues] = useState({
        name: '',
        fighters: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: '',
    })

    const router = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()

        // Validation
        const hasEmptyFields = Object.values(values).some(element => element === '')

        if (hasEmptyFields) {
            return toast.error('Please fill in all fields')
        }

        const res = await fetch(`${API_URL}/fights`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values),
        })

        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
                toast.error('No token included')
                return
            }
            toast.error('Something Went Wrong')
        } else {
            const fight = await res.json()
            router.push(`/fights/${fight.slug}`)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    return (
        <Layout title='Add New Fight'>
            <Link href='/Fights'>Go Back</Link>
            <h1 className={styles.formTitle}>Add Fight</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor='name'>Fight Name</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={values.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='fighters'>Fighters</label>
                        <input
                            type='text'
                            name='fighters'
                            id='fighters'
                            value={values.fighters}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='venue'>Venue</label>
                        <input
                            type='text'
                            name='venue'
                            id='venue'
                            value={values.venue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            name='address'
                            id='address'
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={values.date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='time'>Time</label>
                        <input
                            type='text'
                            name='time'
                            id='time'
                            value={values.time}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor='description'>Fight Description</label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        value={values.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <input type='submit' value='Add Fight' className='btn' />
            </form>
        </Layout>
    )
}

// export async function getServerSideProps({ req }) {
//     const { token } = parseCookies(req)

//     return {
//         props: {
//             token,
//         },
//     }
// }