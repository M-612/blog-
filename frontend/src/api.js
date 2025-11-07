// Use provided REACT_APP_API_URL at build time, otherwise default to relative
// paths so the frontend can be served from the same origin as the backend.
const API_BASE_URL = process.env.REACT_APP_API_URL || "";
export default API_BASE_URL;