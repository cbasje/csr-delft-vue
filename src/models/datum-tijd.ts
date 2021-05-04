export interface DatumTijd {
  date: Date;
  timezone_type: number;
  timezone: Timezone;
}

export enum Timezone {
  EuropeAmsterdam = "Europe/Amsterdam",
}
