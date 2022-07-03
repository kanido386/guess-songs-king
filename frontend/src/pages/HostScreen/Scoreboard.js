/* eslint-disable no-nested-ternary */
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
import { TriangleUpIcon, MinusIcon, TriangleDownIcon } from '@chakra-ui/icons';
// import io from 'socket.io-client';
import SocketContext from '../../context/socket';
import HostFooter from './components/HostFooter';

// const { REACT_APP_BACKEND_URL } = process.env;
// const socket = io.connect(REACT_APP_BACKEND_URL);

function PlayerItem(props) {
  const { standing, diffStanding, nickname, score, currentQuestion } = props;

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
          <Text color="yellow.600" fontWeight={700}>
            第 {standing + 1} 名
          </Text>
          {currentQuestion === 0 ? (
            ''
          ) : diffStanding > 0 ? (
            <Text color="red.600" fontWeight="semibold" fontSize="18px">
              <TriangleUpIcon w={3} h={3} /> {diffStanding}
            </Text>
          ) : diffStanding === 0 ? (
            <Text color="gray.600" fontWeight="semibold" fontSize="18px" pr={1}>
              <MinusIcon w={3} h={3} />
            </Text>
          ) : (
            <Text color="green.600" fontWeight="semibold" fontSize="18px">
              <TriangleDownIcon w={3} h={3} /> {Math.abs(diffStanding)}
            </Text>
          )}
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

      // 算出名次
      const temp = prev.sort((a, b) => b.score - a.score);
      for (let i = 0; i < temp.length; i += 1) {
        // const currentPlayer = prev.find(p => p.id === temp[i].id);
        if (prev.find(p => p.id === temp[i].id).currentStanding !== null) {
          prev.find(p => p.id === temp[i].id).diffStanding =
            prev.find(p => p.id === temp[i].id).currentStanding - (i + 1);
        }
        prev.find(p => p.id === temp[i].id).currentStanding = i + 1;
        socket.emit('send-standing', {
          id: temp[i].id,
          standing: i + 1
        });
      }

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
        <Box mb={10}>
          {topPlayers.map((player, index) => (
            <PlayerItem
              key={player.nickname}
              standing={index}
              diffStanding={player.diffStanding}
              nickname={player.nickname}
              score={player.score}
              currentQuestion={currentQuestion}
            />
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
