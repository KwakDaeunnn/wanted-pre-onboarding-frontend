import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            navigate('/todo');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasEmailError = false;
        let hasPasswordError = false;

        if (!values.email.includes('@')) {
            setEmailError('이메일은 @ 문자를 포함해야 합니다.');
            hasEmailError = true;
        } else {
            setEmailError('');
        }

        if (values.password.length < 8) {
            setPasswordError('비밀번호는 8자 이상이어야 합니다.');
            hasPasswordError = true;
        } else {
            setPasswordError('');
        }

        if (!emailError && !passwordError) {
            axios({
                url: 'https://www.pre-onboarding-selection-task.shop/auth/signup',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    email: values.email,
                    password: values.password,
                },
            }).then(res => {
                if (res.status === 200) {
                navigate('/todo');
            }
            }).catch((err) => {
                console.error('회원가입 오류 발생', err);
                alert(err.response.data.message);
            });
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setValues({ ...values, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>로그인</h2>
            <div>
                <div>
                    <label>이메일</label>
                    <input
                        data-testid="email-input"
                        type="text"
                        name="email"
                        placeholder="example@abc.com"
                        onChange={handleChange}
                        value={values.email}
                    />
                </div>
                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                <div>
                    <label>패스워드</label>
                    <input
                        data-testid="password-input"
                        type="password"
                        name="password"
                        placeholder="******** (8자 이상)"
                        onChange={handleChange}
                        value={values.password}
                    />
                </div>
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                <div>
                    <button
                        data-testid="signin-button"
                        type="submit"
                        disabled={emailError || passwordError}
                        >
                        로그인
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Signin;