import React from 'react';
import { Box, VStack, Grid, Heading, Button, Stack, Link } from '@chakra-ui/react';

function Welcome() {
  // eslint-disable-next-line no-restricted-globals
  const isMobile = screen.availHeight > screen.availWidth;
  if (isMobile) {
    return (
      <Box textAlign="center" fontSize="xl">
        <Grid minH="80vh" pt={150}>
          <VStack spacing={8}>
            <Heading size="3xl" m={7}>
              請問您是？
            </Heading>
            <Stack direction="row" spacing={8} align="center">
              <Button
                as={Link}
                href="/host"
                colorScheme="teal"
                variant="outline"
                size="lg"
                style={{ textDecoration: 'none' }}>
                遊戲主持人
              </Button>
              <Button
                as={Link}
                href="/play"
                colorScheme="teal"
                variant="outline"
                size="lg"
                style={{ textDecoration: 'none' }}>
                玩家
              </Button>
            </Stack>
          </VStack>
        </Grid>
      </Box>
    );
  }
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={100}>
        <VStack spacing={8}>
          <Heading size="lg" fontSize="75px" m={7}>
            請問您是？
          </Heading>
          <Stack direction="row" spacing={8} align="center">
            <Button
              as={Link}
              href="/host"
              colorScheme="teal"
              variant="outline"
              size="lg"
              style={{ textDecoration: 'none' }}>
              遊戲主持人
            </Button>
            <Button
              as={Link}
              href="/play"
              colorScheme="teal"
              variant="outline"
              size="lg"
              style={{ textDecoration: 'none' }}>
              玩家
            </Button>
          </Stack>
        </VStack>
      </Grid>
    </Box>
  );
}

export default Welcome;
