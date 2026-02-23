import { QuickTheme } from "@keycloak/keycloak-admin-ui";
import { MockAppContexts, mockRealm } from "./mock-providers";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Keycloak Theme Settings</h1>
      <MockAppContexts>
        <QuickTheme realm={mockRealm} />
      </MockAppContexts>
    </div>
  );
}

export default App;
