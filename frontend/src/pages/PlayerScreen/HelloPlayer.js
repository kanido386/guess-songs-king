// import React, { useContext } from 'react';
// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link as LinkToPage } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue
} from '@chakra-ui/react';
// import io from 'socket.io-client';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import SocketContext from '../context/socket';

// const MySwal = withReactContent(Swal);

// const { REACT_APP_BACKEND_URL } = process.env;
// const socket = io.connect(REACT_APP_BACKEND_URL);

function HelloPlayer() {
  // const socket = useContext(SocketContext);
  // const navigate = useNavigate();
  // const [pin, setPin] = useState('');

  // const sendSomething = () => {
  //   // socket.emit('send', {
  //   //   message: 'That was dope!'
  //   // });
  //   setRoom('123');
  //   socket.emit('join', {
  //     room: '123'
  //   });
  // };

  // const sendPinToServer = () => {
  //   socket.emit('join', {
  //     pin,
  //     id: socket.id
  //   });
  // };

  // useEffect(() => {
  //   socket.on('join-error', () => {
  //     MySwal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: '無法識別該遊戲 PIN 碼！'
  //     });
  //   });

  //   socket.on('join-success', () => {
  //     navigate('/join');
  //   });
  // }, [socket]);

  // useEffect(() => {
  //   socket.on('host', data => {
  //     console.log(data.message);
  //   });
  //   console.log('why...');
  // }, [socket]);

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
                placeholder="遊戲 PIN 碼"
                textAlign="center"
                fontWeight={700}
                // onChange={event => setPin(event.currentTarget.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                // as={LinkToPage}
                // to={{ pathname: '/join', state: { test: '123' } }}
                // onClick={sendPinToServer}
                // as={Link}
                // href="/join"
                // style={{ textDecoration: 'none' }}
                bg="gray.700"
                color="white"
                _hover={{
                  bg: 'gray.600'
                }}>
                輸入
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Box textAlign="center" pt={11}>
          <Link color="yellow.700" href="/" fontSize="18px">
            我想當遊戲主持人
          </Link>
        </Box>
      </Stack>
    </Flex>
  );
}

export default HelloPlayer;
