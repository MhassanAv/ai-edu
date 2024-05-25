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
  HStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Payment() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const { colorMode, toggleColorMode } = useColorMode();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => axios.post("api/user").then((res) => res.data),
    enabled: false,
  });

  function onSubmit(values) {
    // adding logic for submitting form using react query
  }
  return (
    <>
      <HStack w="full" spacing={"2rem"}>
        <VStack w="full" spacing={"2rem"}>
          <VStack
            w="full"
            align={"start"}
            rounded={"2rem"}
            boxShadow={"lg"}
            p="2rem"
            h="full"
            bg={useColorModeValue("white", "gray.800")}
          >
            <Heading fontSize={"textSizeReg"}>Course Fees</Heading>
            <VStack maxH="20vh" w="full">
              <Heading fontSize={"lg"}>Level 1</Heading>
              <Heading fontSize={"5xl"}>99 L.E</Heading>
              <Text>Please pay the fees to activate your account!</Text>
            </VStack>
          </VStack>
          <VStack
            w="full"
            align={"start"}
            rounded={"2rem"}
            boxShadow={"lg"}
            p="2rem"
            h="full"
            bg={useColorModeValue("white", "gray.800")}
          >
            <Heading fontSize={"textSizeReg"}>Payment Methods</Heading>
            <HStack
              spacing={"2rem"}
              justify={"center"}
              maxH="20vh"
              h="full"
              w="full"
            >
              <Image
                alt="insta"
                src="../../instapay.svg"
                w="full"
                maxW="7rem"
              />
              <Image alt="voda" src="../../voda.svg" w="full" maxW="3rem" />
            </HStack>
          </VStack>
        </VStack>
        <VStack
          align={"center"}
          justifyContent={"center"}
          gap="2.5rem"
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          w={"full"}
        >
          <VStack align={"start"} w="full">
            <Heading>Payment Form</Heading>
            <Text textAlign={"center"}>Please, fill out this form</Text>
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
              bgColor={useColorModeValue("bg !important", "black !important")}
            >
              Full Name
            </FormLabel>
            <FormErrorMessage>
              {errors.full_name && errors.full_name.message}
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
              bgColor={useColorModeValue("bg !important", "black !important")}
            >
              National ID
            </FormLabel>
            <FormErrorMessage>
              {errors.national_id && errors.id.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl variant="floating" isInvalid={errors.method} isRequired>
            <Input
              placeholder=" "
              type="text"
              id="method"
              {...register("method", {
                required: "This is required",
              })}
            />
            <FormLabel
              htmlFor="method"
              bgColor={useColorModeValue("bg !important", "black !important")}
            >
              Method
            </FormLabel>
            <FormErrorMessage>
              {errors.method && errors.method.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl variant="floating" isInvalid={errors.method} isRequired>
            <Input
              placeholder=" "
              type="text"
              id="paidfrom"
              {...register("paidfrom", {
                required: "This is required",
                minLength: {
                  value: 11,
                  message: "Minimum length should be 11",
                },
              })}
            />
            <FormLabel
              htmlFor="paidfrom"
              bgColor={useColorModeValue("bg !important", "black !important")}
            >
              Paid from
            </FormLabel>
            <FormErrorMessage>
              {errors.paidfrom && errors.paidfrom.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            isLoading={isSubmitting || isLoading}
            type="submit"
            py="1rem"
            w="full"
            bg="prim"
            color="white"
            rounded="full"
            maxW={["full", "full", "80%"]}
          >
            Submit
          </Button>
        </VStack>
      </HStack>
    </>
  );
}
