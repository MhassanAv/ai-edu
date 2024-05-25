import useStore from "@/lib/store";
import Home from "./dashboard/Student/Home";
import Layout from "./Layout";
import Courses from "./dashboard/Student/Courses";
import Payment from "./dashboard/Student/Payment";
import Exams from "./dashboard/Student/Exams";

export default function Student() {
  const { page } = useStore();
  return (
    <Layout>
      {page === "Home" && <Home />}
      {page === "Courses" && <Courses />}
      {page === "Payment" && <Payment />}
      {page === "Exams" && <Exams />}
    </Layout>
  );
}
