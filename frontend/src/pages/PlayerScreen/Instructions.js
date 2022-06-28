import React, { useEffect, useContext } from 'react';
import { Box, VStack, Grid, Heading, Text } from '@chakra-ui/react';
import PlayerFooter from './components/PlayerFooter';
import SocketContext from '../../context/socket';

function Instructions(props) {
  const { setScreen, nickname } = props;
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('start', () => {
      setScreen(15);
    });
  }, [socket]);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="89vh" p={100}>
        <VStack spacing={8}>
          <Heading fontSize="36px" mt={9}>
            你加入了！
          </Heading>
          <Text fontSize="22px">在螢幕上看到你的暱稱了嗎？</Text>
        </VStack>
      </Grid>
      {/* TODO: */}
      <PlayerFooter nickname={nickname} hasScore={false} />
    </Box>
  );
}

export default Instructions;
