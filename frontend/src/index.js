import { ColorModeScript, ChakraProvider, theme } from '@chakra-ui/react';
// import React, { StrictMode } from 'react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import SocketContext, { socket } from './context/socket';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  // StrictMode renders components twice (on dev but not production)
  // in order to detect any problems with your code and warn you
  // about them (which can be quite useful).
  <SocketContext.Provider value={socket}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ColorModeScript />
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </SocketContext.Provider>
  // <StrictMode>
  //   <SocketContext.Provider value={socket}>
  //     <ChakraProvider theme={theme}>
  //       <BrowserRouter>
  //         <ColorModeScript />
  //         <App />
  //       </BrowserRouter>
  //     </ChakraProvider>
  //   </SocketContext.Provider>
  // </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
