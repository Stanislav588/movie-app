import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext.tsx";
import { Provider } from "react-redux";
import store from "./slices/store.ts";

import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SnackbarProvider>
      <Provider store={store}>
        <MovieProvider>
          <App />
        </MovieProvider>
      </Provider>
    </SnackbarProvider>
  </BrowserRouter>
);
