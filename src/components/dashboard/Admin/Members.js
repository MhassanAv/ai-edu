import useStore from "@/lib/store";
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
  Button,
  useToast,
  Spinner,
  Center,
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
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

export default function Members() {
  const queryClient = useQueryClient();
  const getStudents = useQuery({
    queryKey: ["students"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/v1/admin/students"),
  });

  const getTeachers = useQuery({
    queryKey: ["teachers"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/v1/admin/teachers"),
  });

  const modifyUserState = useMutation({
    mutationKey: ["students", "teachers"],
    mutationFn: async (bodyData) =>
      await axios.post(
        "http://localhost:3000/api/v1/admin/activation",
        bodyData
      ),
    onSuccess: () =>
      toast({
        title: "User Modified",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
    onSettled: () => queryClient.invalidateQueries(["students", "teachers"]),
  });

  const deleteUser = useMutation({
    mutationKey: ["students", "teachers"],
    mutationFn: async (bodyData) =>
      await axios.delete("http://localhost:3000/api/v1/admin/user", {
        data: bodyData,
      }),
    onSuccess: () =>
      toast({
        title: "User Deleted",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
    onSettled: () => queryClient.invalidateQueries(["students", "teachers"]),
  });

  const toast = useToast();

  return (
    <>
      <VStack
        w="full"
        align={"start"}
        rounded={"2rem"}
        boxShadow={"lg"}
        p="2rem"
        bg={useColorModeValue("white", "gray.800")}
        h="32vh"
      >
        <Heading fontSize={"textSizeReg"}>Students</Heading>
        <Box overflowY={"scroll"} w="full">
          <TableContainer w="full">
            <Table
              variant="simple"
              colorScheme="purple"
              w="full"
              layout="fixed"
            >
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Level</Th>
                  <Th>National ID</Th>
                  <Th>Modify</Th>
                </Tr>
              </Thead>
              <Tbody>
                {getStudents.isLoading ? (
                  <Tr>
                    <Td colSpan={4}>
                      <Spinner />
                    </Td>
                  </Tr>
                ) : (
                  getStudents.data?.data.map((student) => (
                    <Tr key={student.student_id}>
                      <Td>{student.full_name}</Td>
                      <Td>{student.level}</Td>
                      <Td>{student.national_id}</Td>
                      <Td>
                        <Button
                          colorScheme={student.isActive ? "green" : "red"}
                          mr="0.5rem"
                          onClick={() =>
                            modifyUserState.mutate({
                              user: student.student_id,
                              value: !student.isActive,
                            })
                          }
                        >{`${
                          student.isActive ? "active" : "disabled"
                        }`}</Button>
                        <Button
                          colorScheme={"red"}
                          onClick={() =>
                            deleteUser.mutate({
                              user: student.student_id,
                            })
                          }
                        >
                          <FaTrash />
                        </Button>
                      </Td>
                    </Tr>
                  ))
                )}
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
        h="32vh"
        bg={useColorModeValue("white", "gray.800")}
      >
        <Heading fontSize={"textSizeReg"}>Instructors</Heading>
        <Box overflowY={"scroll"} w="full">
          <TableContainer w="full">
            <Table
              variant="simple"
              colorScheme="purple"
              w="full"
              layout="fixed"
              h="full"
            >
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Courses</Th>
                  <Th>National ID</Th>
                  <Th>Modify</Th>
                </Tr>
              </Thead>
              <Tbody>
                {getTeachers.isLoading ? (
                  <Tr>
                    <Td colSpan={4}>
                      <Spinner />
                    </Td>
                  </Tr>
                ) : (
                  getTeachers.data?.data.map((teacher) => (
                    <Tr key={teacher._id} w="full">
                      <Td>{teacher.full_name}</Td>
                      <Td>
                        <Popover>
                          <PopoverTrigger>
                            <Button bg="prim" colorScheme={"purple"}>
                              Show Courses
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent w="full" maxW="20rem">
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Courses</PopoverHeader>
                            <PopoverBody
                              flexDir="column"
                              display={"flex"}
                              gap="1rem"
                              w="full"
                              maxW="20rem"
                              p="1.5rem"
                            >
                              {teacher.subjects.length !== 0
                                ? teacher.subjects.map((subject) => (
                                    <Heading
                                      fontSize={"sm"}
                                      key={subject.subject_id}
                                    >
                                      {subject.subject_name}
                                    </Heading>
                                  ))
                                : "No subjects assigned yet"}
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Td>
                      <Td>{teacher.national_id}</Td>
                      <Td>
                        <Button
                          colorScheme={teacher.isActive ? "green" : "red"}
                          mr="0.5rem"
                          onClick={() =>
                            modifyUserState.mutate({
                              user: teacher._id,
                              value: !teacher.isActive,
                            })
                          }
                        >{`${
                          teacher.isActive ? "active" : "disabled"
                        }`}</Button>
                        <Button
                          colorScheme={"red"}
                          onClick={() =>
                            deleteUser.mutate({
                              user: teacher._id,
                            })
                          }
                        >
                          <FaTrash />
                        </Button>
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
