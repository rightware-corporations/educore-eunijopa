import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { EUNIJOPA_SCHOOL, DEFAULT_TENANTS } from '@/data/tenants';

const root = process.cwd();
const source = join(root, 'src');
function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(item => {
    const file = join(dir, item.name);
    return item.isDirectory() ? sourceFiles(file) : /\.(ts|tsx|css)$/.test(file) && !/eunijopaIdentity\.test\.ts$/.test(file) ? [file] : [];
  });
}

describe('EUNIJOPA — apresentação escolar independente', () => {
  it('identifica exclusivamente EUNIJOPA', () => {
    expect(DEFAULT_TENANTS).toHaveLength(1);
    expect(DEFAULT_TENANTS[0].id).toBe(EUNIJOPA_SCHOOL.id);
    expect(EUNIJOPA_SCHOOL.slug).toBe('eunijopa');
    expect(EUNIJOPA_SCHOOL.branding.displayName).toMatch(/EUNIJOPA/);
    expect(EUNIJOPA_SCHOOL.enabledRoles).toHaveLength(7);
  });
  it('não contém referências de identidade de outras escolas no código do portal', () => {
    const forbidden = /(?:col[eé]gio[-\s]*p[aá]scoa|\bp[aá]scoa\b|deus[-\s]*connosco|horizonte[-\s]*do[-\s]*futuro|@colegio_deus)/i;
    const violations = sourceFiles(source).flatMap(file => {
      const content = readFileSync(file, 'utf8');
      return forbidden.test(content) || forbidden.test(relative(root, file)) ? [relative(root, file)] : [];
    });
    expect(violations).toEqual([]);
  });
  it('referencia assets binários oficiais da EUNIJOPA, não Data URI', () => {
    for (const name of ['eunijopa-logo-original.jpg','eunijopa-hero-hd.jpg','eunijopa-classroom-hd.jpg','eunijopa-teaching-hd.jpg','eunijopa-garden-hd.jpg','eunijopa-campus-hd.jpg','eunijopa-judo-hd.jpg','eunijopa-enrollment-2026.jpg','eunijopa-infant-center-2026.jpg']) {
      const file = join(root, 'public', 'school', name);
      expect(existsSync(file)).toBe(true);
      const bytes = readFileSync(file);
      expect(bytes.subarray(0, 2).toString('hex')).toBe('ffd8');
    }
  });
  it('publica metadados da escola e não expõe admin multi-escola', () => {
    const html = readFileSync(join(root, 'index.html'),'utf8');
    expect(html).toMatch(/EUNIJOPA/);
    expect(html).toMatch(/og:image/);
    const app = readFileSync(join(root,'src','App.tsx'),'utf8');
    expect(app).not.toMatch(/PlatformAdminPage|pathname\.startsWith\(['"]\/platform/);
  });
});
