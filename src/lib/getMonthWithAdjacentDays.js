// const getMonthWithAdjacentDays = (year: number, month: number): Date[] => {
const getMonthWithAdjacentDays = (year, month) => {
	if (month < 1 || month > 12)
		throw new Error("Invalid month. Month should be between 1 and 12.");

	// Calculate the first day of the given month
	const firstDay = new Date(year, month - 1, 1);

	// Determine the number of days to include from the previous month
	const previousMonthOffset = firstDay.getDay() - 1;

	// Calculate the last day of the given month
	const lastDay = new Date(year, month, 0);

	// Determine the number of days to include from the next month
	const nextMonthOffset = (7 - lastDay.getDay()) % 7;

	// Calculate the start date for the resulting array
	const startDate = new Date(year, month - 1, 1 - previousMonthOffset);

	// Calculate the end date for the resulting array
	const endDate = new Date(year, month, 1 + nextMonthOffset);

	// Create an array to store the dates
	// const result: Date[] = [];
	const result = [];

	// Fill the array with dates
	for (let date = startDate; date < endDate; date.setDate(date.getDate() + 1)) {
		result.push(new Date(date));
	}

	return result;
}

export default getMonthWithAdjacentDays;