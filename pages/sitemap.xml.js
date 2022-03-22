/// This file generates an XML Sitemap on-demand.
/// It hits our API to get the list of workflow routes and then generates an XML
/// as the response for `/sitemap.xml`.
/// A sitemap optimizes our search engine indexing. It tells Google which URLs belong
/// and when they update so Google can detect new content and crawl our website efficiently.
/// See this for more information: https://nextjs.org/learn/seo/crawling-and-indexing/xml-sitemaps
import { getAllWorkflowIds, getAllWorkflowCategories } from "../lib/workflows";

const EXTERNAL_DATA_URL = "https://www.commands.dev";

function generateSiteMap(workflows, categories) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the one URL we know already-->
     <url>
       <loc>${`${EXTERNAL_DATA_URL}/`}</loc>
     </url>
     ${workflows
       .map(({ params: { id } }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/workflows/${id}`}</loc>
       </url>
     `;
       })
       .join("")}
       ${categories
         .map(({ params: { id } }) => {
           return `
        <url>
            <loc>${`${EXTERNAL_DATA_URL}/categories/${id}`}</loc>
        </url>
      `;
         })
         .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // We don't want to render a component at this URL.
  // Instead, we want to hijack the getServerSideProps
  // method (this is called by Next.js as it receives
  // an inbound request on the server) and override
  //  the response with the contents of our sitemap
}

export async function getServerSideProps({ res }) {
  // We make API calls to gather the URLs for our site
  const workflows = getAllWorkflowIds();
  const categories = getAllWorkflowCategories();

  // We generate the XML sitemap with the workflows and categories data
  const sitemap = generateSiteMap(workflows, categories);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
