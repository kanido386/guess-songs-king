/* eslint-disable no-restricted-globals */

import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import { Box, VStack, HStack, Grid, Button, Input } from '@chakra-ui/react';
import PlayerHeader from './components/PlayerHeader';
import PlayerFooter from './components/PlayerFooter';

function TypeAnswer(props) {
  const { setScreen, nickname, score, currentQuestion, setCurrentQuestion } = props;
  // const navigate = useNavigate();
  // const { state } = useLocation();
  const [artistName, setArtistName] = useState('');
  const [trackName, setTrackName] = useState('');

  const handleKeydown = e => {
    // it triggers by pressing the enter key
    if (e.keyCode === 13) {
      // addTrack();
    }
  };

  const submitAnswer = () => {
    // TODO:
    setCurrentQuestion(cur => cur + 1);
    setScreen(18);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown, false);
  }, [artistName, trackName]);

  return (
    <Box textAlign="center" fontSize="xl">
      {/* TODO: */}
      <PlayerHeader currentQuestion={currentQuestion} totalQuestion="5" type="播一首歌" />
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
