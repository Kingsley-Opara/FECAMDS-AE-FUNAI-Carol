import { Geist, Geist_Mono, Montez, Montserrat, Nova_Slim, Monda} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { GlobalStateProvider } from "./context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const novaSlim = Nova_Slim({
  variable: "--font-nova",
  subsets: ["latin"],
  weight: ["400"],
});

const monda = Monda({
  variable: "--font-monda",
  subsets: ["latin"],
  weight: ["400"]
})

const montez = Montez({
  variable: "--font-montez",
  subsets: ["latin"],
  weight: ["400"]
})

const montserrate = Montserrat({
  variable: "--font-montserrate",
  subsets: ["latin"],
  weight: ["400"]
})

export const metadata = {
  title: "Fecamds AE-FUNAI",
  description: "Carol of Nine Lessons",
};




export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} 
        ${geistMono.variable} 
        ${monda.variable}
        ${montez.variable}
        ${novaSlim.variable}

        antialiased`}
      >
        <GlobalStateProvider>
          <Script
            src="https://js.paystack.co/v1/inline.js"
            strategy="beforeInteractive"
          />
          <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
            {children}
          </ThemeProvider>
        </GlobalStateProvider>
      </body>
    </html>
  );
}
