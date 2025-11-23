const PASSCODE = 'GcmS2025'; // এখানে তোমার পাসওয়ার্ড বসাও

async function sha256(text) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const TOKEN_KEY = 'gcm_admin_token';

window.auth = {
  verify: async (input) => {
    const token = await sha256(input);
    localStorage.setItem(TOKEN_KEY, token);
    return token === await sha256(PASSCODE);
  },
  isAuthed: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token === await sha256(PASSCODE);
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = 'login.html';
  }
};