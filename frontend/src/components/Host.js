import React from 'react';
import { Box, VStack, Grid, Heading, Button, Stack, Link } from '@chakra-ui/react';

function Host() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={100}>
        <VStack spacing={8}>
          <Heading size="lg" fontSize="75px" m={7}>
            嗨，遊戲主持人！
          </Heading>
          <Stack direction="row" spacing={8} align="center">
            <Button
              as={Link}
              href="/signin"
              colorScheme="teal"
              variant="outline"
              size="lg"
              style={{ textDecoration: 'none' }}>
              登入
            </Button>
            <Button
              as={Link}
              href="/signup"
              colorScheme="teal"
              variant="ghost"
              size="lg"
              style={{ textDecoration: 'none' }}>
              註冊
            </Button>
          </Stack>
          <Box pt={50}>
            <Link color="yellow.700" href="/" fontSize="18px">
              拍謝，回上一步，其實我是玩家 XD
            </Link>
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
}

export default Host;
