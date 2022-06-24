import React, { useState, useEffect } from 'react';
import { Box, VStack, HStack, Grid, Heading, Button, Stack, Link } from '@chakra-ui/react';
import axios from 'axios';
import jwt from 'jwt-decode';
import PartyItem from './PartyItem';

const { REACT_APP_BACKEND_URL } = process.env;

const accessToken = localStorage.getItem('accessToken');
let hostId = 11;
if (accessToken) {
  const { id } = jwt(accessToken);
  hostId = id;
}

function PartyManage() {
  const [parties, setParties] = useState([]);
  // const [hostId, setHostId] = useState(0);

  useEffect(() => {
    const tempParties = [];
    axios
      .post(`${REACT_APP_BACKEND_URL}/api/v1/parties`, {
        hostId
      })
      .then(response => {
        for (let i = 0; i < response.data.parties.length; i += 1) {
          const tempArray = response.data.parties[i].questions.split(',');
          const numQ1 = Number(tempArray[0]);
          const numQ2 = Number(tempArray[1]);
          const numQ3 = Number(tempArray[2]);
          tempParties.push({
            id: response.data.parties[i].id,
            name: response.data.parties[i].name,
            numTracks: numQ1 + 3 * numQ2 + numQ3,
            numQuestions: numQ1 + numQ2 + numQ3
          });
        }
        setParties(tempParties);
      });
    // setParties([
    //   {
    //     id: 1,
    //     name: '歌曲集名稱',
    //     numTracks: 11,
    //     numQuestions: 11
    //   },
    //   {
    //     id: 2,
    //     name: '也是歌曲集名稱只是比較長',
    //     numTracks: 5,
    //     numQuestions: 5
    //   }
    // ]);
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
