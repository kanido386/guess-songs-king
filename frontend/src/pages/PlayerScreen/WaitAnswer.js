/* eslint-disable no-restricted-globals */

import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import { Box, VStack, Text, Grid, Spinner } from '@chakra-ui/react';
import PlayerHeader from './components/PlayerHeader';
import PlayerFooter from './components/PlayerFooter';

function WaitAnswer() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const greetings = [
      '難道你就是那位傳說中的猜歌之神？',
      '休息一下吧！',
      '你確定有想清楚再送出嗎？'
    ];
    const i = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[i]);
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <PlayerHeader number="1/5" type="播一首歌" />
      <Grid minH="80vh" p={50}>
        <VStack spacing={5} marginTop="25vh">
          <Spinner thickness="11px" speed="1s" emptyColor="gray.200" color="blue.500" size="xl" />
          <Text fontSize="22px">{greeting}</Text>
        </VStack>
      </Grid>
      {/* TODO: */}
      <PlayerFooter nickname="這邊是玩家的暱稱" hasScore score="100" />
    </Box>
  );
}

export default WaitAnswer;
