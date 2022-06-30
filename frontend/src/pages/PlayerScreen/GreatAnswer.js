/* eslint-disable no-restricted-globals */

import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import { Box, VStack, Text, Grid, Heading } from '@chakra-ui/react';
import SocketContext from '../../context/socket';
import PlayerHeader from './components/PlayerHeader';
import PlayerFooter from './components/PlayerFooter';

function GreatAnswer(props) {
  const { setScreen, nickname, score, currentQuestion, numQuestions, getScore } = props;
  const socket = useContext(SocketContext);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const greetings = [
      '不錯唷！',
      '你好像有點料啊！',
      '離猜歌之神的距離又更進一步啦！',
      '那麼厲害，確定不是猜歌系出來的？'
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

    socket.on('ready-podium', () => {
      setScreen(20);
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
          <Text fontSize="50px">✅</Text>
          <Heading fontSize="36px">+ {getScore}</Heading>
          <Text fontSize="22px" bg="gray.100" pt={2} pr={5} pb={2} pl={5}>
            {greeting}
          </Text>
          {/* <Text fontSize="22px" bg="gray.100" pt={2} pr={5} pb={2} pl={5}>
            {greeting}
          </Text> */}
        </VStack>
      </Grid>
      <PlayerFooter nickname={nickname} hasScore score={score} />
    </Box>
  );
}

export default GreatAnswer;
