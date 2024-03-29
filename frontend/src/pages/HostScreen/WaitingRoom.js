/* eslint-disable jsx-a11y/media-has-caption */

// import React, { useState, useEffect } from 'react';
import React, { useState, useEffect, useContext, useRef } from 'react';
// import ReactAudioPlayer from 'react-audio-player';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  VStack,
  Grid,
  Button,
  // Link,
  GridItem,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
  Tag,
  TagLabel
} from '@chakra-ui/react';
// import io from 'socket.io-client';
import SocketContext from '../../context/socket';

// const { REACT_APP_BACKEND_URL } = process.env;
const { REACT_APP_WELCOME_MUSIC_2 } = process.env;
// const socket = io.connect(REACT_APP_BACKEND_URL);

const colors = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink'
];

// TODO:
const newPin = String(Math.floor(Math.random() * 9000) + 1000);

function WaitingRoom(props) {
  const { id } = useParams();
  const { setScreen, pin, setPin, players, setPlayers, audio } = props;
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  // const [players, setPlayers] = useState([]);
  const [hasPin, setHasPin] = useState(false);
  const bgmRef = useRef();

  // const bgm = Math.random() < 0.5 ? bgm1 : bgm2;
  // const bgm = new Audio(REACT_APP_WELCOME_MUSIC_2);

  const generatePin = () => {
    setHasPin(true);
    setPin(newPin);
    socket.emit('init-game', {
      pin: newPin,
      id: socket.id
    });
  };

  const playBgm = () => {
    bgmRef.current.play();
  };

  const pauseBgm = () => {
    bgmRef.current.pause();
  };

  const startGame = () => {
    pauseBgm();
    setScreen(7);
    socket.emit('start-game', {
      pin,
      id: socket.id
    });
  };

  useEffect(() => {
    playBgm();
  }, []);

  // useEffect(() => {
  //   socket.emit('send', {
  //     room: '123',
  //     message: 'wow!!!'
  //   });
  // }, []);

  useEffect(() => {
    socket.on('add-player', data => {
      audio.play();
      setPlayers(prevPlayers => {
        // 查看有無重複暱稱
        if (prevPlayers.some(p => p.nickname === data.nickname)) {
          console.log('error');
          socket.emit('add-player-error', {
            id: data.id
          });
          return [...prevPlayers];
        }

        socket.emit('add-player-success', {
          id: data.id,
          // TODO:
          partyId: id
        });
        return [
          ...prevPlayers,
          {
            id: data.id,
            nickname: data.nickname,
            // TODO:
            score: 0,
            currentArtistName: null,
            currentTrackName: null,
            currentStanding: null,
            diffStanding: null
          }
        ];
      });
      // console.log(players.some(p => p.nickname === data.nickname));
      // console.log(players);
      // if (players.some(p => p.nickname === data.nickname)) {
      //   socket.emit('add-player-error', {
      //     id: data.id
      //   });
      // } else {
      //   console.log('why...');
      //   console.log(players);
      //   setPlayers(prev => [
      //     ...prev,
      //     {
      //       id: data.id,
      //       nickname: data.nickname
      //     }
      //   ]);
      // }
    });
  }, [socket]);

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
      {/* https://stackoverflow.com/questions/63003690/unable-to-pause-audio-in-reactjs */}
      <audio
        // TODO:
        ref={bgmRef}
        src={REACT_APP_WELCOME_MUSIC_2}
      />
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        minH="9vh">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem w="100%" h="22vh" lineHeight="22vh">
            <Button
              onClick={() => {
                pauseBgm();
                navigate('/party/manage');
              }}>
              下次再玩
            </Button>
          </GridItem>
          <GridItem w="100%" h="22vh" lineHeight="22vh" fontSize="30px" fontWeight="bold">
            {hasPin ? (
              `${pin}`
            ) : (
              <Button
                onClick={generatePin}
                // as={Link}
                // href="/party/manage"
                colorScheme="teal"
                variant="outline"
                size="lg"
                style={{ textDecoration: 'none' }}>
                生成遊戲 PIN 碼
              </Button>
            )}
          </GridItem>
          <GridItem w="100%" h="22vh" lineHeight="22vh" />
        </Grid>
      </Box>
      <Box
        // bg={useColorModeValue('gray.50', 'gray.900')}
        // color={useColorModeValue('gray.700', 'gray.200')}
        minH="9vh"
        m={7}>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            <Text fontWeight="bold">👤 {players.length}</Text>
          </GridItem>
          <GridItem w="100%" h="9vh" lineHeight="9vh" />
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            <Text fontWeight="bold" fontSize="35px">
              猜歌我最強！
            </Text>
          </GridItem>
          <GridItem w="100%" h="9vh" lineHeight="9vh" />
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            <Button
              // as={Link}
              // href={`/host/game/${id}`}
              // style={{ textDecoration: 'none' }}
              onClick={startGame}
              colorScheme="blue">
              開始
            </Button>
          </GridItem>
        </Grid>
      </Box>
      <Grid minH="30vh" p={30}>
        <VStack spacing={8}>
          <Wrap spacing={5} p={5}>
            {players.length === 0 ? (
              <Text fontSize="22px">正在等待玩家…</Text>
            ) : (
              players.map(player => (
                <WrapItem>
                  <Tag
                    key={player.id}
                    size="lg"
                    borderRadius="2xl"
                    colorScheme={colors[Math.floor(Math.random() * colors.length)]}
                    variant="outline">
                    <TagLabel>{player.nickname}</TagLabel>
                  </Tag>
                </WrapItem>
              ))
            )}
          </Wrap>
        </VStack>
      </Grid>
    </Box>
  );
}

export default WaitingRoom;
