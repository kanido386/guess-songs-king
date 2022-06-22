import React from 'react';
import { Box, VStack, Grid, Heading, Button, Stack, Link } from '@chakra-ui/react';

function PlayGame() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={100}>
        <VStack spacing={8}>
          <Heading size="lg" fontSize="75px" m={7}>
            玩家：遊玩畫面
          </Heading>
          <Stack direction="row" spacing={8} align="center">
            <Button
              as={Link}
              href="/play"
              colorScheme="teal"
              variant="outline"
              size="lg"
              style={{ textDecoration: 'none' }}>
              回到玩家首頁
            </Button>
          </Stack>
        </VStack>
      </Grid>
    </Box>
  );
}

export default PlayGame;
