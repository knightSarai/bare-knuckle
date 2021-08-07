import { useState } from 'react';
import { API_URL } from '@/config/index';
import styles from './imageUploadModal.module.css'
import FormatDate from 'helpers/dateFormatter';

export default function imageUploadModal({ fightId, imageUploaded, token }) {

    const [image, setImage] = useState(null)

    const handleSubmit = async evt => {
        evt.preventDefault();
        const formData = new FormData();
        formData.append('files', image);
        formData.append('ref', 'fights');
        formData.append('refId', fightId);
        formData.append('field', 'image');

        const res = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        })

        if (res.ok) imageUploaded();
    }

    const handleFileChange = evt => setImage(evt.target.files[0]);

    return (
        <div className={styles.form}>
            <h1>Uploaded Fight Image</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type="file" name="image" id="image" onChange={handleFileChange} />
                </div>
                <input type="submit" value="Upload" className="btn" />
            </form>
        </div>
    )
}
