
import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LogIn, Lock, Mail, Terminal, Activity, ShieldCheck } from 'lucide-react';
import Button from './Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || 'Access Denied: Invalid Credentials');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.05)_0%,transparent_70%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#38BDF8]/5 blur-[120px] rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6 group-hover:border-[#38BDF8]/50 transition-colors duration-500">
              <Activity className="w-8 h-8 text-[#38BDF8]" />
            </div>
            <h1 className="text-3xl font-display font-black text-white tracking-tighter uppercase mb-2">
              UNREAL<span className="text-[#38BDF8]">.CLOUD</span>
            </h1>
            <p className="text-slate-500 font-mono text-[10px] tracking-[0.3em] uppercase">Security Clearance Required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute left-4 top-4 text-slate-500 group-focus-within:text-[#38BDF8] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="IDENTITY_EMAIL"
                  className="w-full bg-black border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]/20 transition-all font-mono text-sm"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-4 text-slate-500 group-focus-within:text-[#38BDF8] transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="SECURITY_PASSWORD"
                  className="w-full bg-black border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]/20 transition-all font-mono text-sm"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3 animate-in slide-in-from-top-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                <p className="text-red-400 text-xs font-mono font-bold">{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl font-display text-lg uppercase tracking-widest shadow-none"
              isLoading={loading}
            >
              <LogIn className="w-5 h-5 mr-2" /> Authenticate
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
            <div className="flex items-center gap-6 opacity-30">
               <ShieldCheck className="w-4 h-4 text-slate-400" />
               <Terminal className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-[9px] text-slate-600 font-mono tracking-widest text-center uppercase">
              Encrypted Session // v2.4.0 <br/> Authorized Access Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
