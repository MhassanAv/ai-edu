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
} from "@chakra-ui/react";

export default function Exams() {
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
        <Heading fontSize={"textSizeReg"}>Exams</Heading>
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
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>Exam Name</Td>
                  <Td>100</Td>
                  <Td>Date</Td>
                  <Td>hh:mm:ss</Td>
                  <Td color="green.300">Start</Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>Exam Name</Td>
                  <Td>100</Td>
                  <Td>Date</Td>
                  <Td>hh:mm:ss</Td>
                  <Td color="green.300">Start</Td>
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
