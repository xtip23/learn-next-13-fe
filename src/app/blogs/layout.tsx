import "bootstrap/dist/css/bootstrap.min.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs Page",
  description: "This Blogs Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
