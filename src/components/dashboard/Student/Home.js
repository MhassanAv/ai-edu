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

export default function Home() {
  const { user } = useStore();
  console.log(user.user_id);

  const getCourses = useQuery({
    queryKey: ["courses"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/v1/student/courses", {
        params: { level: user.level },
      }),
  });

  const getResults = useQuery({
    queryKey: ["results"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/v1/student/exam-result", {
        params: { level: user.level },
      }),
  });

  return (
    <>
      <HStack w="full" spacing={"2rem"}>
        <VStack
          w="full"
          align={"start"}
          rounded={"2rem"}
          boxShadow={"lg"}
          p="2rem"
          bg={useColorModeValue("white", "gray.800")}
          h="full"
        >
          <Heading fontSize={"textSizeReg"}>Upcoming Exams</Heading>
          <Box h="full" overflowY={"scroll"} w="full">
            <TableContainer w="full">
              <Table variant="simple" colorScheme="purple">
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>Exam</Th>
                    <Th>Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>1</Td>
                    <Td>Exam Name</Td>
                    <Td>Date</Td>
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
          h="full"
        >
          <Heading fontSize={"textSizeReg"}>Your Results</Heading>
          <Box h="full" overflowY={"scroll"} w="full">
            <TableContainer w="full">
              <Table variant="simple" colorScheme="purple">
                <Thead>
                  <Tr>
                    <Th>EXAM</Th>
                    <Th>Degree</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Exam Name</Td>
                    <Td>100/100</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
      </HStack>
      <VStack
        w="full"
        align={"start"}
        rounded={"2rem"}
        boxShadow={"lg"}
        p="2rem"
        bg={useColorModeValue("white", "gray.800")}
        h="full"
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
