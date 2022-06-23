import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { REACT_APP_BACKEND_URL } = process.env;

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);

  async function signin() {
    if (!check) {
      alert('你忘記簽到囉！');
      return;
    }
    try {
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/api/v1/host/signin`, {
        email,
        password
      });
      localStorage.setItem('accessToken', response.data.host.accessToken);
      navigate('/host/home');
    } catch (error) {
      // console.log(error);
      alert('你是誰？我不認識你！');
    }
  }

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">你是誰？</Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8} w={380}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>電子郵件地址</FormLabel>
              <Input type="email" onChange={event => setEmail(event.currentTarget.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>密碼</FormLabel>
              <Input type="password" onChange={event => setPassword(event.currentTarget.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                mt={3}
                align="start"
                justify="space-between">
                <Checkbox onChange={event => setCheck(event.currentTarget.checked)}>
                  記得按指紋簽到
                </Checkbox>
                {/* <Link color="blue.400" href="/">
                  忘記密碼了嗎？
                </Link> */}
              </Stack>
              <Button
                onClick={signin}
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500'
                }}>
                登入
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align="center">
                初次見面？{' '}
                <Link color="blue.400" href="/signup">
                  註冊
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
