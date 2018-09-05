export function mapInput(input: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number) {
    const deltaInput = inputMax - inputMin;
    const deltaOutput = outputMax - outputMin;

    const mappedInput = ((((input - inputMin) / deltaInput) * deltaOutput) + outputMin);
    return Math.ceil(mappedInput);
}
