// import { Box, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { Box, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';

function HostFooter(props) {
  const { currentQuestion, totalQuestion, gamePin } = props;

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      minH="11vh">
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem w="100%" h="11vh" lineHeight="11vh" letterSpacing={3}>
          {currentQuestion} / {totalQuestion}
        </GridItem>
        <GridItem w="100%" h="11vh" lineHeight="11vh" />
        <GridItem w="100%" h="11vh" lineHeight="11vh" />
        <GridItem w="100%" h="11vh" lineHeight="11vh" />
        <GridItem w="100%" h="11vh" lineHeight="11vh">
          遊戲 PIN 碼：{gamePin}
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

export default HostFooter;
