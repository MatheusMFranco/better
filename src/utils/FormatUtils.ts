export const sort = (numbers: string[]) => numbers.sort((a, b) => +a - +b);
export const gameFormat = (numbers: string[]) => sort(numbers).join(' ');
export const numberFormat = (digit: number) => {
    const DIGITS = 2;
    return `${digit}`.padStart(DIGITS, '0');
};
