import { AppContext } from "./AppContext";
import { useStorage } from "../hooks/useStorage";

export function AppProvider({ children }) {
  const [requirements, setRequirements] = useStorage("mhm_requirements", []);
  const [themes, setThemes] = useStorage("mhm_themes", []);
  const [userStories, setUserStories] = useStorage("mhm_user_stories", []);
  const [conversations, setConversations] = useStorage("mhm_conversations", []);
  const [referenceFile, setReferenceFile] = useStorage("mhm_reference_file", null);

  const value = {
    requirements,
    themes,
    userStories,
    conversations,
    referenceFile,
    setRequirements,
    setThemes,
    setUserStories,
    setConversations,
    setReferenceFile,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
