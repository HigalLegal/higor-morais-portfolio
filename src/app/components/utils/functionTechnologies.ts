export const generatePhraseTechnologies = (initial: string, technologies: string[]): string => {
    return `${initial}${technologies.join(' | ')}`;
}