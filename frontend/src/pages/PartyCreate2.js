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
  Text,
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
import { StarIcon, RepeatIcon } from '@chakra-ui/icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const { REACT_APP_AUDIO_PROCESSOR_URL } = process.env;

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

const makeRandomColor = () => {
  // let c = '';
  // while (c.length < 6) {
  //   c += Math.random().toString(16).substr(-6).substr(-1);
  // }
  // return `#${c}`;

  // Javascript - Generate random dark color
  // https://stackoverflow.com/questions/20114469/javascript-generate-random-dark-color
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += Math.floor(Math.random() * 10);
  }
  return color;
};

function PartyCreate2() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const artistInputRef = useRef(null);
  const [tracks, setTracks] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [trackName, setTrackName] = useState('');
  const [trackId, setTrackId] = useState(0);
  const [partyName, setPartyName] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [kkboxTracks, setKkboxTracks] = useState([]);
  const [mode, setMode] = useState(1);
  const [options, setOptions] = useState([]);

  const getPlaylists = async numPlaylists => {
    axios
      .post(`${REACT_APP_AUDIO_PROCESSOR_URL}/api/v1/playlists_new`, {
        num_playlists: numPlaylists
      })
      .then(response => {
        console.log(response.data.data);
        setPlaylists(response.data.data);
      });
  };

  const getKkboxTracks = async (playlistId, numTracks) => {
    axios
      .post(`${REACT_APP_AUDIO_PROCESSOR_URL}/api/v1/tracks_new`, {
        playlist_id: playlistId,
        num_tracks: numTracks
      })
      .then(response => {
        console.log(response.data.data);
        setKkboxTracks(response.data.data);
      });
  };

  const addTrack = () => {
    if (artistName === '' || trackName === '') {
      // alert('「誰的」和「歌名」都要輸入哦～');
      // FIXME: 按 Enter 會一直跳視窗
      MySwal.fire({
        icon: 'info',
        title: '提示',
        text: '「誰的」和「歌名」都要輸入哦～',
        allowEnterKey: false,
        stopKeydownPropagation: true
      });
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
  };

  const addTrackFromKkbox = (artistNameTemp, trackNameTemp) => {
    setTrackId(trackId + 1);
    console.log(trackId);
    setTracks(prevTracks => [
      ...prevTracks,
      {
        id: trackId,
        artistName: artistNameTemp,
        trackName: trackNameTemp,
        color: colors[Math.floor(Math.random() * colors.length)]
      }
    ]);
  };

  const handleKeydown = e => {
    // it triggers by pressing the enter key
    if (e.keyCode === 13) {
      addTrack();
    }
  };

  const removeTrack = id => {
    // it triggers by pressing the enter key
    setTracks(prevTracks => prevTracks.filter(t => t.id !== id));
  };

  const previousStep = () => {
    // if (tracks.length !== 0) {
    //   const isGoingToExit = confirm('辛苦輸入的歌曲們都會不見哦！確定要離開？');
    //   if (!isGoingToExit) {
    //     return;
    //   }
    // }
    navigate('/party/create/step/1', {
      state: {
        partyNameSent: partyName,
        tracksSent: tracks,
        trackIdSent: trackId
      }
    });
  };

  const nextStep = () => {
    if (tracks.length === 0) {
      // alert('至少加入一首歌再下一步啦😂');
      MySwal.fire({
        icon: 'info',
        title: '提示',
        text: '至少加入一首歌再下一步啦😂',
        stopKeydownPropagation: true
      });
      return;
    }
    navigate('/party/create/step/3', {
      state: {
        partyNameSent: partyName,
        tracksSent: tracks,
        trackIdSent: trackId
      }
    });
  };

  useEffect(() => {
    if (state) {
      setPartyName(state.partyNameSent);
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

  useEffect(() => {
    getPlaylists(5);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown, false);
  }, [artistName, trackName]);

  useEffect(() => {
    // TODO:
    setMode(1);
    setOptions(playlists);
    console.log(options);
  }, [playlists]);

  useEffect(() => {
    // TODO:
    setMode(2);
    setOptions(kkboxTracks);
    console.log(options);
  }, [kkboxTracks]);

  useEffect(() => {
    if (mode === 1) {
      setOptions(playlists);
    } else if (mode === 2) {
      setOptions(kkboxTracks);
    }
  }, [mode]);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={50}>
        <VStack spacing={5}>
          <Heading size="lg" fontSize="42px" m={5}>
            步驟二、選定歌曲
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
              onKeyDown={handleKeydown}
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
                <DrawerHeader>{mode === 1 ? 'KKBOX 排行榜' : `${currentPlaylist[1]}`}</DrawerHeader>
                <DrawerBody>
                  {/* <Input placeholder="Type here..." /> */}
                  {/* <Text>功能開發中，請耐心等候😅</Text> */}
                  {/* {playlists.map(playlist => ( */}
                  {options.map(option => (
                    <Stack
                      // TODO:
                      onClick={() => {
                        if (mode === 1) {
                          const playlistId = option[0];
                          setCurrentPlaylist(option);
                          getKkboxTracks(playlistId, 5);
                        } else if (mode === 2) {
                          addTrackFromKkbox(option[0], option[1]);
                        }
                      }}
                      p="5"
                      boxShadow="sm"
                      m="3"
                      borderWidth="1px"
                      borderRadius="sm"
                      w={250}
                      cursor="pointer"
                      _hover={{
                        bg: 'gray.100'
                      }}>
                      {mode === 1 ? (
                        <Text color="blue.700" fontWeight="400" fontSize="15px">
                          {option[1]}
                        </Text>
                      ) : (
                        <Text
                          // textShadow="1px 1px 1px black;"
                          color={makeRandomColor}
                          fontWeight="400"
                          fontSize="15px">
                          {`${option[0]} - ${option[1]}`}
                        </Text>
                      )}
                    </Stack>
                  ))}
                </DrawerBody>

                <DrawerFooter>
                  {mode === 1 ? (
                    <Button variant="outline" mr={3} p={5} onClick={onClose}>
                      關閉
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      mr={3}
                      p={5}
                      onClick={() => {
                        // getPlaylists(5);
                        setMode(1);
                      }}>
                      重選排行榜
                    </Button>
                  )}
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      if (mode === 1) {
                        getPlaylists(5);
                      } else if (mode === 2) {
                        getKkboxTracks(currentPlaylist[0], 5);
                      }
                    }}>
                    換一批&nbsp;
                    <RepeatIcon />
                  </Button>
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
              <Button onClick={previousStep} colorScheme="gray" variant="ghost" size="lg">
                上一步
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

export default PartyCreate2;
