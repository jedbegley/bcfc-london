import VisitTracker from "./VisitTracker";
import NewsShareBar from "./NewsShareBar";

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
</body>
    </html>
  );
}
