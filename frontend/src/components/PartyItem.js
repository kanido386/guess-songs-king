import React from 'react';
import { Stack, HStack, Text, Button, Flex, Spacer, IconButton } from '@chakra-ui/react';
import { SettingsIcon, DeleteIcon } from '@chakra-ui/icons';

function PartyItem(props) {
  const { name, numTracks, numQuestions } = props;
  return (
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
          <HStack spacing={2}>
            <IconButton
              variant="ghost"
              colorScheme="blue"
              aria-label="Call Sage"
              fontSize="16px"
              icon={<SettingsIcon />}
            />
            <IconButton
              variant="ghost"
              colorScheme="red"
              aria-label="Call Sage"
              fontSize="16px"
              icon={<DeleteIcon />}
            />
          </HStack>
          <Button colorScheme="green">開始玩！</Button>
        </HStack>
      </Flex>
    </Stack>
  );
}

export default PartyItem;
