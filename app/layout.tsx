import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3001'),
  title: 'Keen Agents - AI Employees for Your Business',
  description: 'Keen Agents builds custom AI agents—digital employees that automate processes, reduce operational costs, and scale your business. Book a free consultation.',
  keywords: 'AI employees, AI agents for business, process automation, automate customer support, AI automation solutions',
  authors: [{ name: 'Keen Agents' }],
  openGraph: {
    title: 'Keen Agents - AI Employees for Your Business',
    description: 'Custom AI agents that work as digital employees to automate your business processes and reduce costs.',
    type: 'website',
    locale: 'en_US',
    url: 'http://localhost:3001',
    siteName: 'Keen Agents',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keen Agents - AI Employees for Your Business',
    description: 'Custom AI agents that work as digital employees to automate your business processes and reduce costs.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-montserrat">
        {children}
      </body>
    </html>
  )
}
