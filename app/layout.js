import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CPU Scheduling Algorithm Visualizer",
  description: "Visulization tool which creates gannt char for various cpu scheduling algorithms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={inter.className + " h-full"}>{children}</body>
    </html>
  );
}
