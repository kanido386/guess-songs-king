/* eslint-disable no-nested-ternary */

import React, { useState, useEffect } from 'react';
import { Box, VStack, Grid, Heading } from '@chakra-ui/react';

function Countdown() {
  // TODO:
  const [secondLeft, setSecondLeft] = useState(3);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (secondLeft > 0) {
        setSecondLeft(secondLeft - 1);
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
          <Heading fontSize="168px" lineHeight="88vh">
            {secondLeft}
          </Heading>
        </VStack>
      </Grid>
    </Box>
  );
}

export default Countdown;
