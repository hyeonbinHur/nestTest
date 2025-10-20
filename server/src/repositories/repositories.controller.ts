import { Controller, Get, Patch, Param, Body, NotFoundException } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import type { RepositoryConfig } from './repositories.service';

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Get()
  findAll() {
    return this.repositoriesService.findAll();
  }

  @Patch(':id')
  updateConfig(@Param('id') id: string, @Body('config') config: RepositoryConfig) {
    const repository = this.repositoriesService.updateConfig(+id, config);
    if (!repository) {
      throw new NotFoundException(`Repository with ID ${id} not found`);
    }
    return repository;
  }
}
