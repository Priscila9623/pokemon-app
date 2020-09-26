import { colors } from '@config/style';

const setRandomColor = () => {
	const cardColors = [colors.Mint, colors.Salmon, colors.Yellow, colors.SkyBlue, colors.Purple];
	const color = (Math.random() * 4).toFixed(0);
	return cardColors[color];
};

export default setRandomColor;