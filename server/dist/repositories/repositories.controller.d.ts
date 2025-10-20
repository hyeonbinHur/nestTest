import { RepositoriesService } from './repositories.service';
import type { RepositoryConfig } from './repositories.service';
export declare class RepositoriesController {
    private readonly repositoriesService;
    constructor(repositoriesService: RepositoriesService);
    findAll(): import("./repositories.service").Repository[];
    updateConfig(id: string, config: RepositoryConfig): import("./repositories.service").Repository;
}
