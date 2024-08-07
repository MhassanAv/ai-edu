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
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  Select,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import NextLink from "next/link";
import useStore from "@/lib/store";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
export default function register() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter();
  const { user, setUser } = useStore();
  const [role, setRole] = useState("");
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  const mutation = useMutation({
    mutationFn: async (bodyData) =>
      await axios.post("http://localhost:3000/api/v1/auth/register", bodyData),
    mutationKey: ["user"],
    onSuccess: (res) => {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      router.push("/dashboard");
      toast({
        title: "Created Successfully",
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
    },
  });
  function onSubmit(values) {
    mutation.mutate(values);
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="AI-EDU" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center w="full" minH="100vh" as="main">
        <Center h="10vh" w="full" position={"absolute"} top="0">
          <IconButton
            onClick={toggleColorMode}
            position={"absolute"}
            right="3rem"
          >
            {colorMode === "dark" ? <MdDarkMode /> : <MdLightMode />}
          </IconButton>
        </Center>
        <Flex
          minH="100vh"
          flexWrap="wrap"
          align={"center"}
          justifyContent={"space-between"}
          w="full"
          px="1.5rem"
        >
          <Center
            minH="100vh"
            boxShadow={["none", "none", "30px 0px 20px -30px rgba(0,0,0,0.5)"]}
            gap="2rem"
            flexDirection={"column"}
            w="full"
            alignItems={"center"}
            justifyContent={"center"}
            flex={"2"}
            roundedRight="1.5rem"
          >
            <Image
              filter={useColorModeValue("none", "invert(1)")}
              src={"../logoText.svg"}
              maxW="200px"
              boxSize={"200px"}
              alt="AI-EDU"
            />
            <Image src={"../sign.png"} maxW="300px" alt="sign" />
            <VStack mt="2rem" align={["center", "center", "start"]}>
              <Heading fontSize={"xl"}>
                Welcome to our Educational Platform!
              </Heading>
              <Text>
                We are excited to have you join our community of learners and
                educators.
              </Text>
            </VStack>
          </Center>
          <Center flex={"3"}>
            <VStack
              align={"center"}
              justifyContent={"center"}
              gap="2.5rem"
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              w={["full", "full", "70%"]}
              py="2rem"
            >
              <VStack align={"start"} w="full">
                <Heading>Sign Up Now</Heading>
                <Text textAlign={"center"}>Create new account</Text>
              </VStack>
              <FormControl
                variant="floating"
                isInvalid={errors.full_name}
                isRequired
              >
                <Input
                  placeholder=" "
                  type="text"
                  id="full_name"
                  {...register("full_name", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormLabel
                  htmlFor="full_name"
                  bgColor={useColorModeValue(
                    "bg !important",
                    "black !important"
                  )}
                >
                  Full Name
                </FormLabel>
                <FormErrorMessage>
                  {errors.full_name && errors.full_name.message}
                </FormErrorMessage>
              </FormControl>

              {/* <FormControl variant="floating" isInvalid={errors.email} isRequired>
              <Input
                placeholder=" "
                type="email"
                id="email"
                {...register("email", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <FormLabel
                htmlFor="email"
                bgColor={useColorModeValue("bg !important", "black !important")}
              >
                Email address
              </FormLabel>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl> */}

              <FormControl
                variant="floating"
                isInvalid={errors.role}
                isRequired
              >
                <Select
                  placeholder="Select Role"
                  type="text"
                  id="role"
                  {...register("role", {
                    required: "This is required",
                    onChange: (e) => setRole(e.target.value),
                  })}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </Select>
                <FormLabel
                  htmlFor="role"
                  bgColor={useColorModeValue(
                    "bg !important",
                    "black !important"
                  )}
                >
                  Role
                </FormLabel>
                <FormErrorMessage>
                  {errors.role && errors.role.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                variant="floating"
                isInvalid={errors.level}
                isRequired={role !== "student" ? false : true}
                isDisabled={role === "student" ? false : true}
              >
                <Select
                  placeholder="Select Level"
                  type="number"
                  id="level"
                  {...register("level", {
                    valueAsNumber: true,
                  })}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </Select>
                <FormLabel
                  htmlFor="level"
                  bgColor={useColorModeValue(
                    "bg !important",
                    "black !important"
                  )}
                >
                  Level
                </FormLabel>
                <FormErrorMessage>
                  {errors.level && errors.level.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                variant="floating"
                pos="relative"
                isInvalid={errors.pass}
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
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormLabel
                  bgColor={useColorModeValue(
                    "bg !important",
                    "black !important"
                  )}
                  htmlFor="pass"
                >
                  Password
                </FormLabel>
                <FormErrorMessage>
                  {errors.pass && errors.pass.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                variant="floating"
                isInvalid={errors.phone}
                isRequired
              >
                <Input
                  placeholder=" "
                  type="text"
                  id="phone"
                  {...register("phone", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormLabel
                  htmlFor="phone"
                  bgColor={useColorModeValue(
                    "bg !important",
                    "black !important"
                  )}
                >
                  Phone
                </FormLabel>
                <FormErrorMessage>
                  {errors.phone && errors.phone.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                variant="floating"
                isInvalid={errors.national_id}
                isRequired
              >
                <Input
                  placeholder=" "
                  type="text"
                  id="national_id"
                  {...register("national_id", {
                    required: "This is required",
                    minLength: {
                      value: 11,
                      message: "Minimum length should be 11",
                    },
                  })}
                />
                <FormLabel
                  htmlFor="national_id"
                  bgColor={useColorModeValue(
                    "bg !important",
                    "black !important"
                  )}
                >
                  National ID
                </FormLabel>
                <FormErrorMessage>
                  {errors.national_id && errors.national_id.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                isLoading={isSubmitting}
                type="submit"
                py="1rem"
                w="full"
                bg="prim"
                color="white"
                rounded="full"
                maxW={["full", "full", "80%"]}
              >
                Create an account
              </Button>
              <Text>
                Already have an account?{" "}
                <chakra.span color="prim" as={NextLink} href="/login">
                  Log in
                </chakra.span>
              </Text>
            </VStack>
          </Center>
        </Flex>
      </Center>
    </>
  );
}
