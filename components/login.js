// import React, { useEffect, useState } from 'react';
// import Link from "next/link"
// import { Container, Row, Form, Label, Input, Col } from 'reactstrap';
// import { useRouter } from 'next/router';
// import { toast } from 'react-toastify';
// import axios from 'axios'
// const Login = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(false)
//   // const [authorized, setAuthorized] = useState(false);


//   useEffect(() => {
//     authCheck(router.asPath)
//   })

//   function authCheck() {
//     // const publicPaths = ['/login'];
//     const url='http://178.62.228.242:5000/api/admin/adminsignin';
//     const path = url.split('?')[0];
//   
//   }


//   const LoginUser = async (e) => {
//     e.preventDefault();

//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       }
//       const { data } = await axios.post('http://178.62.228.242:5000/api/admin/adminsignin', {
//         email,
//         password,
//       },
//         config
//       )
//       localStorage.setItem('userInfo', JSON.stringify(data))
//       router.push('/')
//       
//       toast('login successfull');

//     }
//     catch (error) {
//       
//       setError(error.response.data.error)
//       toast.error(error.response.data.error)

//     }
//   }
//   return (

//     <>
//       <div className="loginwrapper" style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//         <h1 style={{ color: 'red' }}>Login</h1>
//         <form method="POST" style={{ width: '50%' }}>
//           <div className="innerpart" style={{ display: 'flex', flexDirection: 'column', width: '40%', margin: 'auto' }}>
//             <label htmlFor="email" style={{ padding: '1rem 0' }} >Email</label>
//             <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} style={{ padding: '0.2rem' }} />
//             <label htmlFor="password" style={{ padding: '1rem 0' }} >Password</label>
//             <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} style={{ padding: '0.2rem' }} />
//             <input type="submit" style={{
//               outline: 'none',
//               background: 'orangered',
//               color: '#fff',
//               border: 'none',
//               cursor: 'pointer',
//               padding: '0.3rem 1rem',
//               marginTop: '2rem'
//             }} onClick={LoginUser} />
//           </div>
//         </form>
//       </div>

//     </>
//   );
// };

// export default Login;
