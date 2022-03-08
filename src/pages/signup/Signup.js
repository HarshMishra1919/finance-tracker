import styles from './Signup.module.css';
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isPending, error } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, userName);
    };

    return (
        <form className={styles['signup-form']} onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <label>
                <span>username:</span>
                <input
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    required
                />
            </label>
            <label>
                <span>email:</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
            </label>
            <label>
                <span>password: </span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
            </label>
            {!isPending && <button className="btn">Signup</button>}
            {isPending && (
                <button className="btn" disabled>
                    loading
                </button>
            )}
            {error && <p>{error}</p>}
        </form>
    );
};

export default Signup;
