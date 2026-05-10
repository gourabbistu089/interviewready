'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Brain, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/features/authSlice';
import axios from 'axios';
import { API_URL } from '@/constants';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [expiredTime,  setExpiredTime]  = useState('1m');
  const [showPassword, setShowPassword] = useState(false);
  const [loading,      setLoading]      = useState(false);
  const dispatch = useDispatch();
  const router   = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password, expiredTime });
      if (res.data.success) {
        toast.success('Login successful!');
        dispatch(login(res.data));
        router.push('/dashboard');
      } else {
        toast.error(res.data.message || 'Login failed. Please try again.');
      }
    } catch (error: unknown) {
      const axiosErr = error as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message ?? 'An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiredTime(e.target.checked ? '30d' : '1m');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-md w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="p-8">
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
                  <Brain className="h-5 w-5" style={{ color: 'var(--accent)' }} />
                </div>
                <span className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>
                  InterviewReady
                </span>
              </Link>
              <h2 className="text-xl font-bold" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>Welcome Back</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                  <input
                    id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9"
                    placeholder="Enter your email" required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                  <input
                    id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9"
                    placeholder="Enter your password" required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input id="remember-me" type="checkbox" onChange={handleCheckbox} className="h-3.5 w-3.5" />
                <label htmlFor="remember-me" className="text-sm" style={{ color: 'var(--text-secondary)' }}>Remember me</label>
              </div>

              <Button type="submit" className="w-full" disabled={loading || !email || !password}>
                {loading ? 'Signing in…' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-medium transition-colors duration-150" style={{ color: 'var(--accent)' }}>Sign up</Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
