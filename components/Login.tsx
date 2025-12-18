
import React, { useState } from 'react';
import { auth, googleProvider } from '../services/firebase';
import { signInWithEmailAndPassword, signInWithPopup, AuthError } from 'firebase/auth';
import { LogIn, Lock, Mail, Activity, ShieldCheck, AlertCircle, ExternalLink } from 'lucide-react';
import Button from './Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{ code: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const getFriendlyErrorMessage = (err: AuthError) => {
    switch (err.code) {
      case 'auth/operation-not-allowed':
        return {
          code: 'CONFIG_REQUIRED',
          message: 'Sign-in provider not enabled. Please enable "Email/Password" and "Google" in your Firebase Console.'
        };
      case 'auth/invalid-credential':
        return {
          code: 'AUTH_FAILED',
          message: 'Invalid identity credentials. Please verify your email and security password.'
        };
      case 'auth/user-not-found':
        return {
          code: 'IDENTITY_NOT_FOUND',
          message: 'No record found for this identifier.'
        };
      case 'auth/popup-closed-by-user':
        return {
          code: 'TERMINATED',
          message: 'Authentication popup was closed before completion.'
        };
      default:
        return {
          code: err.code.replace('auth/', 'ERR_').toUpperCase(),
          message: err.message || 'An unexpected security interruption occurred.'
        };
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err as AuthError));
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err as AuthError));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020205] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(112,207,255,0.03)_0%,transparent_70%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#70CFFF]/5 blur-[120px] rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-[#0a0a0f]/80 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6 group-hover:border-[#70CFFF]/30 transition-colors duration-500">
              <Activity className="w-8 h-8 text-[#70CFFF]" />
            </div>
            <h1 className="text-3xl font-display font-black text-white tracking-tighter uppercase mb-2">
              UNREALGAME<span className="text-slate-600">.CLOUD</span>
            </h1>
            <p className="text-slate-500 font-mono text-[9px] tracking-[0.4em] uppercase">Identity Verification Required</p>
          </div>

          <div className="space-y-6">
            {/* Google Login Button - Higher priority as requested */}
            <Button 
              type="button"
              variant="primary"
              onClick={handleGoogleLogin}
              className="w-full h-14 rounded-2xl font-display text-sm uppercase tracking-widest shadow-lg"
              disabled={loading}
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="black"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="black"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="black"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="black"/>
                </svg>
                Continue with Google
              </div>
            </Button>

            <div className="flex items-center gap-4">
              <div className="h-px bg-white/5 flex-1"></div>
              <span className="text-[10px] text-slate-700 font-mono uppercase tracking-widest">or email access</span>
              <div className="h-px bg-white/5 flex-1"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative group">
                <div className="absolute left-4 top-4 text-slate-600 group-focus-within:text-[#70CFFF] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ID_EMAIL"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-700 focus:outline-none focus:border-[#70CFFF]/50 transition-all font-mono text-sm"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-4 text-slate-600 group-focus-within:text-[#70CFFF] transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="ACCESS_KEY"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-700 focus:outline-none focus:border-[#70CFFF]/50 transition-all font-mono text-sm"
                  required
                />
              </div>

              {error && (
                <div className={`rounded-xl p-4 flex flex-col gap-2 animate-in slide-in-from-top-2 border ${error.code === 'CONFIG_REQUIRED' ? 'bg-[#70CFFF]/5 border-[#70CFFF]/20' : 'bg-red-500/5 border-red-500/10'}`}>
                  <div className="flex items-center gap-3">
                    <AlertCircle className={`w-3.5 h-3.5 ${error.code === 'CONFIG_REQUIRED' ? 'text-[#70CFFF]' : 'text-red-500'}`} />
                    <p className={`text-[10px] font-mono font-black uppercase tracking-widest ${error.code === 'CONFIG_REQUIRED' ? 'text-[#70CFFF]' : 'text-red-400'}`}>
                      {error.code}
                    </p>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed font-sans">{error.message}</p>
                </div>
              )}

              <Button 
                type="submit" 
                variant="glass"
                className="w-full h-14 rounded-2xl font-display text-xs uppercase tracking-widest"
                isLoading={loading}
              >
                <LogIn className="w-4 h-4 mr-2" /> Log In
              </Button>
            </form>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
            <div className="flex items-center gap-6 opacity-20">
               <ShieldCheck className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-[8px] text-slate-700 font-mono tracking-[0.2em] text-center uppercase">
              Secure Terminal Access // Authorized Ops Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
