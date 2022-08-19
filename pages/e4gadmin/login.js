import React, { useEffect, useState } from 'react';
import Link from "next/link"
// import { Container, Row, Form, Label, Input, Col } from 'reactstrap';
import { useRouter } from 'next/router';
// import { toast } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
const Login = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)
  const [token, settoken] = useState('')








  toast.configure();
  // toast.configure();
  // const notify = (message) => toast(message);
  const LoginUser = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }
      const { data } = await axios.post(`${apiKey}api/admin/adminsignin`, {
        email,
        password,
      },
        config
      )
      localStorage.setItem('userInfo', JSON.stringify(data))
      let tokenvalue = data.accesstoken
      settoken(tokenvalue)
      router.push('/E4gadmin')
      console.log(data);

      toast.success(data.message);

    }
    catch (e) {

      toast.error(e.response.data.error);

    }
  }
  function tokenaccess(token) {
    console.log(token);
  }
  tokenaccess(token)
  return (

    <>
      <div className="loginwrapper">
        {/* <ToastContainer
          autoClose={600}
        /> */}
        <div className="loginboxes">

          <h1>Login</h1>

          <form method="POST">
            <div className="outerform">
              <div className="innerpart">
                <label htmlFor="email">Email</label>
                <input type="text"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="emailsss"
                  placeholder='Enter Email-Id'
                   />
                <label htmlFor="password">Password</label>
                <input type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="emailsss"
                  placeholder='Enter Password'
                   />
                <input type="submit"
                  className="submitlogin"
                  onClick={LoginUser} />
              </div>
            </div>
          </form>
        </div>
      </div>


    </>
  );
};

export default Login;
