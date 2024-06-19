import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CareerIssuerCertificate,
  CareerIssuerCertificateEntity,
} from 'src/entities/career_issuer_certificate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CareerIssuerCertificateService {
  constructor(
    @InjectRepository(CareerIssuerCertificateEntity)
    private readonly careerIssuerCertificateRepository: Repository<CareerIssuerCertificateEntity>,
  ) {}

  async create(vc_did: string): Promise<CareerIssuerCertificateEntity> {
    const certificate = this.careerIssuerCertificateRepository.create({
      vc_did,
    });

    return await this.careerIssuerCertificateRepository.save(certificate);
  }

  async findOneByVcId(vc_did: string): Promise<CareerIssuerCertificate | null> {
    const entity = await this.careerIssuerCertificateRepository.findOne({
      where: { vc_did },
      order: { createdAt: 'DESC' }, // 최신순으로 정렬
    });

    if (!entity) {
      return null; // 엔티티가 없으면 null을 반환
    }

    const now = new Date();
    const vcCreatedAt = entity.createdAt;
    vcCreatedAt.setMonth(vcCreatedAt.getMonth() + 1);
    if (now >= vcCreatedAt) {
      return null;
    }

    return new CareerIssuerCertificate({
      vc_did: entity.vc_did,
      createdAt: entity.createdAt,
    });
  }
}
