import React, { useState, useEffect } from 'react';
import { Box, VStack, Grid, Heading, Text } from '@chakra-ui/react';
import PlayerFooter from './components/PlayerFooter';

function WaitGame() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const greetings = [
      '史詩級勝利！',
      '游刃有餘！',
      '太神啦！',
      '原來你就是傳說中的猜歌之神！',
      '歌都給你猜就飽啦 😂'
    ];
    const i = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[i]);
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="89vh" p={100}>
        <VStack spacing={5}>
          <Heading fontSize="100px" mt={9}>
            🏆
          </Heading>
          <Text fontSize="50px" letterSpacing={3}>
            第 1 名
          </Text>
          <Text>{greeting}</Text>
        </VStack>
      </Grid>
      {/* TODO: */}
      <PlayerFooter nickname="這邊是玩家的暱稱" hasScore score="100" />
    </Box>
  );
}

export default WaitGame;
