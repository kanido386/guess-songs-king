/* eslint-disable no-restricted-globals */

import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import { Box, VStack, Text, Grid, Heading } from '@chakra-ui/react';
import PlayerHeader from './components/PlayerHeader';
import PlayerFooter from './components/PlayerFooter';

function ShowAnswer() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const greetings = [
      '加加油啊！',
      '以你這個猜歌技巧，你不常聽歌齁？',
      '笑死，我阿嬤都比你會猜！'
    ];
    const i = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[i]);
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <PlayerHeader number="1/5" type="播一首歌" />
      <Grid minH="80vh" p={50}>
        <VStack spacing={5} marginTop="11vh">
          {/* <Heading fontSize="36px">正確</Heading> */}
          <Heading fontSize="36px">不正確</Heading>
          {/* <Text fontSize="50px">✅</Text> */}
          <Text fontSize="50px">❌</Text>
          {/* <Text fontSize="22px" bg="gray.100" pt={2} pr={5} pb={2} pl={5}>
            + 939
          </Text> */}
          <Text fontSize="22px" bg="gray.100" pt={2} pr={5} pb={2} pl={5}>
            {greeting}
          </Text>
        </VStack>
      </Grid>
      {/* TODO: */}
      <PlayerFooter nickname="這邊是玩家的暱稱" hasScore score="100" />
    </Box>
  );
}

export default ShowAnswer;
