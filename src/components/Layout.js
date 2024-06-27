import {
  Button,
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
  useColorMode,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { FaUserGroup } from "react-icons/fa6";
import { CiSettings, CiBookmarkMinus } from "react-icons/ci";
import { MdArrowDropDown, MdFileOpen, MdOutlinePayments } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";
import useStore from "@/lib/store";
import { useRef } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FaHome } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const { user, setUser, page, setPage } = useStore();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const queryClient = useQueryClient();
  const SignOut = useMutation({
    mutationKey: "user",
    mutationFn: () => queryClient.removeQueries(["user"]),
    onSuccess: () => {
      router.push("/login");
      localStorage.removeItem("user");
      setUser(null);
    },
  });
  const pageRef = useRef(null);
  const setActive = (currentPage) => {
    return currentPage === page ? useColorModeValue("#E8E8F8", "prim") : "none";
  };

  return (
    <Flex h="100vh" w="full" bg={useColorModeValue("#E8E8F8", "black")}>
      <VStack
        align={"center"}
        justifyContent={"space-between"}
        py="3rem"
        w="full"
        maxW="20%"
        boxShadow={"lg"}
        h="full"
        bg={useColorModeValue("white", "gray.800")}
        display={["none", "none", "none", "flex"]}
        roundedRight={"2rem"}
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
                color: useColorModeValue("blackAlpha.700", "white"),
                px: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                transition: "all 0.3s ease",
                borderLeft: "inset 5px none",
                rounded: "0",
                _hover: {
                  bg: useColorModeValue("#E8E8F8", "prim"),
                  borderLeft: `inset 5px ${useColorModeValue(
                    "var(--chakra-colors-prim)",
                    "#E8E8F8"
                  )}`,
                },
              },
            }}
            align={"start"}
            spacing={"1rem"}
            ref={pageRef}
          >
            {user.role !== "admin" ? (
              <Button
                onClick={() => setPage("Home")}
                leftIcon={<FaHome size="25px" />}
                data-link="Home"
                bg={setActive("Home")}
              >
                Home
              </Button>
            ) : null}
            {user.role === "admin" ? (
              <Button
                onClick={() => setPage("Members")}
                leftIcon={<FaUserGroup size="25px" />}
                data-link="Members"
                bg={setActive("Members")}
              >
                Members
              </Button>
            ) : null}
            <Button
              onClick={() => setPage("Courses")}
              leftIcon={<CiBookmarkMinus size="25px" />}
              data-link="Courses"
              bg={setActive("Courses")}
            >
              Courses
            </Button>
            {user.role === "student" || user.role === "admin" ? (
              <Button
                onClick={() => setPage("Payment")}
                leftIcon={<MdOutlinePayments size="25px" />}
                bg={setActive("Payment")}
              >
                Payment Details
              </Button>
            ) : null}
            {user.role === "student" || user.role === "teacher" ? (
              <Button
                onClick={() => setPage("Exams")}
                leftIcon={<MdFileOpen size="25px" />}
                bg={setActive("Exams")}
              >
                Exams
              </Button>
            ) : null}

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
          onClick={() => SignOut.mutate()}
          color="red"
          leftIcon={<PiSignOut size="25px" />}
        >
          Sign Out
        </Button>
      </VStack>
      <VStack
        gap="2rem"
        align={"center"}
        w="full"
        spacing={"0rem"}
        justifyContent={"start"}
        p="2rem"
        h="100vh"
      >
        <Flex
          flexWrap={["wrap", "wrap", "nowrap"]}
          w="full"
          alignItems={"center"}
          justifyContent={"center"}
          gap="2rem"
        >
          <Center
            w="full"
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
              Hello {user?.full_name} Welcome Back!
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
                <Avatar
                  name={user?.full_name}
                  src="https://bit.ly/sage-adebayo"
                />
                <VStack align={"start"}>
                  <Heading fontSize={"1.3rem"}>{user?.full_name}</Heading>
                  <HStack>
                    <Heading fontSize={"1rem"} color="prim" fontWeight={"300"}>
                      {user?.role}
                    </Heading>
                    {user?.role !== "admin" && (
                      <Heading
                        fontSize={"1rem"}
                        color={user?.isActive ? "green" : "red"}
                        fontWeight={"300"}
                      >
                        {user?.isActive ? "(active)" : "(disabled)"}
                      </Heading>
                    )}
                  </HStack>
                </VStack>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>Change Name</MenuItem>
              <MenuItem onClick={() => SignOut.mutate()}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        {children}
      </VStack>
    </Flex>
  );
}
