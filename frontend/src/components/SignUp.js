/* eslint-disable no-shadow */

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
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

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
              <Input type="text" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>電子郵件地址</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>密碼</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
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
                loadingText="Submitting"
                size="lg"
                style={{ textDecoration: 'none' }}
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
