import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CareerIssuerEmployee,
  CareerIssuerEmployeeEntity,
} from 'src/entities/career_issuer_employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CareerIssuerEmployeeService {
  constructor(
    @InjectRepository(CareerIssuerEmployeeEntity)
    private readonly careerIssuerEmployeeRepository: Repository<CareerIssuerEmployeeEntity>,
  ) {}
  async create(
    did: string,
    department: string,
    position: string,
    salary: number,
    join: Date,
    leave: Date,
  ): Promise<CareerIssuerEmployeeEntity> {
    const careerIssuerEmployee = this.careerIssuerEmployeeRepository.create({
      did,
      department,
      position,
      salary,
      join,
      leave,
    });

    return await this.careerIssuerEmployeeRepository.save(careerIssuerEmployee);
  }
  async findOneByDid(did: string): Promise<CareerIssuerEmployee | null> {
    const entity = await this.careerIssuerEmployeeRepository.findOne({
      where: { did },
      order: { createdAt: 'DESC' }, // 최신순으로 정렬
    });
    if (!entity) {
      return null;
    }
    return new CareerIssuerEmployee({
      did: entity.did,
      department: entity.department,
      position: entity.position,
      salary: entity.salary,
      join: entity.join,
      leave: entity.leave,
    });
  }
}
