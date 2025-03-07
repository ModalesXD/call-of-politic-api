import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncementController } from './announcement.controller';
import { AppService } from '../../../app.service';

describe('AnnouncementController', () => {
  let controller: AnnouncementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnouncementController],
      providers: [AppService],
    }).compile();

    controller = module.get<AnnouncementController>(AnnouncementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
