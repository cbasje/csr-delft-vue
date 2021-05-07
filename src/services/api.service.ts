import { Member, MemberDetail } from '@/store/members/members.model';
import { ForumPost } from '@/store/posts/posts.model';
import { ForumTopic } from '@/store/topics/topics.model';
import {
	eventsMock,
	memberDetailMock,
	membersMock,
	postsMock,
	topicsMock,
} from '@/util/mock';
import axios from 'axios';

function of(args: { data: any }) {
	return args;
}

export default {
	async getEventList() {
		if (this.useMock()) {
			return of({ data: eventsMock });
		}

		// FIXME: werkt nog niet met de API, kijk hier onder
		return await axios.get<{ data: Event[] }>(
			`${process.env.VUE_APP_SITE_URL}/leden`
		);
	},

	async getEventDetail(id: string) {
		if (this.useMock()) {
			return of({ data: eventsMock[0] });
		}

		// FIXME: werkt nog niet met de API, kijk hier onder
		return await axios.get<{ data: Event }>(
			`${process.env.VUE_APP_SITE_URL}/leden/${id}`
		);
	},

	// getEventList(from: Date, to: Date): Promise<Event[]> {
	//   return new Promise((resolve, reject) => {
	//     if (this.useMock()) {
	//       resolve(eventsMock);
	//       return;
	//     }

	//     const fromISO = from.toISOString();
	//     const toISO = to.toISOString();

	//     await axios
	//       .get<{
	//         data: {
	//           events: Event[];
	//           joined: { activiteiten: number[]; maaltijden: number[] };
	//         };
	//       }>(`${process.env.VUE_APP_SITE_URL}/agenda?from=${fromISO}&to=${toISO}`)
	//       .subscribe(
	//         res => {
	//           const schedule = {
	//             from: new Date(from),
	//             to: new Date(to),
	//             events: res.data.events
	//           };
	//           this.scheduleList.push(schedule);

	//           this.joinedEvents.maaltijden.push(...res.data.joined.maaltijden);
	//           this.joinedEvents.activiteiten.push(
	//             ...res.data.joined.activiteiten
	//           );

	//           resolve(schedule.events);
	//         },
	//         error => {
	//           reject(error);
	//         }
	//       );
	//   });
	// }

	// addEventMeta(event: Event): Event {
	//   const start = event.begin_moment
	//     ? event.begin_moment
	//     // FIXME: parse(event.datum + ' ' + event.tijd)
	//     : new Date(event.datum + ' ' + event.tijd);
	//   const end = event.eind_moment ? event.eind_moment : addHours(start, 2);

	//   let formattedListDate: string;
	//   const sameDay = isSameDay(start, end);
	//   const sameDayLate = isSameDay(addDays(start, 1), end) && end.getHours() < 8;
	//   const allDay = isFullDay(start, end);

	//   if (!sameDay && !sameDayLate) {
	//     const formatText = allDay ? 'dddd D MMMM' : 'dddd D MMMM HH:mm';
	//     formattedListDate =
	//       formatLocale(start, formatText) + ' – ' + formatLocale(end, formatText);
	//   } else if (allDay) {
	//     formattedListDate = 'Hele dag';
	//   } else {
	//     formattedListDate =
	//       formatLocale(start, 'HH:mm') +
	//       ' – ' +
	//       formatLocale(end, 'HH:mm') +
	//       ' uur';
	//   }

	//   let category: 'maaltijd' | 'activiteit' | 'agenda';
	//   let present = false;

	//   if (event.maaltijd_id) {
	//     category = 'maaltijd';
	//     event.prijs = event.prijs.slice(0, -2) + ',' + event.prijs.substr(-2);
	//     present =
	//       this.joinedEvents.maaltijden.indexOf(Number(event.maaltijd_id)) !== -1;
	//   } else if (event.id) {
	//     category = 'activiteit';
	//     present = this.joinedEvents.activiteiten.indexOf(Number(event.id)) !== -1;
	//   } else {
	//     category = 'agenda';
	//   }

	//   if (event.titel) {
	//     event.titel = event.titel.replace(/&amp;/g, '&');
	//   }

	//   if (event.naam) {
	//     event.naam = event.naam.replace(/&amp;/g, '&');
	//   }

	//   event._meta = {
	//     start,
	//     end,
	//     formattedListDate,
	//     category,
	//     present
	//   };

	//   return event;
	// }

	// addJoined(cat: string, id: number) {
	//   if (cat === 'maaltijden') {
	//     this.joinedEvents.maaltijden.push(id);
	//   } else {
	//     this.joinedEvents.activiteiten.push(id);
	//   }
	// }

	// removeJoined(cat: string, id: number) {
	//   if (cat === 'maaltijden') {
	//     const index = this.joinedEvents.maaltijden.indexOf(id);
	//     this.joinedEvents.maaltijden.splice(index, 1);
	//   } else {
	//     const index = this.joinedEvents.activiteiten.indexOf(id);
	//     this.joinedEvents.activiteiten.splice(index, 1);
	//   }
	// },

	async getForumRecent(offset: number, limit: number) {
		if (this.useMock()) {
			return of({ data: topicsMock });
		}

		return await axios.get<{ data: ForumTopic[] }>(
			`${process.env.VUE_APP_SITE_URL}/forum/recent?offset=${offset}&limit=${limit}`
		);
	},

	async getForumTopic(id: number, offset: number, limit: number) {
		if (this.useMock()) {
			return of({ data: postsMock });
		}

		return await axios.get<{ data: ForumPost[] }>(
			`${process.env.VUE_APP_SITE_URL}/forum/onderwerp/${id}?offset=${offset}&limit=${limit}`
		);
	},

	async getMemberList() {
		if (this.useMock()) {
			return of({ data: membersMock });
		}

		return await axios.get<{ data: Member[] }>(
			`${process.env.VUE_APP_SITE_URL}/leden`
		);
	},

	async getMemberDetail(id: string) {
		if (this.useMock()) {
			return of({ data: memberDetailMock });
		}

		return await axios.get<{ data: MemberDetail }>(
			`${process.env.VUE_APP_SITE_URL}/leden/${id}`
		);
	},

	async postAction(cat: string, id: number, action: string) {
		return await axios.post(
			`${process.env.VUE_APP_SITE_URL}/${cat}/${id}/${action}`,
			{}
		);
	},

	useMock() {
		return process.env.VUE_APP_USE_MOCK == 'true';
	},
};
