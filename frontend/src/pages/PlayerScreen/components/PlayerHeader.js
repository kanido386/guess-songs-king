// import { Box, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { Box, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';

function PlayerHeader(props) {
  const { currentQuestion, totalQuestion, type } = props;

  // eslint-disable-next-line no-restricted-globals
  const isMobile = screen.availHeight > screen.availWidth;
  if (isMobile) {
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        minH="9vh">
        <Grid templateColumns="repeat(3, 1fr)" gap={5}>
          <GridItem w="100%" h="9vh" lineHeight="9vh" letterSpacing={1} fontSize="15px">
            {currentQuestion} / {totalQuestion}
          </GridItem>
          <GridItem w="100%" h="9vh" lineHeight="9vh" fontSize="15px">
            {type}
          </GridItem>
          <GridItem w="100%" h="9vh" lineHeight="9vh" />
        </Grid>
      </Box>
    );
  }
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      minH="9vh">
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem w="100%" h="9vh" lineHeight="9vh" letterSpacing={3}>
          {currentQuestion} / {totalQuestion}
        </GridItem>
        <GridItem w="100%" h="9vh" lineHeight="9vh" />
        <GridItem w="100%" h="9vh" lineHeight="9vh">
          {type}
        </GridItem>
        <GridItem w="100%" h="9vh" lineHeight="9vh" />
        <GridItem w="100%" h="9vh" lineHeight="9vh" />
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

export default PlayerHeader;
