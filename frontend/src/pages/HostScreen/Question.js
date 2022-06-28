/* eslint-disable consistent-return */

import React from 'react';
// import React, { useState, useEffect } from 'react';
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
// import io from 'socket.io-client';
import ReactAudioPlayer from 'react-audio-player';
// import SocketContext from '../../context/socket';
import HostFooter from './components/HostFooter';

// const { REACT_APP_BACKEND_URL } = process.env;
// const socket = io.connect(REACT_APP_BACKEND_URL);

function Question() {
  // const socket = useContext(SocketContext);
  // const [players, setPlayers] = useState([]);
  // const [secondLeft, setSecondLeft] = useState(30);

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
            <Button
              // as={Link}
              // href={`/host/game/${id}`}
              // style={{ textDecoration: 'none' }}
              colorScheme="blue">
              略過
            </Button>
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            <Text fontWeight="bold" fontSize="30px">
              0
            </Text>
            回答數
          </GridItem>
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            <ReactAudioPlayer
              // TODO:
              src="http://localhost:5000/static/audio/113.wav"
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
      </Box>
      {/* TODO: */}
      <HostFooter leftQuestion="1" totalQuestion="5" gamePin="9898" />
    </Box>
  );
}

export default Question;
