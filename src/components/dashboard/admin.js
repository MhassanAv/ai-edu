import {
  Button,
  Box,
  Heading,
  Flex,
  VStack,
  HStack,
  Image,
  Center,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { FaUserGroup } from "react-icons/fa6";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { MdPayment } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";
import useStore from "@/lib/store";
import { useState } from "react";

export default function Admin() {
  const { user, signOut } = useStore();
  const [page,setPage] = useState('Members')
  const isActive = ()=> 'prim'
  console.log(page)
  return (
    <Flex h="100vh" w="full" gap="5rem">
      <VStack
        flex="1"
        align={"center"}
        justifyContent={"space-between"}
        py="3rem"
        w="full"
        boxShadow={"lg"}
      >
        <VStack spacing={"7rem"} w="full">
          <Center maxW="7rem">
            <Image src="../../Logo-pink.svg" alt="logo" w="full" />
          </Center>
          <VStack
            w="full"
            sx={{
              button: {
                w: "full",
                px: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                bg:'none',
                rounded:'0',
                _hover:{
                    bg:'prim'
                }
              },
            }}
            align={"start"}
            spacing={"1rem"}
          >
            <Button onClick={()=>setPage('Members')} leftIcon={<FaUserGroup size="25px" />}>Members</Button>
            <Button onClick={()=>setPage('Courses')} leftIcon={<CiBookmark size="25px" />}>Courses</Button>
            <Button onClick={()=>setPage('Payment Details')} leftIcon={<MdPayment size="25px" />}>
              Payment Details
            </Button>
            <Button onClick={()=>setPage('Settings')} leftIcon={<CiSettings size="25px" />}>Settings</Button>
          </VStack>
        </VStack>
        <Button
          onClick={() => signOut()}
          color="red"
          leftIcon={<PiSignOut size="25px" />}
        >
          Sign Out
        </Button>
      </VStack>
      <VStack
        flex="3.5"
        gap="2rem"
        align={"center"}
        w="full"
        justify={"center"}
        spacing={"0rem"}
        px="4rem"
      >
        <HStack><Heading>Welcome {user.name} !</Heading></HStack>
        <VStack
          w="full"
          align={"start"}
          rounded={"2rem"}
          boxShadow={"lg"}
          p="2rem"
        >
          <Heading>Students</Heading>
          <Box maxH="20vh" overflowY={"scroll"} w="full">
            <TableContainer w="full">
              <Table variant="simple" colorScheme="purple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Level</Th>
                    <Th>EMAIL</Th>
                    <Th>Modify</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Mohamed</Td>
                    <Td>1</Td>
                    <Td>mohamed@email.com</Td>
                    <Td>Activate</Td>
                  </Tr>
                  <Tr>
                    <Td>Mohamed</Td>
                    <Td>1</Td>
                    <Td>mohamed@email.com</Td>
                    <Td>Activate</Td>
                  </Tr>
                  <Tr>
                    <Td>Mohamed</Td>
                    <Td>1</Td>
                    <Td>mohamed@email.com</Td>
                    <Td>Activate</Td>
                  </Tr>
                  <Tr>
                    <Td>Mohamed</Td>
                    <Td>1</Td>
                    <Td>mohamed@email.com</Td>
                    <Td>Activate</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
        <VStack
          w="full"
          align={"start"}
          rounded={"2rem"}
          boxShadow={"lg"}
          p="2rem"
        >
          <Heading>Instructors</Heading>
          <Box maxH="20vh" overflowY={"scroll"} w="full">
            <TableContainer w="full">
              <Table variant="simple" colorScheme="purple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Level</Th>
                    <Th>EMAIL</Th>
                    <Th>Modify</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Mohamed</Td>
                    <Td>1</Td>
                    <Td>mohamed@email.com</Td>
                    <Td>Activate</Td>
                  </Tr>
                  <Tr>
                    <Td>Mohamed</Td>
                    <Td>1</Td>
                    <Td>mohamed@email.com</Td>
                    <Td>Activate</Td>
                  </Tr>
                  <Tr>
                    <Td>Mohamed</Td>
                    <Td>1</Td>
                    <Td>mohamed@email.com</Td>
                    <Td>Activate</Td>
                  </Tr>
                  <Tr>
                    <Td>Mohamed</Td>
                    <Td>1</Td>
                    <Td>mohamed@email.com</Td>
                    <Td>Activate</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
      </VStack>
    </Flex>
  );
}
