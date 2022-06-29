/* eslint-disable consistent-return */

import React, { useState, useEffect } from 'react';
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
// import SocketContext from '../../context/socket';
import HostFooter from './components/HostFooter';

// const { REACT_APP_BACKEND_URL } = process.env;
// const socket = io.connect(REACT_APP_BACKEND_URL);

function HostPodium(props) {
  const { currentQuestion, tracks, pin, setPlayers } = props;
  // const socket = useContext(SocketContext);
  const [tempPlayers, setTempPlayers] = useState([]);
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

  useEffect(() => {
    setPlayers(prev => {
      setTempPlayers(prev);
      return prev;
    });
    // setPlayers([
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
    // console.log(players);
  }, []);

  if (tempPlayers.length === 0) {
    return '';
  }

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
              頒獎典禮
            </Text>
          </GridItem>
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            <Button
              // as={Link}
              // href={`/host/game/${id}`}
              // style={{ textDecoration: 'none' }}
              colorScheme="blue">
              回到主頁
            </Button>
          </GridItem>
        </Grid>
        <Grid
          h="370px"
          w="50vw"
          margin="0 auto"
          templateRows="repeat(6, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={0}>
          <GridItem rowStart={1} rowEnd={2} colStart={1} colEnd={1} bg="papayawhip" />
          <GridItem
            rowStart={2}
            rowEnd={3}
            colStart={1}
            colEnd={1}
            bg="papayawhip"
            lineHeight="65px">
            {tempPlayers[1] !== undefined ? tempPlayers[1].nickname : ''}
          </GridItem>
          <GridItem
            rowStart={3}
            rowEnd={6}
            colStart={1}
            colEnd={1}
            bg="tomato"
            outline="1px solid black"
          />
          <GridItem
            rowStart={1}
            rowEnd={1}
            colStart={2}
            colEnd={2}
            bg="papayawhip"
            lineHeight="65px">
            {tempPlayers[0] !== undefined ? tempPlayers[0].nickname : ''}
          </GridItem>
          <GridItem
            rowStart={2}
            rowEnd={6}
            colStart={2}
            colEnd={2}
            bg="tomato"
            outline="1px solid black"
          />
          <GridItem rowStart={1} rowEnd={3} colStart={3} colEnd={3} bg="papayawhip" />
          <GridItem
            rowStart={3}
            rowEnd={4}
            colStart={3}
            colEnd={3}
            bg="papayawhip"
            lineHeight="65px">
            {tempPlayers[2] !== undefined ? tempPlayers[2].nickname : ''}
          </GridItem>
          <GridItem
            rowStart={4}
            rowEnd={6}
            colStart={3}
            colEnd={3}
            bg="tomato"
            outline="1px solid black"
          />
        </Grid>
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

export default HostPodium;
