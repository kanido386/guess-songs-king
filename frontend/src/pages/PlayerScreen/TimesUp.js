/* eslint-disable no-restricted-globals */

import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import { Box, VStack, Text, Grid, Heading } from '@chakra-ui/react';
import SocketContext from '../../context/socket';
import PlayerHeader from './components/PlayerHeader';
import PlayerFooter from './components/PlayerFooter';

function TimesUp(props) {
  const { setScreen, nickname, score, currentQuestion, numQuestions, qTypeName } = props;
  const socket = useContext(SocketContext);
  const [greeting, setGreeting] = useState('');
  const [standing, setStanding] = useState('?');

  useEffect(() => {
    const greetings = [
      '你是睡著了嗎？',
      '時間不等人，我們也不會等你啊！',
      '送出鍵很難找嗎？應該不難吧！'
    ];
    const i = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[i]);
  }, []);

  useEffect(() => {
    // TODO:
    // = next
    socket.on('send-standing', data => {
      setStanding(data.standing);
    });

    socket.on('ready', () => {
      setScreen(16);
    });

    socket.on('ready-podium', () => {
      setScreen(20);
    });
  }, [socket]);

  // eslint-disable-next-line no-restricted-globals
  const isMobile = screen.availHeight > screen.availWidth;
  if (isMobile) {
    return (
      <Box textAlign="center" fontSize="xl">
        <PlayerHeader
          currentQuestion={currentQuestion}
          totalQuestion={numQuestions}
          type={qTypeName}
        />
        <Grid minH="71vh" pt={50}>
          <VStack spacing={5} marginTop="5vh">
            <Text fontSize="50px">⌛️</Text>
            <Heading fontSize="36px">時間到！</Heading>
            {/* <Text fontSize="22px" bg="gray.100" pt={2} pr={5} pb={2} pl={5}>
              + 939
            </Text> */}
            <Text fontSize="15px" bg="gray.100" pt={2} pr={5} pb={2} pl={5}>
              {greeting}
            </Text>
            <Text fontSize="18px" color="yellow.600" pt={2} pr={5} pb={2} pl={5}>
              （目前暫居第 {standing} 名）
            </Text>
          </VStack>
        </Grid>
        <PlayerFooter nickname={nickname} hasScore score={score} />
      </Box>
    );
  }
  return (
    <Box textAlign="center" fontSize="xl">
      <PlayerHeader
        currentQuestion={currentQuestion}
        totalQuestion={numQuestions}
        type={qTypeName}
      />
      <Grid minH="80vh" p={50}>
        <VStack spacing={5} marginTop="11vh">
          <Text fontSize="50px">⌛️</Text>
          <Heading fontSize="36px">時間到！</Heading>
          {/* <Text fontSize="22px" bg="gray.100" pt={2} pr={5} pb={2} pl={5}>
            + 939
          </Text> */}
          <Text fontSize="22px" bg="gray.100" pt={2} pr={5} pb={2} pl={5}>
            {greeting}
          </Text>
          <Text fontSize="18px" color="yellow.600" pt={2} pr={5} pb={2} pl={5}>
            （目前暫居第 {standing} 名）
          </Text>
        </VStack>
      </Grid>
      <PlayerFooter nickname={nickname} hasScore score={score} />
    </Box>
  );
}

export default TimesUp;
