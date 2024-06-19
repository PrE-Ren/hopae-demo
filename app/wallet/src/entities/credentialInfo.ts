export interface CredentialInfo {
  name: string;
  issuer: string;
  issueDate: Date;
  fields: string[];
  rawString: string;
}

export interface SavedCredentialInfo {
  issuer: string;
  vc: string;
}
