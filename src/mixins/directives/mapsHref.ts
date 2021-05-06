import urlService from '../../services/url.service';

export default {
	directives: {
		mapsHref: {
			// directive definition
			mounted(el: HTMLElement, binding: any) {
                // FIXME
                const url = urlService.getMapsUrl(binding.value);
				el.setAttribute('href', url);
			},
		},
	},
};
