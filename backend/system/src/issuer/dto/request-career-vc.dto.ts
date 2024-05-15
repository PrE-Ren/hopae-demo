import { IsString } from 'class-validator';

export class RequestCareerVcDTO {
  @IsString()
  readonly holderDid: string;
  @IsString()
  readonly orignalNonce: string;
  @IsString()
  readonly encryptedNonce: string;
}
