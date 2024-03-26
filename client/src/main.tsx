import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";

// Socket
import './core/socket.ts'

// Redux Toolkit
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
