import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { generateId } from "../utils/idGenerator";
import { nowISO } from "../utils/dateFormatter";

export function useRequirements() {
  const { requirements, setRequirements } = useContext(AppContext);

  function addRequirement(rawText, inputType) {
    const now = nowISO();
    const newReq = {
      id: generateId("req_"),
      raw_text: rawText,
      input_type: inputType,
      status: "submitted",
      created_at: now,
      updated_at: now,
    };
    setRequirements((prev) => [...prev, newReq]);
    return newReq;
  }

  function updateStatus(id, newStatus) {
    setRequirements((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: newStatus, updated_at: nowISO() }
          : req
      )
    );
  }

  function getRequirementById(id) {
    return requirements.find((req) => req.id === id);
  }

  return {
    requirements,
    addRequirement,
    updateStatus,
    getRequirementById,
  };
}
