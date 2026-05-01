import React, { useState } from 'react';
import { loginUser } from '../firebase/services';
import { Building2, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Fill all fields');
    setLoading(true);
    try {
      await loginUser(email, password);
      toast.success('Welcome back!');
    } catch (err) {
      const msgs = {
        'auth/user-not-found': 'No account with this email',
        'auth/wrong-password': 'Wrong password',
        'auth/invalid-email':  'Invalid email address',
        'auth/too-many-requests': 'Too many attempts. Try later.',
      };
      toast.error(msgs[err.code] || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: 'var(--bg)', padding: 20
    }}>
      {/* BG glow */}
      <div style={{
        position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,158,11,.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        background: 'var(--card)', border: '1px solid var(--border2)',
        borderRadius: 20, padding: '40px 36px', width: '100%', maxWidth: 400,
        boxShadow: '0 30px 80px rgba(0,0,0,.5)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 58, height: 58, borderRadius: 16,
            background: 'rgba(245,158,11,.1)', border: '1px solid rgba(245,158,11,.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px'
          }}>
            <Building2 size={28} color="var(--accent)" />
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--accent)' }}>
            DL Enterprises
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
            Invoice Management System
          </div>
        </div>

        <form onSubmit={handle}>
          <div className="form-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
              <input
                type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{ paddingLeft: 36 }}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
                style={{ paddingLeft: 36, paddingRight: 40 }}
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShow(s => !s)} style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 4
              }}>
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button className="btn btn-primary w-full" style={{ padding: '12px', marginTop: 6, fontSize: 14 }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: 24, padding: 14, background: 'var(--card2)', borderRadius: 10, fontSize: 12 }}>
          <div style={{ color: 'var(--muted)', marginBottom: 6, fontWeight: 600 }}>Setup Instructions:</div>
          <div style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
            1. Create your Firebase project<br/>
            2. Enable Email/Password auth<br/>
            3. Create user accounts in Firebase Console<br/>
            4. Add your config to <code style={{ color: 'var(--accent)', fontSize: 11 }}>firebase/config.js</code>
          </div>
        </div>
      </div>
    </div>
  );
}
