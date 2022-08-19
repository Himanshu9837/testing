import React from "react";
 import fs from "fs";

export default function Sitemap()  {
   
  return(
    <></>
  )
};
export const getServerSideProps = async({ res }) => {
  const baseUrl = {
    development: "http://206.189.136.28:3010",
    production: "http://206.189.136.28:3010",
  }[process.env.NODE_ENV];

  const staticPages = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "_app.js",
        "_document.js",
        "_error.js",
        "sitemap.xml.js",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`;
    });
    const ress = await fetch("http://206.189.136.28:5000/api/product/productlist");
    const postData = await ress.json();

    const resss = await fetch("http://206.189.136.28:5000/api/category/allbasecategory");
    const postDataa = await resss.json();
    const documents=postData.result;
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.5</priority>
            </url>
          `;
        })
        .join("")}
        ${documents
            .map(({ metaurl, updatedAt }) => {
              return `
                  <url>
                    <loc>${baseUrl}/description/${metaurl}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>0.5</priority>
                  </url>
                `;
            })
            .join("")}
            ${postDataa
                .map(({ metaurl, date }) => {
                  return `
                      <url>
                        <loc>${baseUrl}/${metaurl}</loc>
                        <lastmod>${new Date().toISOString()}</lastmod>
                        <changefreq>daily</changefreq>
                        <priority>0.5</priority>
                      </url>
                    `;
                })
                .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};


