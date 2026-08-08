export const metadata = {
  title: "Bristol City London Supporters FC",
  description: "Official website of Bristol City London Supporters FC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
