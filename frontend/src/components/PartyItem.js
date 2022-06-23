import React from 'react';
import { Stack, Link, HStack, Text, Button, Flex, Spacer } from '@chakra-ui/react';
// import { SettingsIcon, DeleteIcon } from '@chakra-ui/icons';

function PartyItem(props) {
  const { id, name, numTracks, numQuestions } = props;
  return (
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
          {/* <HStack spacing={2}>
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
          </HStack> */}
          {/* TODO: href & disable */}
          {id === 1 ? (
            <Button
              as={Link}
              href={`/host/game/${id}`}
              style={{ textDecoration: 'none' }}
              colorScheme="green">
              開始玩！
            </Button>
          ) : (
            <Button
              isDisabled
              // as={Link}
              // href="/"
              style={{ textDecoration: 'none' }}
              colorScheme="gray">
              處理中⋯
            </Button>
          )}
        </HStack>
      </Flex>
    </Stack>
  );
}

export default PartyItem;
