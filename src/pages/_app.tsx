import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import '../styles/globals.css';

// Load fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

export default function App({ Component, pageProps }: AppProps) {
  // Add smooth scrolling behavior
  useEffect(() => {
    // Remove the server-side injected CSS for Material-UI
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Boring Campus Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`n        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-plus-jakarta-sans: ${plusJakartaSans.style.fontFamily};
        }
        
        body {
          font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-plus-jakarta-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
      `}</style>

      <div className={`${inter.variable} ${plusJakartaSans.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
