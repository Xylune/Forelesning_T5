export function isNameValid(name: string): boolean {
    return name.length >= 5 && name.endsWith("!") && name.includes(" ");
}
