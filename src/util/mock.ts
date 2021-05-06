import { Timezone } from '@/models/datum-tijd';
import { Rechten } from '@/models/rechten';
import { Event } from '@/store/events/events.model';
import { Member, MemberDetail } from '@/store/members/members.model';
import { ForumPost } from '@/store/posts/posts';
import { ForumTopic, Titel } from '@/store/topics/topics.model';

export const eventsMock: Event[] = [
  {
    id: 1,
    "maaltijd_id": 1,
    titel: 'Example Event',
    naam: 'Example Event',
    soort: 'Event Type',
    datum:  {
      date: new Date('2021-03-27T16:53:03Z'),
      "timezone_type": 3,
      timezone: Timezone.EuropeAmsterdam
    },
    tijd:  {
      date: new Date('2021-03-27T16:53:03Z'),
      "timezone_type": 3,
      timezone: Timezone.EuropeAmsterdam
    },
    locatie: 'Location',
    samenvatting: 'Description',
    omschrijving: 'Description',
    beschrijving: 'Description',
    gesloten: '1',
    "begin_moment": {
      date: new Date('2021-03-27T12:53:03Z'),
      "timezone_type": 3,
      timezone: Timezone.EuropeAmsterdam
    },
    "eind_moment": {
      date: new Date('2021-03-27T16:53:03Z'),
      "timezone_type": 3,
      timezone: Timezone.EuropeAmsterdam
    },
    "aanmelden_vanaf": {
      date: new Date('2021-03-27T12:53:03Z'),
      "timezone_type": 3,
      timezone: Timezone.EuropeAmsterdam
    },
    "aanmelden_tot": {
      date: new Date('2021-03-27T16:53:03Z'),
      "timezone_type": 3,
      timezone: Timezone.EuropeAmsterdam
    },
    "afmelden_tot": {
      date: new Date('2021-03-27T16:53:03Z'),
      "timezone_type": 3,
      timezone: Timezone.EuropeAmsterdam
    },
    "aantal_aanmeldingen": 11,
    "aanmeld_limiet": 2011,
    "product_id": 2,
    product: {
      id: 2,
      tmpPrijs: 2
    },
    _meta: {
      start: new Date('2021-04-21T11:11:11Z'),
      end: new Date('2021-04-21T20:11:11Z'),
      formattedListDate: '11-11-2011 11:11',
      category: 'maaltijd',
      present: true
    }
  }
];

export const postsMock: ForumPost[] = [
  {
    "post_id": 128852,
    "draad_id": 12040,
    "uid": "1734",
    "tekst": "<p>Delfts straatje? Dicht bij huis dus</p>",
    "datum_tijd": {
        date: new Date("2021-04-13T18:28:41"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date("2021-04-13T18:28:54"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": "bewerkt door [lid=1734] [reldate]2021-04-13 18:28:54[/reldate]\n",
    "verwijderd": false,
    "auteur_ip": "145.132.54.64",
    "wacht_goedkeuring": false,
    "uid_naam": "Am. Ras sr."
  },
  {
    "post_id": 128853,
    "draad_id": 12040,
    "uid": "1936",
    "tekst": "<p>Thema afval?</p>",
    "datum_tijd": {
        date: new Date("2021-04-13T20:11:16"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date("2021-04-13T20:11:16"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": null,
    "verwijderd": false,
    "auteur_ip": "109.38.140.42",
    "wacht_goedkeuring": false,
    "uid_naam": "Am. Poolman"
  },
  {
    "post_id": 128865,
    "draad_id": 12040,
    "uid": "1907",
    "tekst": "<p>Er zit daar een QR-code op het kastje, wie gaat m scannen? </p>",
    "datum_tijd": {
        date: new Date("2021-04-14T12:47:19"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date("2021-04-14T12:47:19"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": null,
    "verwijderd": false,
    "auteur_ip": "85.149.2.47",
    "wacht_goedkeuring": false,
    "uid_naam": "Am. Heijkoop"
  },
  {
    "post_id": 128867,
    "draad_id": 12040,
    "uid": "1923",
    "tekst": "<p>Jongens en meisjes, dames en heren, amicae amicique, hier is hint 3:</p><p><img class=\"\" src=\"/forum/plaatjes/bekijken/61e49fe2c7b9f1d269606eb2c5929e9f/resized\" alt=\"/forum/plaatjes/bekijken/61e49fe2c7b9f1d269606eb2c5929e9f/resized\" style=\"width:500px;\" /></p>",
    "datum_tijd": {
        date: new Date("2021-04-14T13:16:12"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date("2021-04-14T13:16:12"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": null,
    "verwijderd": false,
    "auteur_ip": "80.112.180.227",
    "wacht_goedkeuring": false,
    "uid_naam": "Ama. Blokhuis"
  },
  {
    "post_id": 128868,
    "draad_id": 12040,
    "uid": "1808",
    "tekst": "<p>gast, ik proef kurk.</p>",
    "datum_tijd": {
        date: new Date("2021-04-14T13:27:15"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date("2021-04-14T13:27:15"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": null,
    "verwijderd": false,
    "auteur_ip": "2a04:8400:6:2:295d:d6dc:1055:c37a",
    "wacht_goedkeuring": false,
    "uid_naam": "Am. Kramer jr."
  },
  {
    "post_id": 128869,
    "draad_id": 12040,
    "uid": "1821",
    "tekst": "<div class=\"citaatContainer bb-tag-citaat\">Citaat van \t\t\t<a class=\"bb-link-inline bb-tag-lid\" href=\"https://csrdelft.nl/profiel/1907\">Am. Heijkoop</a>:<div class=\"citaat\"><p>Er zit daar een QR-code op het kastje, wie gaat m scannen? </p></div></div><p>Exact de gedachte die wij gisteravond met kring ook hadden. We ontdekten dat de steeg op de foto de \t\t\t<a class=\"bb-link-inline bb-tag-url\" href=\"https://www.google.com/maps/place/Kloksteeg,+2611+BK+Delft/\">Kloksteeg</a> is.  \t\t\t<a class=\"bb-link-inline bb-tag-lid\" href=\"https://csrdelft.nl/profiel/2038\">Noviet Mathijs</a> en ik zijn er vanmiddag even langsgelopen, en vonden daar deze QR code:</p><p><img class=\"\" src=\"/forum/plaatjes/bekijken/19089184e6aabd7b1b9733c27591defe/resized\" alt=\"/forum/plaatjes/bekijken/19089184e6aabd7b1b9733c27591defe/resized\" style=\"width:500px;\" /></p><p>Deze verwijst naar een \t\t\t<a class=\"bb-link-inline bb-tag-url\" href=\"https://forms.gle/DpRJ2cyeddEotfzu9\">Google Formulier</a> met de tekst “Hint: Als puntje bij paaltje komt”.</p><a class=\"bb-tag-spoiler\" href=\"#/verklapper/%3Cp%3EOf+het+hier+echt+om+een+Lustrumhint+gaat+is+te+betwijfelen%2C+aangezien+aan+het+andere+uiteinde+van+de+steeg+precies+dezelfde+QR+code+te+vinden+was%3A%3C%2Fp%3E%3Cp%3E%3Cimg+class%3D%22%22+src%3D%22%2Fforum%2Fplaatjes%2Fbekijken%2F1d8be371601d6c416e899c33290a2da0%2Fresized%22+alt%3D%22%2Fforum%2Fplaatjes%2Fbekijken%2F1d8be371601d6c416e899c33290a2da0%2Fresized%22+style%3D%22width%3A500px%3B%22+%2F%3E%3C%2Fp%3E\">Toon verklapper</a><p></p><p>Overigens was de eerste hint een verwijzing naar het compilatiealbum <em class=\"cursief bb-tag-i\">Ultimate Hits: Rock and Roll Never Forgets </em>van Bob Seger, waarvan het eerste nummer <em class=\"cursief bb-tag-i\">Old Time Rock and Roll</em> is. Voeg daar de <em class=\"cursief bb-tag-i\">Klok</em>steeg aan toe, en het thema zal vast en zeker iets met tijd te maken hebben!</p>",
    "datum_tijd": {
        date: new Date("2021-04-14T13:46:01"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date("2021-04-14T13:46:01"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": null,
    "verwijderd": false,
    "auteur_ip": "85.149.65.82",
    "wacht_goedkeuring": false,
    "uid_naam": "Am. Nederveen"
  },
  {
    "post_id": 128870,
    "draad_id": 12040,
    "uid": "1829",
    "tekst": "<p>Gevonden in de kloksteeg!<img class=\"\" src=\"/forum/plaatjes/bekijken/f389fec2f08af8013144e425fe898fb9/resized\" alt=\"/forum/plaatjes/bekijken/f389fec2f08af8013144e425fe898fb9/resized\" style=\"width:500px;\" /></p>",
    "datum_tijd": {
        date: new Date("2021-04-14T13:47:52"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date("2021-04-14T13:47:52"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": null,
    "verwijderd": false,
    "auteur_ip": "2a02:a44f:e97b:1:2999:e891:622b:b436",
    "wacht_goedkeuring": false,
    "uid_naam": "Am. Van Beugen"
  },
  {
    "post_id": 128871,
    "draad_id": 12040,
    "uid": "1829",
    "tekst": "<p>Oeps net te laat</p>",
    "datum_tijd": {
        date: new Date("2021-04-14T13:48:27"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date("2021-04-14T13:48:27"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": null,
    "verwijderd": false,
    "auteur_ip": "2a02:a44f:e97b:1:2999:e891:622b:b436",
    "wacht_goedkeuring": false,
    "uid_naam": "Am. Van Beugen"
  },
  {
    "post_id": 128872,
    "draad_id": 12040,
    "uid": "1907",
    "tekst": "<p>Is het iets met doorgangen?</p><ul class=\"bb-tag-list\"><li class=\"bb-tag-li\"><p>Een spoorwegovergang</p></li></ul><ul class=\"bb-tag-list\"><li class=\"bb-tag-li\"><p>Een steegje</p></li><li class=\"bb-tag-li\"><p>Een poort</p><p>Gateway 2.0? ;)</p><p>En misschien iets met de kleur rood, maar dat is wellicht wat vergezocht. <sub class=\"bb-tag-sub\">(overigens een mooi jaar dat AH begon met wijn verkopen)</sub></p></li></ul>",
    "datum_tijd": {
        date: new Date("2021-04-14T14:36:26"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date("2021-04-14T14:37:20"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": "bewerkt door [lid=1907] [reldate]2021-04-14 14:37:20[/reldate]\n",
    "verwijderd": false,
    "auteur_ip": "85.149.2.47",
    "wacht_goedkeuring": false,
    "uid_naam": "Am. Heijkoop"
  },
  {
    "post_id": 128880,
    "draad_id": 12040,
    "uid": "1734",
    "tekst": "<p>Die hint (QR-code) zou dan van een paasspeurtocht geweest kunnen zijn. Die waren er wel door Delft heen.</p><p></p>",
    "datum_tijd": {
        date: new Date("2021-04-14T17:27:58"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date("2021-04-14T17:28:27"),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": "bewerkt door [lid=1734] [reldate]2021-04-14 17:28:27[/reldate]: [tekst]kleintje[/tekst]\n",
    "verwijderd": false,
    "auteur_ip": "145.132.54.64",
    "wacht_goedkeuring": false,
    "uid_naam": "Am. Ras sr."
  },
  {
    "post_id": 128886,
    "draad_id": 12040,
    "uid": "1709",
    "tekst": "<div class=\"citaatContainer bb-tag-citaat\">Citaat van \t\t\t<a class=\"bb-link-inline bb-tag-lid\" href=\"https://csrdelft.nl/profiel/1734\">Am. Ras sr.</a>:<div class=\"citaat\"><p>Die hint (QR-code) zou dan van een paasspeurtocht geweest kunnen zijn. Die waren er wel door Delft heen.</p><p></p></div></div><p>Ik kan mij vaag iets herinneren over een Machtig Mooie OWee met de combinatie: QR-code en een hele blije \t\t\t<a class=\"bb-link-inline bb-tag-lid\" href=\"https://csrdelft.nl/profiel/1817\">Am. Haasnoot jr.</a></p><p>;)</p>",
    "datum_tijd": {
        date: new Date('2021-04-15T09:45:42'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date('2021-04-15T09:45:42'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": null,
    "verwijderd": false,
    "auteur_ip": "80.112.180.65",
    "wacht_goedkeuring": false,
    "uid_naam": "Ama. Bennink"
  },
  {
    "post_id": 128896,
    "draad_id": 12040,
    "uid": "1734",
    "tekst": "<p>Die eerste hint wekt bij mij ook het gevoel op van de Oriënt Express. Die trein had ook zo'n grote lamp op de voorkant en die zie je nu ook.</p>",
    "datum_tijd": {
        date: new Date('2021-04-16T13:18:17'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date('2021-04-16T13:18:17'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": null,
    "verwijderd": false,
    "auteur_ip": "145.132.54.64",
    "wacht_goedkeuring": false,
    "uid_naam": "Am. Ras sr."
  },
  {
    "post_id": 128902,
    "draad_id": 12040,
    "uid": "1706",
    "tekst": "<p>Geniet van hint 4!</p><p><img class=\"\" src=\"/forum/plaatjes/bekijken/37cc7acf58e0a9add64d3480b42c4b2e/resized\" alt=\"/forum/plaatjes/bekijken/37cc7acf58e0a9add64d3480b42c4b2e/resized\" style=\"width:500px;\" /></p><p></p>",
    "datum_tijd": {
        date: new Date('2021-04-16T17:09:51'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date('2021-04-16T17:09:51'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": null,
    "verwijderd": false,
    "auteur_ip": "86.90.87.49",
    "wacht_goedkeuring": false,
    "uid_naam": "Am. De Wilde jr."
  },
  {
    "post_id": 128905,
    "draad_id": 12040,
    "uid": "1725",
    "tekst": "<p>Hint vier is een rock in de Angelsaksische taal. Aangezien het album van hint 1 ook al iets met rock and roll had kan het thema misschien iets met rock (muziek), rots of rock en roll te maken hebben. Rotsvast?</p>",
    "datum_tijd": {
        date: new Date('2021-04-17T17:01:29'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date('2021-04-17T17:09:26'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": "bewerkt door [lid=1725] [reldate]2021-04-17 17:09:26[/reldate]: [tekst]Te omslachtig[/tekst]\n",
    "verwijderd": false,
    "auteur_ip": "77.249.209.127",
    "wacht_goedkeuring": false,
    "uid_naam": "Am. Van den Bos sr."
  },
  {
    "post_id": 128906,
    "draad_id": 12040,
    "uid": "1806",
    "tekst": "<p>Hint 5:🤪🤪🤪</p><p>\t\t\t<a class=\"bb-link-inline bb-tag-url\" href=\"https://instagram.com/lustrumcsr?r=nametag\">Kijk op onze insta!</a></p>",
    "datum_tijd": {
        date: new Date('2021-04-17T19:01:50'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date('2021-04-17T19:03:18'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": "bewerkt door [lid=1806] [reldate]2021-04-17 19:03:18[/reldate]: [tekst]Vicky is slecht met de stek dus David fixt het wel weer[/tekst]\n",
    "verwijderd": false,
    "auteur_ip": "86.90.87.49",
    "wacht_goedkeuring": false,
    "uid_naam": "Ama. Marting"
  },
  {
    "post_id": 128923,
    "draad_id": 12040,
    "uid": "1734",
    "tekst": "<p>Rock and Roll zette mij wel aan het denken, bij de andere hints. </p><p>Bij de steeg dacht ik aan een angelsaksische vertaling hiervan; ‘lane’. Dit koppelde Googel aan meerdere interessante richtingen, maar eentje was vooral interessant; het nummer ‘Rock and Roll’ van Shiraz Lane. En toevallig weet ik wel wat van wijnen en ‘Shiraz’ is ook een wijnsoort. Dit kan je koppelen aan de wijnfles hint.</p><p>Alleen is de Insta-hint nog niet te koppelen.</p><p></p>",
    "datum_tijd": {
        date: new Date('2021-04-19T12:59:14'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date('2021-04-19T12:59:14'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": null,
    "verwijderd": false,
    "auteur_ip": "80.112.180.215",
    "wacht_goedkeuring": false,
    "uid_naam": "Am. Ras sr."
  },
  {
    "post_id": 128928,
    "draad_id": 12040,
    "uid": "1724",
    "tekst": "<p><img class=\"\" src=\"/forum/plaatjes/bekijken/1292fc98a1b3396347d461f591e1bef6/resized\" alt=\"/forum/plaatjes/bekijken/1292fc98a1b3396347d461f591e1bef6/resized\" style=\"width:500px;\" />nog een klein hintje</p>",
    "datum_tijd": {
        date: new Date('2021-04-19T16:19:24'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date('2021-04-19T16:19:24'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": null,
    "verwijderd": false,
    "auteur_ip": "145.132.54.64",
    "wacht_goedkeuring": false,
    "uid_naam": "Am. Van Stiphout"
  },
  {
    "post_id": 128931,
    "draad_id": 12040,
    "uid": "1908",
    "tekst": "<p>Hint nummer 5 is een foto van Dublin, te herkennen aan de Ha'penny brug. Wat het te maken heeft met de andere hint weet ik nog niet.</p>",
    "datum_tijd": {
        date: new Date('2021-04-19T19:39:37'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date('2021-04-19T19:39:37'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": null,
    "verwijderd": false,
    "auteur_ip": "85.149.30.192",
    "wacht_goedkeuring": false,
    "uid_naam": "Ama. Van der Lelij"
  },
  {
    "post_id": 128971,
    "draad_id": 12040,
    "uid": "1724",
    "tekst": "<p>Vanavond is het dan zover… Om 20.00u zal de themabekendmaking in première gaan op \t\t\t<a class=\"bb-link-inline bb-tag-url\" href=\"https://www.youtube.com/watch?v=9rXmPGNczdE\">het YouTube account van C.S.R</a>.</p><p>Om nog enigszins een gezamenlijke beleving te ervaren, is het mooi om tijdens het kijken van de themafilm op zoom aan te sluiten. </p><p>Zie hier, de link: \t\t\t<a class=\"bb-link-inline bb-tag-url\" href=\"https://tudelft.zoom.us/j/91883054868\">https://tudelft.zoom.us/j/91883054868</a> </p><p>Na de bekendmaking kan er digitaal geborreld worden en natuurlijk gebruik gemaakt worden van het prachtige FeestCie pakket. Maak er een mooie avond van met je huisgenoten en geniet ze!</p><p></p><p></p>",
    "datum_tijd": {
        date: new Date('2021-04-22T17:31:26'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date('2021-04-22T17:31:26'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": null,
    "verwijderd": false,
    "auteur_ip": "145.132.54.64",
    "wacht_goedkeuring": false,
    "uid_naam": "Am. Van Stiphout"
  },
  {
    "post_id": 128988,
    "draad_id": 12040,
    "uid": "1817",
    "tekst": "<p>Wij hebben erg genoten van de themapresentatie gisteravond, aan het energie niveau te merken bij de huizen waar we waren u ook!<br />We zijn heel wat huizen af geweest, maar nog niet iedereen. Hebben we u gemist? Ketzt dan vooral in voor een bezorging (in Delft) </p>\t\t\t<a class=\"bb-link-block bb-tag-ketzer\" href=\"/groepen/activiteiten/2222\">\n\t\t\t\t\n\t\t\t\t<h2>Lustrum Posters </h2>\n\t\t\t\t<p>4 aanmeldingen</p>\n\t\t\t</a><p><br /><em class=\"cursief bb-tag-i\">Uitleg van de hints komt er aan.. </em></p>",
    "datum_tijd": {
        date: new Date('2021-04-23T11:26:53'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date('2021-04-23T11:26:53'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "bewerkt_tekst": null,
    "verwijderd": false,
    "auteur_ip": "2001:1c00:b12:db00:15a:c29e:5e61:afc0",
    "wacht_goedkeuring": false,
    "uid_naam": "Am. Haasnoot jr."
  },
  {
    'post_id': 128772,
    'draad_id': 11844,
    uid: "1841",
    tekst: "<p>Mijn zoon \t\t\t<a class=\"bb-link-inline bb-tag-lid\" href=\"https://csrdelft.nl/profiel/2047\">Noviet Pieter</a> !</p>\t\t\t<a class=\"bb-link-block bb-tag-youtube\" href=\"https://youtu.be/FWORRPsczME\">\n\t\t\t\t<img src=\"https://img.youtube.com/vi/FWORRPsczME/0.jpg\" />\n\t\t\t\t<h2>YouTube video</h2>\n\t\t\t\t<p></p>\n\t\t\t</a>",
    'datum_tijd': {
        date: new Date("2021-04-07T15:12:04"),
        'timezone_type': 3,
        timezone: Timezone.EuropeAmsterdam
    },
    'laatst_gewijzigd': {
        date: new Date("2021-04-07T15:12:04"),
        'timezone_type': 3,
        timezone: Timezone.EuropeAmsterdam
    },
    'bewerkt_tekst': null,
    verwijderd: false,
    'auteur_ip': "143.177.72.102",
    'wacht_goedkeuring': false,
    'uid_naam': "Am. De Vries"
  }
];

export const topicsMock: ForumTopic[] = [
  {
    "draad_id": 1,
    "forum_id": 1,
    "gedeeld_met": null,
    uid: '1717',
    titel: 'Example Topic',
    "datum_tijd": {
        date: new Date('2021-03-27T16:53:03Z'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatst_gewijzigd": {
        date: new Date('2021-03-27T16:53:03Z'),
        "timezone_type": 3,
        timezone: Timezone.EuropeAmsterdam
    },
    "laatste_post_id": 1,
    "laatste_wijziging_uid": '1000',
    ongelezen: 2,
    "laatste_post": postsMock[0],
    'laatste_wijziging_naam': postsMock[0].uid_naam,
    belangrijk: false,
    'eerste_post_plakkerig': false,
    gesloten: false,
    'pagina_per_post': false,
    plakkerig: false,
    verwijderd: false,
    'wacht_goedkeuring': false,
    'gedeeld_met_deel': null,
    deel: {
      'forum_id': 17,
      'categorie_id': 17,
      titel: 'Examples',
      omschrijving: '',
      'rechten_lezen': Rechten.PLoggedIn,
      'rechten_posten': Rechten.PLoggedIn,
      volgorde: 0,
      categorie: {
        'categorie_id': 17,
        titel: Titel.GeloofVorming,
        'rechten_lezen': Rechten.PLoggedIn,
        volgorde: 17,
      },
    }
  }
];

export const membersMock: Member[] = [
  {
    id: '1000',
    voornaam: 'Jan',
    tussenvoegsel: null,
    achternaam: 'Lid'
  },
  {
    id: '1717',
    voornaam: 'Janine',
    tussenvoegsel: null,
    achternaam: 'Lid'
  }
];

export const memberDetailMock: MemberDetail = {
  id: '1717',
  naam: {
    voornaam: 'Janine',
    tussenvoegsel: null,
    achternaam: 'Lid',
    formeel: 'Ama. Lid'
  },
  pasfoto: 'pasfoto/1717.jpg',
  geboortedatum: new Date('2000-01-01'),
  email: 'janinelid@csrdelft.nl',
  mobiel: '123456789',
  huis: {
    naam: 'Confide',
    adres: 'Oude Delft 9',
    postcode: '2611 BA',
    woonplaats: 'Delft',
    land: 'The Netherlands'
  },
  studie: {
    naam: 'Education',
    sinds: 2000
  },
  lichting: 2011,
  verticale: 'Group'
};
