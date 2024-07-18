/**
 *
 * @param input
 * @param minInput
 * @param maxInput
 * @param minOutput
 * @param maxOutput
 */
export function ratio (input:number,minInput:number, maxInput:number,minOutput:number, maxOutput:number) {
    let factor = (input - minInput) / (maxInput - minInput);
    return ((maxOutput - minOutput) * factor) + minOutput;
}