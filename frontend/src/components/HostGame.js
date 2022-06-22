import React from 'react';
import { Box, VStack, Grid, Heading, Button, Stack, Link } from '@chakra-ui/react';

function HostGame() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={100}>
        <VStack spacing={8}>
          <Heading size="lg" fontSize="75px" m={7}>
            遊戲主持人：主持畫面
          </Heading>
          <Stack direction="row" spacing={8} align="center">
            <Button
              as={Link}
              href="/party/manage"
              colorScheme="teal"
              variant="outline"
              size="lg"
              style={{ textDecoration: 'none' }}>
              回到我的歌曲集
            </Button>
          </Stack>
        </VStack>
      </Grid>
    </Box>
  );
}

export default HostGame;
