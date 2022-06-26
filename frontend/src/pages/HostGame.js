// import React, { useState, useEffect } from 'react';
import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  VStack,
  Grid,
  Heading,
  Button,
  Stack,
  // Link,
  Wrap,
  WrapItem,
  Tag,
  TagLabel
} from '@chakra-ui/react';
// import io from 'socket.io-client';
import SocketContext from '../context/socket';

// const { REACT_APP_BACKEND_URL } = process.env;
// const socket = io.connect(REACT_APP_BACKEND_URL);

// TODO:
const pin = String(Math.floor(Math.random() * 9000) + 1000);

function HostGame() {
  const socket = useContext(SocketContext);
  const [players, setPlayers] = useState([]);

  const generatePin = () => {
    socket.emit('init-game', {
      pin,
      id: socket.id
    });
  };

  // useEffect(() => {
  //   socket.emit('send', {
  //     room: '123',
  //     message: 'wow!!!'
  //   });
  // }, []);

  useEffect(() => {
    socket.on('add-player', data => {
      setPlayers(prev => [
        ...prev,
        {
          id: data.id,
          nickname: data.nickname
        }
      ]);
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
      <Grid minH="100vh" p={100}>
        <VStack spacing={8}>
          <Heading size="lg" fontSize="75px" m={7}>
            {/* 遊戲主持人：主持畫面 */}
            {pin}
          </Heading>
          <Wrap spacing={5} p={5}>
            {players.map(player => (
              <WrapItem>
                <Tag
                  key={player.id}
                  size="lg"
                  borderRadius="2xl"
                  // colorScheme={colors[Math.floor(Math.random() * colors.length)]}
                  variant="outline">
                  <TagLabel>{player.nickname}</TagLabel>
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
          <Stack direction="row" spacing={8} align="center">
            <Button
              onClick={generatePin}
              // as={Link}
              // href="/party/manage"
              colorScheme="teal"
              variant="outline"
              size="lg"
              style={{ textDecoration: 'none' }}>
              回到我的歌曲集
            </Button>
          </Stack>
        </VStack>
      </Grid>
    </Box>
  );
}

export default HostGame;
