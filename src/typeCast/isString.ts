/**
 * Check if the variable is a string
 * @param variable
 */
export default function isString(variable: any) {
 return (typeof variable === 'string' || variable instanceof String)
}
