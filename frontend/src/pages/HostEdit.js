import React, { useState, useEffect } from 'react';
import { Box, VStack, Grid, Heading, Button, Stack, Link, Input, Text } from '@chakra-ui/react';
import jwt from 'jwt-decode';

function HostEdit() {
  const [nickname, setNickname] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    const nick = jwt(accessToken).nickname;
    setNickname(nick);
  }, []);

  useEffect(() => {
    const greetings = [
      '你想要我怎麼稱呼你呢？',
      '告訴我你的新名字吧！',
      '想換什麼酷名字嗎？',
      '我就知道你會想換掉那很鳥的暱稱！'
    ];
    const i = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[i]);
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={100}>
        <VStack spacing={8}>
          <Heading size="lg" fontSize="42px" m={7}>
            <Text as="span" color="blue">
              {nickname}
            </Text>
            ，{greeting}
          </Heading>
          <Input type="text" placeholder="新暱稱" w={300} textAlign="center" fontWeight={700} />
          <Stack direction="row" spacing={8} align="center" p={7}>
            <Button
              as={Link}
              href="/host/home"
              variant="ghost"
              size="lg"
              style={{ textDecoration: 'none' }}>
              先不用好了
            </Button>
            <Button
              // as={Link}
              // href="/host/home"
              isDisabled
              colorScheme="green"
              variant="solid"
              size="lg"
              style={{ textDecoration: 'none' }}>
              修改
            </Button>
          </Stack>
        </VStack>
      </Grid>
    </Box>
  );
}

export default HostEdit;
