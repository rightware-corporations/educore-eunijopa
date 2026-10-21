import type { TenantConfig, TenantModule } from '@/types/tenant';
import type { UserRole } from '@/types/roles';

export const ALL_TENANT_ROLES: UserRole[] = [
  'student','guardian','teacher','pedagogy','executive','secretary','finance',
];

export const CORE_TENANT_MODULES: TenantModule[] = [
  'student_registry','admissions','enrollment','academic','timetable',
  'attendance','assessments','gradebook','finance','treasury','documents',
  'communication','knowledge','reporting',
];

/**
 * Dedicated EUNIJOPA commercial deployment.
 * EduCore reuses its role/module implementation without a school selector.
 */
export const EUNIJOPA_SCHOOL: TenantConfig = {
  id: 'eunijopa',
  slug: 'eunijopa',
  status: 'active',
  legalName: 'Centro Infantil e Externato EUNIJOPA',
  countryCode: 'MZ',
  locale: 'pt-MZ',
  timezone: 'Africa/Maputo',
  currency: 'MZN',
  branding: {
    displayName: 'Centro Infantil e Externato EUNIJOPA',
    shortName: 'EUNIJOPA',
    descriptor: 'Centro Infantil e Externato',
    logo: '/school/eunijopa-logo.webp',
    mark: '/school/eunijopa-logo.webp',
    favicon: '/school/eunijopa-logo.webp',
    primaryHsl: '143 28% 28%',
    accentHsl: '43 92% 60%',
    sidebarHsl: '150 31% 21%',
    experiencePreset: 'institutional',
  },
  enabledRoles: ALL_TENANT_ROLES,
  enabledModules: CORE_TENANT_MODULES,
  publicExperience: {
    landingEnabled: true,
    applicationsEnabled: true,
    commerceEnabled: false,
    poweredByEduCore: true,
  },
  createdAt: '2026-10-21T00:00:00.000Z',
};

export const DEFAULT_TENANTS: TenantConfig[] = [EUNIJOPA_SCHOOL];
