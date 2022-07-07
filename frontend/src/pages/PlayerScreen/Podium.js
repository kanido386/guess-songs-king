import React, { useState, useEffect, useContext } from 'react';
import { Box, VStack, Grid, Heading, Text } from '@chakra-ui/react';
import SocketContext from '../../context/socket';
import PlayerFooter from './components/PlayerFooter';

function Podium(props) {
  const { setScreen, nickname, score, place } = props;
  const socket = useContext(SocketContext);
  const [greetingNice, setGreetingNice] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const greetingNices = [
      '史詩級勝利！',
      '游刃有餘！',
      '太神啦！',
      '原來你就是傳說中的猜歌之神！',
      '歌都給你猜就飽啦 😂'
    ];
    const i = Math.floor(Math.random() * greetingNices.length);
    setGreetingNice(greetingNices[i]);
  }, []);

  useEffect(() => {
    const greetings = [
      '猜歌？我看你還是回去寫 STYLiSH 比較實際一點！',
      '再加把勁吧！',
      '你可能昨晚沒睡飽，反應比較遲鈍一點？',
      'Campus Program 結束以後，看要不要報個 Guess Song Program？',
      '別氣餒，歡迎再來挑戰！'
    ];
    const i = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[i]);
  }, []);

  useEffect(() => {
    socket.on('bye', () => {
      window.location.reload();
      setScreen(2);
    });
  }, [socket]);

  // eslint-disable-next-line no-restricted-globals
  const isMobile = screen.availHeight > screen.availWidth;
  if (isMobile) {
    return (
      <Box textAlign="center" fontSize="xl">
        <Grid minH="80vh" p={100}>
          {place <= 3 ? (
            <VStack spacing={5}>
              <Heading fontSize="75px" mt={9}>
                🏆
              </Heading>
              <Text fontSize="30px" letterSpacing={1}>
                第 {place} 名
              </Text>
              <Text>{greetingNice}</Text>
            </VStack>
          ) : (
            <VStack spacing={5}>
              <Heading fontSize="75px" mt={9}>
                👨‍💻
              </Heading>
              <Text fontSize="30px" letterSpacing={1}>
                第 {place} 名
              </Text>
              <Text>{greeting}</Text>
            </VStack>
          )}
        </Grid>
        {/* TODO: */}
        <PlayerFooter nickname={nickname} hasScore score={score} />
      </Box>
    );
  }
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="89vh" p={100}>
        {place <= 3 ? (
          <VStack spacing={5}>
            <Heading fontSize="100px" mt={9}>
              🏆
            </Heading>
            <Text fontSize="50px" letterSpacing={3}>
              第 {place} 名
            </Text>
            <Text>{greetingNice}</Text>
          </VStack>
        ) : (
          <VStack spacing={5}>
            <Heading fontSize="100px" mt={9}>
              👨‍💻
            </Heading>
            <Text fontSize="50px" letterSpacing={3}>
              第 {place} 名
            </Text>
            <Text>{greeting}</Text>
          </VStack>
        )}
      </Grid>
      {/* TODO: */}
      <PlayerFooter nickname={nickname} hasScore score={score} />
    </Box>
  );
}

export default Podium;
