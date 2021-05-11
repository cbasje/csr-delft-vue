import moment from 'moment';

export default {
    methods: {
        formatDate(dateString: string) {
            moment.locale('nl');
            const date = moment(dateString);

            // TODO: add more options
            return date.format('ll');
        }
    }
}