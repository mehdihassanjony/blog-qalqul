import { Controller } from '@nestjs/common';
import { BrokerService } from './broker.service';

@Controller('broker')
export class BrokerController {
  constructor(private service: BrokerService) {}

  // @Post('/')
  // async brokerSend() {
  //   const send = await this.service.supplierOriginUpdate({
  //     supplierId: 'string',
  //     originDistricts: [],
  //     truckCategories: [],
  //     companyName: 'string',
  //     profilePicture: 'string',
  //     fullName: 'string',
  //     email: 'string',
  //     phone: 'string',
  //   });
  //   return {
  //     message: 'Successfully event published',
  //     data: send,
  //   };
  // }
}
