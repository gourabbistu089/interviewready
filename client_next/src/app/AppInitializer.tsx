'use client';

import { useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/features/authSlice';
import { setTopics } from '@/redux/features/topicSlice';
import { API_URL } from '@/constants';

export default function AppInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Sync cookie with localStorage token so middleware can read it
    if (!document.cookie.includes('token=')) {
      document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Strict`;
    }

    const init = async () => {
      // 1. Rehydrate user
      try {
        const res = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data?.success) {
          dispatch(setUser(res.data.user));
        }
      } catch {
        localStorage.removeItem('token');
        document.cookie = 'token=; path=/; max-age=0; SameSite=Strict';
        dispatch(setUser(null));
      }

      // 2. Load topics
      try {
        const res = await axios.get(`${API_URL}/topics`);
        if (res.data?.success && res.data.topics?.length) {
          dispatch(setTopics(res.data.topics));
        }
      } catch {
        // topics load is non-critical
      }
    };

    init();
  }, [dispatch]);

  return null;
}
