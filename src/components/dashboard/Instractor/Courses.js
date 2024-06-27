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
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import useStore from "@/lib/store";
import { FaEye, FaTrash } from "react-icons/fa";

export default function Courses() {
  const queryClient = useQueryClient();
  const { user } = useStore();

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

  const getCourses = useQuery({
    queryKey: ["courses"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/v1/teacher/courses", {
        params: { user_id: user.user_id },
      }),
  });
  console.log(getCourses.data?.data);

  const deleteContent = useMutation({
    mutationKey: ["courses"],
    mutationFn: async (bodyData) =>
      await axios.delete("http://localhost:3000/api/v1/teacher/content", {
        data: bodyData,
      }),

    onSuccess: () =>
      toast({
        title: "Deleted",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
    onError: (e) => {
      toast({
        title: "Somthing went wrong",
        status: "error",
        description: e.response.data.error.msg,
        duration: 9000,
        isClosable: true,
      });
    },
    onSettled: () => queryClient.invalidateQueries(["courses", "teachers"]),
  });

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
        title: "Uploaded successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
    onError: () =>
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      }),
    onSettled: () => queryClient.invalidateQueries(["courses"]),
  });

  const toast = useToast();

  const AddModal = () => {
    function onSubmit(values) {
      const file = getValues("pdf").item(0);
      uploadContent.mutate({ ...values, pdf: file });
      onCloseAdd();
    }
    return (
      <Modal isOpen={isOpenAdd} onClose={onCloseAdd}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Content</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.subject_name} isRequired>
              <FormLabel htmlFor="subject_name">Subject</FormLabel>
              <Select
                placeholder="Select a Course"
                {...register("subject_name", {
                  required: "This is required",
                })}
              >
                {getCourses.data?.data.map((teacherCourse) => (
                  <option
                    key={teacherCourse.subject_id}
                    value={teacherCourse.subject_name}
                  >
                    {teacherCourse.subject_name}
                  </option>
                ))}
              </Select>

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
        <Heading fontSize={"sm"}>Add A New Content</Heading>
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
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {getCourses.isLoading ? (
                  <Tr>
                    <Td colSpan={4}>
                      <Spinner />
                    </Td>
                  </Tr>
                ) : (
                  getCourses.data?.data.map((course) => (
                    <Tr key={course.subject_id}>
                      <Td w="max-content">{course.subject_name}</Td>
                      <Td>{course.level}</Td>
                      <Td>
                        <Popover>
                          <PopoverTrigger>
                            <Button bg="prim" colorScheme={"purple"}>
                              Show Contents
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent w="28rem">
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Contents</PopoverHeader>
                            <PopoverBody
                              flexDir="column"
                              display={"flex"}
                              gap="1rem"
                              w="full"
                              maxW="50rem"
                              p="1.5rem"
                            >
                              {course.content.length !== 0
                                ? course.content.map((c) => (
                                    <HStack
                                      key={c._id}
                                      justifyContent={"space-between"}
                                      spacing={"0"}
                                      p="1rem"
                                    >
                                      <Heading fontSize={"sm"}>
                                        {c.title}
                                      </Heading>
                                      <HStack>
                                        <Button
                                          colorScheme={"blue"}
                                          as={"a"}
                                          href={`http://localhost:3000${c.path}`}
                                          target="_blank"
                                        >
                                          <FaEye />
                                        </Button>
                                        <Button
                                          colorScheme={"red"}
                                          onClick={() =>
                                            deleteContent.mutate({
                                              subject_name: course.subject_name,
                                              title: c.title,
                                            })
                                          }
                                        >
                                          <FaTrash />
                                        </Button>
                                      </HStack>
                                    </HStack>
                                  ))
                                : "No content assigned yet"}
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </>
  );
}
