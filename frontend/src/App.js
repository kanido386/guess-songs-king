import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import { Box, Text, Link, VStack, Code, Grid } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';
import Welcome from './components/Welcome';
import Host from './components/Host';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import HostHome from './components/HostHome';
import Play from './components/Play';
import PartyManage from './components/PartyManage';

function App() {
  return (
    <>
      {/* <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer">
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box> */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/host" element={<Host />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/host/home" element={<HostHome />} />
        <Route path="/play" element={<Play />} />
        <Route path="/party/manage" element={<PartyManage />} />
        {/* <Route path="/product/:id" element={<Product />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}
        {/* <Route path="/checkout" element={<Checkout />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/member" element={<Member />} /> */}
      </Routes>
    </>
  );
}

export default App;
