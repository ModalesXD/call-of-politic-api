import { Test, TestingModule } from '@nestjs/testing';
import { AnuncesController } from './anunces.controller';

describe('AnuncesController', () => {
  let controller: AnuncesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnuncesController],
    }).compile();

    controller = module.get<AnuncesController>(AnuncesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
