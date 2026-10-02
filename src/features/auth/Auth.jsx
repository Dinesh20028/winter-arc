import React, { useState } from 'react';
import { LogIn, Snowflake, UserPlus } from 'lucide-react';
import { supabase } from '../../lib/supabase';

function Auth() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const isLogin = mode === 'login';

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (error) {
          throw error;
        }

        setMessage('Login successful.');
      } else {
        const { error } =
          await supabase.auth.signUp({
            email,
            password,
          });

        if (error) {
          throw error;
        }

        setMessage(
          'Account created. Check your email if confirmation is required.',
        );
      }
    } catch (error) {
      setMessage(
        error?.message ||
          'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-slate-100">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-cyan-400/20 bg-slate-900/80 p-8 shadow-[0_0_50px_rgba(34,211,238,0.12)] backdrop-blur-xl">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/30">
              <Snowflake className="h-7 w-7" />
            </div>

            <p className="mt-5 text-xs font-medium uppercase tracking-[0.3em] text-cyan-200/70">
              Winter Arc
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {isLogin
                ? 'Welcome back'
                : 'Start your Winter Arc'}
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              {isLogin
                ? 'Continue your 90-day challenge.'
                : 'Create your account and begin today.'}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="auth-email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email
              </label>

              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>

            <div>
              <label
                htmlFor="auth-password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Password
              </label>

              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Minimum 6 characters"
                required
                minLength={6}
                autoComplete={
                  isLogin
                    ? 'current-password'
                    : 'new-password'
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>

            {message && (
              <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3 text-sm text-cyan-100">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLogin ? (
                <LogIn className="h-4 w-4" />
              ) : (
                <UserPlus className="h-4 w-4" />
              )}

              {loading
                ? 'Please wait...'
                : isLogin
                  ? 'Log in'
                  : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setMode(
                  isLogin
                    ? 'signup'
                    : 'login',
                );
                setMessage('');
              }}
              className="text-sm text-slate-400 hover:text-cyan-200"
            >
              {isLogin
                ? "Don't have an account? Create one"
                : 'Already have an account? Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;