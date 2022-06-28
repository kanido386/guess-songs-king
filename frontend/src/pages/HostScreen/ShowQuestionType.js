import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router';
import { Box, VStack, Grid, Heading, Text } from '@chakra-ui/react';
// import axios from 'axios';

// const { REACT_APP_BACKEND_URL } = process.env;

function ShowQuestionType(props) {
  // const { id } = useParams();
  const { setScreen } = props;
  // const navigate = useNavigate();
  const [secondLeft, setSecondLeft] = useState(2);
  // const [partyName, setPartyName] = useState('');

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (secondLeft > 0) {
        setSecondLeft(secondLeft - 1);
      }
      if (secondLeft === 0) {
        // TODO:
        setScreen(10);
      }
    }, 1000);
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
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={100}>
        <VStack spacing={8}>
          <Box pt={50} pb={11}>
            <Text color="yellow.700">下一題：</Text>
          </Box>
          <Heading size="lg" fontSize="75px" m={7}>
            {/* TODO: */}
            播一首歌
          </Heading>
          <Box pt={30}>
            {/* TODO: */}
            <Text color="pink.700">只播一首歌出來</Text>
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
}

export default ShowQuestionType;