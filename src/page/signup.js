import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            navigate('/todo');
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // 이메일 유효성 검사 (@ 포함 여부 확인)
        if (!values.email.includes('@')) {
            setEmailError('이메일은 @ 문자를 포함해야 합니다.');
        } else {
            setEmailError('');
        }

        // 비밀번호 유효성 검사 (8자 이상)
        if (values.password.length < 8) {
            setPasswordError('비밀번호는 8자 이상이어야 합니다.');
        } else {
            setPasswordError('');
        }

        // 유효성 검사 통과 시 로그인 실행
        if (!emailError && !passwordError) {
            axios({
                url: `https://www.pre-onboarding-selection-task.shop/auth/signup`,
                method: 'post',
                headers: {
                    "Content-Type": `application/json`,
                },
                data: {
                    email: values.email,
                    password: values.password,
                }
            }).then(res => {
                if (res.status === 201) {
                    console.log('회원가입 성공');
                    navigate('/signin')
                }
            }).catch(err => {
                console.error('회원가입 오류 발생', err);
                alert(err.response.data.message);
            })
        };
    };

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setValues({ ...values, [name]: value });
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>회원가입</h2>
            <div>
                <div>
                    <label>이메일</label>
                    <input
                        data-testid="email-input"
                        type="text"
                        name="email"
                        placeholder='example@abc.com'
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
                        placeholder='******** (8자 이상)'
                        onChange={handleChange}
                        value={values.password}
                    />
                </div>
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                <div>
                    <button
                        data-testid="signup-button"
                        type="submit"
                        disabled={emailError || passwordError}
                    >
                        회원가입
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Signup;
