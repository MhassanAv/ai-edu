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
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Payment() {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const getPayments = useQuery({
    queryKey: ["payments"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/v1/admin/payment"),
  });

  const deletePayment = useMutation({
    mutationKey: ["payments"],
    mutationFn: async (bodyData) =>
      await axios.delete("http://localhost:3000/api/v1/admin/payment", {
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
      await axios.post("http://localhost:3000/api/v1/admin/payment", bodyData),
    onSuccess: () =>
      toast({
        title: "Payment Added",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
    onSettled: () => queryClient.invalidateQueries(["payments"]),
  });

  const AddModal = () => {
    function onSubmit(values) {
      addPayment.mutate(values);
      onCloseAdd();
    }
    return (
      <Modal isOpen={isOpenAdd} onClose={onCloseAdd}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
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

            <FormControl mt={4}>
              <FormLabel>Vodafone Cash</FormLabel>
              <Input
                placeholder="Vodafone Cash"
                type="text"
                {...register("vodafoneCash", {
                  required: "This is required",
                })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>InstaPay</FormLabel>
              <Input
                placeholder="InstaPay"
                type="text"
                {...register("instaPay", {
                  required: "This is required",
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" type="submit" mr={3}>
              Add
            </Button>
            <Button onClick={onCloseAdd}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <AddModal />
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
          <Box h="full" overflowY={"scroll"} w="full" position={"relative"}>
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
                  {getPayments.data?.data.map((payment, index) => (
                    <Tr key={payment.amount + index}>
                      <Td>{payment.level}</Td>
                      <Td>{payment.amount}</Td>
                      <Td w="full">
                        <Button
                          onClick={() =>
                            deletePayment.mutate({ level: payment.level })
                          }
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Button onClick={onOpenAdd} h="4rem">
            Add Payment
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
