import "./globals.css";
import Navbar from "@/components/layout/Navbar"; // Ensure this matches the file path exactly

export const metadata = {
  title: "WorkConnect",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
