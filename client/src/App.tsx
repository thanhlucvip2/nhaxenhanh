import React from "react";
import { AppRoutes } from "./routes";
import { AppProvider } from "./providers/app";

function App() {
  return (
    <div className="dark">
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </div>
  );
}

export default App;
