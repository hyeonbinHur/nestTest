export interface RepositoryConfig {
    geminiApiKey: string;
    claudeApiKey: string;
    githubToken: string;
    checklistPath: string;
    maxReviewComment: number;
    reviewLevel: 'CRITICAL' | 'MEDIUM' | 'LOW' | 'NITPICK';
    mode: string;
    autoTrigger: boolean;
}
export interface Repository {
    id: number;
    name: string;
    description: string;
    language: string;
    stars: number;
    config: RepositoryConfig;
}
export declare class RepositoriesService {
    private repositories;
    findAll(): Repository[];
    findOne(id: number): Repository | undefined;
    updateConfig(id: number, config: RepositoryConfig): Repository | undefined;
}
