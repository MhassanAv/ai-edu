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
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";

export default function Payment() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [modalType, setModalType] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getPayments = useQuery({
    queryKey: ["payments"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/v1/admin/pay/level"),
  });

  const deletePayment = useMutation({
    mutationKey: ["payments"],
    mutationFn: async (bodyData) =>
      await axios.delete("http://localhost:3000/api/v1/admin/pay/level", {
        data: bodyData,
      }),
    onSuccess: () =>
      toast({
        title: "Payment Deleted",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
    onSettled: () => queryClient.invalidateQueries(["payments"]),
  });

  const addPayment = useMutation({
    mutationKey: ["payments"],
    mutationFn: async (bodyData) =>
      await axios.post(
        "http://localhost:3000/api/v1/admin/pay/level",
        bodyData
      ),
    onSuccess: () =>
      toast({
        title: "Payment Added",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
    onError: (e) => {
      toast({
        title: "Somthing went wrong",
        status: "error",
        description: e.response.data.error.msg,
        duration: 9000,
        isClosable: true,
      });
    },
    onSettled: () => queryClient.invalidateQueries(["payments"]),
  });

  const getMethods = useQuery({
    queryKey: ["methods"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/v1/admin/pay/method"),
  });

  const deleteMethod = useMutation({
    mutationKey: ["methods"],
    mutationFn: async (bodyData) =>
      await axios.delete("http://localhost:3000/api/v1/admin/pay/method", {
        data: bodyData,
      }),
    onSuccess: () =>
      toast({
        title: "Payment Deleted",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
    onSettled: () => queryClient.invalidateQueries(["methods"]),
  });

  const addMethod = useMutation({
    mutationKey: ["methods"],
    mutationFn: async (bodyData) =>
      await axios.post(
        "http://localhost:3000/api/v1/admin/pay/method",
        bodyData
      ),
    onSuccess: () =>
      toast({
        title: "Method Added",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
    onError: (e) => {
      toast({
        title: "Somthing went wrong",
        status: "error",
        description: e.response.data.error.msg,
        duration: 9000,
        isClosable: true,
      });
    },
    onSettled: () => queryClient.invalidateQueries(["methods"]),
  });

  const getHistory = useQuery({
    queryKey: ["history"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/v1/admin/pay/history"),
  });

  const submitPayment = useMutation({
    mutationKey: ["history"],
    mutationFn: async (bodyData) =>
      await axios.post(
        "http://localhost:3000/api/v1/admin/pay/history",
        bodyData
      ),
    onSuccess: () =>
      toast({
        title: "Payment Submitted",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
    onError: (e) => {
      toast({
        title: "Somthing went wrong",
        status: "error",
        description: e.response.data.error.msg,
        duration: 9000,
        isClosable: true,
      });
    },
    onSettled: () => queryClient.invalidateQueries(["methods"]),
  });

  const PaymentModal = ({ type }) => {
    function handlePayment(values) {
      addPayment.mutate(values);
      onClose();
    }
    function handleMethod(values) {
      addMethod.mutate(values);
      onClose();
    }
    return type == "method" ? (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleMethod)}>
          <ModalHeader>Add Method</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.account} isRequired>
              <FormLabel htmlFor="account">Account</FormLabel>
              <Input
                placeholder="Account"
                type="text"
                {...register("account", {
                  required: "This is required",
                })}
              />

              <FormErrorMessage>
                {errors.account && errors.account.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.name} isRequired>
              <FormLabel htmlFor="name">Type</FormLabel>
              <Select
                placeholder="Account Type"
                type="text"
                {...register("name", {
                  required: "This is required",
                })}
              >
                <option value={"vodafone cash"}>Vodafone Cash</option>
                <option value={"instapay"}>Instapay</option>
              </Select>

              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" type="submit" mr={3}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    ) : (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handlePayment)}>
          <ModalHeader>Add Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.level} isRequired>
              <FormLabel htmlFor="level">Level</FormLabel>
              <Input
                placeholder="Level"
                type="number"
                {...register("level", {
                  required: "This is required",
                  valueAsNumber: true,
                })}
              />

              <FormErrorMessage>
                {errors.level && errors.level.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.amount} isRequired>
              <FormLabel htmlFor="amount">Amount</FormLabel>
              <Input
                placeholder="Amount"
                type="nubmer"
                {...register("amount", {
                  required: "This is required",
                  valueAsNumber: true,
                })}
              />

              <FormErrorMessage>
                {errors.amount && errors.amount.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" type="submit" mr={3}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

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
          <Heading fontSize={"textSizeReg"}>Levels Details</Heading>
          <Box h="full" overflowY={"scroll"} w="full" position={"relative"}>
            <TableContainer w="full">
              <Table
                variant="simple"
                colorScheme="purple"
                w="full"
                layout="fixed"
              >
                <Thead>
                  <Tr>
                    <Th>Level</Th>
                    <Th>Price</Th>
                    <Th>Modify</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {getPayments.data?.data
                    .sort((a, b) => a.level - b.level)
                    .map((payment, index) => (
                      <Tr key={payment.amount + index}>
                        <Td>{payment.level}</Td>
                        <Td>{payment.amount}</Td>
                        <Td>
                          <Button
                            colorScheme={"red"}
                            onClick={() =>
                              deletePayment.mutate({ level: payment.level })
                            }
                          >
                            <FaTrash />
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Button
            onClick={() => {
              setModalType("pay"), onOpen();
            }}
            isLoading={addPayment.isPending || deletePayment.isPending}
            h="4rem"
          >
            Add | Edit
          </Button>
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
                  {getMethods.data?.data.map((method, index) => (
                    <Tr key={method.account + index}>
                      <Td>{method.name}</Td>
                      <Td>{method.account}</Td>
                      <Td>
                        <Button
                          colorScheme={"red"}
                          onClick={() =>
                            deleteMethod.mutate({ name: method.name })
                          }
                        >
                          <FaTrash />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Button
            onClick={() => {
              setModalType("method"), onOpen();
            }}
            isLoading={addMethod.isPending || deleteMethod.isPending}
            h="4rem"
          >
            Add | Edit
          </Button>
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
                {getHistory.data?.data.map((history) => (
                  <Tr key={history.user_id}>
                    <Td>{history.level}</Td>
                    <Td>{history.name}</Td>
                    <Td>{history.national_id}</Td>
                    <Td>{history.paid_from}</Td>
                    <Td>{history.method}</Td>
                    <Td>{new Date(history.date).toDateString()}</Td>
                    <Td>
                      <Button
                        colorScheme={"green"}
                        onClick={() =>
                          submitPayment.mutate({ user_id: history.user_id })
                        }
                      >
                        Submit
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
      <PaymentModal type={modalType} />
    </>
  );
}
