import axios from 'axios';
import { PostSignUpProps } from '@src/ts/interfaces/PostSignUpProps';

const baseURL = 'http://localhost:8080';
export const api = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export const signUp = async (user: PostSignUpProps) => {
  const response = await api.post('/api/1.0/users', user);
  return response;
};
