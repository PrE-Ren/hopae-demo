import { CredentialInfo } from '@/entities/credentialInfo';
import { SDJwtInstance } from '@sd-jwt/core';
import { decodeSdJwt, getClaims } from '@sd-jwt/decode';
import { digest, generateSalt, getSigner } from '@/utils/crypto';

export const holderPrivateKey = {
  key_ops: ['sign'],
  ext: true,
  kty: 'EC',
  x: 'UnjoAVHwrQctpLfwxodbv84tCqGFytR-3ftvMFue8UU',
  y: 'O3ZiOJgGicy6CHBfQQ2P5G79O72YkZ065KztH6lUEO0',
  crv: 'P-256',
  d: 'NaRtJp5hu2T2K30xIEd2SY3CkGSAoIqDF8NP0syIOvM',
};

export const dummyEncrypt = (data: string) => {
  return data + 'mock';
};

// Function to encrypt a string
export const encrypt = async (data: string) => {
  const signer = getSigner(holderPrivateKey);
  return await signer(data);
};

export const extractData = async (
  vc: string,
): Promise<CredentialInfo | null> => {
  try {
    const { 0: header, 1: payload, 2: signature, length } = vc.split('.');
    const decodedSdJwt = await decodeSdJwt(vc, digest);
    const claims: any = await getClaims(
      decodedSdJwt.jwt.payload,
      decodedSdJwt.disclosures,
      digest,
    );
    const vpInstance = new SDJwtInstance({
      hasher: digest,
      hashAlg: 'SHA-256',
      saltGenerator: generateSalt,
      kbSigner: undefined,
      kbSignAlg: 'ES256',
    });
    const allKeys = await vpInstance.keys(vc);
    const filteredKeys = allKeys.filter(
      (key) =>
        !key.includes('.') &&
        key !== 'vct' &&
        key !== 'iss' &&
        key !== 'iat' &&
        key !== 'exp' &&
        key !== 'nbf' &&
        key !== 'jti' &&
        key !== 'sub' &&
        key !== 'aud' &&
        key !== 'subject' &&
        key !== 'issuer' &&
        key !== 'id',
    );
    return {
      name: claims.vct,
      issuer: claims.iss,
      issueDate: new Date(claims.iat),
      fields: filteredKeys,
      values: filteredKeys.map((key) => claims[key]),
      rawString: vc,
    };
  } catch (e) {
    return null;
  }
};

export const makeVP = async (vc: string, fields: string[], nonce: string) => {
  const vpInstance = new SDJwtInstance({
    hasher: digest,
    hashAlg: 'SHA-256',
    saltGenerator: generateSalt,
    kbSigner: await getSigner(holderPrivateKey),
    kbSignAlg: 'EdDSA',
  });

  let presentationFrame: { [key: string]: boolean } = {};
  fields.forEach((key) => {
    presentationFrame[key] = true;
  });
  const kbPayload = {
    iat: new Date().getTime(),
    aud: 'VP 받는 사람',
    nonce: await encrypt(nonce),
  };

  return vpInstance.present(vc, presentationFrame, {
    kb: { payload: kbPayload },
  });
};
