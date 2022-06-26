/* eslint-disable no-shadow */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';

const { REACT_APP_BACKEND_URL } = process.env;

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async () => {
    try {
      // https://stackoverflow.com/questions/48378337/create-react-app-not-picking-up-env-files
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/api/v1/host/signup`, {
        nickname,
        email,
        password
      });
      // console.log(response);
      // alert(response.data.host.accessToken);
      localStorage.setItem('accessToken', response.data.host.accessToken);
      navigate('/host/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="3xl" textAlign="center">
            成為帥氣的遊戲主持人吧！
          </Heading>
        </Stack>
        <Box rounded="xl" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8} w={450}>
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>暱稱</FormLabel>
              <Input type="text" onChange={event => setNickname(event.currentTarget.value)} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>電子郵件地址</FormLabel>
              <Input type="email" onChange={event => setEmail(event.currentTarget.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>密碼</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  onChange={event => setPassword(event.currentTarget.value)}
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    onClick={() => setShowPassword(showPassword => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={signup}
                loadingText="Submitting"
                size="lg"
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500'
                }}>
                註冊
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align="center">
                已經註冊過了嗎？{' '}
                <Link color="blue.400" href="/signin">
                  登入
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignUp;
