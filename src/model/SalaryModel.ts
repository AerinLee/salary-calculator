export interface Salary {
  id: number;
  date: string;
  amount: number;
  riseRate?: number;
  riseType?: RiseType;
}

export enum RiseType {
  ANNUAL_NEGO = "ANNUAL_NEGO",
  CHANGE_JOB = "CHANGE_JOB",
}
