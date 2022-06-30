import React, { useEffect, useContext } from 'react';
import { Box, VStack, Grid, Heading, Text, Spinner } from '@chakra-ui/react';
import SocketContext from '../../context/socket';
import PlayerFooter from './components/PlayerFooter';

function WaitPodium(props) {
  const { setScreen, nickname, score, setPlace } = props;
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('see-podium', data => {
      setPlace(data.place);
      setScreen(21);
    });
  }, [socket]);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="89vh" p={100}>
        <VStack spacing={8}>
          <Heading fontSize="36px" mt={9}>
            即將揭曉...
          </Heading>
          <Spinner thickness="11px" speed="0.5s" emptyColor="gray.200" color="blue.500" size="xl" />
          <Text fontSize="22px">究竟能不能像金州勇士一樣封王呢？</Text>
        </VStack>
      </Grid>
      {/* TODO: */}
      <PlayerFooter nickname={nickname} hasScore score={score} />
    </Box>
  );
}

export default WaitPodium;
