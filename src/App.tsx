import { AdminClientContext, AppContexts, initAdminClient, ThemesTab, useEnvironment } from "@keycloak/keycloak-admin-ui";
import { useEffect, useState } from "react";
import type RealmRepresentation from "../../keycloak/js/libs/keycloak-admin-client/lib/defs/realmRepresentation";
import type { Environment } from "../../keycloak/js/apps/admin-ui/lib/environment";
import type KeycloakAdminClient from "../../keycloak/js/libs/keycloak-admin-client/lib";
// import type RealmRepresentation from "@keycloak/keycloak-admin-client";

function App() {
  const { keycloak, environment } = useEnvironment<Environment>();
  const [adminClient, setAdminClient] = useState<KeycloakAdminClient>();
  const [realm, setRealm] = useState<RealmRepresentation>({
    realm: "master",
    displayName: "Keycloak",
    loginTheme: "keycloak",
    accountTheme: "keycloak.v3",
    adminTheme: "keycloak.v2",
    emailTheme: "keycloak",
  });

  const handleSave = (updatedRealm: RealmRepresentation) => {
    console.log("Saving realm settings:", updatedRealm);
    setRealm(updatedRealm);
  };

  useEffect(() => {
    const init = async () => {
      const client = await initAdminClient(keycloak, environment);
      setAdminClient(client);
    };
    init().catch(console.error);
  }, [environment, keycloak]);

  if (!adminClient) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Keycloak Theme Settings</h1>
      <AdminClientContext.Provider value={{ keycloak, adminClient }}>
        <AppContexts>
          <ThemesTab.default realm={realm} save={handleSave} />
        </AppContexts>
      </AdminClientContext.Provider>
    </div>
  );
}

export default App;
