import { atom } from 'recoil';

// Atom: holds a boolean value
export const SidebarState = atom({
    key: 'SidebarState', // unique ID
    default: false,        // initial value
});
