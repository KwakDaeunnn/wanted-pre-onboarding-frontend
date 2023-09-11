import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Signup from './page/signup';
import Signin from './page/signin';

function Routing() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/signup">회원 가입</Link>
          </li>
          <li>
            <Link to="/signin">로그인</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default Routing;
