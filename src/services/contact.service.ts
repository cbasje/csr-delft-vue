import { MemberDetail } from '@/store/members/members.model';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { isPlatform } from '@ionic/core';

import toastService from './toast.service';

// function getNameField(member: MemberDetail) {
// 	return new ContactName(
// 		undefined,
// 		member.naam.achternaam,
// 		member.naam.voornaam,
// 		member.naam.tussenvoegsel || undefined
// 	);
// }

// function getPhoneField(member: MemberDetail) {
// 	return new ContactField('mobiel', member.mobiel, false);
// }

// function getEmailField(member: MemberDetail) {
// 	return new ContactField('thuis', member.email, false);
// }

// function getAddressField(member: MemberDetail) {
// 	return new ContactAddress(
// 		false,
// 		member.huis.naam || 'adres',
// 		undefined,
// 		member.huis.adres,
// 		member.huis.woonplaats,
// 		undefined,
// 		member.huis.postcode,
// 		member.huis.land
// 	);
// }

// TODO
export default {
	async save(member: MemberDetail) {
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
				this.saveNew(member);
				break;
			case 1:
				this.addToExisting(member);
				break;
			default:
				break;
		}
	},
	saveNew(member: MemberDetail) {
		// let contact: Contact = this.contacts.create();
		// this.saveContact(contact, member);
		toastService.notify(`${member.naam.voornaam} opslaan als nieuw contact`);
	},
	addToExisting(member: MemberDetail) {
		// this.contacts.pickContact().then((contact) => {
		// 	if (!contact) {
		// 		return;
		// 	}
		// 	this.saveContact(contact, member);
		// });
		toastService.notify(`${member.naam.voornaam} opslaan in een bestaand contact`);
	},
	// saveContact(contact: Contact, member: MemberDetail) {
	// 	contact.name = getNameField(member);
	// 	contact.birthday = member.geboortedatum;
	// 	contact.phoneNumbers = [
	// 		...(contact.phoneNumbers || []),
	// 		getPhoneField(member),
	// 	];
	// 	contact.emails = [...(contact.emails || []), getEmailField(member)];
	// 	contact.addresses = [
	// 		...(contact.addresses || []),
	// 		getAddressField(member),
	// 	];

	// 	contact.save().then(
	// 		// FIXME
	// 		() => toastService.notify('Succesvol opgeslagen in contacten.'),
	// 		() => toastService.notify('Opslaan in contacten mislukt.')
	// 	);
	// },
};
