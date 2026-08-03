const paths = {
  whatsapp: '<path d="M20.5 3.5A11.8 11.8 0 0 0 2 17.7L.4 23.5l5.9-1.6A11.8 11.8 0 1 0 20.5 3.5Zm-8.6 19.1c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-3.5.9.9-3.4-.2-.4A9.7 9.7 0 1 1 12 22.6Zm5.3-7.3c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1a8 8 0 0 1-2.3-1.4 8.7 8.7 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z"/>',
  phone: '<path d="M7.1 2h3.2l1.2 5.1-2 1.2a16.6 16.6 0 0 0 6.2 6.2l1.2-2 5.1 1.2v3.2c0 2.8-2.2 5.1-5 5.1A15 15 0 0 1 2 7c0-2.8 2.3-5 5.1-5Z"/>',
  pin: '<path d="M12 22s7-6.1 7-13A7 7 0 1 0 5 9c0 6.9 7 13 7 13Z"/><circle cx="12" cy="9" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
  paw: '<ellipse cx="7" cy="8" rx="2.2" ry="3"/><ellipse cx="17" cy="8" rx="2.2" ry="3"/><ellipse cx="4.5" cy="13" rx="2" ry="2.7"/><ellipse cx="19.5" cy="13" rx="2" ry="2.7"/><path d="M12 10c-3.3 0-6 3.1-6 6.2 0 2.1 1.7 3.8 3.8 3.8.8 0 1.5-.3 2.2-.7.7.4 1.4.7 2.2.7 2.1 0 3.8-1.7 3.8-3.8 0-3.1-2.7-6.2-6-6.2Z"/>',
  stethoscope: '<path d="M5 3v5a5 5 0 0 0 10 0V3M3 3h4M13 3h4M10 13v2a5 5 0 0 0 10 0v-1"/><circle cx="20" cy="11" r="2"/>',
  ultrasound: '<rect x="3" y="3" width="18" height="14" rx="2"/><path d="M7 13c1.2-4.6 3.6-6.3 5.2-4.8 1.3 1.2 1 4.3 4.8 4.8M9 21h6M12 17v4"/>',
  lab: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3"/><path d="M7.5 15h9"/>',
  xray: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7c2 1.5 4 1.5 6 0M9 17c2-1.5 4-1.5 6 0M12 7v10M8 10l4 2-4 2M16 10l-4 2 4 2"/>',
  surgery: '<path d="m4 20 7-7M8 4l12 12M6 6l4-2 10 10-2 4L6 6ZM3 21l3-1-2-2-1 3Z"/>',
  specialty: '<path d="M12 3 4 7v5c0 5 3.4 8.2 8 9 4.6-.8 8-4 8-9V7l-8-4Z"/><path d="M9 12h6M12 9v6"/>',
  heart: '<path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 22l8.8-8.8a5.2 5.2 0 0 0 0-7.4Z"/>',
  travel: '<path d="M3 11h18v9H3zM8 11V7a4 4 0 0 1 8 0v4M3 15h18M8 15v2M16 15v2"/>',
  bath: '<path d="M3 13h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-3ZM6 13V7a4 4 0 0 1 8 0M14 7h3M7 21v1M17 21v1"/><circle cx="18" cy="5" r="1"/><circle cx="20" cy="8" r="1"/>',
  brush: '<path d="M8 3h8l1 10H7L8 3ZM7 13h10v4H7zM10 17v4M14 17v4"/><path d="M9 6h6"/>',
  nails: '<path d="M8 4c3 3 3 6 0 9-2 2-2 5 0 7M16 4c-3 3-3 6 0 9 2 2 2 5 0 7M8 12h8"/>',
  scissors: '<circle cx="6" cy="7" r="3"/><circle cx="6" cy="17" r="3"/><path d="m8.5 8.5 11 7.5M8.5 15.5l11-7.5"/>',
  palette: '<path d="M12 3a9 9 0 0 0 0 18h1.5a2.5 2.5 0 0 0 0-5H12a1.5 1.5 0 0 1 0-3h2a7 7 0 0 0 7-7c0-1.7-4-3-9-3Z"/><circle cx="7.5" cy="9" r="1"/><circle cx="10" cy="6" r="1"/><circle cx="14" cy="6" r="1"/>',
  shield: '<path d="M12 3 4 7v5c0 5 3.4 8.2 8 9 4.6-.8 8-4 8-9V7l-8-4Z"/><path d="m8.5 12 2.2 2.2L16 9"/>',
  sparkle: '<path d="M12 2c.7 4.2 2.8 6.3 7 7-4.2.7-6.3 2.8-7 7-.7-4.2-2.8-6.3-7-7 4.2-.7 6.3-2.8 7-7ZM19 16c.3 2 1.3 3 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/>',
  cookie: '<path d="M21 12a9 9 0 1 1-9-9c0 2.2 1.8 4 4 4 0 2.8 2.2 5 5 5Z"/><circle cx="8" cy="10" r="1"/><circle cx="11" cy="16" r="1"/><circle cx="6" cy="16" r="1"/>'
};

export function icon(name, className = "icon", label = "") {
  const body = paths[name] || paths.paw;
  const aria = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${aria}>${body}</svg>`;
}
