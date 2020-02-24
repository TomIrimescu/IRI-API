import { Test, TestingModule } from '@nestjs/testing';
import { IriStoreService } from './iri-store.service';

describe('IriStoreService', () => {
  let service: IriStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IriStoreService],
    }).compile();

    service = module.get<IriStoreService>(IriStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
