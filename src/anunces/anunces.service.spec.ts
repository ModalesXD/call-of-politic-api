import { Test, TestingModule } from '@nestjs/testing';
import { AnuncesService } from './anunces.service';

describe('AnuncesService', () => {
  let service: AnuncesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnuncesService],
    }).compile();

    service = module.get<AnuncesService>(AnuncesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
