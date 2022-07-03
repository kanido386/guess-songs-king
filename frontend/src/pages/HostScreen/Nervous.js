import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Box, VStack, Grid, Heading, Text } from '@chakra-ui/react';
import SocketContext from '../../context/socket';

function Nervous(props) {
  const { setScreen, pin, setPlayers, audio } = props;
  // const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [secondLeft, setSecondLeft] = useState(5);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (secondLeft > 0) {
        setSecondLeft(secondLeft - 1);
      }
      if (secondLeft === 0) {
        // FIXME:
        setPlayers(prev => {
          const temp = prev.sort((a, b) => b.score - a.score);
          for (let i = 0; i < temp.length; i += 1) {
            socket.emit('see-podium', {
              pin,
              id: temp[i].id,
              place: i + 1
            });
          }
          return prev;
        });
        // TODO:
        setScreen(15);
      }
      // TODO:
      // }, 1000);
    }, 700);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    audio.play();
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={100}>
        <VStack spacing={8}>
          <Box pt={50} pb={11}>
            <Text color="yellow.700">究竟：</Text>
          </Box>
          <Heading size="lg" fontSize="75px" m={7}>
            誰才是猜歌之王呢？
          </Heading>
          <Box pt={30}>
            <Text color="yellow.700">好想知道啊！</Text>
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
}

export default Nervous;
