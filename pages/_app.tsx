import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* According to documentation - this should be defined inline to avoid FOUC (flash of unstyled content) */}
      <Script id="dark-mode-load">
        {`if (
              localStorage.getItem('color-theme') === 'dark' ||
              (!('color-theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
            ) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }`}
      </Script>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
