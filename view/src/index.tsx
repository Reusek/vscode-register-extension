import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './utils/store';
import { Provider } from 'react-redux';
import {
  updateEAX,
  updateEBX,
  updateECX,
  updateEDX,
  updateESP,
  updateEBP,
  updateESI,
  updateEDI,
  updateEIP,
  updateEFLAGS
} from "./utils/features/registerSlice";

declare function acquireVsCodeApi() : any;

(() => {
  try {
    const vscode = acquireVsCodeApi();
  } catch {}

  window.addEventListener('message', event => {
    const message = event.data; // The json data that the extension sent
    console.log("[main] event", event);
    // e.innerHTML = JSON.stringify(message);
    // e.innerHTML(JSON.stringify(event));
    switch (message.type) {
      case "update":
        {
          message.data.forEach((e: {name: string, value: string}) => {
            switch (e.name) {
              case "eax":
                store.dispatch(updateEAX(e.value));
                break;
              case "ebx":
                store.dispatch(updateEBX(e.value));
                break;
              case "ecx":
                store.dispatch(updateECX(e.value));
                break;
              case "edx":
                store.dispatch(updateEDX(e.value));
                break;
              case "esp":
                store.dispatch(updateESP(e.value));
                break;
              case "ebp":
                store.dispatch(updateEBP(e.value));
                break;
              case "esi":
                store.dispatch(updateESI(e.value));
                break;
              case "edi":
                store.dispatch(updateEDI(e.value));
                break;
              case "eip":
                store.dispatch(updateEIP(e.value));
                break;
              case "eflags":
                store.dispatch(updateEFLAGS(e.value));
                break;
            }
          });
          break;
        }
    }
  });
})();

ReactDOM.render(
  // {/* <React.StrictMode> */}
    <Provider store={store}>
      <App />
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
