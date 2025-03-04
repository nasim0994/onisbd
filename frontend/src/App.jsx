import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";
import { useGetFaviconQuery } from "./Redux/favicon/faviconApi";
import { useGetSEOQuery } from "./Redux/seo/seoapi";
import { Helmet } from "react-helmet-async";
import useAuthCheck from "./Hook/useAuthCheck";
import Spinner from "./components/Spinner/Spinner";
import { useEffect } from "react";

export default function App() {
  const authChecked = useAuthCheck();
  const { data: favicon } = useGetFaviconQuery();
  const icon = favicon?.data?.icon;

  const { data: seo } = useGetSEOQuery();
  const seoData = seo?.data;

  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "${seoData?.custom?.google_tag_manager}");
    `;

    // Append the script to the head
    if (seoData?.custom?.google_tag_manager) document.head.appendChild(script);
  }, [seoData]);

  if (!authChecked) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${import.meta.env.VITE_BACKEND_URL}/favicon/${icon}`}
        />

        <title>{seoData?.basic?.title || "Your Page Title"}</title>
        <meta
          name="description"
          content={seoData?.basic?.description || "Your Page Description"}
        />
        <meta
          name="keywords"
          content={seoData?.basic?.keywords || "Your Page Keywords"}
        />
        <meta
          name="author"
          content={seoData?.basic?.author || "Your Page Author"}
        />
        <meta
          name="designer"
          content={seoData?.basic?.designer || "Nasim Uddin"}
        />
        <meta
          name="subject"
          content={seoData?.basic?.subject || "Your Page Subject"}
        />

        {/* <!-- og --> */}
        <meta property="og:title" content={seoData?.basic?.title} />
        <meta property="og:description" content={seoData?.basic?.description} />
        <meta
          property="og:image"
          content={`${import.meta.env.VITE_BACKEND_URL}/favicon/${icon}`}
        />
        <meta property="og:url" content="https://onisbd.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="onisbd" />

        {/* <!-- twitter --> */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@onisbd" />
        <meta name="twitter:title" content={seoData?.basic?.title} />
        <meta
          name="twitter:description"
          content={seoData?.basic?.description}
        />
        <meta
          name="twitter:image"
          content={`${import.meta.env.VITE_BACKEND_URL}/favicon/${icon}`}
        />

        {seoData?.basic?.copyright && (
          <meta name="copyright" content={seoData?.basic?.copyright} />
        )}
        {seoData?.basic?.url && (
          <meta name="url" content={seoData?.basic?.url} />
        )}

        {seoData?.custom?.facebook_domain_verification && (
          <meta
            name="facebook-domain-verification"
            content={seoData?.custom?.facebook_domain_verification}
          />
        )}

        {seoData?.custom?.google_site_verification && (
          <meta
            name="google-site-verification"
            content={seoData?.custom?.google_site_verification}
          />
        )}

        {/* <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
        (function(w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
          j.async = true;
          j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', '${seoData?.custom?.google_tag_manager}');
      `,
          }}
        /> */}
      </Helmet>

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${seoData?.custom?.google_tag_manager}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}
