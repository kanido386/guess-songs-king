import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, VStack, Grid, Heading, Button, Stack, Link, Text } from '@chakra-ui/react';
import jwt from 'jwt-decode';

function HostHome() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const nick = jwt(accessToken).nickname;
    setNickname(nick);
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

  async function logout() {
    try {
      localStorage.removeItem('accessToken');
      alert('哈囉你好嗎？衷心感謝。珍重再見！期待再相逢～');
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('發生不明錯誤⋯⋯');
    }
  }

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={100}>
        <VStack spacing={8}>
          <Heading size="lg" fontSize="50px" m={7}>
            <Text as="span" color="blue">
              {nickname}
            </Text>
            ，{greeting}
          </Heading>
          <Stack direction="row" spacing={8} align="center">
            <Button
              as={Link}
              href="/host/edit"
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
            <Button onClick={logout} colorScheme="teal" variant="outline" size="lg">
              登出
            </Button>
          </Stack>
        </VStack>
        <Box textAlign="center" pt={11}>
          <Link color="yellow.700" href="/" fontSize="18px">
            我想當玩家
          </Link>
        </Box>
      </Grid>
    </Box>
  );
}

export default HostHome;
