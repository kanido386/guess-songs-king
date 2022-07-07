/* eslint-disable no-restricted-globals */

import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import { Box, VStack, Text, Grid, Spinner } from '@chakra-ui/react';
import SocketContext from '../../context/socket';
import PlayerHeader from './components/PlayerHeader';
import PlayerFooter from './components/PlayerFooter';

function WaitAnswer(props) {
  const {
    setScreen,
    nickname,
    score,
    setScore,
    currentQuestion,
    numQuestions,
    setGetScore,
    qTypeName
  } = props;
  const socket = useContext(SocketContext);
  const [greeting, setGreeting] = useState('');
  const [result, setResult] = useState('');
  const [tempScore, setTempScore] = useState(-1);

  useEffect(() => {
    const greetings = [
      '難道你就是那位傳說中的猜歌之神？',
      '休息一下吧！',
      '你確定有想清楚再送出嗎？'
    ];
    const i = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[i]);
  }, []);

  // useEffect(() => {
  //   // TODO:
  //   socket.on('done', () => {
  //     setScreen(19);
  //   });
  // }, [socket]);

  useEffect(() => {
    // 因為一開始的 tempScore 為 -1，補償一下！
    setScore(prevScore => prevScore + 1);
  }, []);

  // FIXME:
  useEffect(() => {
    setScore(prevScore => prevScore + tempScore);
    if (result === 'nice') {
      console.log('setScreen(22)');
      setScreen(22);
    } else if (result === 'bad') {
      console.log('setScreen(19)');
      setScreen(19);
    }
  }, [tempScore]);

  useEffect(() => {
    // TODO:
    socket.on('nice', data => {
      // setScore(prevScore => prevScore + data.getScore);
      setTempScore(data.getScore);
      setGetScore(data.getScore);
      setResult('nice');
      // setScreen(22);
    });
  }, [socket]);

  useEffect(() => {
    // TODO:
    socket.on('bad', data => {
      // setScore(prevScore => prevScore + data.getScore);
      setTempScore(data.getScore);
      setGetScore(data.getScore);
      setResult('bad');
      // setScreen(19);
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
          <VStack spacing={5} marginTop="18vh">
            <Spinner thickness="11px" speed="1s" emptyColor="gray.200" color="blue.500" size="xl" />
            <Text fontSize="15px">{greeting}</Text>
          </VStack>
        </Grid>
        {/* TODO: */}
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
        <VStack spacing={5} marginTop="25vh">
          <Spinner thickness="11px" speed="1s" emptyColor="gray.200" color="blue.500" size="xl" />
          <Text fontSize="22px">{greeting}</Text>
        </VStack>
      </Grid>
      {/* TODO: */}
      <PlayerFooter nickname={nickname} hasScore score={score} />
    </Box>
  );
}

export default WaitAnswer;
