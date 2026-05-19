import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/shared/config/i18n";
import Providers from "./providers/index.tsx";
import App from "./App.tsx";

import "./index.css";
import "@ant-design/v5-patch-for-react-19";

async function enableMocking() {
  const { worker } = await import("../mocks/browser");
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>,
  );
});
