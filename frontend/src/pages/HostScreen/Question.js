/* eslint-disable consistent-return */

import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Box,
  Grid,
  Button,
  // Link,
  CircularProgress,
  CircularProgressLabel,
  GridItem,
  Text,
  Wrap,
  // OrderedList,
  // ListItem
  WrapItem,
  Tag,
  TagLabel,
  VStack,
  Spinner
} from '@chakra-ui/react';
import axios from 'axios';
// TODO: 簡體轉繁體
// import { tify } from 'chinese-conv';
// import io from 'socket.io-client';
// import ReactAudioPlayer from 'react-audio-player';
import SocketContext from '../../context/socket';
import HostFooter from './components/HostFooter';

const { REACT_APP_AUDIO_PROCESSOR_URL } = process.env;
// const socket = io.connect(REACT_APP_BACKEND_URL);

// function Marking() {
//   return (
//     <Box textAlign="center" fontSize="xl">
//       <PlayerHeader
//         currentQuestion={currentQuestion}
//         totalQuestion={numQuestions}
//         type="正常版"
//       />
//       <Grid minH="80vh" p={50}>
//         <VStack spacing={5} marginTop="25vh">
//           <Spinner thickness="11px" speed="1s" emptyColor="gray.200" color="blue.500" size="xl" />
//           <Text fontSize="22px">{greeting}</Text>
//         </VStack>
//       </Grid>
//       {/* TODO: */}
//       <PlayerFooter nickname={nickname} hasScore score={score} />
//     </Box>
//   );
// }

function Question(props) {
  const { setScreen, audio, currentQuestion, tracks, pin, players, setPlayers } = props;
  const socket = useContext(SocketContext);
  // const [players, setPlayers] = useState([]);
  // FIXME:
  // const [secondLeft, setSecondLeft] = useState(30);
  // https://stackoverflow.com/questions/67270055/react-state-is-empty-inside-useeffect
  const [secondLeft, _setSecondLeft] = useState(30);
  const secondLeftRef = useRef(secondLeft);
  const setSecondLeft = data => {
    secondLeftRef.current = data;
    _setSecondLeft(data);
  };
  const [numAnswer, setNumAnswer] = useState(0);
  const [numPlayer, setNumPlayer] = useState(0);
  // TODO: 記錄批改狀況
  const [playerSubmits, setPlayerSubmits] = useState([]);
  const [urls, setUrls] = useState([]);

  const clearAnswersOfPlayers = () => {
    players.map(player => {
      player.currentArtistName = null;
      player.currentTrackName = null;
      return player;
    });
  };

  const seeAnswer = async () => {
    clearAnswersOfPlayers();
    // TODO:
    for (let i = 0; i < playerSubmits.length; i += 1) {
      if (playerSubmits[i].getScore >= 300) {
        console.log(`playerSubmits[i].nickname: ${playerSubmits[i].nickname}`);
        // TODO:
        socket.emit('nice-try', {
          pin,
          id: playerSubmits[i].id,
          getScore: playerSubmits[i].getScore
        });
      } else {
        console.log(`playerSubmits[i].nickname: ${playerSubmits[i].nickname}`);
        // TODO:
        socket.emit('bad-try', {
          pin,
          id: playerSubmits[i].id,
          getScore: playerSubmits[i].getScore
        });
      }
    }
    // FIXME: bad...
    setPlayers(prevPlayers => {
      for (let i = 0; i < prevPlayers.length; i += 1) {
        let notSubmit = true;
        for (let j = 0; j < playerSubmits.length; j += 1) {
          if (prevPlayers[i].id === playerSubmits[j].id) {
            notSubmit = false;
            break;
          }
        }
        if (notSubmit) {
          socket.emit('question-done-one', {
            // pin,
            id: prevPlayers[i].id
          });
        }
      }
      return prevPlayers;
    });
    setScreen(12);
  };

  const checkAnswerNew = (
    second,
    artist,
    track,
    submittedUrls,
    artistAnswer,
    trackAnswer,
    urlsAnswer
  ) => {
    let hasSame = false;
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        if (submittedUrls[i] === urlsAnswer[j]) {
          hasSame = true;
          break;
        }
      }
    }
    if (hasSame) {
      // TODO:
      return 400 + 20 * second;
    }

    let count = 0;
    const s1 = `${artistAnswer}${trackAnswer}`;
    const s2 = `${artist}${track}`;
    const str1 = s1.replace(' ', '').toLowerCase();
    const str2 = s2.replace(' ', '').toLowerCase();
    for (let i = 0; i < str1.length; i += 1) {
      for (let j = 0; j < str2.length; j += 1) {
        if (str1[i] === str2[j]) {
          count += 1;
          break;
        }
      }
    }
    return Math.round(300 * (count / s1.length));
  };

  const markAnswerJob = async () => {
    console.log(urls);
    console.log(playerSubmits);
    setPlayers(prevPlayers => {
      setPlayerSubmits(prevSubmits => {
        // 第一個是 answer 的
        for (let i = 1; i < urls.length; i += 1) {
          // console.log(urls[i].id);
          const index = prevSubmits.findIndex(s => s.id === urls[i].id);
          // TODO:
          const { currentArtistName, currentTrackName } = prevSubmits[index];
          const playerSecondLeft = prevSubmits[index].secondLeft;
          const { submittedUrls } = urls[i];
          const getScore = checkAnswerNew(
            playerSecondLeft,
            currentArtistName,
            currentTrackName,
            submittedUrls,
            tracks[currentQuestion].artistName,
            tracks[currentQuestion].trackName,
            urls.find(u => u.id === 'answer').submittedUrls
          );
          prevSubmits[index].getScore = getScore;
          const index2 = prevPlayers.findIndex(p => p.id === urls[i].id);
          prevPlayers[index2].score += getScore;
        }
        // setPlayers(prevPlayers => {
        //   if (
        //     urls.length === prevPlayers.length ||
        //     (numAnswer === prevPlayers.length && urls.length === prevSubmits.length)
        //   ) {
        //     markAnswer();
        //   }
        //   return prevPlayers;
        // });
        return prevSubmits;
      });
      return prevPlayers;
    });
  };

  const markAnswer = async () => {
    audio.pause();
    markAnswerJob().then(() => {
      seeAnswer();
    });
  };

  const get3Urls = async (id, artistName, trackName) => {
    axios
      .post(`${REACT_APP_AUDIO_PROCESSOR_URL}/api/v1/3_urls`, {
        query: `${artistName} ${trackName}`
        // artist_name: artistName,
        // track_name: trackName
      })
      .then(response => {
        // console.log(`get3Urls: ${response.data.data}`);
        setUrls(preUrls => {
          // console.log(preUrls);
          // console.log(urls);
          return [
            ...preUrls,
            {
              id,
              submittedUrls: response.data.data
            }
          ];
        });
        // return response.data.data;
      });
  };

  // const checkAnswer = (s1, s2) => {
  //   let count = 0;
  //   // const str1 = tify(s1);
  //   // const str2 = tify(s2);
  //   // get3Urls(s1);
  //   const str1 = s1.replace(' ', '').toLowerCase();
  //   const str2 = s2.replace(' ', '').toLowerCase();
  //   for (let i = 0; i < str1.length; i += 1) {
  //     for (let j = 0; j < str2.length; j += 1) {
  //       if (str1[i] === str2[j]) {
  //         count += 1;
  //         break;
  //       }
  //     }
  //   }
  //   return count;
  // };

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (secondLeft > 0) {
        setSecondLeft(secondLeft - 1);
      }
      if (secondLeft === 0) {
        // TODO:
        // markAnswer();
        setPlayers(prevPlayers => {
          setNumAnswer(prevPlayers.length);
          return prevPlayers;
        });
        // FIXME:
        // socket.emit('question-done', {
        //   pin
        // });

        // setScreen(12);
        // socket.emit('get-ready', {
        //   pin
        // });
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    audio.play();
    setPlayers(prevPlayers => {
      setNumPlayer(prevPlayers.length);
      return prevPlayers;
    });
    // FIXME:
    get3Urls('answer', tracks[currentQuestion].artistName, tracks[currentQuestion].trackName);
  }, []);

  // FIXME:
  // useEffect(() => {
  //   setPlayers(prevPlayers => {
  //     if (numAnswer === prevPlayers.length) {
  //       markAnswer();
  //     }
  //     return prevPlayers;
  //   });
  // }, [numAnswer]);
  useEffect(() => {
    setPlayerSubmits(prevSubmits => {
      setPlayers(prevPlayers => {
        if (
          urls.length - 1 === prevPlayers.length ||
          (numAnswer === prevPlayers.length && urls.length - 1 === prevSubmits.length)
        ) {
          markAnswer();
        }
        return prevPlayers;
      });
      return prevSubmits;
    });
  }, [urls, numAnswer]);

  // useEffect(() => {
  //   socket.emit('send', {
  //     room: '123',
  //     message: 'wow!!!'
  //   });
  // }, []);

  useEffect(() => {
    socket.on('new-answer-in', data => {
      // console.log('==============================');
      // console.log(data);
      get3Urls(data.id, data.artistName, data.trackName);
      // setUrls(tempUrls);
      // console.log(urls);
      // console.log('==============================');
    });

    socket.on('new-answer-in', data => {
      // console.log(data);
      setNumAnswer(num => num + 1);
      setPlayers(prevPlayers => {
        // FIXME: 亂糟糟...
        const index = prevPlayers.findIndex(p => p.id === data.id);
        prevPlayers[index].currentArtistName = data.artistName;
        prevPlayers[index].currentTrackName = data.trackName;
        setPlayerSubmits(prevSubmits => {
          // FIXME:
          // const correctAnswer = `${tracks[currentQuestion].artistName}${tracks[currentQuestion].trackName}`;
          // const playerAnser = `${data.artistName}${data.trackName}]`;
          // // alert(secondLeftRef.current);
          // // TODO:
          // let x = checkAnswer(correctAnswer, playerAnser) / (correctAnswer.length * 0.75);
          // x = x > 1 ? 1 : x;
          // const getScore = Math.round((30 * secondLeftRef.current + 100) * (-1 * x * x + 2 * x));
          // console.log(getScore);
          // // FIXME: 亂糟糟...
          // prevPlayers[index].score += getScore;
          return [
            ...prevSubmits,
            {
              id: data.id,
              nickname: prevPlayers.find(p => p.id === data.id).nickname,
              currentArtistName: data.artistName,
              currentTrackName: data.trackName,
              // FIXME:
              // getScore
              secondLeft: secondLeftRef.current,
              getScore: 0
            }
          ];
        });
        // // 查看有無重複暱稱
        // if (prevPlayers.some(p => p.nickname === data.nickname)) {
        //   console.log('error');
        //   socket.emit('add-player-error', {
        //     id: data.id
        //   });
        //   return [...prevPlayers];
        // }

        // socket.emit('add-player-success', {
        //   id: data.id,
        //   // TODO:
        //   partyId: id
        // });
        return prevPlayers;
      });
    });
  }, [socket]);

  // useEffect(() => {
  //   socket.on('add-player', data => {
  //     setPlayers(prev => [
  //       ...prev,
  //       {
  //         id: data.id,
  //         nickname: data.nickname
  //       }
  //     ]);
  //   });
  // }, [socket]);

  // useEffect(() => {
  //   // TODO:
  //   setPlayers([]);

  //   console.log(socket.id);

  //   socket.emit('init-game', {
  //     pin,
  //     id: socket.id
  //   });
  // }, [socket]);

  return (
    <Box textAlign="center" fontSize="xl">
      <Box
        // bg={useColorModeValue('gray.50', 'gray.900')}
        // color={useColorModeValue('gray.700', 'gray.200')}
        minH="80vh"
        mt="50px">
        <Grid templateColumns="repeat(3, 1fr)" gap={6} minH="30vh">
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            {/* <Text fontWeight="bold">👤 {players.length}</Text> */}
          </GridItem>
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            <Text fontWeight="bold" fontSize="30px">
              {/* TODO: */}
              請問這是哪一首歌呢？
            </Text>
          </GridItem>
          <GridItem w="100%" h="9vh" lineHeight="9vh">
            <Button
              // as={Link}
              // href={`/host/game/${id}`}
              // style={{ textDecoration: 'none' }}
              // FIXME:
              onClick={() => {
                setPlayers(prevPlayers => {
                  setNumAnswer(prevPlayers.length);
                  return prevPlayers;
                });
              }}
              // onClick={markAnswer}
              colorScheme="blue">
              略過
            </Button>
          </GridItem>
        </Grid>
        {numAnswer === numPlayer ? (
          <VStack spacing={5} marginTop="0vh">
            <Spinner thickness="11px" speed="1s" emptyColor="gray.200" color="blue.500" size="xl" />
            <Text fontSize="22px">批改中請稍等～</Text>
          </VStack>
        ) : (
          <Grid templateColumns="repeat(5, 1fr)" gap={0}>
            {/* <Grid templateColumns="repeat(3, 1fr)" gap={0}> */}
            {/* <GridItem w="100%" h="9vh" lineHeight="9vh" alignItems="center"> */}
            <GridItem colSpan={1} h="9vh" lineHeight="9vh" alignItems="center">
              {/* <Text fontWeight="bold" fontSize="50px">
              30
            </Text> */}
              <CircularProgress value={(100 / 30) * secondLeft} color="green.400" size="100px">
                <CircularProgressLabel fontWeight="bold" fontSize="30px">
                  {secondLeft}
                </CircularProgressLabel>
              </CircularProgress>
            </GridItem>

            {/* <GridItem w="100%" h="9vh" lineHeight="9vh"> */}
            <GridItem colSpan={3} h="9vh" lineHeight="9vh">
              {/* <ReactAudioPlayer
              // TODO:
              src="url"
              controls
            /> */}
              <VStack spacing={3}>
                <Wrap spacing={3} p={0}>
                  {/* <OrderedList> */}
                  {playerSubmits.length === 0 ? (
                    <Text fontSize="22px">玩家努力猜歌中…</Text>
                  ) : (
                    playerSubmits.map(playerSubmit => {
                      return (
                        <WrapItem>
                          <Tag
                            key={playerSubmit.id}
                            size="lg"
                            borderRadius="2xl"
                            // colorScheme={colors[Math.floor(Math.random() * colors.length)]}
                            variant="outline">
                            <TagLabel>
                              【{playerSubmit.nickname}】{playerSubmit.currentArtistName} -{' '}
                              {playerSubmit.currentTrackName}
                            </TagLabel>
                          </Tag>
                        </WrapItem>
                      );
                    })
                  )}
                </Wrap>
              </VStack>
              {/* </OrderedList> */}
            </GridItem>
            {/* <GridItem w="100%" h="9vh" lineHeight="9vh"> */}
            <GridItem colSpan={1} h="9vh" lineHeight="9vh">
              <Text fontWeight="bold" fontSize="30px">
                {numAnswer}
              </Text>
              回答數
            </GridItem>
          </Grid>
        )}
      </Box>
      {/* TODO: */}
      <HostFooter
        currentQuestion={currentQuestion + 1}
        totalQuestion={tracks.length}
        gamePin={pin}
      />
    </Box>
  );
}

export default Question;
