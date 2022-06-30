/* eslint-disable consistent-return */

import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Button,
  // Link,
  // CircularProgress,
  // CircularProgressLabel,
  GridItem,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';
// import io from 'socket.io-client';
import SocketContext from '../../context/socket';
import HostFooter from './components/HostFooter';

// const { REACT_APP_BACKEND_URL } = process.env;
// const socket = io.connect(REACT_APP_BACKEND_URL);

function HostPodium(props) {
  const { currentQuestion, tracks, pin, setPlayers } = props;
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [tempPlayers, setTempPlayers] = useState([]);
  // const [secondLeft, setSecondLeft] = useState(30);

  const backToHome = () => {
    socket.emit('bye', {
      pin
    });
    navigate('/host/home');
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
      setTempPlayers(prev.sort((a, b) => b.score - a.score));
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
              onClick={backToHome}
              colorScheme="blue">
              回到主頁
            </Button>
          </GridItem>
        </Grid>
        <Grid
          h="300px"
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
            <Text
              lineHeight="33px"
              height="30px"
              fontSize="22px"
              fontWeight={500}
              color="yellow.500">
              {tempPlayers[1] !== undefined ? tempPlayers[1].nickname : ''}
            </Text>
            <Text lineHeight="25px" height="25px" fontSize="18px" fontWeight={300}>
              {tempPlayers[1] !== undefined ? `${tempPlayers[1].score}分` : ''}
            </Text>
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
            <Text
              lineHeight="33px"
              height="30px"
              fontSize="22px"
              fontWeight={500}
              color="yellow.500">
              {tempPlayers[0] !== undefined ? tempPlayers[0].nickname : ''}
            </Text>
            <Text lineHeight="25px" height="25px" fontSize="18px" fontWeight={300}>
              {tempPlayers[0] !== undefined ? `${tempPlayers[0].score}分` : ''}
            </Text>
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
            <Text
              lineHeight="33px"
              height="30px"
              fontSize="22px"
              fontWeight={500}
              color="yellow.500">
              {tempPlayers[2] !== undefined ? tempPlayers[2].nickname : ''}
            </Text>
            <Text lineHeight="25px" height="25px" fontSize="18px" fontWeight={300}>
              {tempPlayers[2] !== undefined ? `${tempPlayers[2].score}分` : ''}
            </Text>
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
        <Button
          ref={btnRef}
          colorScheme="green"
          variant="outline"
          fontWeight={400}
          onClick={onOpen}>
          查看其他玩家
        </Button>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>遺珠之憾</DrawerHeader>

            <DrawerBody>
              {tempPlayers[3] !== undefined
                ? tempPlayers.slice(3).map((tempPlayer, index) => (
                    <Text p={1}>
                      <Text as="span" color="yellow.900">
                        第{index + 4}名：
                      </Text>
                      <Text as="span" fontWeight={500}>
                        【{tempPlayer.nickname}】
                      </Text>
                      <Text as="span" fontWeight={300}>
                        {tempPlayer.score}分
                      </Text>
                    </Text>
                  ))
                : ''}
            </DrawerBody>

            <DrawerFooter>
              {/* <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button> */}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
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
