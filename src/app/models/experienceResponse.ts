export type ExperienceResponse = {
    id: number;
    companyName: string;
    description: string;
    beginning: string;
    end: string | null;
    technologiesWorked: string[];
};
