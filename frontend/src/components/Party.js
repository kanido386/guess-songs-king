import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {
  Box,
  VStack,
  HStack,
  Grid,
  Text,
  Heading,
  Button,
  Stack,
  Link,
  Tag,
  TagLabel,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import axios from 'axios';

const { REACT_APP_BACKEND_URL } = process.env;

const colors = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink'
];

function Party() {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);
  const [partyName, setPartyName] = useState('');
  const [numQuestions1, setNumQuestions1] = useState(0);
  const [numQuestions2, setNumQuestions2] = useState(0);
  const [numQuestions3, setNumQuestions3] = useState(0);

  useEffect(() => {
    axios
      .post(`${REACT_APP_BACKEND_URL}/api/v1/party`, {
        partyId: id
      })
      .then(response => {
        console.log(response.data.party);
        const tempArray = response.data.party.questions.split(',');
        const numQ1 = Number(tempArray[0]);
        const numQ2 = Number(tempArray[1]);
        const numQ3 = Number(tempArray[2]);
        setPartyName(response.data.party.name);
        setNumQuestions1(numQ1);
        setNumQuestions2(numQ2);
        setNumQuestions3(numQ3);
      });
  }, []);

  useEffect(() => {
    const tempTracks = [];
    axios
      .post(`${REACT_APP_BACKEND_URL}/api/v1/tracks`, {
        partyId: id
      })
      .then(response => {
        console.log(response.data.tracks);
        for (let i = 0; i < response.data.tracks.length; i += 1) {
          tempTracks.push({
            id: response.data.tracks[i].id,
            artistName: response.data.tracks[i].artist,
            trackName: response.data.tracks[i].name
          });
        }
        setTracks(tempTracks);
      });
  }, []);

  // useEffect(() => {
  //   // TODO: Get tracks from API
  //   setTracks([
  //     {
  //       id: 1,
  //       artistName: '韋禮安',
  //       trackName: '如果可以'
  //     },
  //     {
  //       id: 2,
  //       artistName: '吳宗憲',
  //       trackName: '是不是這樣的夜晚你才會這樣的想起我'
  //     },
  //     {
  //       id: 3,
  //       artistName: 'Bruno Mars',
  //       trackName: 'When I Was Your Man'
  //     },
  //     {
  //       id: 4,
  //       artistName: '吳宗憲',
  //       trackName: '是不是這樣的夜晚你才會這樣的想起我'
  //     },
  //     {
  //       id: 5,
  //       artistName: 'YOASOBI',
  //       trackName: '夜に駆ける'
  //     },
  //     {
  //       id: 6,
  //       artistName: '吳宗憲',
  //       trackName: '是不是這樣的夜晚你才會這樣的想起我'
  //     }
  //   ]);
  // }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={50}>
        <VStack spacing={5}>
          <Heading size="lg" fontSize="30px" m={3}>
            {partyName}
          </Heading>
          <Text fontWeight="400" fontSize="20px">
            一共有{' '}
            <Text as="span" m={2} fontSize="25px" fontWeight="bold">
              {tracks.length}
            </Text>{' '}
            首歌：
          </Text>
          <Wrap spacing={5} p={5}>
            {tracks.map(track => (
              <WrapItem>
                <Tag
                  key={track.id}
                  size="lg"
                  borderRadius="2xl"
                  variant="outline"
                  colorScheme={colors[Math.floor(Math.random() * colors.length)]}>
                  <TagLabel>
                    {track.artistName} - {track.trackName}
                  </TagLabel>
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
          <Text fontWeight="400" fontSize="20px">
            題型分配：
          </Text>
          <Text fontWeight="400" fontSize="20px" color="#000088">
            播一首歌{' '}
            <Text as="span" m={2} fontSize="25px" fontWeight="bold">
              {numQuestions1}
            </Text>{' '}
            題 ／ 同時播三首{' '}
            <Text as="span" m={2} fontSize="25px" fontWeight="bold">
              {numQuestions2}
            </Text>{' '}
            題 ／ 倒著播{' '}
            <Text as="span" m={2} fontSize="25px" fontWeight="bold">
              {numQuestions3}
            </Text>{' '}
            題
          </Text>
          <Stack direction="row" spacing={8} align="center" p={7}>
            <HStack spacing={7}>
              <Button
                // as={Link}
                // href="/party/manage"
                colorScheme="red"
                variant="ghost"
                size="lg"
                // TODO:
                disabled
                style={{ textDecoration: 'none' }}>
                刪除
              </Button>
              <Button
                // as={Link}
                // href={`/party/edit/${id}/step/1`}
                colorScheme="blue"
                variant="solid"
                size="lg"
                // TODO:
                disabled
                style={{ textDecoration: 'none' }}>
                修改
              </Button>
              <Button
                as={Link}
                href="/party/manage"
                colorScheme="gray"
                variant="ghost"
                size="lg"
                style={{ textDecoration: 'none' }}>
                了解
              </Button>
            </HStack>
          </Stack>
        </VStack>
      </Grid>
    </Box>
  );
}

export default Party;
