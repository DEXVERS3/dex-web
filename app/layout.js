export const metadata = {
  title: "DEX",
  description: "DEX Web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
