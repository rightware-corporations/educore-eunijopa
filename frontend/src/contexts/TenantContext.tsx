import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { EUNIJOPA_SCHOOL } from '@/data/tenants';
import type { CreateTenantInput, TenantConfig, TenantModule } from '@/types/tenant';

interface SchoolContextValue {
  tenants: TenantConfig[];
  activeTenant: TenantConfig;
  activeTenantId: string;
  setActiveTenant: (tenantId: string) => void;
  createTenant: (input: CreateTenantInput) => TenantConfig;
  updateTenant: (tenantId: string, patch: Partial<TenantConfig>) => void;
  setModuleEnabled: (tenantId: string, module: TenantModule, enabled: boolean) => void;
  resetPreviewTenants: () => void;
}
const SchoolContext = createContext<SchoolContextValue | null>(null);

// Preserve the EduCore provider contract for internal screens, but disable
// tenant mutation/switching in this one-school presentation deployment.
function unavailable(): never {
  throw new Error('Esta instalação EduCore é exclusiva da EUNIJOPA.');
}
const value: SchoolContextValue = {
  tenants: [EUNIJOPA_SCHOOL],
  activeTenant: EUNIJOPA_SCHOOL,
  activeTenantId: EUNIJOPA_SCHOOL.id,
  setActiveTenant: unavailable,
  createTenant: unavailable,
  updateTenant: unavailable,
  setModuleEnabled: unavailable,
  resetPreviewTenants: unavailable,
};
export function TenantProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const { branding } = EUNIJOPA_SCHOOL;
    const root = document.documentElement;
    root.style.setProperty('--primary', branding.primaryHsl);
    root.style.setProperty('--ring', branding.primaryHsl);
    root.style.setProperty('--sidebar-background', branding.sidebarHsl);
    root.style.setProperty('--sidebar-primary', branding.accentHsl);
    root.style.setProperty('--sidebar-ring', branding.accentHsl);
    root.style.setProperty('--brand-orange', branding.accentHsl);
    document.body.dataset.tenantPreset = branding.experiencePreset;
    document.title = 'EUNIJOPA | EduCore';
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/webp';
    link.href = '/school/eunijopa-logo.webp';
  }, []);
  return <SchoolContext.Provider value={value}>{children}</SchoolContext.Provider>;
}
export function useTenant() {
  const context = useContext(SchoolContext);
  if (!context) throw new Error('useTenant must be used within TenantProvider');
  return context;
}
