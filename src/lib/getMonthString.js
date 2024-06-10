// interface MonthMapping {
// 	fullName: string;
// 	shortName: string;
// }

// const numberToString: Record<number, MonthMapping> = {
const numberToString = {
	0: { fullName: "January", shortName: "Jan" },
	1: { fullName: "February", shortName: "Feb" },
	2: { fullName: "March", shortName: "Mar" },
	3: { fullName: "April", shortName: "Apr" },
	4: { fullName: "May", shortName: "May" },
	5: { fullName: "June", shortName: "Jun" },
	6: { fullName: "July", shortName: "Jul" },
	7: { fullName: "August", shortName: "Aug" },
	8: { fullName: "September", shortName: "Sep" },
	9: { fullName: "October", shortName: "Oct" },
	10: { fullName: "November", shortName: "Nov" },
	11: { fullName: "December", shortName: "Dec" },
};

// const getMonthString = (month: number) => {
const getMonthString = (month) => {
	if (numberToString[month]) {
		return numberToString[month];
	} else {
		return { fullName: 'Unknown', shortName: 'Unk' };
	}
};

export default getMonthString;