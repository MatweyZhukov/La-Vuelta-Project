//Global
import { ToastContainer } from "react-toastify";
import React from "react";

//Components
import { ProviderComponent } from "@/redux/provider";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

//Styles
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logotype.png" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <ProviderComponent>
          <main className="wrapper">
            <Header />
            <nav className="main">{children}</nav>
            <Footer />
          </main>
          <ToastContainer />
        </ProviderComponent>
      </body>
    </html>
  );
}
