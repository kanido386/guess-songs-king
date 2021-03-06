// import { Box, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { Box, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';

function PlayerFooter(props) {
  const { nickname, hasScore, score } = props;

  // eslint-disable-next-line no-restricted-globals
  const isMobile = screen.availHeight > screen.availWidth;
  if (isMobile) {
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        minH="11vh">
        <Grid templateColumns="repeat(3, 1fr)" gap={5}>
          <GridItem w="200%" h="11vh" lineHeight="11vh" fontSize="15px">
            {nickname}
          </GridItem>
          <GridItem w="100%" h="11vh" lineHeight="11vh" ml="30vw" fontSize="15px">
            {hasScore ? score : ''}
          </GridItem>
        </Grid>
      </Box>
    );
  }
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      minH="11vh">
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem w="100%" h="11vh" lineHeight="11vh">
          {nickname}
        </GridItem>
        <GridItem w="100%" h="11vh" lineHeight="11vh" />
        <GridItem w="100%" h="11vh" lineHeight="11vh" />
        <GridItem w="100%" h="11vh" lineHeight="11vh" />
        <GridItem w="100%" h="11vh" lineHeight="11vh">
          {hasScore ? score : ''}
        </GridItem>
      </Grid>
      {/* <Container
        as={Stack}
        maxW="6xl"
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text>{nickname}</Text>
        <Stack direction="row" spacing={6}>
          {hasScore ? <Text>{score}</Text> : ''}
        </Stack>
      </Container> */}
    </Box>
  );
}

export default PlayerFooter;
