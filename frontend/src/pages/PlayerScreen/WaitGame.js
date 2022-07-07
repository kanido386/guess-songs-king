import React, { useEffect, useContext } from 'react';
import { Box, VStack, Grid, Heading, Text, Spinner } from '@chakra-ui/react';
import PlayerFooter from './components/PlayerFooter';
import SocketContext from '../../context/socket';

function WaitGame(props) {
  const { setScreen, nickname } = props;
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('ready', () => {
      setScreen(16);
    });
  }, [socket]);

  // eslint-disable-next-line no-restricted-globals
  const isMobile = screen.availHeight > screen.availWidth;
  if (isMobile) {
    return (
      <Box textAlign="center" fontSize="xl">
        <Grid minH="80vh" p={100}>
          <VStack spacing={8}>
            <Heading fontSize="36px" mt={9}>
              準備！
            </Heading>
            <Spinner
              thickness="11px"
              speed="0.5s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <Text fontSize="22px">正在載入...</Text>
          </VStack>
        </Grid>
        {/* TODO: */}
        <PlayerFooter nickname={nickname} hasScore={false} />
      </Box>
    );
  }
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="89vh" p={100}>
        <VStack spacing={8}>
          <Heading fontSize="36px" mt={9}>
            準備！
          </Heading>
          <Spinner thickness="11px" speed="0.5s" emptyColor="gray.200" color="blue.500" size="xl" />
          <Text fontSize="22px">正在載入...</Text>
        </VStack>
      </Grid>
      {/* TODO: */}
      <PlayerFooter nickname={nickname} hasScore={false} />
    </Box>
  );
}

export default WaitGame;
