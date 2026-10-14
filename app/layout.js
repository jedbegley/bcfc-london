import VisitTracker from "./VisitTracker";
import NewsShareBar from "./NewsShareBar";
import SiteFooter from "./SiteFooter";

export const metadata = {
  title: "Bristol City London Supporters FC",
  description: "Official website of Bristol City London Supporters FC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
  <VisitTracker />
    <NewsShareBar />
  {children}
  <SiteFooter />
</body>
    </html>
  );
}
