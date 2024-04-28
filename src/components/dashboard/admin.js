import {
  Button,
  Box,
  Heading,
  Flex,
  VStack,
  HStack,
  Image,
  Center,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorMode,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

import { FaUserGroup } from "react-icons/fa6";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { MdArrowDropDown, MdPayment } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";
import useStore from "@/lib/store";
import { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { QueryCache, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Admin() {
  const { user, setUser } = useStore();
  const [page, setPage] = useState("Members");
  const isActive = () => "prim";
  const { colorMode, toggleColorMode } = useColorMode();
  const queryClient = useQueryClient();
  const mutation = useMutation({mutationKey:"user",mutationFn:()=>queryClient.removeQueries(['user']),onSuccess:()=>setUser(null)})
  console.log(mutation.data)
  console.log(user);
  return (
    <Flex h="100vh" w="full" gap="2rem">
      <VStack
        flex="1"
        align={"center"}
        justifyContent={"space-between"}
        py="3rem"
        w="full"
        boxShadow={"lg"}
        h="full"
        bg={useColorModeValue("white", "gray.800")}
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
                rounded: "0",
                bg:'none',
                _hover: {
                  bg: "prim",
                },
              },
            }}
            align={"start"}
            spacing={"1rem"}
          >
            <Button
              onClick={() => setPage("Members")}
              leftIcon={<FaUserGroup size="25px" />}
            >
              Members
            </Button>
            <Button
              onClick={() => setPage("Courses")}
              leftIcon={<CiBookmark size="25px" />}
            >
              Courses
            </Button>
            <Button
              onClick={() => setPage("Payment Details")}
              leftIcon={<MdPayment size="25px" />}
            >
              Payment Details
            </Button>
            <Button
              onClick={() => setPage("Settings")}
              leftIcon={<CiSettings size="25px" />}
            >
              Settings
            </Button>
          </VStack>
        </VStack>
        <Button
          onClick={()=>mutation.mutate()}
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
        <HStack w="full" alignItems={'center'} justifyContent={'space-between'}>
          <Center
            w="full"
            maxW="40rem"
            h="10.5rem"
            bgPos={"center"}
            bgRepeat={"no-repeat"}
            bgSize={'100%'}
            bgImage="../../header.svg"
            px="3rem"
            justifyContent={"start"}
          >
            <Heading
              color="white"
              letterSpacing={"-0.72px"}
              fontSize={"textSize"}
              fontFamily={"var(--font-open-sans)"}
            >
              Hello {user?.name} Welcome Back!
            </Heading>
          </Center>
          
          <IconButton
            onClick={toggleColorMode}
          >
            {colorMode === "dark" ? <MdDarkMode /> : <MdLightMode />}
          </IconButton>
          <Menu>
            <MenuButton  w='full' maxW='20rem' bg={useColorModeValue("white", "gray.800")}  h='5.625rem' as={Button} rightIcon={<MdArrowDropDown />}>
              <HStack>
            <Avatar name={user?.name} src='https://bit.ly/sage-adebayo' />
            <VStack>
            <Heading fontSize={'1.3rem'}>{user?.name}</Heading>
            <Heading fontSize={'1rem'} color='prim' fontWeight={'300'}>{user?.role}</Heading>
            </VStack>
            </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>Change Name</MenuItem>
              <MenuItem>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <VStack
          w="full"
          align={"start"}
          rounded={"2rem"}
          boxShadow={"lg"}
          p="2rem"
          bg={useColorModeValue("white", "gray.800")}
        >
          <Heading fontSize={'textSizeReg'}>Students</Heading>
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
          bg={useColorModeValue("white", "gray.800")}
        >
          <Heading fontSize={'textSizeReg'}>Instructors</Heading>
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
