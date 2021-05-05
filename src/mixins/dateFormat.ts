import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import nl from 'dayjs/locale/nl';

export default {
    methods: {
        formatDate(dateString: string) {
            
            dayjs.extend(localizedFormat).locale(nl);
            const date = dayjs(dateString);
            // Then specify how you want your dates to be formatted
            // TODO: add more options
            return date.format('ll');
        }
    }
}