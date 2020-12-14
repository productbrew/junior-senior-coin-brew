declare module 'email-to-name' {
  export function process(email: string): string;
}

declare module 'niceware' {
  export function generatePassphrase(length: number): string[];
}
