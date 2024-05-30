import Head from "next/head";
import {
  Heading,
  Text,
  Center,
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
  VStack,
  Image,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { MBox } from "@/styles/Motion";
import useStore from "@/lib/store";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Admin from "@/components/Admin";
import Student from "@/components/Student";
import Instractor from "@/components/Instractor";

export default function Dashboard() {
  const { user, setUser, setPage } = useStore();
  console.log(user);
  useEffect(() => {
    user?.role !== "admin" ? setPage("Home") : setPage("Members");
  }, [user, setUser]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user?.role === "admin" && <Admin />}
      {user?.role === "student" && <Student />}
      {user?.role === "teacher" && <Instractor />}
    </>
  );
}
