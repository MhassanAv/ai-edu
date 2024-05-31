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
  useToast,
  Select,
  Spinner,
  FormErrorMessage,
} from "@chakra-ui/react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Courses() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const {
    isOpen: isOpenModify,
    onOpen: onOpenModify,
    onClose: onCloseModify,
  } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const [currCourse, SetCurrCourse] = useState("");

  const getTeachers = useQuery({
    queryKey: ["teachers"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/v1/admin/teachers"),
  });

  const queryClient = useQueryClient();

  const getCourses = useQuery({
    queryKey: ["courses"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/v1/admin/courses"),
  });

  const modifyCourse = useMutation({
    mutationKey: ["courses"],
    mutationFn: async (bodyData) =>
      await axios.post("http://localhost:3000/api/v1/admin/course", bodyData),
    onSuccess: () =>
      toast({
        title: "Modified",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
    onSettled: () => queryClient.invalidateQueries(["courses", "teachers"]),
  });

  const deleteCourse = useMutation({
    mutationKey: ["courses"],
    mutationFn: async (bodyData) =>
      await axios.delete("http://localhost:3000/api/v1/admin/course", {
        data: bodyData,
      }),
    onSuccess: () =>
      toast({
        title: "Deleted",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
    onSettled: () => queryClient.invalidateQueries(["courses", "teachers"]),
  });

  const toast = useToast();

  const ModifyModal = () => {
    const [currTeacher, setCurrTeacher] = useState("");
    return (
      <Modal isOpen={isOpenModify} onClose={onCloseModify}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Instractor</FormLabel>
              <Select
                placeholder="Instractor"
                onChange={(e) => setCurrTeacher(e.target.value)}
              >
                <option value={null}> None</option>
                {getTeachers.data?.data ? (
                  getTeachers.data?.data.map((teacher) => (
                    <option value={teacher._id}>{teacher.full_name}</option>
                  ))
                ) : (
                  <Spinner />
                )}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={() => {
                modifyCourse.mutate({ ...currCourse, teacher_id: currTeacher });
                onCloseModify();
              }}
            >
              Save
            </Button>
            <Button
              colorScheme={"red"}
              onClick={() => {
                deleteCourse.mutate({ ...currCourse });
                onCloseModify();
              }}
            >
              Delete Course
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const AddModal = () => {
    function onSubmit(values) {
      modifyCourse.mutate(values);
      onCloseAdd();
    }
    return (
      <Modal isOpen={isOpenAdd} onClose={onCloseAdd}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.level} isRequired>
              <FormLabel htmlFor="level">Course Level</FormLabel>
              <Input
                placeholder="Course Level"
                type="number"
                {...register("level", {
                  required: "This is required",
                  valueAsNumber: true,
                  max: { value: 1, message: "Maximum length should be 1" },
                })}
              />

              <FormErrorMessage>
                {errors.level && errors.level.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.subject_name} isRequired>
              <FormLabel htmlFor="subject_name">Course Name</FormLabel>
              <Input
                placeholder="Course Name"
                type="text"
                {...register("subject_name", {
                  required: "This is required",
                })}
              />

              <FormErrorMessage>
                {errors.subject_name && errors.subject_name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Instractor</FormLabel>
              <Select
                placeholder="Instractor"
                {...register("teacher_id", {
                  required: "This is required",
                })}
              >
                <option value={null}> None</option>
                {getTeachers.data?.data ? (
                  getTeachers.data?.data.map((teacher) => (
                    <option value={teacher._id}>{teacher.full_name}</option>
                  ))
                ) : (
                  <Spinner />
                )}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" type="submit" mr={3}>
              Save
            </Button>
            <Button onClick={onCloseAdd}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <ModifyModal />
      <AddModal />
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
        onClick={onOpenAdd}
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
                  <Th>Course</Th>
                  <Th>Level</Th>
                  <Th>Instractor</Th>
                  <Th> </Th>
                </Tr>
              </Thead>
              <Tbody>
                {getCourses.data?.data.map((course) => (
                  <Tr key={course.subject_id}>
                    <Th>{course.subject_name}</Th>
                    <Th>{course.level}</Th>
                    <Th>{course.teacher_name}</Th>
                    <Th>
                      <Button
                        onClick={() => {
                          SetCurrCourse(course);
                          onOpenModify();
                        }}
                      >
                        Edit
                      </Button>
                    </Th>
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
