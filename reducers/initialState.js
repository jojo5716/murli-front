import moment from 'moment';
import { dateFormat } from '../config';

const today = moment();
const oneMonthAgo = moment(today).subtract(1, 'months');


export default {
    dates: {
        checkIn: oneMonthAgo.format(dateFormat),
        checkOut: today.format(dateFormat)
    },
    components: {
        loading: true
    },
    projects: [],
    projectSelected: null,
    navigationPages: [],
    analytics: {
        isCreatingReport: false,
        isFetching: false,
        reports: []
    }
};
