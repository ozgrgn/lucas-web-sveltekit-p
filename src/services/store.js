import { writable } from "svelte/store";
export const general = writable(null);
export const translate = writable(null);
export const treatments = writable(null);
export const treatmentGroups = writable(null);
export const homeBlogs = writable(null);
export const blogCat = writable(null);
export const blogCats = writable(null);

export const faqs = writable(null);
export const modal = writable(null);
export const navbar = writable(null);
export const lang = writable("tr");
export const groups = writable(null);
export const overlay = writable(null);
export const panelDrawer = writable(true);
export const admin = writable(true);
export const desktop = writable(true);
export const search = writable(null);

export const props =writable(null);
export const doneProps =writable(null);
export const propCats =writable(null);
export const staffs =writable(null);
export const properties =writable(null);
export const headerLight =writable(true);

export const boxPropCat =writable(null);
export const boxPropStatus =writable(null);
export const boxPropType =writable(null);
export const propQuery =writable(true);
export const propDetails =writable(null);

export const getData =writable(false);
export const refresh =writable(false);


