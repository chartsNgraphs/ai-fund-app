import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
        attribute={'class'}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
        <div className="container-fluid">
          <div className="w-full center">
          <Header />
          </div>
          {children}
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
