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

export default function Payment() {
  return (
    <>
      <HStack w="full" maxH="30vh" spacing={"2rem"}>
        <VStack
          w="full"
          align={"start"}
          rounded={"2rem"}
          boxShadow={"lg"}
          p="2rem"
          h="full"
          bg={useColorModeValue("white", "gray.800")}
        >
          <Heading fontSize={"textSizeReg"}>Payment Details</Heading>
          <Box maxH="20vh" overflowY={"scroll"} w="full">
            <TableContainer w="full">
              <Table variant="simple" colorScheme="purple">
                <Thead>
                  <Tr>
                    <Th>Level</Th>
                    <Th>Price</Th>
                    <Th>Modify</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>1</Td>
                    <Td>VALUE</Td>
                    <Td w="full">Activate</Td>
                  </Tr>
                  <Tr>
                    <Td>1</Td>
                    <Td>VALUE</Td>
                    <Td w="full">Activate</Td>
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
          h="full"
          bg={useColorModeValue("white", "gray.800")}
        >
          <Heading fontSize={"textSizeReg"}>Payment Methods</Heading>
          <Box maxH="20vh" overflowY={"scroll"} w="full">
            <TableContainer w="full">
              <Table variant="simple" colorScheme="purple">
                <Thead>
                  <Tr>
                    <Th>Method</Th>
                    <Th>Details</Th>
                    <Th>Modify</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Vodafone Cash</Td>
                    <Td>+20100000000</Td>
                    <Td>Delete</Td>
                  </Tr>
                  <Tr>
                    <Td>Vodafone Cash</Td>
                    <Td>+20100000000</Td>
                    <Td>Delete</Td>
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
        <Heading fontSize={"textSizeReg"}>History</Heading>
        <Box maxH="20vh" overflowY={"scroll"} w="full">
          <TableContainer w="full">
            <Table variant="simple" colorScheme="purple">
              <Thead>
                <Tr>
                  <Th>Level</Th>
                  <Th>Name</Th>
                  <Th>National ID</Th>
                  <Th>Paid From</Th>
                  <Th>Method</Th>
                  <Th>Date</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>Mohamed</Td>
                  <Td>30001234123412</Td>
                  <Td>E-Wallet Number</Td>
                  <Td>Vodafone Cash</Td>
                  <Td>DD/MM/YY</Td>
                  <Td color="red">Submit</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Mohamed</Td>
                  <Td>30001234123412</Td>
                  <Td>E-Wallet Number</Td>
                  <Td>Vodafone Cash</Td>
                  <Td>DD/MM/YY</Td>
                  <Td color="red">Submit</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </>
  );
}
