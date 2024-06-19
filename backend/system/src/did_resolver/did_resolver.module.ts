import { Module } from '@nestjs/common';
import {
  DidResolverService,
  DidResolverServiceDockImpl,
  DidResolverServiceWebImpl,
} from './did_resolver.service';
import { DidResolverController } from './did_resolver.controller';
import { DockService } from 'src/dock/dock.service';
import { DockModule } from 'src/dock/dock.module';
import { DockDidUtilService } from 'src/dock/util_service/util.service';

const didResolverService = {
  provide: DidResolverService,
  useFactory: (
    dockService: DockService,
    dockDidUtilService: DockDidUtilService,
  ) => {
    console.log('use factory -------------');
    console.log(process.env.DOCK);
    console.log(process.env.DOCK === 'true');
    return process.env.DOCK === 'true'
      ? new DidResolverServiceDockImpl(dockService, dockDidUtilService)
      : new DidResolverServiceWebImpl();
  },
  inject: [DockService, DockDidUtilService],
};

@Module({
  imports: [DockModule],
  providers: [didResolverService, DockService, DockDidUtilService],
  controllers: [DidResolverController],
  exports: [didResolverService],
})
export class DidResolverModule {}
