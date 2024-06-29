import Head from "next/head";

import useStore from "@/lib/store";
import ExamPage from "@/components/ExamPage";

export default function Dashboard() {
  const { user } = useStore();

  return (
    <>
      <Head>
        <title>Exam</title>
        <meta name="description" content="Exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user?.role === "student" && <ExamPage />}
    </>
  );
}
