import Link from "next/link";
import x from "@/style/app.module.css";
import y from "@/style/app2.module.css";
import AppTable from "@/components/app.table";

export default function Home() {
  return (
    <div>
      <ul>
        <li className={x["red"]}>
          <Link href="/facebook">
            <span className={y["red"]}>Facebook</span>
          </Link>
        </li>
        <li>
          <a href="/youtube">Youtube</a>
        </li>
        <li>
          <a href="/tiktok">Tiktok</a>
        </li>
      </ul>
      <AppTable />
    </div>
  );
}
