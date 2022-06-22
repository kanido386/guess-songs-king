import React, { useState, useEffect } from 'react';
import { Box, VStack, HStack, Grid, Heading, Button, Stack, Link } from '@chakra-ui/react';
import PartyItem from './PartyItem';

function PartyManage() {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    // TODO: Get parties from API
    setParties([
      {
        id: 1,
        name: '歌曲集名稱',
        numTracks: 11,
        numQuestions: 11
      },
      {
        id: 2,
        name: '也是歌曲集名稱只是比較長',
        numTracks: 5,
        numQuestions: 5
      }
    ]);
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={50}>
        <VStack spacing={5}>
          <Heading size="lg" fontSize="50px" m={7}>
            我的歌曲集
          </Heading>
          <Box>
            {parties.map(party => (
              <PartyItem
                key={party.id}
                id={party.id}
                name={party.name}
                numTracks={party.numTracks}
                numQuestions={party.numQuestions}
              />
            ))}
          </Box>
          <Stack direction="row" spacing={8} align="center">
            <HStack spacing={7}>
              <Button
                as={Link}
                href="/party/create/step/1"
                colorScheme="teal"
                variant="outline"
                size="lg"
                style={{ textDecoration: 'none' }}>
                創建
              </Button>
              <Button
                as={Link}
                href="/host/home"
                colorScheme="blue"
                variant="outline"
                size="lg"
                style={{ textDecoration: 'none' }}>
                回上一頁
              </Button>
            </HStack>
          </Stack>
        </VStack>
      </Grid>
    </Box>
  );
}

export default PartyManage;
