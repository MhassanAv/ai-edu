import Head from "next/head";
import {Heading,Text,Center,Button,Flex,useColorMode,useColorModeValue, VStack,Image} from '@chakra-ui/react'
import NextLink from 'next/link'
import { MBox } from "@/styles/Motion";
import useStore from "@/lib/store";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Admin from "@/components/dashboard/admin";

export default function Dashboard() {

  const {user,setUser} = useStore()
  const  {data,isLoading,isError,refetch} = useQuery({queryKey:['user'],queryFn:()=>axios.get('api/user').then(res=>res.data),enabled:false})
  useEffect(()=>{

    if (data) {
      setUser(data)
   } else {
    setUser(null)
   }
},[setUser,data])

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user &&<Button isLoading={isLoading} onClick={()=>refetch()} >get user</Button>}
      {user?.role === 'admin' && <Admin/>}
    </>
  );
}
