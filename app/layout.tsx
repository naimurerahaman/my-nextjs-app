import "./globals.css";

export const metadata = {
  title: "WorkConnect - Service Provider",
  description: "Service Provider Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
