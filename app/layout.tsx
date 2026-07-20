import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import SidebarLayout from "@/components/SidebarLayout";

export const metadata: Metadata = {
  title: "Sconnect OKR & KPI Management System",
  description: "Hệ thống Quản trị Mục tiêu Hành động Trọng tâm Sconnect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AppProvider>
          <SidebarLayout>{children}</SidebarLayout>
        </AppProvider>
      </body>
    </html>
  );
}
