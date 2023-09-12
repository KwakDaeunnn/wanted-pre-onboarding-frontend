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
            setEmailError('이메일 형식에 맞지 않습니다.');
        } else {
            setEmailError('');
        }

        // 비밀번호 유효성 검사 (8자 이상)
        if (values.password.length < 8) {
            setPasswordError('비밀번호 형식에 맞지 않습니다.');
        } else {
            setPasswordError('');
        }

        // 유효성 검사 통과 시 회원가입 후 로그인 페이지 이동
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
                console.error('회원가입 실패', err);
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
            <div className='sign-box'>
                <h2>회원가입</h2>
                <div>
                    <label>이메일</label>
                    <input
                        data-testid="email-input"
                        type="text"
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
                        placeholder='********'
                        onChange={handleChange}
                        value={values.password}
                    />
                </div>
                <p className='condition-message'>
                    *이메일은 @를 포함해야 하며, 비밀번호는 8자 이상 입력해주세요.
                </p>
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                <div>
                    <button className='submit-button'
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
