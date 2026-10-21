import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, MapPin, Phone, Sprout, ShieldCheck, Menu } from 'lucide-react';
import { EunijopaPhoto } from '@/components/brand/EunijopaPhoto';
import { useState } from 'react';

const IMG = {
  logo: '/school/eunijopa-logo.webp',
  group: '/school/eunijopa-hero-hd.jpg',
  classroom: '/school/eunijopa-classroom-hd.jpg',
  teaching: '/school/eunijopa-teaching-hd.jpg',
  garden: '/school/eunijopa-garden-hd.jpg',
  campus: '/school/eunijopa-campus-hd.jpg',
  judo: '/school/eunijopa-judo-editorial.jpg',
};
const sections = [
  { id: 'escola', label: 'A escola' },
  { id: 'aprendizagem', label: 'Aprendizagem' },
  { id: 'vida-escolar', label: 'Vida escolar' },
  { id: 'contactos', label: 'Contactos' },
];
export default function LandingPage() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#f8f8f0] text-[#22382a]">
      <header className="absolute left-0 right-0 top-0 z-30">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-2 px-3 py-4 sm:px-5 md:px-12 lg:py-7">
          <Link to="/" aria-label="EUNIJOPA — início" className="flex items-center gap-3 rounded-full bg-white/95 py-2 pl-2 pr-5 shadow-lg backdrop-blur-sm">
            <img src={IMG.logo} alt="Logótipo EUNIJOPA" className="h-12 w-12 rounded-full object-contain sm:h-14 sm:w-14" />
            <span className="leading-tight"><strong className="block text-lg tracking-[.08em] text-[#2f593e]">EUNIJOPA</strong><small className="block text-[10px] font-semibold tracking-wide">Centro Infantil e Externato</small></span>
          </Link>
          <nav aria-label="Navegação principal" className="hidden items-center gap-7 rounded-full bg-white/95 px-8 py-4 text-[13px] font-bold shadow-lg backdrop-blur-sm lg:flex">
            {sections.map(item => <a key={item.id} href={'#' + item.id} className="transition-colors hover:text-[#b78e20]">{item.label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden min-h-12 items-center gap-2 rounded-full bg-[#f3c242] px-4 text-xs font-extrabold text-[#233b2c] shadow-lg min-[470px]:inline-flex sm:px-6 sm:text-sm">Portal EduCore <ArrowRight className="h-4 w-4" /></Link>
            <button type="button" aria-label="Abrir navegação" aria-expanded={navOpen} onClick={() => setNavOpen(!navOpen)} className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg lg:hidden"><Menu className="h-5 w-5" /></button>
          </div>
        </div>
        {navOpen && <nav aria-label="Navegação móvel" className="mx-5 flex flex-col gap-5 rounded-2xl bg-white p-6 text-sm font-bold shadow-xl lg:hidden">{sections.map(item => <a href={'#' + item.id} key={item.id} onClick={() => setNavOpen(false)}>{item.label}</a>)}</nav>}
      </header>

      <main>
        <section id="escola" className="relative isolate flex min-h-[780px] items-end overflow-hidden bg-[#274b35] pt-44 text-white sm:min-h-[760px] lg:min-h-[92vh]">
          <EunijopaPhoto src={IMG.group} fallback="/school/eunijopa-hero.webp" alt="Alunos da EUNIJOPA com o uniforme da instituição" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-[55%_center] sm:object-center" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0f3325]/95 via-[#143b2b]/68 to-transparent" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#122b1d]/75 via-transparent to-[#183c2b]/15" />
          <div className="mx-auto grid w-full max-w-[1600px] items-end gap-9 px-6 pb-20 sm:px-12 lg:grid-cols-[1fr_.5fr] lg:pb-28">
            <div className="max-w-5xl">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-[11px] font-extrabold uppercase tracking-[.22em] backdrop-blur-sm">
                <Sprout className="h-4 w-4 text-[#f4cf5c]" /> Centro Infantil e Externato
              </div>
              <h1 className="max-w-[810px] text-[clamp(3rem,6.2vw,7rem)] font-black leading-[.98] tracking-[-.063em]">Onde cada criança <span className="font-serif font-normal italic text-[#f5d16b]">cresce</span> com confiança.</h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-white/90 sm:text-lg">Na EUNIJOPA, aprender é descobrir, experimentar e desenvolver o próprio potencial num ambiente acolhedor e estimulante.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#aprendizagem" className="inline-flex min-h-14 items-center gap-2 rounded-full bg-[#f6c348] px-7 font-extrabold text-[#263a29]">Conhecer a EUNIJOPA <ArrowRight className="h-5 w-5" /></a>
                <a href="#contactos" className="inline-flex min-h-14 items-center gap-2 rounded-full border border-white/45 bg-white/10 px-7 font-bold text-white backdrop-blur">Informações e inscrições</a>
              </div>
            </div>
            <div className="max-w-[300px] justify-self-end border-l-2 border-[#f6c348] pl-6 text-left lg:mb-6">
              <p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#f5d16b]">Descobrir · Aprender · Crescer</p>
              <p className="mt-3 text-lg leading-relaxed text-white/90">Educação feita de proximidade, cuidado e experiências reais.</p>
            </div>
          </div>
        </section>

        <section className="grid bg-[#f3c54b] px-6 py-9 text-[#273d2a] md:grid-cols-3 md:px-12">
          {[['01','Centro Infantil','Para crianças dos 1 aos 5 anos'],['02','Pré-escolar e Primário','Percursos de aprendizagem'],['03','Turmas reduzidas','Acompanhamento próximo']].map(([num,title,subtitle]) =>
            <div key={num} className="flex items-start gap-5 border-b border-[#977721]/30 py-4 md:border-b-0 md:border-r md:px-7 md:last:border-r-0"><span className="text-xs font-black">{num}</span><div><strong className="block text-xl font-black">{title}</strong><span className="mt-1 block text-sm">{subtitle}</span></div></div>
          )}
        </section>

        <section id="aprendizagem" className="grid min-h-[670px] items-center gap-12 bg-[#f8f8f0] px-6 py-24 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-[7vw]">
          <div className="relative min-h-[430px] overflow-hidden rounded-[9rem_2rem_2rem_2rem] bg-[#e2e9db] sm:min-h-[590px]">
            <EunijopaPhoto src={IMG.classroom} fallback="/school/eunijopa-classroom.webp" alt="Aluna da EUNIJOPA numa sala de aula" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute bottom-7 left-7 rounded-2xl bg-white/95 p-5 text-xs font-extrabold uppercase tracking-[.14em] text-[#2d5740]">Um ambiente para aprender</div>
          </div>
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[.25em] text-[#708a4b]">A nossa abordagem</p>
            <h2 className="mt-5 text-[clamp(2.75rem,5.7vw,6rem)] font-black leading-[1.04] tracking-[-.06em]">Atenção a cada criança. <span className="font-serif font-normal italic text-[#718749]">Espaço para todas as descobertas.</span></h2>
            <p className="mt-7 text-lg leading-9 text-[#5f7064]">A escola apresenta professores qualificados e dedicados, turmas reduzidas e um ambiente seguro, acolhedor e estimulante.</p>
            <div className="mt-10 grid gap-6 border-t border-[#d2dfd1] pt-9 sm:grid-cols-2">
              <div><ShieldCheck className="mb-4 h-8 w-8 text-[#4a7953]" /><h3 className="font-extrabold">Ambiente de confiança</h3><p className="mt-2 text-sm leading-7 text-[#677568]">Cuidado e acompanhamento próximo.</p></div>
              <div><BookOpen className="mb-4 h-8 w-8 text-[#4a7953]" /><h3 className="font-extrabold">Aprender participando</h3><p className="mt-2 text-sm leading-7 text-[#677568]">Criatividade, expressão artística, música e movimento.</p></div>
            </div>
          </div>
        </section>

        <section id="vida-escolar" className="bg-[#2a4d38] px-6 py-24 text-white lg:px-[7vw]">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-7 md:grid-cols-[1fr_.8fr] md:items-end"><div><p className="text-xs font-black uppercase tracking-[.22em] text-[#f3cd64]">Vida escolar</p><h2 className="mt-4 max-w-3xl text-[clamp(2.7rem,5.2vw,5.6rem)] font-black leading-[1.02] tracking-[-.06em]">O crescimento acontece também fora dos livros.</h2></div><p className="max-w-md text-base leading-8 text-white/75">O movimento, as experiências e a participação fazem parte dos momentos que a escola partilha com a comunidade.</p></div>
            <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
              <figure className="relative m-0 min-h-[490px] overflow-hidden rounded-[2rem] bg-[#466849] lg:min-h-[640px]">
                <EunijopaPhoto src={IMG.garden} fallback="/school/eunijopa-hero.webp" alt="Alunos da EUNIJOPA a cuidar de uma horta na escola" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142d22]/85 via-transparent to-transparent" />
                <figcaption className="absolute bottom-7 left-7 right-7 sm:bottom-10 sm:left-10">
                  <span className="text-[11px] font-black uppercase tracking-[.2em] text-[#f8d46a]">Aprendizagem pela descoberta</span>
                  <strong className="mt-2 block max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">Cultivar a curiosidade. Cuidar do mundo.</strong>
                </figcaption>
              </figure>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <figure className="relative m-0 min-h-[260px] overflow-hidden rounded-[2rem] bg-[#557459] lg:min-h-[300px]">
                  <EunijopaPhoto src={IMG.campus} fallback="/school/eunijopa-classroom.webp" alt="Instalações coloridas do Externato EUNIJOPA" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#11271d]/80 to-transparent px-7 pb-7 pt-16 text-xl font-black">Um espaço cheio de vida.</figcaption>
                </figure>
                <figure className="relative m-0 min-h-[260px] overflow-hidden rounded-[2rem] bg-[#557459] lg:min-h-[300px]">
                  <EunijopaPhoto src={IMG.judo} fallback="/school/eunijopa-judo.webp" alt="Atleta infantil durante uma competição de judo partilhada pela escola" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#11271d]/90 to-transparent px-7 pb-7 pt-20 text-xl font-black">Coragem em movimento.</figcaption>
                </figure>
              </div>
            </div>
            <div className="mt-11 flex flex-wrap items-center gap-8 border-t border-white/20 pt-9"><Sprout className="h-10 w-10 text-[#f3ca59]" /><p className="max-w-3xl text-base leading-8 text-white/85">A comunicação da EUNIJOPA valoriza a aprendizagem através da diversão, da expressão artística, da música e do movimento.</p></div>
          </div>
        </section>

        <section className="bg-[#f4e9c9] px-6 py-24 lg:px-[7vw]">
          <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-2">
            <div><p className="text-xs font-black uppercase tracking-[.22em] text-[#55724d]">EduCore na EUNIJOPA</p><h2 className="mt-5 text-[clamp(2.7rem,5.2vw,5.6rem)] font-black leading-[1.04] tracking-[-.055em]">Uma escola próxima, também no digital.</h2><p className="mt-7 max-w-xl text-base leading-8 text-[#526455]">Alunos, encarregados, professores e equipas da escola encontram experiências organizadas por função no portal EduCore da EUNIJOPA.</p><Link to="/login" className="mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#2d553d] px-7 font-extrabold text-white">Entrar no portal <ArrowRight className="h-5 w-5" /></Link></div>
            <div className="relative mx-auto w-full max-w-lg rounded-[2rem] bg-[#2f5840] p-7 shadow-2xl sm:p-11"><div className="flex items-center gap-3 border-b border-white/20 pb-6"><img src={IMG.logo} alt="" className="h-16 w-16 rounded-full bg-white object-contain p-1" /><div className="text-white"><p className="text-xl font-black">EUNIJOPA</p><p className="text-xs text-white/70">Portal EduCore</p></div></div><div className="mt-7 space-y-4">{[['Aluno','Aprendizagem e percurso'],['Encarregado','Acompanhamento dos educandos'],['Professor','Turmas e avaliações'],['Gestão','Informação por responsabilidade']].map(([a,b])=><div key={a} className="flex items-center justify-between rounded-xl bg-white/10 p-4 text-white"><span className="font-bold">{a}</span><span className="text-xs text-white/70">{b}</span></div>)}</div></div>
          </div>
        </section>

        <section id="contactos" className="bg-[#f8f8f0] px-6 py-24 lg:px-[7vw]">
          <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_.9fr]">
            <div><p className="text-xs font-black uppercase tracking-[.22em] text-[#668352]">Visite a EUNIJOPA</p><h2 className="mt-6 text-[clamp(2.8rem,5.5vw,6rem)] font-black leading-[1.03] tracking-[-.06em]">O próximo capítulo começa aqui.</h2><p className="mt-7 max-w-xl text-lg leading-9 text-[#576b5b]">Conheça as condições de inscrição e o ambiente escolar através dos contactos publicados pela instituição.</p></div>
            <div className="self-center rounded-[2rem] bg-white p-7 shadow-sm sm:p-10"><div className="mb-7 flex items-center gap-3"><img src={IMG.logo} alt="" className="h-16 w-16 object-contain" /><div><strong className="block">Centro Infantil e Externato</strong><strong className="text-2xl text-[#315c40]">EUNIJOPA</strong></div></div><a className="flex gap-4 border-t py-6" href="https://www.google.com/maps/search/?api=1&query=Matola-rio%2C%20Av.%20da%20Namaacha%2C%20Thandavando" target="_blank" rel="noreferrer"><MapPin className="h-6 w-6 shrink-0 text-[#557e57]" /><span>Matola-rio, Av. da Namaacha, Thandavando</span></a><a className="flex gap-4 border-t py-6" href="tel:+258840780064"><Phone className="h-6 w-6 shrink-0 text-[#557e57]" /><span>+258 84 078 0064</span></a><a className="flex gap-4 border-t py-6" href="tel:+258844398559"><Phone className="h-6 w-6 shrink-0 text-[#557e57]" /><span>+258 84 439 8559</span></a><p className="mt-4 text-sm text-[#6d796a]">Inscrições anunciadas para 2026. Confirme a disponibilidade diretamente com a escola.</p></div>
          </div>
        </section>
      </main>
      <footer className="flex flex-wrap items-center justify-between gap-6 bg-[#1e3c2c] px-6 py-8 text-xs text-white/75 lg:px-[7vw]"><span className="font-bold text-white">© {new Date().getFullYear()} EUNIJOPA</span><span>Centro Infantil e Externato · Matola-rio</span><span>Powered by EduCore</span></footer>
    </div>
  );
}
