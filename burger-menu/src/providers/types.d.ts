// types.ts
export type Theme = 'light' | 'dark' | 'contrast';

export interface ThemeContextType {
  theme: Theme;
  setTheme?: (theme: Theme) => void;
  updateTheme: (theme: Theme) => void;
}
