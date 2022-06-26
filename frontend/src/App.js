import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import { Box, Text, Link, VStack, Code, Grid } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';
import Welcome from './pages/Welcome';
import Host from './pages/Host';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import HostHome from './pages/HostHome';
import HostEdit from './pages/HostEdit';
import HostGame from './pages/HostGame';
import Play from './pages/Play';
import Join from './pages/Join';
import Instructions from './pages/Instructions';
import PlayGame from './pages/PlayGame';
import PartyManage from './pages/PartyManage';
import PartyCreate1 from './pages/PartyCreate1';
import PartyCreate2 from './pages/PartyCreate2';
import PartyCreate3 from './pages/PartyCreate3';
import Party from './pages/Party';
// import PartyEdit1 from './components/PartyEdit1';
// import PartyEdit2 from './components/PartyEdit2';

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
        <Route path="/host/edit" element={<HostEdit />} />
        <Route path="/host/game/:id" element={<HostGame />} />
        <Route path="/play" element={<Play />} />
        <Route path="/join" element={<Join />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/play/game" element={<PlayGame />} />
        <Route path="/party/manage" element={<PartyManage />} />
        <Route path="/party/create/step/1" element={<PartyCreate1 />} />
        <Route path="/party/create/step/2" element={<PartyCreate2 />} />
        <Route path="/party/create/step/3" element={<PartyCreate3 />} />
        <Route path="/party/:id" element={<Party />} />
        {/* <Route path="/party/edit/:id/step/1" element={<PartyEdit1 />} />
        <Route path="/party/edit/:id/step/2" element={<PartyEdit2 />} /> */}
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
