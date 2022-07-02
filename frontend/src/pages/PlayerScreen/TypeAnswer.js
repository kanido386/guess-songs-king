/* eslint-disable no-restricted-globals */

import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import { Box, VStack, HStack, Grid, Button, Input } from '@chakra-ui/react';
import SocketContext from '../../context/socket';
import PlayerHeader from './components/PlayerHeader';
import PlayerFooter from './components/PlayerFooter';

function TypeAnswer(props) {
  const { setScreen, nickname, score, currentQuestion, numQuestions, pin, qTypeName } = props;
  const socket = useContext(SocketContext);
  // const navigate = useNavigate();
  // const { state } = useLocation();
  const [artistName, setArtistName] = useState('');
  const [trackName, setTrackName] = useState('');
  // const [qTypeNameHere, setQTypeNameHere] = useState('');

  const handleKeydown = e => {
    // it triggers by pressing the enter key
    if (e.keyCode === 13) {
      // addTrack();
    }
  };

  const submitAnswer = () => {
    // TODO:
    // setCurrentQuestion(cur => cur);
    // setCurrentQuestion(cur => cur + 1);
    socket.emit('submit-answer', {
      id: socket.id,
      artistName,
      trackName,
      pin
    });
    setScreen(18);
  };

  // useEffect(() => {
  //   setQTypeName(prev => {
  //     console.log(prev);
  //     setQTypeNameHere(prev);
  //     return prev;
  //   });
  // }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown, false);
  }, [artistName, trackName]);

  useEffect(() => {
    // TODO:
    socket.on('times-up', () => {
      setScreen(23);
    });
  }, [socket]);

  return (
    <Box textAlign="center" fontSize="xl">
      {/* TODO: */}
      <PlayerHeader
        currentQuestion={currentQuestion}
        totalQuestion={numQuestions}
        // type="播一首歌"
        type={qTypeName}
      />
      <Grid minH="80vh" p={50}>
        {/* TODO: 如果時間足夠的話，加入道具 */}
        <VStack spacing={5} marginTop="25vh">
          <HStack spacing={7}>
            <Input
              htmlSize={22}
              width="auto"
              textAlign="center"
              placeholder="誰的"
              value={artistName}
              onChange={event => setArtistName(event.currentTarget.value)}
            />
            <Input
              htmlSize={42}
              width="auto"
              textAlign="center"
              placeholder="歌名"
              value={trackName}
              onChange={event => setTrackName(event.currentTarget.value)}
            />
            <Button
              onClick={submitAnswer}
              onKeyDown={handleKeydown}
              colorScheme="blue"
              variant="solid"
              size="lg">
              送出
            </Button>
          </HStack>
        </VStack>
      </Grid>
      {/* TODO: */}
      <PlayerFooter nickname={nickname} hasScore score={score} />
    </Box>
  );
}

export default TypeAnswer;
