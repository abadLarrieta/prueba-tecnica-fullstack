export function findCombinations(
    numbers: number[],
    target: number,
): number[][] {
    const combinations: number[][] = [];

    const backtrack = (
        start: number,
        current: number[],
        sum: number,
    ): void => {
        if (sum === target) {
            combinations.push([...current]);
            return;
        }

        if (sum > target) {
            return;
        }

        for (let index = start; index < numbers.length; index++) {
            current.push(numbers[index]);

            backtrack(
                index + 1,
                current,
                sum + numbers[index],
            );

            current.pop();
        }
    };

    backtrack(0, [], 0);

    return combinations;
}