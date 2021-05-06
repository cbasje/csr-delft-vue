import { isPlatform } from '@ionic/vue';

import { Browser } from '@capacitor/browser';

export default {
	async open(url: string) {
		const ext = url.substr(-4);
		const hashIndex = url.indexOf('#');
		if ((ext === '.jpg' || ext === '.png') && hashIndex === -1) {
			// FIXME
			//   this.photoViewer.show(url, '', {
			//     share: false,
			//     closeButton: true,
			//     copyToReference: false,
			//     headers: '',
			//     piccasoOptions: { }
			//   });
		} else if (hashIndex > -1 && url.indexOf('#/plaatjes/') !== -1) {
			url = process.env.VUE_APP_SITE_URL + url.substr(hashIndex + 1);
			// FIXME
			//   this.photoViewer.show(url, '', {
			//     share: false,
			//     closeButton: true,
			//     copyToReference: false,
			//     headers: '',
			//     piccasoOptions: { }
			//   });
		} else {
			await Browser.open({
				url: url,
				presentationStyle: isPlatform('ios')
					? 'popover'
					: 'fullscreen',
			});
		}
	},
	
	openMapsUrl(query: string) {
		this.open(this.getMapsUrl(query));
	},

    getMapsUrl(query: string): string {
        query = encodeURIComponent(query);

        if (isPlatform('mobile') === true) {
            if (isPlatform('ios') === true) {
                return 'maps://maps.apple.com/?q=' + query;
            } else {
                return 'geo:0,0?q=' + query;
            }
        } else {
            return 'https://maps.google.com?q=' + query;
        }
    },
};
