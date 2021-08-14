import { OmitType, PartialType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class IndexUserSwagger extends PartialType(OmitType(UserEntity, [
  'createdAt',
  'updatedAt',
  'deletedAt',
])) {}
