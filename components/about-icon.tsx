const paths = {
  access: <><path d="M4 19V5l8-2 8 2v14l-8 2-8-2Z"/><path d="M12 3v18M7 8h2m6 0h2M7 12h2m6 0h2"/></>,
  choice: <><path d="M12 21v-9m0 3L5 8m7 7 7-7M5 12V5h7m0 0h7v7"/><path d="m9 8 3-3"/></>,
  guidance: <><circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5 5-3Z"/></>,
  connection: <><circle cx="8" cy="7" r="3"/><circle cx="18" cy="9" r="2"/><path d="M2 21v-3a6 6 0 0 1 12 0v3m2-6a4 4 0 0 1 6 3v3"/></>,
  opportunity: <><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9L7.5 14 3 9.6l6.2-.9L12 3Z"/></>,
  future: <><path d="M14 4c3-1 6-1 6-1s0 3-1 6l-6 6-5-5 6-6Z"/><circle cx="15" cy="8" r="1"/><path d="m8 10-4 1-2 4 6-1m5 1-1 5-4 2 1-6m-4 1-3 4"/></>,
  student: <><path d="m2 8 10-5 10 5-10 5L2 8Zm4 2v6c4 3 8 3 12 0v-6m4-2v8"/></>,
  parents: <><circle cx="8" cy="7" r="3"/><circle cx="17" cy="12" r="2"/><path d="M2 21v-3a6 6 0 0 1 10-4m1 7v-3a4 4 0 0 1 8 0v3"/></>,
  graduate: <><path d="M5 3h14v14H5zM8 7h8m-8 3h5"/><circle cx="12" cy="16" r="3"/><path d="m10 19-1 3 3-1 3 1-1-3"/></>,
  work: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 12c5 4 13 4 18 0m-9 1v4"/></>,
  educator: <><path d="M4 3h17v13H10M8 7h9m-5 4h5"/><circle cx="5" cy="13" r="3"/><path d="M1 22v-2a4 4 0 0 1 8 0v2m1-7 4-3"/></>,
  search: <><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></>,
  check: <><circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/></>,
  spark: <><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/></>,
};

export type AboutIconName = keyof typeof paths;

export function AboutIcon({ name }: { name: AboutIconName }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}
