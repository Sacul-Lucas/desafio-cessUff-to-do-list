import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Injectable()
export class SeedTask implements OnApplicationBootstrap {
    constructor(private readonly tasksService: TasksService) {}

    async onApplicationBootstrap() {
        const DEFAULT_TASK_TITLE = process.env.DEFAULT_TASK_TITLE;
        const DEFAULT_TASK_DESCRIPTION = process.env.DEFAULT_TASK_DESCRIPTION;
        const DEFAULT_TASK_DEADLINE = new Date(process.env.DEFAULT_TASK_DEADLINE!);
        
        if (!DEFAULT_TASK_TITLE || !DEFAULT_TASK_DESCRIPTION || !DEFAULT_TASK_DEADLINE) {
          console.warn(
            'Default task not seeded. Missing DEFAULT_TASK_TITLE, DEFAULT_TASK_DESCRIPTION or DEFAULT_TASK_DEADLINE.',
          );
          return;
        }
    
        const existingLocation = await this.tasksService.findByObject({
          title: DEFAULT_TASK_TITLE,
          description: DEFAULT_TASK_DESCRIPTION,
          deadline: DEFAULT_TASK_DEADLINE,
        });
    
        if (existingLocation) {
          console.log(`Tarefa padrão já existe: ${DEFAULT_TASK_TITLE}`);
          return;
        }
    
        await this.tasksService.create({
          title: DEFAULT_TASK_TITLE,
          description: DEFAULT_TASK_DESCRIPTION,
          deadline: DEFAULT_TASK_DEADLINE,
          status: 'pending',
        });
    
        console.log(`Tarefa padrão criada: ${DEFAULT_TASK_TITLE}`);
    }
}
