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
import { useEffect, useRef, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { QueryCache, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Layout({ children }) {
  const { user, setUser, page, setPage } = useStore();
  const { colorMode, toggleColorMode } = useColorMode();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: "user",
    mutationFn: () => queryClient.removeQueries(["user"]),
    onSuccess: () => setUser(null),
  });
  console.log(mutation.data);
  console.log(user);
  const pageRef = useRef(null);
  const setActive = (currentPage) => {
    return currentPage === page ? "prim" : "none";
  };
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
        display={["none", "none", "none", "flex"]}
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
                _hover: {
                  bg: "prim",
                },
              },
            }}
            align={"start"}
            spacing={"1rem"}
            ref={pageRef}
          >
            <Button
              onClick={() => setPage("Members")}
              leftIcon={<FaUserGroup size="25px" />}
              data-link="Members"
              bg={setActive("Members")}
            >
              Members
            </Button>
            <Button
              onClick={() => setPage("Courses")}
              leftIcon={<CiBookmark size="25px" />}
              data-link="Courses"
              bg={setActive("Courses")}
            >
              Courses
            </Button>
            <Button
              onClick={() => setPage("Payment Details")}
              leftIcon={<MdPayment size="25px" />}
              bg={setActive("Payment Details")}
            >
              Payment Details
            </Button>
            <Button
              onClick={() => setPage("Settings")}
              leftIcon={<CiSettings size="25px" />}
              data-link="Settings"
              bg={setActive("Settings")}
            >
              Settings
            </Button>
          </VStack>
        </VStack>
        <Button
          onClick={() => mutation.mutate()}
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
        <Flex
          flexWrap={["wrap", "wrap", "nowrap"]}
          w="full"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Center
            w="full"
            maxW="40rem"
            h="10.5rem"
            bgPos={"center"}
            bgRepeat={"no-repeat"}
            bgSize={"100%"}
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

          <IconButton onClick={toggleColorMode}>
            {colorMode === "dark" ? <MdDarkMode /> : <MdLightMode />}
          </IconButton>
          <Menu>
            <MenuButton
              w="full"
              maxW={["full", "full", "20rem"]}
              bg={useColorModeValue("white", "gray.800")}
              h="5.625rem"
              as={Button}
              rightIcon={<MdArrowDropDown />}
            >
              <HStack>
                <Avatar name={user?.name} src="https://bit.ly/sage-adebayo" />
                <VStack>
                  <Heading fontSize={"1.3rem"}>{user?.name}</Heading>
                  <Heading fontSize={"1rem"} color="prim" fontWeight={"300"}>
                    {user?.role}
                  </Heading>
                </VStack>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>Change Name</MenuItem>
              <MenuItem onClick={() => mutation.mutate()}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        {children}
      </VStack>
    </Flex>
  );
}