import Head from "next/head";
import {Heading,Text} from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>AI-EDU</title>
        <meta name="description" content="AI-EDU" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading>AI-EDU</Heading>
      <Text> normal text</Text>
    </>
  );
}
