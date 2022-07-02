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
  // Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
// import { GrTools } from 'react-icons/gr';
import jwt from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const { REACT_APP_BACKEND_URL } = process.env;

let canCreate = false;

function Hint(props) {
  const { tracks, numQ1, numQ2, numQ3 } = props;
  // const numLeft = tracks.length - Number(numQ1) - 3 * Number(numQ2) - Number(numQ3);
  const numLeft = tracks.length - Number(numQ1) - Number(numQ2) - Number(numQ3);
  canCreate = false;

  if (Number(numQ1) < 0 || Number(numQ2) < 0 || Number(numQ3) < 0) {
    return (
      <Text fontWeight="400" fontSize="24.5px" color="red" mt={2}>
        題數不能為負！
      </Text>
    );
  }

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

function PartyCreate3() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const partyName = state.partyNameSent;
  const tracks = state.tracksSent;
  const trackId = state.trackIdSent;
  // const [tracks, setTracks] = useState([]);
  const [numQ1, setNumQ1] = useState(0);
  const [numQ2, setNumQ2] = useState(0);
  const [numQ3, setNumQ3] = useState('');
  const [hostId, setHostId] = useState(0);

  const previousStep = () => {
    navigate('/party/create/step/2', {
      state: {
        partyNameSent: partyName,
        tracksSent: tracks,
        trackIdSent: trackId
      }
    });
  };

  const createParty = async () => {
    // if (tracks.length === 0) {
    //   alert('至少加入一首歌再下一步啦😂');
    //   return;
    // }
    if (!canCreate) {
      // alert('我覺得不行！');
      MySwal.fire({
        icon: 'error',
        title: '我覺得不行',
        text: '配置有誤！'
      });
      return;
    }

    // const isGoingToCreate = confirm('確定先這樣囉？');
    // if (!isGoingToCreate) {
    //   return;
    // }
    MySwal.fire({
      icon: 'question',
      title: 'Nice!',
      text: '確定要建立歌曲集？',
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonText: '確定'
    }).then(async result => {
      if (result.isConfirmed) {
        const response = await axios.post(`${REACT_APP_BACKEND_URL}/api/v1/party/create`, {
          hostId,
          partyName,
          tracks,
          numQ1,
          numQ2,
          numQ3
        });
        console.log(response);
        navigate('/party/manage');
      }
    });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    const { id } = jwt(accessToken);
    setHostId(id);
    // TODO:
    // setNumQ2(0);
    setNumQ3(0);
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={50}>
        <VStack spacing={5}>
          <Heading size="lg" fontSize="42px" m={5} mb={0}>
            步驟三、配置題型
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
              {/* <Input
                htmlSize={11}
                width="auto"
                textAlign="center"
                placeholder="題數"
                value={numQ1}
                onChange={event => setNumQ1(event.currentTarget.value)}
              /> */}
              <NumberInput size="md" maxW={24} defaultValue={0} min={0} max={tracks.length - numQ2}>
                <NumberInputField
                  value={numQ1}
                  disabled
                  _disabled={{
                    color: 'black'
                  }}
                  onChange={event => {
                    const newValue = event.currentTarget.value;
                    if (newValue >= 0 && Number.isInteger(newValue)) {
                      setNumQ1(Number(newValue));
                    } else if (newValue > tracks.length - numQ2) {
                      setNumQ1(tracks.length - numQ2);
                    } else if (newValue < 0) {
                      setNumQ1(0);
                    }
                  }}
                  textAlign="center"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper
                    onClick={() => {
                      if (numQ1 < tracks.length - numQ2) {
                        setNumQ1(prevNum => prevNum + 1);
                      }
                      console.log(numQ1);
                    }}
                  />
                  <NumberDecrementStepper
                    onClick={() => {
                      if (numQ1 > 0) {
                        setNumQ1(prevNum => prevNum - 1);
                      }
                      console.log(numQ1);
                    }}
                  />
                </NumberInputStepper>
              </NumberInput>
              <Text>題</Text>
            </HStack>
          </Flex>
          {/* <Flex>
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
              <HStack pr={9} fontSize={15}>
                <Text letterSpacing={5}>開發中</Text>
                <GrTools />
              </HStack>
            </HStack>
          </Flex> */}
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
              {/* <Input
                htmlSize={11}
                width="auto"
                textAlign="center"
                placeholder="題數"
                value={numQ3}
                onChange={event => setNumQ3(event.currentTarget.value)}
              /> */}
              <NumberInput size="md" maxW={24} defaultValue={0} min={0} max={tracks.length - numQ1}>
                <NumberInputField
                  value={numQ2}
                  disabled
                  _disabled={{
                    color: 'black'
                  }}
                  onChange={event => {
                    const newValue = event.currentTarget.value;
                    if (newValue >= 0 && Number.isInteger(newValue)) {
                      setNumQ2(Number(newValue));
                    } else if (newValue > tracks.length - numQ1) {
                      setNumQ2(tracks.length - numQ1);
                    } else if (newValue < 0) {
                      setNumQ2(0);
                    }
                  }}
                  textAlign="center"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper
                    onClick={() => {
                      if (numQ2 < tracks.length - numQ1) {
                        setNumQ2(prevNum => prevNum + 1);
                      }
                      console.log(numQ2);
                    }}
                  />
                  <NumberDecrementStepper
                    onClick={() => {
                      if (numQ2 > 0) {
                        setNumQ2(prevNum => prevNum - 1);
                      }
                      console.log(numQ2);
                    }}
                  />
                </NumberInputStepper>
              </NumberInput>
              <Text>題</Text>
              {/* <HStack pr={9} fontSize={15}>
                <Text letterSpacing={5}>開發中</Text>
                <GrTools />
              </HStack> */}
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

export default PartyCreate3;
