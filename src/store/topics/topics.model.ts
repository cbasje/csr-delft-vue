import { DatumTijd } from '../../models/datum-tijd';
import { ForumPost } from '../posts/posts.model';
import { Rechten } from '../../models/rechten';

export interface ForumTopic {
	draad_id: number;
	forum_id: number;
	gedeeld_met: any;
	uid: string;
	titel: string;
	datum_tijd: DatumTijd;
	laatst_gewijzigd: DatumTijd;
	laatste_post_id: number;
	laatste_post?: ForumPost;
	laatste_wijziging_uid: string;
	gesloten: boolean;
	verwijderd: boolean;
	wacht_goedkeuring: boolean;
	plakkerig: boolean;
	belangrijk: any;
	eerste_post_plakkerig: boolean;
	pagina_per_post: boolean;
	// lezers: Lezers;
	deel: Deel;
	gedeeld_met_deel: any;
	ongelezen: number;
	laatste_wijziging_naam: string;
}

export interface Deel {
	forum_id: number;
	categorie_id: number;
	titel: string;
	omschrijving: string;
	rechten_lezen: Rechten;
	rechten_posten: Rechten;
	volgorde: number;
	categorie: Categorie;
	// meldingen: Lezers;
}

export interface Categorie {
	categorie_id: number;
	titel: Titel;
	rechten_lezen: Rechten;
	volgorde: number;
	// forum_delen: Lezers;
}

// FIXME
// export interface Lezers {
// }

export enum Titel {
	GeloofVorming = 'Geloof & Vorming',
	Overig = 'Overig',
	Vereniging = 'Vereniging',
}
