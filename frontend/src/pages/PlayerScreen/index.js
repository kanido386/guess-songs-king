// import React, { useContext } from 'react';
import React, { useState, useEffect, useContext } from 'react';
// import { Link as LinkToPage } from 'react-router-dom';
// import {
//   Flex,
//   Box,
//   FormControl,
//   Input,
//   Stack,
//   // Link,
//   Button,
//   Heading,
//   useColorModeValue
// } from '@chakra-ui/react';
// import io from 'socket.io-client';
import SocketContext from '../../context/socket';
import HelloPlayer from './HelloPlayer';
import Join from './Join';
import Instructions from './Instructions';
import WaitGame from './WaitGame';
import WaitQuestion from './WaitQuestion';
import TypeAnswer from './TypeAnswer';

// const { REACT_APP_BACKEND_URL } = process.env;
// const socket = io.connect(REACT_APP_BACKEND_URL);

function PlayerScreen() {
  const socket = useContext(SocketContext);
  const [screen, setScreen] = useState(2);
  const [pin, setPin] = useState('');
  const [nickname, setNickname] = useState('');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  // const sendNicknameToServer = () => {
  //   socket.emit('add-nickname', {
  //     nickname,
  //     id: socket.id
  //   });
  // };

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
    setScreen(2);
  }, []);

  useEffect(() => {
    socket.on('join-error', () => {});

    // socket.on('join-success', () => {
    //   navigate('/join');
    // });
  }, [socket]);

  // useEffect(() => {
  //   socket.on('host', data => {
  //     console.log(data.message);
  //   });
  //   console.log('why...');
  // }, [socket]);

  switch (screen) {
    case 2:
      return <HelloPlayer setScreen={setScreen} pin={pin} setPin={setPin} />;
    case 4:
      return <Join setScreen={setScreen} pin={pin} nickname={nickname} setNickname={setNickname} />;
    case 6:
      return <Instructions setScreen={setScreen} nickname={nickname} />;
    case 15:
      return <WaitGame setScreen={setScreen} nickname={nickname} />;
    case 16:
      return (
        <WaitQuestion
          setScreen={setScreen}
          nickname={nickname}
          score={score}
          currentQuestion={currentQuestion}
        />
      );
    case 17:
      return (
        <TypeAnswer
          setScreen={setScreen}
          nickname={nickname}
          score={score}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
      );
    default:
      // TODO:
      setScore(0);
      return '';
  }
}

export default PlayerScreen;
