import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Box, VStack, Grid, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';

const { REACT_APP_BACKEND_URL } = process.env;

function ShowPartyName(props) {
  const { id } = useParams();
  const { setScreen, audio } = props;
  // const navigate = useNavigate();
  const [partyName, setPartyName] = useState('');
  const [secondLeft, setSecondLeft] = useState(3);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (secondLeft > 0) {
        setSecondLeft(secondLeft - 1);
      }
      if (secondLeft === 0) {
        // TODO:
        setScreen(8);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    // FIXME:
    audio.play();
    // TODO:
    if (partyName === '的') {
      setScreen(1);
    }
    axios
      .post(`${REACT_APP_BACKEND_URL}/api/v1/party`, {
        partyId: id
      })
      .then(response => {
        setPartyName(response.data.party.name);
      });
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={100}>
        <VStack spacing={8}>
          <Box pt={50} pb={11}>
            <Text color="yellow.700">歡迎來到：</Text>
          </Box>
          <Heading size="lg" fontSize="50px" m={7}>
            {partyName}
          </Heading>
          <Box pt={30}>
            <Text color="yellow.700">歌曲集派對！</Text>
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
}

export default ShowPartyName;
