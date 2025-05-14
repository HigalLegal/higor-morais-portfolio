export type ProjectRequest = {
    description: string;
    urlRepository: string;
    importanceLevel: number;
    technologiesWorkedId: number[];
};

export default ProjectRequest;
