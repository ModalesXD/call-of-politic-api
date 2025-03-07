import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoutes() {
    return {
      routes: {
        player: {
          getAll: 'GET /player',
          getOne: 'GET /player/:id',
          create: 'POST /player',
          update: 'PUT /player/:id',
          delete: 'DELETE /player/:id'
        },
        rank: {
          getAll: 'GET /rank',
          getOne: 'GET /rank/:id',
          create: 'POST /rank',
          update: 'PUT /rank/:id',
          delete: 'DELETE /rank/:id'
        },
        npc: {
          getAll: 'GET /npc',
          getOne: 'GET /npc/:id',
          create: 'POST /npc',
          update: 'PUT /npc/:id',
          delete: 'DELETE /npc/:id'
        },
        events: {
          getAll: 'GET /events',
          getOne: 'GET /events/:id',
          create: 'POST /events',
          update: 'PUT /events/:id',
          delete: 'DELETE /events/:id'
        },
        anunces: {
          getAll: 'GET /anunces',
          getOne: 'GET /anunces/:id',
          create: 'POST /anunces',
          update: 'PUT /anunces/:id',
          delete: 'DELETE /anunces/:id'
        },
        config: {
          getAll: 'GET /config',
          getOne: 'GET /config/:id',
          create: 'POST /config',
          update: 'PUT /config/:id',
          delete: 'DELETE /config/:id'
        }
      }
    };
  }
}
