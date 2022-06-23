/* eslint-disable no-restricted-globals */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  VStack,
  HStack,
  Flex,
  Text,
  Tooltip,
  Grid,
  Spacer,
  Heading,
  Button,
  Stack,
  Input
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

let canCreate = false;

function Hint(props) {
  const { tracks, numQ1, numQ2, numQ3 } = props;
  const numLeft = tracks.length - Number(numQ1) - 3 * Number(numQ2) - Number(numQ3);
  canCreate = false;

  if (numQ1 === '' || numQ2 === '' || numQ3 === '' || !Number.isInteger(numLeft)) {
    return (
      <Text fontWeight="400" fontSize="24.5px" color="red" mt={2}>
        題數要是整數啊！
      </Text>
    );
  }

  if (numLeft === 0) {
    canCreate = true;
    return (
      <Text fontWeight="400" fontSize="24.5px" color="#22aa33" mt={2}>
        這配置我給過！
      </Text>
    );
  }

  if (numLeft < 0) {
    return (
      <Text fontWeight="400" fontSize="24.5px" color="brown" mt={2}>
        歌曲數不夠，回上一步加入新歌曲吧！
      </Text>
    );
  }
  return (
    <Text fontWeight="400" fontSize="22px">
      還有{' '}
      <Text as="span" m={3} fontSize="30px" color="red">
        {numLeft}
      </Text>{' '}
      首歌沒被分配到題目哦～
    </Text>
  );
}

function PartyCreate2() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const tracks = state.tracksSent;
  const trackId = state.trackIdSent;
  // const [tracks, setTracks] = useState([]);
  const [numQ1, setNumQ1] = useState(0);
  const [numQ2, setNumQ2] = useState(0);
  const [numQ3, setNumQ3] = useState(0);

  useEffect(() => {
    console.log(tracks);
    // TODO: Get tracks from API
    // setTracks([
    //   {
    //     id: 1,
    //     artistName: '韋禮安',
    //     trackName: '如果可以'
    //   },
    //   {
    //     id: 2,
    //     artistName: '吳宗憲',
    //     trackName: '是不是這樣的夜晚你才會這樣的想起我'
    //   }
    // ]);
  }, []);

  function previousStep() {
    navigate('/party/create/step/1', {
      state: {
        tracksSent: tracks,
        trackIdSent: trackId
      }
    });
  }

  function createParty() {
    // if (tracks.length === 0) {
    //   alert('至少加入一首歌再下一步啦😂');
    //   return;
    // }
    if (!canCreate) {
      alert('我覺得不行！');
      return;
    }

    const isGoingToCreate = confirm('確定先這樣囉？');
    if (!isGoingToCreate) {
      return;
    }

    console.log(tracks);
    console.log(numQ1);
    console.log(numQ2);
    console.log(numQ3);
    // navigate('/party/manage');
  }

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={50}>
        <VStack spacing={5}>
          <Heading size="lg" fontSize="42px" m={5} mb={0}>
            步驟二、配置題型
          </Heading>
          <HStack>
            <Hint tracks={tracks} numQ1={numQ1} numQ2={numQ2} numQ3={numQ3} />
            {/* <Text fontWeight="400" fontSize="22px">
              還有{' '}
              <Text as="span" m={3} fontSize="30px" color="red">
                {tracks.length -
                  parseInt(numQ1, 10) -
                  3 * parseInt(numQ2, 10) -
                  parseInt(numQ3, 10)}
              </Text>{' '}
              首歌沒被分配到題目哦～
            </Text> */}
          </HStack>
          {/* FIXME: 一定有更好的寫法 */}
          <Flex>
            <HStack p={5} borderWidth="1px" boxShadow="sm" w={600} spacing={5}>
              <Tooltip label="只播一首歌出來" fontSize="sm" placement="top-start">
                <InfoOutlineIcon cursor="pointer" />
              </Tooltip>
              <Text>播一首歌</Text>
              <Text fontSize="18px" color="blue">
                (每題需要 1 首歌)
              </Text>
              <Spacer />
              <Input
                htmlSize={11}
                width="auto"
                textAlign="center"
                placeholder="題數"
                value={numQ1}
                onChange={event => setNumQ1(event.currentTarget.value)}
              />
              <Text>題</Text>
            </HStack>
          </Flex>
          <Flex>
            <HStack p={5} borderWidth="1px" boxShadow="sm" w={600} spacing={5}>
              <Tooltip
                label="同時播三首歌出來，玩家得選出沒在裡面的歌曲"
                fontSize="sm"
                placement="top-start">
                <InfoOutlineIcon cursor="pointer" />
              </Tooltip>
              <Text>同時播三首</Text>
              <Text fontSize="18px" color="blue">
                (每題需要 3 首歌)
              </Text>
              <Spacer />
              <Input
                htmlSize={11}
                width="auto"
                textAlign="center"
                placeholder="題數"
                value={numQ2}
                onChange={event => setNumQ2(event.currentTarget.value)}
              />
              <Text>題</Text>
            </HStack>
          </Flex>
          <Flex>
            <HStack p={5} borderWidth="1px" boxShadow="sm" w={600} spacing={5}>
              <Tooltip label="音檔會經過 reverse 處理" fontSize="sm" placement="top-start">
                <InfoOutlineIcon cursor="pointer" />
              </Tooltip>
              <Text>倒著播</Text>
              <Text fontSize="18px" color="blue">
                (每題需要 1 首歌)
              </Text>
              <Spacer />
              <Input
                htmlSize={11}
                width="auto"
                textAlign="center"
                placeholder="題數"
                value={numQ3}
                onChange={event => setNumQ3(event.currentTarget.value)}
              />
              <Text>題</Text>
            </HStack>
          </Flex>
          <Stack direction="row" spacing={8} align="center" p={7}>
            <HStack spacing={7}>
              <Button onClick={previousStep} colorScheme="gray" variant="ghost" size="lg">
                上一步
              </Button>
              <Button onClick={createParty} colorScheme="blue" variant="solid" size="lg">
                建立歌曲集
              </Button>
            </HStack>
          </Stack>
        </VStack>
      </Grid>
    </Box>
  );
}

export default PartyCreate2;
