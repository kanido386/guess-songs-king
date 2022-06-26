import React from 'react';
import { Box, VStack, Grid, Heading, Text } from '@chakra-ui/react';

function Welcome() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={100}>
        <VStack spacing={8}>
          <Heading fontSize="36px" mt={9}>
            你加入了！
          </Heading>
          <Text fontSize="22px">在螢幕上看到你的暱稱了嗎？</Text>
        </VStack>
      </Grid>
    </Box>
  );
}

export default Welcome;
