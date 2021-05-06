import { DatumTijd } from "../../models/datum-tijd";
import { Rechten } from "../../models/rechten";

export interface Event {
  item_id?: number;
  titel?: string;
  beschrijving?: string;
  begin_moment?: DatumTijd;
  eind_moment?: DatumTijd;
  rechten_bekijken?: Rechten;
  locatie?: null | string;
  link?: null | string;
  aanmeld_limiet?: number | null;
  aanmelden_vanaf?: DatumTijd;
  aanmelden_tot?: DatumTijd;
  bewerken_tot?: DatumTijd;
  afmelden_tot?: DatumTijd;
  soort?: string;
  rechten_aanmelden?: string;
  in_agenda?: boolean;
  // leden?: Aanmeldingen;
  id?: number;
  naam?: string;
  familie?: string;
  // status?: Aanmeldingen;
  samenvatting?: string;
  omschrijving?: null | string;
  keuzelijst?: null;
  maker?: Maker;
  // versie?: Aanmeldingen;
  keuzelijst2?: any[];
  maaltijd_id?: number;
  mlt_repetitie_id?: number;
  repetitie?: Maker;
  product_id?: number;
  product?: Product;
  datum?: DatumTijd;
  tijd?: DatumTijd;
  gesloten?: string;
  laatst_gesloten?: null;
  verwijderd?: boolean;
  aanmeld_filter?: null;
  aantal_aanmeldingen?: number;
  verwerkt?: boolean;
  // FIXME: Is het alleen zichtbaar met stekrechten?
  // aanmeldingen?: Aanmeldingen;
  maaltijdcorvee?: null;
  _meta: {
    start: Date;
    end: Date;
    formattedListDate: string;
    category: 'maaltijd' | 'activiteit' | 'agenda';
    present?: boolean;
  };
}

// export interface Aanmeldingen {
// }

export interface Maker {
  uid?: string;
  mlt_repetitie_id?: number;
}

export interface Product {
  id: number;
  tmpPrijs: null | number;
}

export interface Joined {
  maaltijden: any[];
  activiteiten: any[];
}
