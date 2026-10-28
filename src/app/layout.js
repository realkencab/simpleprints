import { Geist, Geist_Mono, Roboto } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: 'SC: P&M - %s',
    default: 'SC: P&M'
  },
  description: "Internal 3DB operations web portal",
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Select weights you need
  variable: '--font-roboto',
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
