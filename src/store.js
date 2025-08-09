import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./Features/Tab/TabSlice";
import skillsReducer from "./Features/Tab/SkillsReducer";
import tokenReducer from "./Features/Tab/TokenReducer";
export const store = configureStore({
  reducer: {
    tab: tabReducer,
    skills: skillsReducer,
    token: tokenReducer,
  },
});
