import React, { useEffect } from 'react';
// import React, { useState, useEffect } from 'react';
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
  Link,
  Input
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

function PartyCreate2() {
  // const [tracks, setTracks] = useState([]);

  useEffect(() => {
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

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={50}>
        <VStack spacing={5}>
          <Heading size="lg" fontSize="42px" m={5} mb={0}>
            步驟二、配置題型
          </Heading>
          <HStack>
            <Text fontWeight="400" fontSize="22px">
              還有{' '}
              <Text as="span" m={3} fontSize="30px" color="red">
                5
              </Text>{' '}
              首歌沒被分配到題目哦～
            </Text>
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
              <Input htmlSize={11} width="auto" textAlign="center" placeholder="題數" />
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
              <Input htmlSize={11} width="auto" textAlign="center" placeholder="題數" />
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
              <Input htmlSize={11} width="auto" textAlign="center" placeholder="題數" />
              <Text>題</Text>
            </HStack>
          </Flex>
          <Stack direction="row" spacing={8} align="center" p={7}>
            <HStack spacing={7}>
              <Button
                as={Link}
                href="/party/create/step/1"
                colorScheme="gray"
                variant="ghost"
                size="lg"
                style={{ textDecoration: 'none' }}>
                上一步
              </Button>
              <Button
                as={Link}
                href="/party/manage"
                colorScheme="blue"
                variant="solid"
                size="lg"
                style={{ textDecoration: 'none' }}>
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
