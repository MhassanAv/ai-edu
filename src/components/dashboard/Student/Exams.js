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
  Spinner,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import useStore from "@/lib/store";

export default function Exams() {
  const queryClient = useQueryClient();
  const { user } = useStore();
  const getExams = useQuery({
    queryKey: ["studentExams"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/v1/student/exams", {
        params: { level: user.level },
      }),
  });
  console.log(getExams.data?.data);

  return (
    <>
      <VStack
        w="full"
        align={"start"}
        rounded={"2rem"}
        boxShadow={"lg"}
        p="2rem"
        bg={useColorModeValue("white", "gray.800")}
        h="50vh"
      >
        <Heading fontSize={"textSizeReg"}>Exams</Heading>
        <Box h="full" overflowY={"scroll"} w="full">
          <TableContainer w="full">
            <Table variant="simple" colorScheme="purple">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Exam</Th>
                  <Th>Date</Th>
                  <Th>Duration</Th>
                  <Th>Level</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {getExams.isLoading ? (
                  <Tr>
                    <Td colSpan={4}>
                      <Spinner />
                    </Td>
                  </Tr>
                ) : (
                  getExams.data?.data.map((exam, index) => (
                    <Tr key={exam.exam_id}>
                      <Td>{index + 1}</Td>
                      <Td>{exam.title}</Td>
                      <Td>{new Date(exam.startAt).toDateString()}</Td>
                      <Td>{exam.duration}</Td>
                      <Td>{user.level}</Td>
                      <Td>
                        <Link
                          color="green"
                          href={{
                            pathname: "/exam",
                            query: { exam_id: exam.exam_id },
                          }}
                        >
                          Start
                        </Link>
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
        bg={useColorModeValue("white", "gray.800")}
      >
        <Heading fontSize={"textSizeReg"}>Your Results</Heading>
        <Box maxH="20vh" overflowY={"scroll"} w="full">
          <TableContainer w="full">
            <Table variant="simple" colorScheme="purple">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>EXAM</Th>
                  <Th>Degree</Th>
                  <Th>DATE</Th>
                  <Th>Duration</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>Exam Name</Td>
                  <Td>100</Td>
                  <Td>Date</Td>
                  <Td>hh:mm:ss</Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>Exam Name</Td>
                  <Td>100</Td>
                  <Td>Date</Td>
                  <Td>hh:mm:ss</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </>
  );
}
