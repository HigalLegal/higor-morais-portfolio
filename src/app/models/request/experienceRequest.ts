export type ExperienceRequest = {
    companyName: string;
    description: string;
    beginning: string;
    end?: string | null;
    technologiesWorkedId: number[];
};

export default ExperienceRequest;
