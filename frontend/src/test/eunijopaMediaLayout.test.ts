import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (file: string) => readFileSync(join(root, file), 'utf8');
describe('EUNIJOPA — fotografia e narrativa editorial', () => {
  it('prefere fotografias originais a previews comprimidos', () => {
    const landing = read('src/pages/public/LandingPage.tsx');
    expect(landing).toContain('eunijopa-hero-hd.jpg');
    expect(landing).toContain('eunijopa-classroom-hd.jpg');
    expect(landing).toContain('eunijopa-garden-hd.jpg');
    expect(landing).toContain('eunijopa-campus-hd.jpg');
    expect(landing).toContain('eunijopa-judo-editorial.jpg');
    expect(landing).toContain('EunijopaPhoto');
  });
  it('não coloca informação técnica sobre as fotografias', () => {
    const landing = read('src/pages/public/LandingPage.tsx');
    const app = read('src/App.tsx');
    expect(landing).not.toContain('Ambiente demonstrativo do MVP.');
    expect(app).not.toContain('PoweredByEduCore');
  });
});
