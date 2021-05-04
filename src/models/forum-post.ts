import { DatumTijd } from "./datum-tijd";
import { ForumTopic } from "./forum-topic";

export interface ForumPost {
  post_id: number;
  draad_id: number;
  uid: string;
  uid_naam: string;
  tekst: string;
  datum_tijd: DatumTijd;
  laatst_gewijzigd: DatumTijd;
  bewerkt_tekst: null | string;
  verwijderd: boolean;
  auteur_ip: string;
  wacht_goedkeuring: boolean;
  draad?: ForumTopic;
}
