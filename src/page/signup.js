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

    const handleSubmit = (e) => {
        e.preventDefault();

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


    return (
        <form onSubmit={handleSubmit}>
            <div className='sign-box'>
                <h2>회원가입</h2>
                <div>
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;이메일</label>
                    <input
                        data-testid="email-input"
                        type="text"
                        name="email"
                        placeholder='example@abc.com'
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
                        placeholder='********'
                        onChange={handleChange}
                        value={values.password}
                    />
                </div>
                {passwordError && <p className='error-text'>{passwordError}</p>}
                <p className='condition-message'>
                    *이메일은 @를 포함하고, 비밀번호는 8자 이상 입력해주세요.
                </p>
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
