import { Injectable } from '@nestjs/common';
import repositoriesData from '../data/repositories.json';
import * as fs from 'fs';
import * as path from 'path';

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

@Injectable()
export class RepositoriesService {
  private repositories: Repository[] = Array.isArray(repositoriesData)
    ? repositoriesData
    : (repositoriesData as any).default || [];

  findAll(): Repository[] {
    return this.repositories;
  }

  findOne(id: number): Repository | undefined {
    return this.repositories.find((repo) => repo.id === id);
  }

  updateConfig(id: number, config: RepositoryConfig): Repository | undefined {
    const repository = this.repositories.find((repo) => repo.id === id);
    if (!repository) {
      return undefined;
    }

    repository.config = config;

    // Save to JSON file
    const filePath = path.join(__dirname, '..', 'data', 'repositories.json');
    fs.writeFileSync(filePath, JSON.stringify(this.repositories, null, 2), 'utf8');

    return repository;
  }
}
