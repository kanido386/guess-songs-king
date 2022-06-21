import React, { useState, useEffect } from 'react';
import { Box, VStack, Grid, Heading, Button, Stack, Link } from '@chakra-ui/react';

function HostHome() {
  const [nickname, setNickname] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // TODO: Get host nickname from API
    setNickname('說話做到');
  }, []);

  useEffect(() => {
    const greetings = [
      '吃飽了沒？',
      '好久不見！',
      '今天還行嗎？',
      '你好啊！',
      '你來得正是時候！',
      '準備好來場酷趴踢了嗎？'
    ];
    const i = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[i]);
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={100}>
        <VStack spacing={8}>
          <Heading size="lg" fontSize="50px" m={7}>
            {nickname}，{greeting}
          </Heading>
          <Stack direction="row" spacing={8} align="center">
            <Button
              as={Link}
              href="/setting"
              colorScheme="teal"
              variant="outline"
              size="lg"
              style={{ textDecoration: 'none' }}>
              設定
            </Button>
            <Button
              as={Link}
              href="/party/manage"
              colorScheme="teal"
              variant="solid"
              size="lg"
              style={{ textDecoration: 'none' }}>
              我的歌曲集
            </Button>
            {/* TODO: Do logout thing */}
            <Button
              as={Link}
              href="/"
              colorScheme="teal"
              variant="outline"
              size="lg"
              style={{ textDecoration: 'none' }}>
              登出
            </Button>
          </Stack>
        </VStack>
      </Grid>
    </Box>
  );
}

export default HostHome;
