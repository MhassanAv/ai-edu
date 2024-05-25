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
} from "@chakra-ui/react";
import { HiOutlineDocumentAdd } from "react-icons/hi";

export default function Courses() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const FormModal = () => (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={4}>
            <FormLabel>Course</FormLabel>
            <Input placeholder="Course" />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Level</FormLabel>
            <Input placeholder="Level" />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Instractor</FormLabel>
            <Input placeholder="Instractor" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="purple" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <>
      <FormModal />
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
        <Heading fontSize={"sm"}>Add A New Course</Heading>
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
                  <Th>Code</Th>
                  <Th>Course</Th>
                  <Th>Level</Th>
                  <Th>Instractor</Th>
                  <Th> </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>Physics</Td>
                  <Td>1</Td>
                  <Td>Name</Td>
                  <Td>
                    <Button onClick={onOpen}>Edit</Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </>
  );
}
