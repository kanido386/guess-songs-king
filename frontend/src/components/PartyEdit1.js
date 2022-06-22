import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import {
  Box,
  VStack,
  HStack,
  Grid,
  Heading,
  Button,
  Stack,
  Link,
  Input,
  Tooltip,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

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

function PartyEdit1() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    // TODO: Get tracks from API
    console.log(id);
    setTracks([
      {
        id: 1,
        artistName: '韋禮安',
        trackName: '如果可以'
      },
      {
        id: 2,
        artistName: '吳宗憲',
        trackName: '是不是這樣的夜晚你才會這樣的想起我'
      },
      {
        id: 3,
        artistName: 'Bruno Mars',
        trackName: 'When I Was Your Man'
      },
      {
        id: 4,
        artistName: '吳宗憲',
        trackName: '是不是這樣的夜晚你才會這樣的想起我'
      },
      {
        id: 5,
        artistName: 'YOASOBI',
        trackName: '夜に駆ける'
      },
      {
        id: 6,
        artistName: '吳宗憲',
        trackName: '是不是這樣的夜晚你才會這樣的想起我'
      }
    ]);
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={50}>
        <VStack spacing={5}>
          <Heading size="lg" fontSize="42px" m={5}>
            步驟一、修改歌曲
          </Heading>
          <HStack>
            <Input htmlSize={22} width="auto" textAlign="center" placeholder="誰的" />
            <Input htmlSize={42} width="auto" textAlign="center" placeholder="歌名" />
            <Button colorScheme="teal" variant="ghost" size="lg">
              加入
            </Button>
            <Button colorScheme="yellow" variant="ghost" size="md" ref={btnRef} onClick={onOpen}>
              <Tooltip label="給點建議" fontSize="sm" placement="top-start">
                <StarIcon />
              </Tooltip>
            </Button>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create your account</DrawerHeader>

                <DrawerBody>
                  <Input placeholder="Type here..." />
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue">Save</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </HStack>
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
                  <TagCloseButton />
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
          <Stack direction="row" spacing={8} align="center" p={7}>
            <HStack spacing={7}>
              <Button
                as={Link}
                href={`/party/${id}`}
                colorScheme="gray"
                variant="ghost"
                size="lg"
                style={{ textDecoration: 'none' }}>
                取消
              </Button>
              <Button
                as={Link}
                href={`/party/edit/${id}/step/2`}
                colorScheme="blue"
                variant="solid"
                size="lg"
                style={{ textDecoration: 'none' }}>
                下一步
              </Button>
            </HStack>
          </Stack>
        </VStack>
      </Grid>
    </Box>
  );
}

export default PartyEdit1;
