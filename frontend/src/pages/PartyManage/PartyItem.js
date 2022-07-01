import React, { useState, useEffect } from 'react';
import { Stack, Link, HStack, Text, Button, Flex, Spacer } from '@chakra-ui/react';
// import { SettingsIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

const { REACT_APP_BACKEND_URL } = process.env;

function PartyItem(props) {
  const { id, name, numTracks, numQuestions } = props;
  const [status, setStatus] = useState(false);
  const [numFinished, setNumFinished] = useState(0);
  const [numTotal, setNumTotal] = useState(0);

  useEffect(() => {
    axios
      .post(`${REACT_APP_BACKEND_URL}/api/v1/party/check`, {
        partyId: id
      })
      .then(response => {
        setStatus(response.data.isReady);
        setNumFinished(response.data.numFinished);
        setNumTotal(response.data.numTotal);
      });
  }, []);

  return status ? (
    <Stack
      p="5"
      boxShadow="sm"
      mb="5"
      borderWidth="1px"
      borderRadius="sm"
      w={800}
      cursor="pointer"
      as={Link}
      href={`/party/${id}`}
      style={{ textDecoration: 'none' }}
      _hover={{
        bg: 'gray.100'
      }}>
      <Flex>
        <HStack spacing={7}>
          <Text color="purple.600" fontWeight="semibold" fontSize="22px">
            {name}
          </Text>
        </HStack>
        <Spacer />
        <HStack spacing={7}>
          <Text fontSize="md">歌曲數：{numTracks}</Text>
          <Text fontSize="md">題數：{numQuestions}</Text>
          <Spacer />
          {/* TODO: href & disable */}
          <Button
            as={Link}
            href={`/host/game/${id}`}
            style={{ textDecoration: 'none' }}
            colorScheme="green">
            開始玩！
          </Button>
        </HStack>
      </Flex>
    </Stack>
  ) : (
    <Stack p="5" boxShadow="sm" mb="5" borderWidth="1px" borderRadius="sm" w={800}>
      <Flex>
        <HStack spacing={7}>
          <Text color="purple.600" fontWeight="semibold" fontSize="22px">
            {name}
          </Text>
        </HStack>
        <Spacer />
        <HStack spacing={7}>
          <Text fontSize="md">歌曲數：{numTracks}</Text>
          <Text fontSize="md">題數：{numQuestions}</Text>
          <Spacer />
          <Button isDisabled style={{ textDecoration: 'none' }} colorScheme="gray">
            處理中：{numFinished}／{numTotal}
          </Button>
        </HStack>
      </Flex>
    </Stack>
  );
}

export default PartyItem;
