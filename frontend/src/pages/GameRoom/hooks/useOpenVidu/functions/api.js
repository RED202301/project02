import axios from 'axios';

const APPLICATION_SERVER_URL = import.meta.env.VITE_SERVER_URL;

async function getSession(sessionId) {
  const response = await axios.post(
    `${APPLICATION_SERVER_URL}/api/sessions`,
    { customSessionId: sessionId },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data; // The sessionId
}

async function createToken(sessionId) {
  const response = await axios.post(
    `${APPLICATION_SERVER_URL}/api/sessions/${sessionId}/connections`,
    {},
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data; // The token
}

export async function getToken(sessionId) {
  return await createToken(await getSession(sessionId));
}
