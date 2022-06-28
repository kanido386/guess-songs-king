/* eslint-disable no-nested-ternary */

import React, { useState, useEffect, useContext } from 'react';
import { Box, VStack, Grid, Heading } from '@chakra-ui/react';
import SocketContext from '../../context/socket';

function Countdown(props) {
  const { setScreen, pin } = props;
  const socket = useContext(SocketContext);
  // TODO:
  const [secondLeft, setSecondLeft] = useState(3);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (secondLeft > 0) {
        setSecondLeft(secondLeft - 1);
      }
      if (secondLeft === 0) {
        // TODO:
        setScreen(9);
        socket.emit('get-ready', {
          pin
        });
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="88vh">
        <VStack spacing={8}>
          {secondLeft === 0 ? (
            <Heading fontSize="123px" lineHeight="88vh">
              開始！
            </Heading>
          ) : (
            <Heading fontSize="168px" lineHeight="88vh">
              {secondLeft}
            </Heading>
          )}
        </VStack>
      </Grid>
    </Box>
  );
}

export default Countdown;
