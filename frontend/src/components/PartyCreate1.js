/* eslint-disable no-restricted-globals */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, VStack, HStack, Grid, Heading, Button, Stack, Input } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function PartyCreate1() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [tracks, setTracks] = useState([]);
  const [partyName, setPartyName] = useState('');
  const [trackId, setTrackId] = useState(0);

  useEffect(() => {
    if (state) {
      setPartyName(state.partyNameSent);
      setTracks(state.tracksSent);
      setTrackId(state.trackIdSent);
    }
  }, []);

  function backToManage() {
    if (tracks.length !== 0 || partyName !== '') {
      // const isGoingToExit = confirm('剛剛輸入的東西都不會保存哦！確定要離開？');
      // if (!isGoingToExit) {
      //   return;
      // }
      MySwal.fire({
        icon: 'warning',
        title: '注意',
        text: '剛剛輸入的東西都會不見哦！確定要離開？',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '確定'
      }).then(async result => {
        if (result.isConfirmed) {
          navigate('/party/manage');
        }
      });
    } else {
      navigate('/party/manage');
    }
  }

  function nextStep() {
    navigate('/party/create/step/2', {
      state: {
        partyNameSent: partyName,
        tracksSent: tracks,
        trackIdSent: trackId
      }
    });
  }

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={50}>
        <VStack spacing={5}>
          <Heading size="lg" fontSize="42px" m={5}>
            步驟一、為歌曲集命名
          </Heading>
          <HStack p={7}>
            <Input
              htmlSize={50}
              width="auto"
              textAlign="center"
              placeholder="取個帥氣又響亮的名稱吧！"
              m={7}
              fontSize={22}
              value={partyName}
              onChange={event => setPartyName(event.currentTarget.value)}
            />
          </HStack>
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
