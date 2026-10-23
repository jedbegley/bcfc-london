import SiteHeader from "./SiteHeader";
import AppNotifications from "./AppNotifications";
import VisitTracker from "./VisitTracker";
import NewsShareBar from "./NewsShareBar";
import SiteFooter from "./SiteFooter";
import "./app-shell.css";

export const metadata = {
  title: "Bristol City London Supporters FC",
  description: "Official website of Bristol City London Supporters FC",
  applicationName: "BCFC London",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "BCFC London",
    statusBarStyle: "default",
  },
  other: { "apple-mobile-web-app-capable": "yes" },
  icons: {
    icon: [{ url: "/icons/bcfc-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#e31b23",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
  <VisitTracker />
  <AppNotifications />
    <NewsShareBar />
  <SiteHeader />
  {children}
  <SiteFooter />
</body>
    </html>
  );
}
