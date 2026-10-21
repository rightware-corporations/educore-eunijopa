import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Eye, EyeOff, GraduationCap, Users, BookOpen, School, Landmark, FileText, Wallet } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types/roles';
import { ROLE_HOME } from '@/types/roles';

const options: { role: UserRole; title: string; description: string; Icon: typeof GraduationCap }[] = [
  { role: 'student', title: 'Aluno', description: 'Notas, horário e percurso', Icon: GraduationCap },
  { role: 'guardian', title: 'Encarregado', description: 'Acompanhamento dos educandos', Icon: Users },
  { role: 'teacher', title: 'Professor', description: 'Turmas, avaliações e conteúdos', Icon: BookOpen },
  { role: 'pedagogy', title: 'Pedagogia', description: 'Coordenação académica', Icon: School },
  { role: 'executive', title: 'Direcção', description: 'Gestão institucional', Icon: Landmark },
  { role: 'secretary', title: 'Secretaria', description: 'Matrículas e documentos', Icon: FileText },
  { role: 'finance', title: 'Finanças', description: 'Tesouraria e pagamentos', Icon: Wallet },
];
export default function LoginPage() {
  const [selected, setSelected] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState<UserRole | null>(null);
  const navigate = useNavigate();
  const { login, isAuthenticated, role } = useAuth();
  useEffect(() => {
    if (pending && isAuthenticated && role === pending) {
      navigate(ROLE_HOME[pending], { replace: true });
      setPending(null);
    }
  }, [pending, isAuthenticated, role, navigate]);
  function submit(event: FormEvent) {
    event.preventDefault();
    setPending(selected);
    login(email, password, selected, remember);
  }
  const selectedLabel = options.find(item => item.role === selected)?.title ?? 'Aluno';
  return (
    <div className="min-h-screen bg-[#fafaf4] text-[#284630] lg:grid lg:grid-cols-[.85fr_1.15fr]">
      <aside className="relative hidden min-h-screen overflow-hidden bg-[#2b553d] text-white lg:flex lg:flex-col">
        <img src="/school/eunijopa-classroom.webp" alt="Ambiente de aprendizagem na EUNIJOPA" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#193f2a] via-[#1a402a]/80 to-[#284c36]/60" />
        <div className="relative z-10 flex flex-1 flex-col justify-between p-12 xl:p-16">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-white/90"><ArrowLeft className="h-4 w-4" /> Voltar ao site</Link>
          <div><div className="mb-8 inline-flex rounded-full bg-white p-3"><img src="/school/eunijopa-logo.webp" alt="Logótipo EUNIJOPA" className="h-24 w-24 object-contain" /></div><p className="text-xs font-black uppercase tracking-[.25em] text-[#f1cd58]">EUNIJOPA · EduCore</p><h1 className="mt-5 text-[clamp(3.5rem,5.2vw,6.7rem)] font-black leading-[.96] tracking-[-.06em]">O seu mundo escolar, num só lugar.</h1><p className="mt-7 max-w-md text-lg leading-8 text-white/85">Uma experiência digital própria da EUNIJOPA para cada papel na comunidade educativa.</p></div>
          <span className="text-xs text-white/70">Centro Infantil e Externato EUNIJOPA</span>
        </div>
      </aside>
      <main className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-9 lg:px-12 xl:px-20">
        <div className="w-full max-w-[790px]">
          <div className="mb-10 flex items-center justify-between lg:hidden"><Link to="/" className="flex items-center gap-3"><img src="/school/eunijopa-logo.webp" alt="EUNIJOPA" className="h-14 w-14 object-contain" /><span className="text-xl font-black">EUNIJOPA</span></Link><Link to="/" className="text-sm font-bold">Voltar</Link></div>
          <p className="text-xs font-black uppercase tracking-[.22em] text-[#698449]">Portal EUNIJOPA</p>
          <h2 className="mt-4 text-[clamp(2.5rem,3.5vw,4.5rem)] font-black leading-tight tracking-[-.05em]">Como pretende entrar?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#64766a]">Escolha o seu perfil para explorar as funcionalidades do EduCore no contexto da EUNIJOPA.</p>
          <form className="mt-8" onSubmit={submit}>
            <fieldset><legend className="sr-only">Perfil de acesso</legend><div className="grid gap-3 sm:grid-cols-2">
              {options.map(({role: value,title,description,Icon}) => (
                <button key={value} type="button" onClick={() => setSelected(value)} aria-pressed={selected===value} className={'flex min-h-[84px] items-center gap-4 rounded-2xl border p-4 text-left transition-colors '+(selected===value?'border-[#37674a] bg-[#315b43] text-white shadow-md':'border-[#d4ded3] bg-white hover:border-[#8ba78e]')}>
                  <span className={'grid h-11 w-11 shrink-0 place-items-center rounded-xl '+(selected===value?'bg-white/15':'bg-[#edf3e6]')}><Icon className="h-5 w-5" /></span><span><strong className="block text-sm">{title}</strong><small className={'mt-1 block text-xs '+(selected===value?'text-white/75':'text-[#718175]')}>{description}</small></span>
                </button>
              ))}
            </div></fieldset>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-bold"><span>Email (opcional na demonstração)</span><input type="email" autoComplete="email" value={email} onChange={event=>setEmail(event.target.value)} placeholder="Email" className="mt-2 h-12 w-full rounded-xl border border-[#cad8c9] bg-white px-4 text-sm outline-none focus:border-[#4a8059]" /></label>
              <label className="block text-xs font-bold"><span>Palavra-passe (demonstração)</span><span className="relative mt-2 block"><input type={showPassword?'text':'password'} autoComplete="off" value={password} onChange={event=>setPassword(event.target.value)} placeholder="Não necessária nesta versão" className="h-12 w-full rounded-xl border border-[#cad8c9] bg-white px-4 pr-12 text-sm outline-none focus:border-[#4a8059]" /><button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-3 text-[#617563]" aria-label={showPassword?'Ocultar palavra-passe':'Mostrar palavra-passe'}>{showPassword?<EyeOff className="h-5 w-5"/>:<Eye className="h-5 w-5"/>}</button></span></label>
            </div>
            <label className="mt-5 inline-flex items-center gap-3 text-xs text-[#566b5b]"><input type="checkbox" checked={remember} onChange={event=>setRemember(event.target.checked)} /> Manter a sessão demonstrativa neste dispositivo</label>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-5 border-t border-[#d9e1d5] pt-6"><p className="max-w-sm text-xs leading-6 text-[#6a786d]">Acesso demonstrativo. Ainda não existe autenticação real nem dados oficiais da escola.</p><button type="submit" disabled={pending!==null} className="inline-flex min-h-13 items-center gap-3 rounded-full bg-[#f4c64a] px-7 py-4 text-sm font-black text-[#24432e] disabled:opacity-60">Entrar como {selectedLabel} <ArrowRight className="h-4 w-4" /></button></div>
          </form>
        </div>
      </main>
    </div>
  );
}
