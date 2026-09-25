import axios from 'axios';

console.log('[DEBUG CI] VITE_API_URL:', import.meta.env.VITE_API_URL);

export const registerUser = async ({ name, email, password }) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/register`,
    {
      name,
      email,
      password,
    },
  );
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

export const getOwnProfile = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
    },
  });
  return response.data;
};

export const getAllThreads = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/threads`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
  return response.data;
};

export const getUserDetailByThread = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/threads/${id}`,
  );
  return response.data;
};

export const createComment = async ({ threadId, comment }) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/threads/${threadId}/comments`,
    { content: comment },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
      },
    },
  );
  return response.data;
};

export const createThread = async ({ title, body, category }) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/threads`,
    { title, body, category },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
      },
    },
  );
  return response.data;
};

export const getAllLeaderBoard = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/leaderboards`,
  );
  return response.data;
};

export const upVoteThread = async (threadId) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/threads/${threadId}/up-vote`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
    }
  });
  const data = await response.data;
  return data;
};

export const downVoteThread = async (threadId) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/threads/${threadId}/down-vote`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
      }
    });
    const data = await response.data;
    return data;
  } catch (err) {
    console.error('[ERROR] downVoteThread:', err);
    return err.message;
  }
};

export const neutralVoteThread = async (threadId) =>{
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/threads/${threadId}/neutral-vote`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
      }
    });
    const data = await response.data;
    return data;
  } catch (err) {
    console.error('[ERROR] neutralVoteThread:', err);
    return err.message;
  }
};