import Link from "next/link";
import x from "@/style/app.module.css";
import y from "@/style/app2.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
  description: "This Home Page",
};

export default function Home() {
  return (
    <div>
      <ul>
        <li className={x["red"]}>
          <Link href="/facebook">
            <span className={y["red"]}>Facebook</span>
          </Link>
        </li>
        <li style={{ margin: "20px 0" }}>
          <Link href="/youtube">Youtube</Link>
        </li>
        <li style={{ margin: "20px 0" }}>
          <Link href="/tiktok">Tiktok</Link>
        </li>
      </ul>
    </div>
  );
}
