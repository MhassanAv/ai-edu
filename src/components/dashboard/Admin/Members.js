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
} from "@chakra-ui/react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

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
      >
        <Heading fontSize={"textSizeReg"}>Students</Heading>
        <Box maxH="20vh" overflowY={"scroll"} w="full">
          <TableContainer w="full">
            <Table variant="simple" colorScheme="purple" w="full">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Level</Th>
                  <Th>National ID</Th>
                  <Th>Modify</Th>
                </Tr>
              </Thead>
              <Tbody>
                {getStudents.data?.data.map((student) => (
                  <Tr key={student.student_id}>
                    <Td>{student.full_name}</Td>
                    <Td>{student.level}</Td>
                    <Td>{student.national_id}</Td>
                    <Td>
                      <Button
                        variant={"outline"}
                        onClick={() =>
                          modifyUserState.mutate({
                            user: student.student_id,
                            value: !student.isActive,
                          })
                        }
                      >{`${student.isActive ? "active" : "disabled"}`}</Button>
                      <Button
                        variant={"outline"}
                        onClick={() =>
                          deleteUser.mutate({
                            user: student.student_id,
                          })
                        }
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
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
        <Heading fontSize={"textSizeReg"}>Instructors</Heading>
        <Box maxH="20vh" overflowY={"scroll"} w="full">
          <TableContainer w="full">
            <Table variant="simple" colorScheme="purple" w="full">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>National ID</Th>
                  <Th>Modify</Th>
                </Tr>
              </Thead>
              <Tbody>
                {getTeachers.data?.data.map((teacher) => (
                  <Tr key={teacher._id}>
                    <Td>{teacher.full_name}</Td>
                    <Td>{teacher.national_id}</Td>
                    <Td>
                      <Button
                        variant={"outline"}
                        onClick={() =>
                          modifyUserState.mutate({
                            user: teacher._id,
                            value: !teacher.isActive,
                          })
                        }
                      >{`${teacher.isActive ? "active" : "disabled"}`}</Button>
                      <Button
                        variant={"outline"}
                        onClick={() =>
                          deleteUser.mutate({
                            user: teacher._id,
                          })
                        }
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </>
  );
}
