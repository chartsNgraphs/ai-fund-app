// import { ThemeProvider } from "@/components/theme-provider";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "../components/header/header";
import "./globals.css";
import AuthProvider from "@/components/auth-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      {/* // Suppress hydration warning due to the ThemeProvider. */}
      <html lang="en" suppressHydrationWarning={true}> 
        <body className="overflow-x-hidden">
          <ThemeProvider
            attribute={'class'}
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange={false}
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
    </AuthProvider>
  );
}
