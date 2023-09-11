import React, { useState } from 'react';

const Form = () => {
    const [values, setValues] = useState({ userid: '', password: '' });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        let hasEmailError = false; // 이메일 에러 발생 여부를 체크하기 위한 변수
        let hasPasswordError = false; // 비밀번호 에러 발생 여부를 체크하기 위한 변수

        // 이메일 유효성 검사 (@ 포함 여부 확인)
        if (!values.userid.includes('@')) {
            setEmailError('이메일은 @ 문자를 포함해야 합니다.');
            hasEmailError = true;
        } else {
            setEmailError('');
        }

        // 비밀번호 유효성 검사 (8자 이상)
        if (values.password.length < 8) {
            setPasswordError('비밀번호는 8자 이상이어야 합니다.');
            hasPasswordError = true;
        } else {
            setPasswordError('');
        }

        // 모든 유효성 검사 통과 시, 회원가입 실행
        if (!hasEmailError && !hasPasswordError) {
            // 여기에서 회원가입 로직을 실행하거나 다음 단계로 진행
            // ...

            // 폼 초기화
            setValues({ userid: '', password: '' });
        }
    };

    const handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        setValues({ ...values, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>회원가입</h2>
            <div>
                <div>
                    <label htmlFor="userid">이메일</label>
                    <input
                        data-testid="email-input"
                        type="text"
                        name="userid"
                        placeholder="example@abc.com"
                        onChange={handleChange}
                        value={values.userid}
                    />
                </div>
                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                <div>
                    <label htmlFor="password">패스워드</label>
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
                    <input data-testid="signup-button" type="submit" value="가입하기" />
                </div>
            </div>
        </form>
    );
};

export default Form;
