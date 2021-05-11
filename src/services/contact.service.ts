import { MemberDetail } from '@/store/members/members.model';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { isPlatform } from '@ionic/core';

import { Contact, Contacts } from 'contacts-plugin';

import toastService from './toast.service';

function getContact(member: MemberDetail): Contact {
	const givenName = member.naam.voornaam;
	const familyName = member.naam.tussenvoegsel
		? member.naam.tussenvoegsel + ' ' + member.naam.achternaam
		: member.naam.achternaam;
		
	return {
		displayName: givenName + ' ' + familyName,
		namePrefix: null,
		givenName: givenName,
		middleName: null,
		familyName: familyName,
		previousFamilyName: null,
		nameSuffix: null,
		nickname: null,

		note: null,

		groupName: 'C.S.R.',

		phoneNumberLabels: ['mobiel'],
		phoneNumbers: [member.mobiel],

		emailLabels: ['huis'],
		emails: [member.email],

		addressLabel: member.huis.naam ? member.huis.naam : 'thuis',
		street: member.huis.adres,
		city: member.huis.woonplaats,
		state: null,
		postalCode: member.huis.postcode,
		country: member.huis.land,

		urlLabels: ['profiel'],
		urls: [`${process.env.VUE_APP_SITE_URL}/profiel/${member.id}`],

		birthday: member.geboortedatum,
	};
}

// TODO
export default {
	async save(member: MemberDetail) {
		const state = await Contacts.checkPermissions();

		switch (state.contacts) {
			case 'granted':
				this.requestSaveOption(member);
				break;
			case 'denied':
				toastService.notify('Geef toegang tot je contacten');
				Contacts.requestPermissions().then((state) => {
					if (state.contacts == 'granted') {
						this.requestSaveOption(member);
					}
				});
				break;
			default:
				Contacts.requestPermissions().then((state) => {
					if (state.contacts == 'granted') {
						this.requestSaveOption(member);
					}
				});
				break;
		}
	},
	async requestSaveOption(member: MemberDetail) {
		const result = await ActionSheet.showActions({
			title: 'Contact opslaan',
			message:
				'Je kunt de contactinformatie opslaan als een nieuw contact of toevoegen aan een bestaand contact',
			options: [
				{
					title: 'Nieuw contact',
					icon: !isPlatform('ios') ? 'person-add' : undefined,
				},
				{
					title: 'Bestaand contact',
					icon: !isPlatform('ios') ? 'pencil' : undefined,
				},
				{
					title: 'Annuleer',
					icon: !isPlatform('ios') ? 'close' : undefined,
					style: ActionSheetButtonStyle.Cancel,
				},
			],
		});

		// console.log('Action Sheet result:', result);

		switch (result.index) {
			case 0:
				this.createNew(getContact(member));
				break;
			case 1:
				this.addToExisting(getContact(member));
				break;
			default:
				break;
		}
	},
	async createNew(contact: Contact) {
		// let contact: Contact = this.contacts.create();
		// this.saveContact(contact, member);

		await Contacts.createNew(contact).then(
			(result) => this.onFulfilledSave(result.savedContact),
			(reason) => this.onRejectedSave(reason)
		);
	},
	async addToExisting(contact: Contact) {
		// this.contacts.pickContact().then((contact) => {
		// 	if (!contact) {
		// 		return;
		// 	}
		// 	this.saveContact(contact, member);
		// });

		await Contacts.addToExisting(contact).then(
			(result) => this.onFulfilledSave(result.savedContact),
			(reason) => this.onRejectedSave(reason)
		);
	},
	onFulfilledSave(contact: Contact) {
		toastService.notify(
			`${contact.displayName} succesvol opgeslagen in contacten.`
		);
	},
	onRejectedSave(reason: any) {
		toastService.notify(`Opslaan in contacten mislukt omdat: ${reason}`);
	},
};
