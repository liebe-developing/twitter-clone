import Provider from "@/components/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import RecoilProvider from "@/components/RecoilProvider";
import { CommentModal, Sidebar, Widgets } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twitter",
  description: "This website is a twitter clone for practising",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilProvider>
          <Provider>
            {children}
            <CommentModal />
          </Provider>
        </RecoilProvider>
      </body>
    </html>
  );
}
