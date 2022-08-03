export function splitNewlines(s: string): string[]{
    return s.replace(/\r/g, "").split(/\n/);
}