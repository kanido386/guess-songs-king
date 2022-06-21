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

export default function SignIn() {
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
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>密碼</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                mt={3}
                align="start"
                justify="space-between">
                <Checkbox>記住我</Checkbox>
                {/* <Link color="blue.400" href="/">
                  忘記密碼了嗎？
                </Link> */}
              </Stack>
              <Button
                as={Link}
                href="/host/home"
                style={{ textDecoration: 'none' }}
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
