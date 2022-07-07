// import React, { useContext } from 'react';
// import React, { useState, useEffect, useContext } from 'react';
import React, { useEffect, useContext } from 'react';
// import { Link as LinkToPage } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  // Link,
  Button,
  Heading,
  useColorModeValue
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// import io from 'socket.io-client';
import SocketContext from '../../context/socket';

const MySwal = withReactContent(Swal);

// const { REACT_APP_BACKEND_URL } = process.env;
// const socket = io.connect(REACT_APP_BACKEND_URL);

function Join(props) {
  const { setScreen, pin, nickname, setNickname, setPartyId } = props;
  const socket = useContext(SocketContext);

  const sendNicknameToServer = () => {
    console.log('sendNicknameToServer');
    console.log(pin);
    socket.emit('add-nickname', {
      nickname,
      id: socket.id,
      pin
    });
  };

  // const sendSomething = () => {
  //   // socket.emit('send', {
  //   //   message: 'That was dope!'
  //   // });
  //   setRoom('123');
  //   socket.emit('join', {
  //     room: '123'
  //   });
  // };

  useEffect(() => {
    socket.on('add-nickname-error', () => {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '暱稱重複囉！'
      });
    });

    socket.on('add-nickname-success', data => {
      // navigate('/join');
      console.log('add-nickname-success');
      setPartyId(data.partyId);
      setScreen(6);
    });
  }, [socket]);

  // useEffect(() => {
  //   socket.on('host', data => {
  //     console.log(data.message);
  //   });
  //   console.log('why...');
  // }, [socket]);

  // eslint-disable-next-line no-restricted-globals
  const isMobile = screen.availHeight > screen.availWidth;
  if (isMobile) {
    return (
      <Flex
        minH="80vh"
        align="center"
        justify="center"
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx="auto" maxW="lg" py={0} px={0}>
          <Stack align="center">
            {/* <Heading fontSize="5xl">{room}</Heading> */}
            <Heading fontSize="4xl">猜歌我最強！</Heading>
          </Stack>
          <Box
            rounded="lg"
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow="lg"
            p={5}
            mx="auto"
            w={300}>
            <Stack spacing={4}>
              <FormControl id="pin">
                <Input
                  type="text"
                  placeholder="暱稱"
                  textAlign="center"
                  fontWeight={700}
                  value={nickname}
                  onChange={event => setNickname(event.currentTarget.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  // as={LinkToPage}
                  // to={{ pathname: '/instructions', state: { test: '123' } }}
                  onClick={sendNicknameToServer}
                  // as={Link}
                  // href="/instructions"
                  // style={{ textDecoration: 'none' }}
                  bg="gray.700"
                  color="white"
                  _hover={{
                    bg: 'gray.600'
                  }}>
                  好，開始！
                </Button>
              </Stack>
            </Stack>
          </Box>
          {/* <Box textAlign="center" pt={11}>
          <Link color="yellow.700" href="/" fontSize="18px">
            我想當遊戲主持人
          </Link>
        </Box> */}
        </Stack>
      </Flex>
    );
  }
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          {/* <Heading fontSize="5xl">{room}</Heading> */}
          <Heading fontSize="5xl">猜歌我最強！</Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8} w={360}>
          <Stack spacing={4}>
            <FormControl id="pin">
              <Input
                type="text"
                placeholder="暱稱"
                textAlign="center"
                fontWeight={700}
                value={nickname}
                onChange={event => setNickname(event.currentTarget.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                // as={LinkToPage}
                // to={{ pathname: '/instructions', state: { test: '123' } }}
                onClick={sendNicknameToServer}
                // as={Link}
                // href="/instructions"
                // style={{ textDecoration: 'none' }}
                bg="gray.700"
                color="white"
                _hover={{
                  bg: 'gray.600'
                }}>
                好，開始！
              </Button>
            </Stack>
          </Stack>
        </Box>
        {/* <Box textAlign="center" pt={11}>
          <Link color="yellow.700" href="/" fontSize="18px">
            我想當遊戲主持人
          </Link>
        </Box> */}
      </Stack>
    </Flex>
  );
}

export default Join;
