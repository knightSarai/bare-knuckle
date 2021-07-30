export default class FormatDate {
    constructor(date, options = null, punctuation = '-') {
        this.date = date instanceof Date ? date : new Date(date);
        this.options = options ?? [{ year: 'numeric' }, { month: '2-digit' }, { day: '2-digit' },];
        this.punctuation = punctuation;
    }

    format() {
        return this.options.map(option => this.createDateFromOption(option)).join(this.punctuation)
    }

    createDateFromOption(option) {
        return new Intl.DateTimeFormat('en', option).format(this.date)
    }
}