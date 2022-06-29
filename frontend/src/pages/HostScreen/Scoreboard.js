/* eslint-disable consistent-return */

import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Grid,
  Button,
  // Link,
  // CircularProgress,
  // CircularProgressLabel,
  Stack,
  Flex,
  HStack,
  Spacer,
  GridItem,
  Text
} from '@chakra-ui/react';
// import io from 'socket.io-client';
import SocketContext from '../../context/socket';
import HostFooter from './components/HostFooter';

// const { REACT_APP_BACKEND_URL } = process.env;
// const socket = io.connect(REACT_APP_BACKEND_URL);

function PlayerItem(props) {
  const { nickname, score } = props;

  return (
    <Stack
      p="3"
      boxShadow="sm"
      m="5px auto"
      borderWidth="1px"
      borderRadius="sm"
      w={500}
      cursor="pointer"
      _hover={{
        bg: 'gray.100'
      }}>
      <Flex>
        <HStack spacing={7}>
          <Text color="purple.600" fontWeight="semibold" fontSize="22px">
            {nickname}
          </Text>
        </HStack>
        <Spacer />
        <HStack spacing={7}>
          <Text color="pink.600" fontWeight="semibold" fontSize="22px">
            {score}
          </Text>
        </HStack>
      </Flex>
    </Stack>
  );
}

function Scoreboard(props) {
  const { setScreen, pin, setCurrentQuestion, currentQuestion, tracks, setPlayers } = props;
  const socket = useContext(SocketContext);
  const [topPlayers, setTopPlayers] = useState([]);
  // const [secondLeft, setSecondLeft] = useState(30);

  const nextQuestion = () => {
    socket.emit('get-ready', {
      pin
    });
    setCurrentQuestion(cur => cur + 1);
    setScreen(9);
  };

  // useEffect(() => {
  //   const myInterval = setInterval(() => {
  //     if (secondLeft > 0) {
  //       setSecondLeft(secondLeft - 1);
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(myInterval);
  //   };
  // });

  // useEffect(() => {
  //   socket.emit('send', {
  //     room: '123',
  //     message: 'wow!!!'
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.on('add-player', data => {
  //     setPlayers(prev => [
  //       ...prev,
  //       {
  //         id: data.id,
  //         nickname: data.nickname
  //       }
  //     ]);
  //   });
  // }, [socket]);

  useEffect(() => {
    setPlayers(prev => {
      console.log(prev);
      setTopPlayers(prev.sort((a, b) => b.score - a.score));
      // setTopPlayers([
      //   {
      //     nickname: '我是猜歌達人',
      //     score: 386
      //   },
      //   {
      //     nickname: '我是猜歌達人',
      //     score: 386
      //   },
      //   {
      //     nickname: '都沒在聽歌的',
      //     score: 88
      //   },
      //   {
      //     nickname: '都沒在聽歌的',
      //     score: 88
      //   },
      //   {
      //     nickname: '都沒在聽歌的',
      //     score: 88
      //   }
      // ]);
      return prev;
    });
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Box
        // bg={useColorModeValue('gray.50', 'gray.900')}
        // color={useColorModeValue('gray.700', 'gray.200')}
        minH="80vh"
        mt="50px">
        <Grid templateColumns="repeat(3, 1fr)" gap={6} minH="15vh">
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            {/* <Text fontWeight="bold">👤 {players.length}</Text> */}
          </GridItem>
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            <Text fontWeight="bold" fontSize="30px">
              排行榜
            </Text>
          </GridItem>
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            <Button
              // as={Link}
              // href={`/host/game/${id}`}
              // style={{ textDecoration: 'none' }}
              onClick={nextQuestion}
              colorScheme="blue">
              下一題
            </Button>
          </GridItem>
        </Grid>
        <Box>
          {topPlayers.map(player => (
            <PlayerItem key={player.nickname} nickname={player.nickname} score={player.score} />
          ))}
        </Box>
      </Box>
      {/* TODO: */}
      <HostFooter
        currentQuestion={currentQuestion + 1}
        totalQuestion={tracks.length}
        gamePin={pin}
      />
    </Box>
  );
}

export default Scoreboard;
