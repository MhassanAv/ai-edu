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
  Box

} from "@chakra-ui/react";


export default function Members() {

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
          <Heading fontSize={'textSizeReg'}>Students</Heading>
          <Box maxH="20vh" overflowY={"scroll"} w="full">
            <TableContainer w="full">
              <Table variant="simple" colorScheme="purple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Level</Th>
                    <Th>EMAIL</Th>
                    <Th>Modify</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Mohamed</Td>
                    <Td>1</Td>
                    <Td>mohamed@email.com</Td>
                    <Td>Activate</Td>
                  </Tr>
                  <Tr>
                    <Td>Mohamed</Td>
                    <Td>1</Td>
                    <Td>mohamed@email.com</Td>
                    <Td>Activate</Td>
                  </Tr>
                  <Tr>
                    <Td>Mohamed</Td>
                    <Td>1</Td>
                    <Td>mohamed@email.com</Td>
                    <Td>Activate</Td>
                  </Tr>
                  <Tr>
                    <Td>Mohamed</Td>
                    <Td>1</Td>
                    <Td>mohamed@email.com</Td>
                    <Td>Activate</Td>
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
          <Heading fontSize={'textSizeReg'}>Instructors</Heading>
          <Box maxH="20vh" overflowY={"scroll"} w="full">
            <TableContainer w="full">
              <Table variant="simple" colorScheme="purple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Level</Th>
                    <Th>EMAIL</Th>
                    <Th>Modify</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Mohamed</Td>
                    <Td>1</Td>
                    <Td>mohamed@email.com</Td>
                    <Td>Activate</Td>
                  </Tr>
                  <Tr>
                    <Td>Mohamed</Td>
                    <Td>1</Td>
                    <Td>mohamed@email.com</Td>
                    <Td>Activate</Td>
                  </Tr>
                  <Tr>
                    <Td>Mohamed</Td>
                    <Td>1</Td>
                    <Td>mohamed@email.com</Td>
                    <Td>Activate</Td>
                  </Tr>
                  <Tr>
                    <Td>Mohamed</Td>
                    <Td>1</Td>
                    <Td>mohamed@email.com</Td>
                    <Td>Activate</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
        </>
  );
}
