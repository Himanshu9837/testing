import React from 'react'
import {UseRouter} from 'next/router';

export default function Index  ({postData}) {

    console.log(postData);
  return (
    <div>Index</div>
  )
}



export async function getStaticProps({ params }) {
   
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    

    const pid = params.index;
    const res = await fetch(
      `${apiKey}api/product/productdetails/${pid}`
    );
    const postData = await res.json();

    return {
      props: {
        postData,
      },


    };
  }
  export async function getStaticPaths() {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch( apiKey + "api/product/productlist");
    const postData = await res.json();

    const paths = postData.result.map((book) => ({
      params: { index: book.metaurl },
    }));
    return { paths, fallback: false };
  }