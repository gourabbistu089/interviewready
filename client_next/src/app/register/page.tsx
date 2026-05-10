'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Brain, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { API_URL } from '@/constants';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [firstName,           setFirstName]           = useState('');
  const [lastName,            setLastName]            = useState('');
  const [email,               setEmail]               = useState('');
  const [password,            setPassword]            = useState('');
  const [confirmPassword,     setConfirmPassword]     = useState('');
  const [showPassword,        setShowPassword]        = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading,             setLoading]             = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) { toast.error('Passwords do not match'); return; }
    if (password.length < 6)          { toast.error('Password must be at least 6 characters long'); return; }
    if (!firstName.trim() || !lastName.trim()) { toast.error('First name and Last name cannot be empty'); return; }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/register`, { firstName, lastName, email, password });
      if (res.data.success) toast.success(res.data.message || 'Registration successful!');
      router.push('/login');
    } catch (error: unknown) {
      const axiosErr = error as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message ?? 'An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
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
                <span className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>InterviewReady</span>
              </Link>
              <h2 className="text-xl font-bold" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>Create Account</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Join thousands of successful candidates</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                    <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                      className="w-full pl-9" placeholder="First name" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                    <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                      className="w-full pl-9" placeholder="Last name" required />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9" placeholder="Enter your email" required />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                  <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9" placeholder="Create a password" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                  <input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-9" placeholder="Confirm your password" required />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }}>
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input id="terms" type="checkbox" className="h-3.5 w-3.5" required />
                <label htmlFor="terms" className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  I agree to the{' '}
                  <Link href="/terms" className="transition-colors duration-150" style={{ color: 'var(--accent)' }}>Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="transition-colors duration-150" style={{ color: 'var(--accent)' }}>Privacy Policy</Link>
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={loading || !firstName || !lastName || !email || !password || !confirmPassword}>
                {loading ? 'Creating account…' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Already have an account?{' '}
                <Link href="/login" className="font-medium transition-colors duration-150" style={{ color: 'var(--accent)' }}>Sign in</Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
