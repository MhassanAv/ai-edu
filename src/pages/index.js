import Head from "next/head";
import {Heading,Text,Center,Button,Flex,useColorMode,useColorModeValue, VStack,Image} from '@chakra-ui/react'
import NextLink from 'next/link'
import { MBox } from "@/styles/Motion";

export default function Home() {
  return (
    <>
      <Head>
        <title>AI-EDU</title>
        <meta name="description" content="AI-EDU" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center w='full' h='100vh' >
      <MBox px='2rem' initial={{opacity:0,y:200}} animate={{opacity:1,y:0}} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} gap='2.5rem'>
      <Image filter={useColorModeValue("none","invert(1)")} src={"../logo.svg"} maxW='150px' boxSize={'150px'} alt="AI-EDU" />
      <Heading>Welcome To AI-EDU</Heading>
      <Text textAlign={'center'}> We are excited to have you join our community of learners and educators.</Text>
      <Flex flexWrap={'wrap'}  w='full' align={'center'} justify={'center'} gap='1rem'>
      <Button as={NextLink}  href={'/login'} py="1rem" w="full" bg="prim"   color={'white'} rounded="full">
          Log in
        </Button>
        <Button as={NextLink}  href={'/register'} py="1rem" w="full" bg="none" border={'1.5px solid'} borderColor={useColorModeValue('black','white')} color={useColorModeValue('black','white')} rounded="full">
          Sign up
        </Button></Flex>
      </MBox>
      </Center>
    </>
  );
}
