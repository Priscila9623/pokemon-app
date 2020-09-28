import { colors } from '@config/style';

export const cardColors = {
	Salmon: colors.Salmon,
	SkyBlue: colors.SkyBlue,
	Yellow: colors.Yellow,
	Mint: colors.Mint,
	Purple: colors.Purple,
	Brown: colors.Brown,
	Gray: colors.MediumGray,
};

const isColor = (position, color) => {
	const startAt = {
		Salmon: 6,
		Yellow: 5,
		Mint: 4,
		SkyBlue: 3,
		Purple: 2,
		Brown: 1,
		Gray: 0,
	};

	return (position + startAt[color]) % 7 === 7 - 1;
};

export const getColor = (i) => {
	let color = '';

	color = 'Salmon';
	if (isColor(i, color)) {
		return color;
	}

	color = 'Yellow';
	if (isColor(i, color)) {
		return color;
	}

	color = 'Mint';
	if (isColor(i, color)) {
		return color;
	}

	color = 'SkyBlue';
	if (isColor(i, color)) {
		return color;
	}

	color = 'Purple';
	if (isColor(i, color)) {
		return color;
	}

	color = 'Brown';
	if (isColor(i, color)) {
		return color;
	}

	color = 'Gray';
	if (isColor(i, color)) {
		return color;
	}
};
