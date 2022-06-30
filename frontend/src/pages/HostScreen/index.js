// import React, { useContext } from 'react';
// import React, { useState, useEffect, useRef, useContext } from 'react';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
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
import axios from 'axios';
import SocketContext from '../../context/socket';
import WaitingRoom from './WaitingRoom';
import ShowPartyName from './ShowPartyName';
import Countdown from './Countdown';
import ShowQuestionType from './ShowQuestionType';
import ShowQuestionName from './ShowQuestionName';
import Question from './Question';
import Answer from './Answer';
import Scoreboard from './Scoreboard';
import Nervous from './Nervous';
import HostPodium from './HostPodium';

const { REACT_APP_BACKEND_URL } = process.env;
// const socket = io.connect(REACT_APP_BACKEND_URL);

function PlayerScreen() {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const [screen, setScreen] = useState(1);
  const [pin, setPin] = useState('');
  const [tracks, setTracks] = useState([]);
  // https://stackoverflow.com/questions/67270055/react-state-is-empty-inside-useeffect
  // const [players, _setPlayers] = useState([]);
  // const playersRef = useRef(players);
  // const setPlayers = data => {
  //   playersRef.current = data;
  //   _setPlayers(data);
  // };
  const [players, setPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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
    setScreen(1);
  }, []);

  useEffect(() => {
    const tempTracks = [];
    axios
      .post(`${REACT_APP_BACKEND_URL}/api/v1/tracks`, {
        partyId: id
      })
      .then(response => {
        console.log(response.data.tracks);
        for (let i = 0; i < response.data.tracks.length; i += 1) {
          tempTracks.push({
            id: response.data.tracks[i].id,
            artistName: response.data.tracks[i].artist,
            trackName: response.data.tracks[i].name
          });
        }
        setTracks(tempTracks);
      });
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
    case 1:
      return (
        <WaitingRoom
          setScreen={setScreen}
          pin={pin}
          setPin={setPin}
          players={players}
          setPlayers={setPlayers}
          // tracks={tracks}
          // setTracks={setTracks}
        />
      );
    case 7:
      return <ShowPartyName setScreen={setScreen} />;
    case 8:
      return <Countdown setScreen={setScreen} pin={pin} />;
    case 9:
      return <ShowQuestionType setScreen={setScreen} />;
    case 10:
      return (
        <ShowQuestionName setScreen={setScreen} currentQuestion={currentQuestion} tracks={tracks} />
      );
    case 11:
      return (
        <Question
          setScreen={setScreen}
          audio={new Audio(`http://localhost:5000/static/audio/${tracks[currentQuestion].id}.wav`)}
          currentQuestion={currentQuestion}
          tracks={tracks}
          pin={pin}
          players={players}
          setPlayers={setPlayers}
        />
      );
    case 12:
      return (
        <Answer setScreen={setScreen} currentQuestion={currentQuestion} tracks={tracks} pin={pin} />
      );
    case 13:
      return (
        <Scoreboard
          setScreen={setScreen}
          pin={pin}
          setCurrentQuestion={setCurrentQuestion}
          currentQuestion={currentQuestion}
          tracks={tracks}
          setPlayers={setPlayers}
        />
      );
    case 14:
      return (
        <Nervous
          setScreen={setScreen}
          // currentQuestion={currentQuestion}
          // tracks={tracks}
          pin={pin}
          setPlayers={setPlayers}
        />
      );
    case 15:
      return (
        <HostPodium
          currentQuestion={currentQuestion}
          tracks={tracks}
          pin={pin}
          setPlayers={setPlayers}
        />
      );
    default:
      return '';
  }
}

export default PlayerScreen;
