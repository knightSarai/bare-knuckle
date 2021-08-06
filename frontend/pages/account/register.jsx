import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@/components/layout/';
import styles from '@/styles/authForm.module.css';

export default function RegisterPage() {
    const [username, setUsernamel] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = evt => {
        evt.preventDefault();

        if (password !== passwordConfirm) {
            toast.error('Passwords do not match!');
            return
        }

        console.log({ username, email, password });
    }

    return (
        <Layout title='User Registration'>
            <div className={styles.auth}>
                <h1>
                    <FaUser /> Log In
                </h1>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='username'>User Name</label>
                        <input
                            type='text'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email Address</label>
                        <input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='passwordConfirm'>Confirm Password</label>
                        <input
                            type='password'
                            id='passwordConfirm'
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                    </div>
                    <input type='submit' value='Register' className='btn' />
                </form>
                <p>
                    Already have an account? <Link href='/account/login'>Login</Link>
                </p>
            </div>
        </Layout>
    )
}
