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
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const { user } = useStore();
  console.log(user.user_id);

  const getCourses = useQuery({
    queryKey: ["teacherCourses"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/v1/teacher/courses", {
        data: {
          user_id: user.user_id,
        },
      }),
  });

  return (
    <>
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
        <Box maxH="20vh" overflowY={"scroll"} w="full" h="full">
          <TableContainer w="full">
            <Table variant="simple" colorScheme="purple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Level</Th>
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
                      <Th w="max-content">{course.subject_name}</Th>
                      <Th>{course.level}</Th>
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
