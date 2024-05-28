import Header from "./components/header";
import Footer from "./components/footer";

import "./globals.css";

export const metadata = {
  title: "Next.js Authentication",
  description: "Example using NextAuth.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}