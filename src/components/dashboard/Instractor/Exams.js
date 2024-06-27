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
  Spinner,
  FormErrorMessage,
  Select,
  useToast,
} from "@chakra-ui/react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useStore from "@/lib/store";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";

export default function Exams() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [qnum, setQnum] = useState(0);
  console.log(qnum);
  const queryClient = useQueryClient();
  const { user } = useStore();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const getCourses = useQuery({
    queryKey: ["courses"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/v1/teacher/courses", {
        params: { user_id: user.user_id },
      }),
  });

  const getExams = useQuery({
    queryKey: ["exams"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/v1/teacher/exam", {
        params: { user_id: user.user_id },
      }),
  });
  console.log(getExams.data?.data);

  const uploadExam = useMutation({
    mutationKey: ["exams"],
    mutationFn: async (bodyData) =>
      await axios.post("http://localhost:3000/api/v1/teacher/exam", bodyData),
    onSuccess: () =>
      toast({
        title: "Modified",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
    onSettled: () => queryClient.invalidateQueries(["exams"]),
  });

  const deleteExam = useMutation({
    mutationKey: ["exams"],
    mutationFn: async (bodyData) =>
      await axios.delete("http://localhost:3000/api/v1/teacher/exam", {
        data: bodyData,
      }),
    onSuccess: () =>
      toast({
        title: "Modified",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
    onSettled: () => queryClient.invalidateQueries(["exams"]),
  });

  const toast = useToast();

  const AddModal = () => {
    function onSubmit(values) {
      let questions = [];
      for (let i = 1; i <= qnum; i++) {
        let formQuestions = values;
        let currentQuestion = {
          questionText: "",
          options: [],
          correctOptionIndex: null,
        };
        currentQuestion.questionText = Object.keys(formQuestions)
          .filter(
            (objKey) =>
              objKey.includes("q" + i) &&
              !objKey.includes("q" + i + "a") &&
              !objKey.includes("q" + i + "correct")
          )
          .reduce((newObj, key) => {
            return formQuestions[key];
          }, {});
        currentQuestion.options = Object.keys(formQuestions)
          .filter(
            (objKey) =>
              objKey.includes("q" + i + "a") &&
              !objKey.includes("q" + i + "correct")
          )
          .map((item) => formQuestions[item]);
        currentQuestion.correctOptionIndex =
          formQuestions[
            Object.keys(formQuestions).filter(
              (objKey) =>
                !objKey.includes("q" + i + "a") &&
                objKey.includes("q" + i + "correct")
            )
          ];
        questions.push(currentQuestion);
      }
      let filteredValues = values;
      filteredValues = Object.keys(values)
        .filter((objKey) => !objKey.includes("q"))
        .reduce((newObj, key) => {
          newObj[key] = filteredValues[key];
          return newObj;
        }, {});

      const subjectLevel = getCourses.data?.data.filter(
        (item) => item.subject_id === filteredValues.subject_id
      )[0].level;
      uploadExam.mutate({
        ...filteredValues,
        teacher_id: user.user_id,
        startAt: new Date().toISOString(),
        level: subjectLevel,
        questions: questions,
      });
      console.log({
        ...filteredValues,
        teacher_id: user.user_id,
        startAt: new Date().toISOString(),
        level: subjectLevel,
        questions: questions,
      });

      onClose();
    }
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter={"blur(20px)"} />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)} maxH="70vh">
          <ModalHeader>New Exam</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} maxH="70vh" overflowY={"scroll"}>
            <FormControl isInvalid={errors.title} isRequired>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                placeholder="title"
                {...register("title", {
                  required: "This is required",
                })}
              />

              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={errors.subject_id} isRequired>
              <FormLabel>Course</FormLabel>
              <Select
                placeholder="Select a Course"
                {...register("subject_id", {
                  required: "This is required",
                })}
              >
                {getCourses.data?.data.map((teacherCourse) => (
                  <option
                    key={teacherCourse.subject_id}
                    value={teacherCourse.subject_id}
                  >
                    {teacherCourse.subject_name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isInvalid={errors.duration} isRequired>
              <FormLabel htmlFor="duration">Duration</FormLabel>
              <Input
                placeholder="duration"
                type="number"
                {...register("duration", {
                  required: "This is required",
                  valueAsNumber: true,
                })}
              />

              <FormErrorMessage>
                {errors.duration && errors.duration.message}
              </FormErrorMessage>
            </FormControl>
            <Heading fontSize={"md"} my="1rem">
              Questions
            </Heading>
            <Button
              colorScheme={"purple"}
              onClick={() => setQnum((prev) => prev + 1)}
              w="full"
              my="0.5rem"
            >
              Add A New Question
            </Button>
            {Array.from({ length: qnum }, (_, i) => i + 1).map((item) => (
              <>
                <FormControl isInvalid={errors["q" + item]} isRequired>
                  <FormLabel htmlFor={`q${item}`}>
                    {"question" + item}
                  </FormLabel>
                  <Input
                    placeholder="question"
                    {...register(`q${item}`, {
                      required: "This is required",
                    })}
                  />

                  <FormErrorMessage>
                    {errors["q" + item] && errors["q" + item].message}
                  </FormErrorMessage>
                </FormControl>

                {/* answers */}
                <FormControl isInvalid={errors["q" + item + "a1"]} isRequired>
                  <FormLabel htmlFor={`q${item}a1`}>{"Answer 1"}</FormLabel>
                  <Input
                    placeholder="question"
                    {...register(`q${item}a1`, {
                      required: "This is required",
                    })}
                  />

                  <FormErrorMessage>
                    {errors["q" + item + "a1"] &&
                      errors["q" + item + "a1"].message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors["q" + item + "a2"]} isRequired>
                  <FormLabel htmlFor={`q${item}a2`}>{"Answer 2"}</FormLabel>
                  <Input
                    placeholder="question"
                    {...register(`q${item}a2`, {
                      required: "This is required",
                    })}
                  />

                  <FormErrorMessage>
                    {errors["q" + item + "a2"] &&
                      errors["q" + item + "a2"].message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors["q" + item + "a3"]} isRequired>
                  <FormLabel htmlFor={`q${item}a3`}>{"Answer 3"}</FormLabel>
                  <Input
                    placeholder="question"
                    {...register(`q${item}a3`, {
                      required: "This is required",
                    })}
                  />

                  <FormErrorMessage>
                    {errors["q" + item + "a3"] &&
                      errors["q" + item + "a3"].message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors["q" + item + "a4"]} isRequired>
                  <FormLabel htmlFor={`q${item}a4`}>{"Answer 4"}</FormLabel>
                  <Input
                    placeholder="question"
                    {...register(`q${item}a4`, {
                      required: "This is required",
                    })}
                  />

                  <FormErrorMessage>
                    {errors["q" + item + "a4"] &&
                      errors["q" + item + "a4"].message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={errors["q" + item + "correct"]}
                  isRequired
                >
                  <FormLabel htmlFor={`q${item}correct`}>
                    {"Correct Answer"}
                  </FormLabel>
                  <Input
                    placeholder="correct"
                    type="number"
                    {...register(`q${item}correct`, {
                      required: "This is required",
                      valueAsNumber: true,
                    })}
                  />

                  <FormErrorMessage>
                    {errors["q" + item + "correct"] &&
                      errors["q" + item + "correct"].message}
                  </FormErrorMessage>
                </FormControl>
              </>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" type="submit" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
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
        onClick={onOpen}
      >
        <Icon
          bg="prim"
          as={HiOutlineDocumentAdd}
          rounded="full"
          boxSize={"3rem"}
          p="0.5rem"
        />
        <Heading fontSize={"sm"}>Create A New Exam</Heading>
      </Center>
      <VStack
        w="full"
        align={"start"}
        rounded={"2rem"}
        boxShadow={"lg"}
        p="2rem"
        bg={useColorModeValue("white", "gray.800")}
      >
        <Heading fontSize={"textSizeReg"}>Exams</Heading>
        <Box maxH="50vh" h="auto" overflowY={"scroll"} w="full">
          <TableContainer w="full">
            <Table variant="simple" colorScheme="purple">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Exam</Th>
                  <Th>Date</Th>
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
                    <Tr key={exam.subject_id}>
                      <Td>{index + 1}</Td>
                      <Td w="max-content">
                        {
                          getCourses.data?.data.filter(
                            (item) => item.subject_id === exam.subject_id
                          )[0].subject_name
                        }
                      </Td>
                      <Td w="max-content">
                        {new Date(exam.startAt).toDateString()}
                      </Td>

                      <Td>{exam.level}</Td>
                      <Td>
                        <Button
                          colorScheme={"red"}
                          onClick={() =>
                            deleteExam.mutate({
                              exam_id: exam._id,
                            })
                          }
                        >
                          <FaTrash />
                        </Button>
                      </Td>
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
