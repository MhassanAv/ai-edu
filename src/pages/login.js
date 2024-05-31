import {
  Center,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
  Button,
  Image,
  Text,
  IconButton,
  useColorMode,
  useColorModeValue,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useForm } from "react-hook-form";
import NextLink from "next/link";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import useStore from "@/lib/store";
import { useRouter } from "next/router";
export default function login() {
  const [isHidden, setIsHidden] = useState(true);
  const { user, setUser } = useStore();
  const toast = useToast();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      router.push("/dashboard");
    }
  }, [user]);

  const { colorMode, toggleColorMode } = useColorMode();
  const mutation = useMutation({
    mutationFn: async (bodyData) =>
      await axios.post("http://localhost:3000/api/v1/auth/login", bodyData),
    mutationKey: ["user"],
    onSuccess: (res) => {
      setUser(res.data);
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      router.push("/dashboard");
      toast({
        title: "Login Successful",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (e) => {
      toast({
        title: "Failed",
        description: e.response.data.error.msg,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(e.response);
    },
  });

  function onSubmit(values) {
    mutation.mutate(values);
  }

  return (
    <Center w="full" h="100vh" as="main">
      <Center
        h="10vh"
        w="full"
        bg="white"
        position={"absolute"}
        top="0"
        boxShadow={"lg"}
        bgColor={useColorModeValue("white", "gray.800")}
      >
        <Image
          filter={useColorModeValue("none", "invert(1)")}
          src={"../logo.svg"}
          maxW="60px"
          boxSize={"60px"}
          alt="AI-EDU"
        />
        <IconButton
          onClick={toggleColorMode}
          position={"absolute"}
          right="3rem"
        >
          {colorMode === "dark" ? <MdDarkMode /> : <MdLightMode />}
        </IconButton>
      </Center>
      <VStack
        align={"center"}
        justifyContent={"center"}
        gap="2.5rem"
        as="form"
        px="1.5rem"
        py="2rem"
        onSubmit={handleSubmit(onSubmit)}
      >
        <VStack>
          <Heading>Welcome Back!</Heading>
          <Text textAlign={"center"}>
            Enter your Credentials to access your account
          </Text>
        </VStack>
        <FormControl variant="floating" isInvalid={errors.username} isRequired>
          <Input
            placeholder=" "
            type="text"
            {...register("username", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormLabel
            htmlFor="username"
            bgColor={useColorModeValue("bg !important", "black !important")}
          >
            National ID
          </FormLabel>
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          variant="floating"
          pos="relative"
          isInvalid={errors.password}
          isRequired
        >
          <Button
            color="textLight"
            variant={"unstyled"}
            bg="none"
            rightIcon={isHidden ? <FaEye /> : <FaEyeSlash />}
            onClick={() => setIsHidden((prev) => !prev)}
            position={"absolute"}
            right="0"
            top="-2rem"
            display="flex"
            align="center"
            justifyContent={"center"}
            opacity={"0.7"}
            pb="0.5rem"
            fontSize={"xs"}
          >
            {isHidden ? "Show" : "Hide"}
          </Button>
          <Input
            placeholder=" "
            type={isHidden ? "password" : "text"}
            {...register("password", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormLabel
            bgColor={useColorModeValue("bg !important", "black !important")}
            htmlFor="password"
          >
            Password
          </FormLabel>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          isLoading={mutation.isLoading}
          type="submit"
          py="1rem"
          w="full"
          bg="prim"
          color="white"
          rounded="full"
        >
          Log in
        </Button>
        <Divider borderColor="textLight" w="full" />
        <Heading fontSize={"xl"}>Don’t have an account?</Heading>
        <Button
          as={NextLink}
          href={"/register"}
          py="1rem"
          w="full"
          bg="none"
          border={"1.5px solid"}
          borderColor={useColorModeValue("black", "white")}
          color={useColorModeValue("black", "white")}
          rounded="full"
        >
          Sign up
        </Button>
      </VStack>
    </Center>
  );
}
