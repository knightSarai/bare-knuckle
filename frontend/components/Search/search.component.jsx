import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './search.module.css'

export default function Search({ fight }) {
    const [term, setTerm] = useState('');
    const router = useRouter();

    const handleSubmit = evt => {
        evt.preventDefault();
        router.push(`/fights/search?term=${term}`);
        setTerm('')
    }

    return (
        <div className={styles.search}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={term}
                    onChange={(evt) => setTerm(evt.target.value)}
                    placeholder="Search Fights"
                />
            </form>
        </div>
    )
}
