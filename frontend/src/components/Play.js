import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue
} from '@chakra-ui/react';

export default function Play() {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="5xl">猜歌我最強！</Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8} w={360}>
          <Stack spacing={4}>
            <FormControl id="pin">
              <Input type="text" placeholder="遊戲 PIN 碼" textAlign="center" fontWeight={700} />
            </FormControl>
            <Stack spacing={10}>
              <Button
                as={Link}
                href="/play/game"
                style={{ textDecoration: 'none' }}
                bg="gray.700"
                color="white"
                _hover={{
                  bg: 'gray.600'
                }}>
                輸入
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Box textAlign="center" pt={11}>
          <Link color="yellow.700" href="/" fontSize="18px">
            我想當遊戲主持人
          </Link>
        </Box>
      </Stack>
    </Flex>
  );
}
