function isPrime(number: number): boolean {
    if (number < 2) {
        return false;
    }

    for (let divisor = 2; divisor * divisor <= number; divisor++) {
        if (number % divisor === 0) {
            return false;
        }
    }

    return true;
}

export function findTwinPrimes(start: number, end: number): number[][] {
    const twinPrimes: number[][] = [];

    for (let number = start; number <= end - 2; number++) {
        if (isPrime(number) && isPrime(number + 2)) {
            twinPrimes.push([number, number + 2]);
        }
    }

    return twinPrimes;
}