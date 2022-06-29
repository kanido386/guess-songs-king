/* eslint-disable no-restricted-globals */

import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import { Box, VStack, Text, Grid, Heading } from '@chakra-ui/react';
import SocketContext from '../../context/socket';
import PlayerHeader from './components/PlayerHeader';
import PlayerFooter from './components/PlayerFooter';

function ShowAnswer(props) {
  const { setScreen, nickname, score, currentQuestion, numQuestions, getScore } = props;
  const socket = useContext(SocketContext);
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

  useEffect(() => {
    // TODO:
    // = next
    socket.on('ready', () => {
      setScreen(16);
    });
  }, [socket]);

  return (
    <Box textAlign="center" fontSize="xl">
      <PlayerHeader
        currentQuestion={currentQuestion}
        totalQuestion={numQuestions}
        type="播一首歌"
      />
      <Grid minH="80vh" p={50}>
        <VStack spacing={5} marginTop="11vh">
          {/* <Heading fontSize="36px">正確</Heading> */}
          <Text fontSize="50px">❌</Text>
          <Heading fontSize="36px">{greeting}</Heading>
          {/* <Text fontSize="50px">✅</Text> */}

          {/* <Text fontSize="22px" bg="gray.100" pt={2} pr={5} pb={2} pl={5}>
            + 939
          </Text> */}
          <Text fontSize="22px" bg="gray.100" pt={2} pr={5} pb={2} pl={5}>
            + {getScore}
          </Text>
        </VStack>
      </Grid>
      <PlayerFooter nickname={nickname} hasScore score={score} />
    </Box>
  );
}

export default ShowAnswer;
