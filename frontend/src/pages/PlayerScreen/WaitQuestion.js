/* eslint-disable no-nested-ternary */

import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  VStack,
  Grid,
  Heading,
  Text,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';
// import { Box, VStack, Grid, Heading, Text, Spinner } from '@chakra-ui/react';
import SocketContext from '../../context/socket';
import PlayerFooter from './components/PlayerFooter';

function WaitQuestion(props) {
  const { setScreen, nickname, score, currentQuestion, setCurrentQuestion, setQTypeName } = props;
  const socket = useContext(SocketContext);
  // TODO:
  const [secondLeft, setSecondLeft] = useState(5);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (secondLeft > 0) {
        setSecondLeft(secondLeft - 1);
      }
      if (secondLeft === 0) {
        // TODO:
        setScreen(17);
        // socket.emit('get-ready', {
        //   pin
        // });
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    setCurrentQuestion(cur => cur + 1);
  }, []);

  useEffect(() => {
    socket.on('question-type', data => {
      setQTypeName(data.qTypeName);
    });
  }, [socket]);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="89vh" p={100}>
        <VStack spacing={8}>
          <Heading fontSize="36px" mt={9}>
            {/* TODO: */}第 {currentQuestion} 題
          </Heading>
          {/* <Spinner thickness="11px" speed="1s" emptyColor="gray.200" color="blue.500" size="xl" /> */}
          <CircularProgress
            isIndeterminate
            value={30}
            size="100px"
            thickness="11px"
            color="green.400">
            <CircularProgressLabel>{secondLeft}</CircularProgressLabel>
          </CircularProgress>
          <Text fontSize="22px">
            {secondLeft === 0 ? '開始！' : secondLeft === 1 ? '預備...' : '準備...'}
          </Text>
        </VStack>
      </Grid>
      {/* TODO: */}
      <PlayerFooter nickname={nickname} hasScore score={score} />
    </Box>
  );
}

export default WaitQuestion;
