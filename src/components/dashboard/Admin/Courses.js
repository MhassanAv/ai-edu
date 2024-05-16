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
  useEditableControls,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Input,
  Flex,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { MdCheck, MdClose, MdEdit } from "react-icons/md";

export default function Courses() {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<MdCheck />} {...getSubmitButtonProps()} />
        <IconButton icon={<MdClose />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <Button size="sm" righIcon={<MdEdit />} {...getEditButtonProps()}>
          Edit
        </Button>
      </Flex>
    );
  }

  const EditComponent = ({ value }) => {
    return (
      <Editable
        textAlign="center"
        defaultValue={value}
        isPreviewFocusable={false}
      >
        <EditablePreview />
        <Input as={EditableInput} />
      </Editable>
    );
  };

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
                  <Td>
                    <EditComponent value={"1"} />
                  </Td>
                  <Td>
                    <EditComponent value={"Physics"} />
                  </Td>
                  <Td>
                    <EditComponent value={3} />
                  </Td>
                  <Td>
                    <EditComponent value={"dr/osama"} />
                  </Td>
                  <Td>
                    <Editable>
                      <Button as={EditableControls}>Edit</Button>
                    </Editable>
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
