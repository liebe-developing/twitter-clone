import Provider from "@/components/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import RecoilProvider from "@/components/RecoilProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twitter",
  description: "This website is a twitter clone for practising",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilProvider>
          <Provider>{children}</Provider>
        </RecoilProvider>
      </body>
    </html>
  );
}
