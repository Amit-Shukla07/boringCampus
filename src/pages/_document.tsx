import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

type DocumentProps = {
  styles: React.ReactElement[];
};

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await super.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          initialProps.styles,
          sheet.getStyleElement(),
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          {/* Apply theme class before paint to avoid FOUC */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var s=localStorage.getItem('theme');if(s==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){} })();`,
            }}
          />
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />

          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          {/* Preload critical resources */}
          <link
            rel="preload"
            href="/fonts/Inter.var.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          {/* Meta tags */}
          <meta name="theme-color" content="#ffffff" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-config" content="/browserconfig.xml" />

          {/* PWA support */}
          <link rel="manifest" href="/manifest.json" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Boring Campus" />

          {/* Preload critical CSS */}
          {this.props.styles}
        </Head>
        <body className="bg-gray-50 text-gray-900 antialiased">
          <Main />
          <NextScript />

          {/* Add any necessary polyfills here */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Load polyfills conditionally
                const loadPolyfills = () => {
                  const polyfills = [];
                  
                  if (!('IntersectionObserver' in window)) {
                    polyfills.push(import('intersection-observer'));
                  }
                  
                  if (!('ResizeObserver' in window)) {
                    polyfills.push(import('@juggle/resize-observer'));
                  }
                  
                  return Promise.all(polyfills);
                };
                
                // Only load polyfills in older browsers
                if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
                  loadPolyfills().catch(console.error);
                }
              `,
            }}
          />
        </body>
      </Html>
    );
  }
}
