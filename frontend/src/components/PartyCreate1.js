/* eslint-disable no-restricted-globals */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  VStack,
  HStack,
  Grid,
  Heading,
  Button,
  Stack,
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

function PartyCreate1() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { state } = useLocation();
  const btnRef = useRef();
  const artistInputRef = useRef(null);
  const [tracks, setTracks] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [trackName, setTrackName] = useState('');
  const [trackId, setTrackId] = useState(0);

  function addTrack() {
    if (artistName === '' || trackName === '') {
      alert('「誰的」和「歌名」都要輸入哦～');
      return;
    }
    setTrackId(trackId + 1);
    console.log(trackId);
    setTracks(prevTracks => [
      ...prevTracks,
      {
        id: trackId,
        artistName,
        trackName,
        color: colors[Math.floor(Math.random() * colors.length)]
      }
    ]);
    setArtistName('');
    setTrackName('');
    artistInputRef.current.focus();
  }

  const handleKeypress = e => {
    // it triggers by pressing the enter key
    if (e.keyCode === 13) {
      addTrack();
    }
  };

  const removeTrack = id => {
    // it triggers by pressing the enter key
    setTracks(prevTracks => prevTracks.filter(t => t.id !== id));
  };

  useEffect(() => {
    window.addEventListener('keypress', handleKeypress);
    return () => window.removeEventListener('keypress', handleKeypress, false);
  }, [artistName, trackName]);

  function backToManage() {
    if (tracks.length !== 0) {
      const isGoingToExit = confirm('辛苦輸入的歌曲們都會不見哦！確定要離開？');
      if (!isGoingToExit) {
        return;
      }
    }
    navigate('/party/manage');
  }

  function nextStep() {
    if (tracks.length === 0) {
      alert('至少加入一首歌再下一步啦😂');
      return;
    }
    navigate('/party/create/step/2', {
      state: {
        tracksSent: tracks,
        trackIdSent: trackId
      }
    });
  }

  useEffect(() => {
    if (state) {
      setTracks(state.tracksSent);
      setTrackId(state.trackIdSent);
    }
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
    //   },
    //   {
    //     id: 3,
    //     artistName: 'Bruno Mars',
    //     trackName: 'When I Was Your Man'
    //   },
    //   {
    //     id: 4,
    //     artistName: '吳宗憲',
    //     trackName: '是不是這樣的夜晚你才會這樣的想起我'
    //   },
    //   {
    //     id: 5,
    //     artistName: 'YOASOBI',
    //     trackName: '夜に駆ける'
    //   },
    //   {
    //     id: 6,
    //     artistName: '吳宗憲',
    //     trackName: '是不是這樣的夜晚你才會這樣的想起我'
    //   }
    // ]);
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={50}>
        <VStack spacing={5}>
          <Heading size="lg" fontSize="42px" m={5}>
            步驟一、選定歌曲
          </Heading>
          <HStack>
            <Input
              htmlSize={22}
              width="auto"
              textAlign="center"
              placeholder="誰的"
              value={artistName}
              ref={artistInputRef}
              onChange={event => setArtistName(event.currentTarget.value)}
            />
            <Input
              htmlSize={42}
              width="auto"
              textAlign="center"
              placeholder="歌名"
              value={trackName}
              onChange={event => setTrackName(event.currentTarget.value)}
            />
            <Button
              onClick={addTrack}
              onKeyPress={handleKeypress}
              colorScheme="teal"
              variant="ghost"
              size="lg">
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
                  // colorScheme={colors[Math.floor(Math.random() * colors.length)]}>
                  colorScheme={track.color}>
                  <TagLabel>
                    {track.artistName} - {track.trackName}
                  </TagLabel>
                  <TagCloseButton onClick={() => removeTrack(track.id)} />
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
          <Stack direction="row" spacing={8} align="center" p={7}>
            <HStack spacing={7}>
              <Button onClick={backToManage} colorScheme="gray" variant="ghost" size="lg">
                離開
              </Button>
              <Button onClick={nextStep} colorScheme="blue" variant="solid" size="lg">
                下一步
              </Button>
            </HStack>
          </Stack>
        </VStack>
      </Grid>
    </Box>
  );
}

export default PartyCreate1;
