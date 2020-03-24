import {
  Test,
  TestingModule
} from '@nestjs/testing';
import {
  IriStoreController
} from './iri-store.controller';

describe('IriStore Controller', () => {
  let controller: IriStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IriStoreController],
    }).compile();

    controller = module.get<IriStoreController>(IriStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
