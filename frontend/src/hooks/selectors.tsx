import { selector } from "recoil";
import { SidebarState } from "./atoms";

// Selector: toggles the boolean value
export const toggleSidebarState = selector({
    key: 'toggleSidebarState',
    get: ({ get }) => get(SidebarState),
    set: ({ get, set }) => {
        set(SidebarState, !get(SidebarState));
    },
});