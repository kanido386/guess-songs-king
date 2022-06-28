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
// import HostGame from './pages/HostGame';
// import Play from './pages/Play';
// import Join from './pages/Join';
// import Instructions from './pages/Instructions';
import PlayGame from './pages/PlayGame';
import PartyManage from './pages/PartyManage';
import PartyCreate1 from './pages/PartyCreate1';
import PartyCreate2 from './pages/PartyCreate2';
import PartyCreate3 from './pages/PartyCreate3';
import Party from './pages/Party';
// import PartyEdit1 from './components/PartyEdit1';
// import PartyEdit2 from './components/PartyEdit2';

// TODO: HostScreen
// import WaitingRoom from './pages/HostScreen/WaitingRoom';
// import ShowPartyName from './pages/HostScreen/ShowPartyName';
// import Countdown from './pages/HostScreen/Countdown';
// import ShowQuestionType from './pages/HostScreen/ShowQuestionType';
// import ShowQuestionName from './pages/HostScreen/ShowQuestionName';
// import Question from './pages/HostScreen/Question';
// import Answer from './pages/HostScreen/Answer';
// import Scoreboard from './pages/HostScreen/Scoreboard';
import HostPodium from './pages/HostScreen/HostPodium';

// TODO: PlayerScreen
// import HelloPlayer from './pages/PlayerScreen/HelloPlayer';
// import Join from './pages/PlayerScreen/Join';
// import Instructions from './pages/PlayerScreen/Instructions';
// import WaitGame from './pages/PlayerScreen/WaitGame';
// import WaitQuestion from './pages/PlayerScreen/WaitQuestion';
// import TypeAnswer from './pages/PlayerScreen/TypeAnswer';
// import WaitAnswer from './pages/PlayerScreen/WaitAnswer';
// import ShowAnswer from './pages/PlayerScreen/ShowAnswer';
// import WaitPodium from './pages/PlayerScreen/WaitPodium';
import Podium from './pages/PlayerScreen/Podium';

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
        {/* TODO: HostScreen */}
        {/* 1 */}
        {/* <Route path="/host/game/:id" element={<WaitingRoom />} /> */}
        {/* 7 */}
        {/* <Route path="/host/game/:id" element={<ShowPartyName />} /> */}
        {/* 8 */}
        {/* <Route path="/host/game/:id" element={<Countdown />} /> */}
        {/* 9 */}
        {/* <Route path="/host/game/:id" element={<ShowQuestionType />} /> */}
        {/* 10 */}
        {/* <Route path="/host/game/:id" element={<ShowQuestionName />} /> */}
        {/* 11 */}
        {/* <Route path="/host/game/:id" element={<Question />} /> */}
        {/* 12 */}
        {/* <Route path="/host/game/:id" element={<Answer />} /> */}
        {/* 13 */}
        {/* <Route path="/host/game/:id" element={<Scoreboard />} /> */}
        {/* 14 */}
        <Route path="/host/game/:id" element={<HostPodium />} />
        {/* FIXME: */}
        {/* <Route path="/host/game/:id" element={<HostGame />} /> */}
        {/* TODO: PlayerScreen */}
        {/* 2 */}
        {/* <Route path="/play" element={<HelloPlayer />} /> */}
        {/* 3 先跳 */}
        {/* 4 */}
        {/* <Route path="/play" element={<Join />} /> */}
        {/* 5 先跳 */}
        {/* 6 */}
        {/* <Route path="/play" element={<Instructions />} /> */}
        {/* 15 */}
        {/* <Route path="/play" element={<WaitGame />} /> */}
        {/* 16 */}
        {/* <Route path="/play" element={<WaitQuestion />} /> */}
        {/* 17 */}
        {/* <Route path="/play" element={<TypeAnswer />} /> */}
        {/* 18 */}
        {/* <Route path="/play" element={<WaitAnswer />} /> */}
        {/* 19 */}
        {/* <Route path="/play" element={<ShowAnswer />} /> */}
        {/* 20 */}
        {/* <Route path="/play" element={<WaitPodium />} /> */}
        {/* 21 */}
        <Route path="/play" element={<Podium />} />
        {/* FIXME: */}
        {/* <Route path="/play" element={<Play />} /> */}
        {/* <Route path="/join" element={<Join />} /> */}
        {/* <Route path="/instructions" element={<Instructions />} /> */}
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
