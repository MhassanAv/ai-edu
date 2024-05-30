import useStore from "@/lib/store";
import Layout from "./Layout";
import Home from "./dashboard/Instractor/Home";
import Courses from "./dashboard/Instractor/Courses";
import Exams from "./dashboard/Instractor/Exams";

export default function Instractor() {
  const { page } = useStore();
  return (
    <Layout>
      {page === "Home" && <Home />}
      {page === "Courses" && <Courses />}
      {page === "Exams" && <Exams />}
    </Layout>
  );
}
