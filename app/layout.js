export const metadata = {
  title: "Spot On!",
  description: "Spot On! Web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
