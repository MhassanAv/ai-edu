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
} from "@chakra-ui/react";
import { HiOutlineDocumentAdd } from "react-icons/hi";

export default function Courses() {
  return (
    <>
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
      >
        <Icon
          bg="prim"
          as={HiOutlineDocumentAdd}
          rounded="full"
          boxSize={"3rem"}
          p="0.5rem"
        />
        <Heading fontSize={"sm"}>Add A New File</Heading>
      </Center>
      <VStack
        w="full"
        align={"start"}
        rounded={"2rem"}
        boxShadow={"lg"}
        p="2rem"
        bg={useColorModeValue("white", "gray.800")}
      >
        <Heading fontSize={"textSizeReg"}>Courses</Heading>
        <Box maxH="50vh" h="auto" overflowY={"scroll"} w="full">
          <TableContainer w="full">
            <Table variant="simple" colorScheme="purple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>INSTRUCTOR</Th>
                  <Th>LAST MODIFIED</Th>
                  <Th>SIZE</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Name</Td>
                  <Td>Name</Td>
                  <Td>Date</Td>
                  <Td>2.8 MB</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </>
  );
}
