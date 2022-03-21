/// This file generates an XML Sitemap on-demand.
/// It hits our API to get the list of workflow routes and then generates an XML
/// as the response for `/sitemap.xml`.
/// A sitemap optimizes our search engine indexing. It tells Google which URLs belong
/// and when they update so Google can detect new content and crawl our website efficiently.
/// See this for more information: https://nextjs.org/learn/seo/crawling-and-indexing/xml-sitemaps
import { getAllWorkflowIds } from "../lib/workflows";

const EXTERNAL_DATA_URL = "https://www.commands.dev/workflows";

function generateSiteMap(workflows) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the one URL we know already-->
     <url>
       <loc>https://www.commands.dev/</loc>
     </url>
     ${workflows
       .map(({ params: { id } }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site;
  const workflows = getAllWorkflowIds();

  // We generate the XML sitemap with the workflows data
  const sitemap = generateSiteMap(workflows);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
