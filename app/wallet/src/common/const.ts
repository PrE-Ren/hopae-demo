export const holderDid =
  'did:dock:5C9s68UmGTLXE6WwKZGRcZhSUX72G51WJ8wTw9fbCXC3CbKw';

export const holderPrivateKey = {
  key_ops: ['sign'],
  ext: true,
  kty: 'EC',
  x: 'UnjoAVHwrQctpLfwxodbv84tCqGFytR-3ftvMFue8UU',
  y: 'O3ZiOJgGicy6CHBfQQ2P5G79O72YkZ065KztH6lUEO0',
  crv: 'P-256',
  d: 'NaRtJp5hu2T2K30xIEd2SY3CkGSAoIqDF8NP0syIOvM',
};

export const translationDict: { [key: string]: string } = {
  department: '부서 이름',
  position: '직위',
  join: '입사날짜',
  leave: '퇴사날짜',
  hair_loss_gene_heritability: '탈모 유전자 유전율',
  dermatitis_gene_heritability: '피부염 유전자 유전율',
  cancer_risk: '암 위험도',
  stomach: '위암 위험도',
  lungs: '폐암 위험도',
  liver: '간암 위험도',
  pancreas: '췌장암 위험도',
};
