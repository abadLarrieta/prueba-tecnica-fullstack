export function getUniqueEvenNumbers(numbers: number[]): number[] {
    return numbers.filter(
        (number, index) =>
            number % 2 === 0 &&
            numbers.indexOf(number) === index,
    );
}