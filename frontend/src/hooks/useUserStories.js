import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { generateId } from "../utils/idGenerator";
import { nowISO } from "../utils/dateFormatter";

export function useUserStories() {
  const { userStories, setUserStories } = useContext(AppContext);

  function addUserStory(data) {
    const now = nowISO();
    const newStory = {
      id: generateId("us_"),
      requirement_id: data.requirement_id,
      theme_id: data.theme_id,
      story: data.story,
      purpose: data.purpose,
      acceptance_criteria: data.acceptance_criteria,
      status: "verified",
      system_support: "not_analyzed",
      created_at: now,
      updated_at: now,
    };
    setUserStories((prev) => [...prev, newStory]);
    return newStory;
  }

  function updateSystemSupport(id, supportStatus) {
    setUserStories((prev) =>
      prev.map((story) =>
        story.id === id
          ? { ...story, system_support: supportStatus, updated_at: nowISO() }
          : story
      )
    );
  }

  function bulkUpdateSystemSupport(updates) {
    const updateMap = new Map(updates.map((u) => [u.id, u.system_support]));
    const now = nowISO();
    setUserStories((prev) =>
      prev.map((story) =>
        updateMap.has(story.id)
          ? { ...story, system_support: updateMap.get(story.id), updated_at: now }
          : story
      )
    );
  }

  function getStoriesByTheme(themeId) {
    return userStories.filter((story) => story.theme_id === themeId);
  }

  function getStoryById(id) {
    return userStories.find((story) => story.id === id);
  }

  return {
    userStories,
    addUserStory,
    updateSystemSupport,
    bulkUpdateSystemSupport,
    getStoriesByTheme,
    getStoryById,
  };
}
