import {
    Heading,
    VStack,
    useColorModeValue,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box
  
  } from "@chakra-ui/react";
  import useStore from "@/lib/store";
import Members from "./dashboard/Admin/Members";
import Layout from "./Layout";
  
  
  
  export default function Admin() {
  
    const {page} = useStore()
    return (
      <Layout>
         {page ==='Members' && <Members/>}
          </Layout>
    );
  }
  