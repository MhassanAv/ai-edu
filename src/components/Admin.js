import useStore from "@/lib/store";
import Members from "./dashboard/Admin/Members";
import Layout from "./Layout";
import Courses from "./dashboard/Admin/Courses";
import Payment from "./dashboard/Admin/Payment";

export default function Admin() {
  const { page } = useStore();
  return (
    <Layout>
      {page === "Members" && <Members />}
      {page === "Courses" && <Courses />}
      {page === "Payment" && <Payment />}
    </Layout>
  );
}
