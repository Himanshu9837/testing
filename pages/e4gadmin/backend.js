
// import React, { useEffect, useState } from 'react';



// const Backend = () => {
//     const apiKey = process.env.NEXT_PUBLIC_API_URL;

//     const [backend, setbackend] = useState([])
//     useEffect(() => {
//         fetch(apiKey + 'api/category/categorylist').then((res) => res.json())
//             .then((resp) => {
//                 console.log(resp.data);
//                 setbackend(resp.data)
//             })
//     }, [])
//     console.log(backend.nodes);

//     return (



//                 backend.map((item) => {
//                 <h2>{item.category}</h2>
//             })






//     )
// };

// export default Backend;
import React from 'react'

const backend = () => {
  return (
    <div>backend</div>
  )
}

export default backend


