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
    }, [navigate]);

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setValues({ ...values, [name]: value });
        
        // 이메일 유효성 검사 (@ 포함 여부 확인)
        if (name === 'email') {
            if (!value.includes('@')) {
                setEmailError('이메일 형식에 맞지 않습니다.');
            } else {
                setEmailError('');
            }
        }

        // 비밀번호 유효성 검사 (8자 이상)
        if (name === 'password') {
            if (value.length < 8) {
                setPasswordError('비밀번호 형식에 맞지 않습니다.');
            } else {
                setPasswordError('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailError && !passwordError) {
            axios({
                url: 'https://www.pre-onboarding-selection-task.shop/auth/signin',
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
                    localStorage.setItem('access_token', res.data.access_token);
                    console.log('로그인 성공');
                    console.log(localStorage.getItem('access_token'));
                    navigate('/todo');
                }
            }).catch(err => {
                console.error('로그인 실패', err);
                alert(err.response.data.message);
            });
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className='sign-box'>
                <h2>로그인</h2>
                <div>
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;이메일</label>
                    <input
                        data-testid="email-input"
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                    />
                </div>
                {emailError && <p className='error-text'>{emailError}</p>}
                <div>
                    <label>패스워드</label>
                    <input
                        data-testid="password-input"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                    />
                </div>
                {passwordError && <p className='error-text'>{passwordError}</p>}
                <div>
                    <button className='submit-button'
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
