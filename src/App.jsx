import { useEffect, useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import { AppProvider, useApp } from './context/AppContext';
import Auth from './features/auth/Auth';
import { supabase } from './lib/supabase';

async function ensureProfile(session) {
  if (!session?.user?.id) {
    return;
  }

  const userId = session.user.id;

  const { data: existingProfile, error: selectError } =
    await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

  if (selectError) {
    console.error('Could not check profile:', selectError);
    return;
  }

  if (existingProfile) {
    return;
  }

  const email = session.user.email || '';
  const username =
    email.split('@')[0] || `winter-user-${userId.slice(0, 6)}`;

  const { error: insertError } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      username,
      display_name: username,
    });

  if (insertError) {
    console.error('Could not create profile:', insertError);
  }
}

function AppShell() {
  const { settings } = useApp();

  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (currentSession) {
        await ensureProfile(currentSession);
      }

      if (mounted) {
        setSession(currentSession);
        setAuthLoading(false);
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        if (currentSession) {
          await ensureProfile(currentSession);
        }

        if (mounted) {
          setSession(currentSession);
          setAuthLoading(false);
        }
      },
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-400" />

          <p className="text-sm text-slate-400">
            Loading Winter Arc...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  const themeClass =
    settings.theme === 'Midnight'
      ? 'bg-[#01030a]'
      : settings.theme === 'Dim'
        ? 'bg-[#0b1120]'
        : 'bg-slate-950';

  return (
    <div
      className={`min-h-screen ${themeClass} transition-colors duration-500`}
    >
      <MainLayout />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

export default App;