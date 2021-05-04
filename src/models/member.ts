export interface Member extends Naam {
  id: string;
}

export interface MemberDetail {
  id: string;
  naam: Naam & {
    formeel: string;
  };
  pasfoto: string;
  geboortedatum: Date;
  email: string;
  mobiel: string;
  huis: Huis;
  studie: Studie;
  lichting: number;
  verticale: string;
}

export interface Huis {
  naam: null | string;
  adres: string;
  postcode: string;
  woonplaats: string;
  land: string;
}

export interface Naam {
  voornaam: string;
  tussenvoegsel: null | string;
  achternaam: string;
}

export interface Studie {
  naam: string;
  // TODO: Is this a number?
  sinds: number;
}
