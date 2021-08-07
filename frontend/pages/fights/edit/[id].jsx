import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaImage } from 'react-icons/fa';
import Layout from "@/components/layout";
import Modal from "@/components/Modal";
import ImageUploadModal from "@/components/ImageUploadModal";
import { API_URL } from '@/config/index';
import cookieParser from '@/helpers/cookieParser';
import styles from '@/styles/fightForm.module.css';
import FormatDate from '@/helpers/dateFormatter';

export default function EditFightPage({ fight, token }) {
    const [values, setValues] = useState({
        name: fight.name,
        fighters: fight.fighters,
        venue: fight.venue,
        address: fight.address,
        date: fight.date,
        time: fight.time,
        description: fight.description,
    })

    const [imagePreview, setImagePreview] = useState(fight.image ? fight.image.formats.thumbnail.url : null)
    const [showModal, setShowModal] = useState(false);

    const router = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()

        // Validation
        const hasEmptyFields = Object.values(values).some(element => element === '')

        if (hasEmptyFields) {
            return toast.error('Please fill in all fields')
        }

        const res = await fetch(`${API_URL}/fights/${fight.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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

    const imageUploaded = async evt => {
        const res = await fetch(`${API_URL}/fights/${fight.id}`);
        const { image } = await res.json();
        setImagePreview(image.formats.thumbnail.url);
        setShowModal(false);
    }

    return (
        <Layout title='Add New Fight'>
            <Link href={`/fights/${fight.slug}`}>Go Back</Link>
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
                            value={new FormatDate(values.date).format()}
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
                <input type='submit' value='Edit Fight' className='btn' />
            </form>
            <h2>Fight Image</h2>
            {imagePreview ?
                <Image
                    src={imagePreview}
                    width={170}
                    height={100}
                />
                :
                <div>
                    <p>No Image Upload</p>
                </div>
            }
            <div>
                <button className="btn-secondary" onClick={() => setShowModal(true)}>
                    <FaImage /> Set Image
                </button>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUploadModal
                    fightId={fight.id}
                    imageUploaded={imageUploaded}
                    token={token}
                />
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({ req, params: { id } }) {
    const { token } = cookieParser(req);
    const res = await fetch(`${API_URL}/fights/${id}`);
    const fight = await res.json();
    return {
        props: {
            fight,
            token
        },
    }
}
