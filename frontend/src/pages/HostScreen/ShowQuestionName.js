import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router';
import { Box, VStack, Grid, Heading, Text, GridItem } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/progress';
// import axios from 'axios';

// const { REACT_APP_BACKEND_URL } = process.env;

function ShowQuestionName(props) {
  const { setScreen, currentQuestion, tracks } = props;
  // const { id } = useParams();
  // const navigate = useNavigate();
  // const [partyName, setPartyName] = useState('');
  // TODO:
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (progressValue < 100) {
        setProgressValue(progressValue + 0.5);
      } else {
        setScreen(11);
      }
    }, 11);
    return () => {
      clearInterval(myInterval);
    };
  });

  // useEffect(() => {
  //   axios
  //     .post(`${REACT_APP_BACKEND_URL}/api/v1/party`, {
  //       partyId: id
  //     })
  //     .then(response => {
  //       setPartyName(response.data.party.name);
  //     });
  // }, []);

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem w="100%" h="9vh" lineHeight="9vh" />
        <GridItem w="100%" h="9vh" lineHeight="9vh" />
        <GridItem w="100%" h="9vh" lineHeight="9vh" />
        <GridItem w="100%" h="9vh" lineHeight="9vh" />
        <GridItem w="100%" h="9vh" lineHeight="9vh">
          {/* TODO: */}
          <Text fontSize="42px" pt={10} pl={5} letterSpacing={3}>
            {currentQuestion + 1} / {tracks.length}
          </Text>
        </GridItem>
      </Grid>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="75vh" p={100}>
          <VStack spacing={8}>
            <Box pt={30} pb={11}>
              <Text color="yellow.700">題目：</Text>
            </Box>
            <Heading size="lg" fontSize="50px" m={7}>
              {/* TODO: */}
              請問這是哪一首歌呢？
            </Heading>
          </VStack>
        </Grid>
      </Box>
      {/* https://github.com/chakra-ui/chakra-ui/tree/main/packages/progress */}
      <Progress
        ml="30px"
        mr="30px"
        color="green"
        size="md"
        hasStripe
        isAnimated
        value={progressValue}
      />
    </>
  );
}

export default ShowQuestionName;
