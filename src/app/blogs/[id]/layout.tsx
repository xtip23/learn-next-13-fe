import "bootstrap/dist/css/bootstrap.min.css";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

// dynamic title metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = (await params).id;

  // fetch data
  const product = await fetch(`http://localhost:8000/blogs/${id}`).then((res) =>
    res.json()
  );

  return {
    title: product.title,
    description: "detail",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
