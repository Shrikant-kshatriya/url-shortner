import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'QuickURL.io',
  description: 'Built with Next.js + Express',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
