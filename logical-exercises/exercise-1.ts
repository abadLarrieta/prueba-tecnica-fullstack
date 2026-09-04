export function reverseWords(text: string): string {
    return text
        .split(' ')
        .map((word) => word.split('').reverse().join(''))
        .join(' ');
}