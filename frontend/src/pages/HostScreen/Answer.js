/* eslint-disable consistent-return */

import React, { useEffect, useContext } from 'react';
// import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Grid,
  Button,
  // Link,
  // CircularProgress,
  // CircularProgressLabel,
  GridItem,
  Text
} from '@chakra-ui/react';
// import { ArrowRightIcon } from '@chakra-ui/icons';
// import io from 'socket.io-client';
import ReactAudioPlayer from 'react-audio-player';
import SocketContext from '../../context/socket';
import HostFooter from './components/HostFooter';

const { REACT_APP_AUDIO_PROCESSOR_URL } = process.env;
// const socket = io.connect(REACT_APP_BACKEND_URL);

function Answer(props) {
  const { setScreen, currentQuestion, tracks, pin, audio } = props;
  const socket = useContext(SocketContext);
  // const [players, setPlayers] = useState([]);
  // const [secondLeft, setSecondLeft] = useState(30);

  const seeScoreboard = () => {
    setScreen(13);
  };

  const seePodium = () => {
    socket.emit('ready-podium', {
      pin
    });
    setScreen(14);
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

  useEffect(() => {
    audio.play();
  }, []);

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

  // useEffect(() => {
  //   // TODO:
  //   setPlayers([]);

  //   console.log(socket.id);

  //   socket.emit('init-game', {
  //     pin,
  //     id: socket.id
  //   });
  // }, [socket]);

  return (
    <Box textAlign="center" fontSize="xl">
      <Box
        // bg={useColorModeValue('gray.50', 'gray.900')}
        // color={useColorModeValue('gray.700', 'gray.200')}
        minH="80vh"
        mt="50px">
        <Grid templateColumns="repeat(3, 1fr)" gap={6} minH="30vh">
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            {/* <Text fontWeight="bold">👤 {players.length}</Text> */}
          </GridItem>
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            <Text fontWeight="bold" fontSize="30px">
              {/* TODO: */}
              請問這是哪一首歌呢？
            </Text>
          </GridItem>
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            {currentQuestion + 1 === tracks.length ? (
              <Button
                // as={Link}
                // href={`/host/game/${id}`}
                // style={{ textDecoration: 'none' }}
                onClick={seePodium}
                colorScheme="green">
                看比賽結果！
              </Button>
            ) : (
              <Button
                // as={Link}
                // href={`/host/game/${id}`}
                // style={{ textDecoration: 'none' }}
                onClick={seeScoreboard}
                colorScheme="blue">
                {`看排行 >>`}
              </Button>
            )}
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            {/* <Text fontWeight="bold" fontSize="30px">
              0
            </Text>
            回答數 */}
          </GridItem>
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            <ReactAudioPlayer
              // TODO:
              src={`${REACT_APP_AUDIO_PROCESSOR_URL}/static/audio/${tracks[currentQuestion].id}.wav`}
              controls
            />
          </GridItem>
          <GridItem w="100%" h="9vh" lineHeight="9vh" alignItems="center">
            {/* <Text fontWeight="bold" fontSize="50px">
              30
            </Text> */}
            {/* <CircularProgress value={(100 / 30) * secondLeft} color="green.400" size="100px">
              <CircularProgressLabel fontWeight="bold" fontSize="30px">
                {secondLeft}
              </CircularProgressLabel>
            </CircularProgress> */}
          </GridItem>
        </Grid>
        <Text mt="75px">
          正確答案：
          <Text as="span" color="green.600" fontWeight="bold" fontSize="30px">
            {tracks[currentQuestion].artistName} - {tracks[currentQuestion].trackName}
          </Text>
        </Text>
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

export default Answer;
