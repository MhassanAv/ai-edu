import {
  Center,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
  Button,
  Image,
  Text,
  IconButton,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDarkMode,MdLightMode } from "react-icons/md";
import { useForm } from 'react-hook-form'
import NextLink from 'next/link'
export default function login() {
  const [isHidden, setIsHidden] = useState(true);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const { colorMode, toggleColorMode } = useColorMode()

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve()
      }, 3000)
    })
  }

  return (
    <Center w="full" h="100vh" as="main" >
      <Center
        h="10vh"
        w="full"
        bg="white"
        position={"absolute"}
        top="0"
        boxShadow={"lg"}
        bgColor={useColorModeValue("white","gray.800")}
      >
        <Image filter={useColorModeValue("none","invert(1)")} src={"../logo.svg"} maxW='60px' boxSize={'60px'} alt="AI-EDU" />
        <IconButton onClick={toggleColorMode} position={'absolute'} right='3rem'>{colorMode==='dark'?<MdDarkMode/>:<MdLightMode/>}</IconButton>
      </Center>
      <VStack
        align={"center"}
        justifyContent={"center"}
        gap="2.5rem"
        as="form"
        px="1.5rem"
        py='2rem'
        
        onSubmit={handleSubmit(onSubmit)}
      >
        <VStack>
          <Heading>Welcome Back!</Heading>
          <Text textAlign={'center'}>Enter your Credentials to access your account</Text>
        </VStack>
        <FormControl variant="floating" isInvalid={errors.email} isRequired>
          <Input placeholder=" " type="email"   {...register('email', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}/>
          <FormLabel htmlFor='email' bgColor={useColorModeValue("bg !important","black !important")}>
            Email address or user name
          </FormLabel>
          <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
        </FormControl>

        <FormControl variant="floating" pos="relative" isInvalid={errors.pass} isRequired>
          <Button
            color="textLight"
            variant={"unstyled"}
            bg="none"
            rightIcon={isHidden ? <FaEye /> : <FaEyeSlash />}
            onClick={()=>setIsHidden(prev=>!prev)}
            position={'absolute'}
            right='0'
            top='-2rem'
            display='flex'
            align='center'
            justifyContent={'center'}
            opacity={'0.7'}
            pb='0.5rem'
            fontSize={'xs'}
          >
            {isHidden ? "Show" : "Hide"}
          </Button>
          <Input
            placeholder=" "
            type={isHidden ? "password" : "text"}
            {...register('pass', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })}
          />
          <FormLabel bgColor={useColorModeValue("bg !important","black !important")} htmlFor='pass'>Password</FormLabel>
          <FormErrorMessage>
          {errors.pass && errors.pass.message}
        </FormErrorMessage>
        </FormControl>
        <Button isLoading={isSubmitting} type='submit' py="1rem" w="full" bg="prim" color="white" rounded="full">
          Log in
        </Button>
        <Divider borderColor="textLight" w="full" />
        <Heading fontSize={'xl'}>Don’t have an account?</Heading>
        <Button as={NextLink}  href={'/register'} py="1rem" w="full" bg="none" border={'1.5px solid'} borderColor={useColorModeValue('black','white')} color={useColorModeValue('black','white')} rounded="full">
          Sign up
        </Button>
      </VStack>
    </Center>
  );
}
