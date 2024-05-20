import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { BudgetProvider } from "./context/BudgetContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokestore",
  description: "Pokestore - Created with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <BudgetProvider>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </BudgetProvider>
    </html>
  );
}
