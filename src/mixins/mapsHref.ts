export default {
	directives: {
		mapsHref: {
			// directive definition
			mounted(el: HTMLElement, binding: any) {
                // FIXME
                // const url = this.urlService.getMapsUrl(this.mapsHref);
				el.setAttribute('href', binding.value);
			},
		},
	},
};
