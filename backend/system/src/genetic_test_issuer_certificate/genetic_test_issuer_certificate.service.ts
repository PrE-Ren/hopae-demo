import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  GeneticTestIssuerCertificate,
  GeneticTestIssuerCertificateEntity,
} from 'src/entities/genetic_test_issuer_certificate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeneticTestIssuerCertificateService {
  constructor(
    @InjectRepository(GeneticTestIssuerCertificateEntity)
    private readonly geneticTestIssuerCertificateRepository: Repository<GeneticTestIssuerCertificateEntity>,
  ) {}

  async create(vc_did: string): Promise<GeneticTestIssuerCertificateEntity> {
    const certificate = this.geneticTestIssuerCertificateRepository.create({
      vc_did,
    });

    return await this.geneticTestIssuerCertificateRepository.save(certificate);
  }

  async findOneByVcId(
    vcId: string,
  ): Promise<GeneticTestIssuerCertificate | null> {
    const entity = await this.geneticTestIssuerCertificateRepository.findOne({
      where: { vc_did: vcId },
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

    return new GeneticTestIssuerCertificate({
      vc_did: entity.vc_did,
      createdAt: entity.createdAt,
    });
  }
}
