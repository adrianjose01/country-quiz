import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DataProvider } from "./context/dataContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <DataProvider>
    <App />
  </DataProvider>
);
