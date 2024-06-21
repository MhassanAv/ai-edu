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
  Box,
  Center,
  Icon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
  useToast,
  Select,
  Spinner,
  FormErrorMessage,
} from "@chakra-ui/react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

export default function Courses() {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();

  const uploadContent = useMutation({
    mutationKey: ["courses"],
    mutationFn: async (bodyData) =>
      await axios.post(
        "http://localhost:3000/api/v1/teacher/content",
        bodyData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ),
    onSuccess: () =>
      toast({
        title: "Modified",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
    onSettled: () => queryClient.invalidateQueries(["courses", "teachers"]),
  });

  const toast = useToast();

  const AddModal = () => {
    function onSubmit(values) {
      const file = getValues("pdf").item(0);
      uploadContent.mutate({ ...values, pdf: file });
      console.log({ ...values, pdf: file });
      onCloseAdd();
    }
    return (
      <Modal isOpen={isOpenAdd} onClose={onCloseAdd}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.subject_name} isRequired>
              <FormLabel htmlFor="subject_name">Subject</FormLabel>
              <Input
                type="text"
                {...register("subject_name", {
                  required: "This is required",
                })}
              />

              <FormErrorMessage>
                {errors.subject_name && errors.subject_name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.title} isRequired>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                placeholder="Title"
                type="text"
                {...register("title", {
                  required: "This is required",
                })}
              />

              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.pdf} isRequired>
              <FormLabel htmlFor="pdf">File</FormLabel>
              <Input type="file" id="pdf" accept=".pdf" {...register("pdf")} />
              <FormErrorMessage>
                {errors.pdf && errors.pdf.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" type="submit" mr={3}>
              Add
            </Button>
            <Button onClick={onCloseAdd}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <AddModal />
      <Center
        w="full"
        align={"start"}
        rounded={"2rem"}
        boxShadow={"lg"}
        p="2rem"
        bg={useColorModeValue("white", "gray.800")}
        as="button"
        flexDirection="column"
        gap="1rem"
        onClick={onOpenAdd}
      >
        <Icon
          bg="prim"
          as={HiOutlineDocumentAdd}
          rounded="full"
          boxSize={"3rem"}
          p="0.5rem"
        />
        <Heading fontSize={"sm"}>Add A New Course</Heading>
      </Center>
      <VStack
        w="full"
        align={"start"}
        rounded={"2rem"}
        boxShadow={"lg"}
        p="2rem"
        bg={useColorModeValue("white", "gray.800")}
        h="50vh"
      >
        <Heading fontSize={"textSizeReg"}>Courses</Heading>
        <Box h="full" overflowY={"scroll"} w="full">
          <TableContainer w="full">
            <Table variant="simple" colorScheme="purple" w="full">
              <Thead>
                <Tr>
                  <Th>Course</Th>
                  <Th>Level</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* {getCourses.isLoading ? (
                  <Tr>
                    <Td colSpan={4}>
                      <Spinner />
                    </Td>
                  </Tr>
                ) : (
                  getCourses.data?.data.map((course) => (
                    <Tr key={course.subject_id}>
                      <Th w="max-content">{course.subject_name}</Th>
                      <Th>{course.level}</Th>
                    </Tr>
                  ))
                )} */}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </>
  );
}
