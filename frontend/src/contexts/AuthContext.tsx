import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { UserRole, UserProfile } from '@/types/roles';
import { ROLE_HOME } from '@/types/roles';

interface AuthState {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole, remember?: boolean) => void;
  logout: () => void;
  getRedirectPath: () => string;
}
const AuthContext = createContext<AuthState | null>(null);
const STORAGE_KEY = 'educore.eunijopa.demo.auth.v1';
const DEMO_USERS: Record<UserRole, UserProfile> = {
  student: { id: 'DEMO-ALU', name: 'Aluno de demonstração', email: 'aluno@example.invalid', role: 'student', institution: 'EUNIJOPA' },
  guardian: { id: 'DEMO-ENC', name: 'Encarregado de demonstração', email: 'encarregado@example.invalid', role: 'guardian', institution: 'EUNIJOPA' },
  teacher: { id: 'DEMO-PROF', name: 'Professor de demonstração', email: 'professor@example.invalid', role: 'teacher', institution: 'EUNIJOPA' },
  pedagogy: { id: 'DEMO-PED', name: 'Pedagogia de demonstração', email: 'pedagogia@example.invalid', role: 'pedagogy', institution: 'EUNIJOPA' },
  executive: { id: 'DEMO-DIR', name: 'Direcção de demonstração', email: 'direccao@example.invalid', role: 'executive', institution: 'EUNIJOPA' },
  secretary: { id: 'DEMO-SEC', name: 'Secretaria de demonstração', email: 'secretaria@example.invalid', role: 'secretary', institution: 'EUNIJOPA' },
  finance: { id: 'DEMO-FIN', name: 'Finanças de demonstração', email: 'financas@example.invalid', role: 'finance', institution: 'EUNIJOPA' },
};
function isDemoRole(role: unknown): role is UserRole {
  return typeof role === 'string' && Object.prototype.hasOwnProperty.call(DEMO_USERS, role);
}
export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      if (!item) return;
      const data = JSON.parse(item);
      if (isDemoRole(data?.role)) {
        setRole(data.role);
        setEmail(typeof data.email === 'string' ? data.email : null);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* demo storage optional */ }
    }
  }, []);
  const user = role ? { ...DEMO_USERS[role], email: email || DEMO_USERS[role].email } : null;
  const login = useCallback((nextEmail: string, _password: string, selectedRole: UserRole, remember = false) => {
    if (!isDemoRole(selectedRole)) return;
    const currentEmail = nextEmail.trim() || DEMO_USERS[selectedRole].email;
    setRole(selectedRole);
    setEmail(currentEmail);
    try {
      if (remember) localStorage.setItem(STORAGE_KEY, JSON.stringify({ role: selectedRole, email: currentEmail }));
      else localStorage.removeItem(STORAGE_KEY);
    } catch { /* demo storage optional */ }
  }, []);
  const logout = useCallback(() => {
    setRole(null);
    setEmail(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* demo storage optional */ }
  }, []);
  const getRedirectPath = useCallback(() => role ? ROLE_HOME[role] : '/login', [role]);
  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated: Boolean(role), login, logout, getRedirectPath }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('useAuth must be used within AuthProvider');
  return auth;
}
