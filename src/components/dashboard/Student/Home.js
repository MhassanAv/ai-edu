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
  HStack,
} from "@chakra-ui/react";

export default function Home() {
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
        >
          <Heading fontSize={"textSizeReg"}>Upcoming Exams</Heading>
          <Box maxH="20vh" overflowY={"scroll"} w="full">
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
        >
          <Heading fontSize={"textSizeReg"}>Your Results</Heading>
          <Box maxH="20vh" overflowY={"scroll"} w="full">
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
      >
        <Heading fontSize={"textSizeReg"}>Courses</Heading>
        <Box maxH="20vh" overflowY={"scroll"} w="full">
          <TableContainer w="full">
            <Table variant="simple" colorScheme="purple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>INSTRUCTOR</Th>
                  <Th>LAST MODIFIED</Th>
                  <Th>Modify</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Name</Td>
                  <Td>Name</Td>
                  <Td>Date</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </>
  );
}
