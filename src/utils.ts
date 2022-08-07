function scale(
	width: number,
	height: number,
	originalWidth: number,
	originalHeight: number
): { width: number; height: number } {
	const originalRatio: number = originalWidth / originalHeight;
	const factor: number =
		width / height > originalRatio ? height / originalHeight : width / originalWidth;
	width = factor * originalWidth;
	height = factor * originalHeight;
	return { width, height };
}

function checkAndGetDimensionValue(value: string | number, percentageBase: number): number {
	if (typeof value === 'string' && value.endsWith('%')) {
		const percentageValue: number = Number.parseFloat(value);
		if (!Number.isNaN(percentageValue) && percentageValue > 0 && percentageValue <= 100) {
			return Math.floor((percentageValue / 100) * percentageBase);
		}
	}

	if (typeof value === 'number') {
		return value;
	}

	throw new Error(`${value} is not a valid dimension value`);
}

export function imgMeasurement(
	imageWidth: number,
	imageHeight: number,
	inputWidth: string,
	inputHeight: string,
	preserveAspectRatio: boolean
): { width: number; height: number } {
	const cmdCols: number = process.stdout.columns || 80;
	const cmdRow: number = process.stdout.rows - 2 || 24;

	let width: number, height: number;

	if (inputHeight && inputWidth) {
		width = checkAndGetDimensionValue(inputWidth, cmdCols);
		height = checkAndGetDimensionValue(inputHeight, cmdRow) * 2;

		if (preserveAspectRatio) {
			({ width, height } = scale(width, height, imageWidth, imageHeight));
		}
	} else if (inputWidth) {
		width = checkAndGetDimensionValue(inputWidth, cmdCols);
		height = (imageHeight * width) / imageWidth;
	} else if (inputHeight) {
		height = checkAndGetDimensionValue(inputHeight, cmdRow) * 2;
		width = (imageWidth * height) / imageHeight;
	} else {
		({ width, height } = scale(cmdCols, cmdRow * 2, imageWidth, imageHeight));
	}

	if (width > cmdCols) {
		({ width, height } = scale(cmdCols, cmdRow * 2, width, height));
	}

	width = Math.round(width);
	height = Math.round(height);

	return { width, height };
}

export function intToRGBA(i: number): { r: number; g: number; b: number; a: number } {
	const rgba: { r: number; g: number; b: number; a: number } = { r: 0, g: 0, b: 0, a: 0 };

	rgba.r = Math.floor(i / Math.pow(256, 3));
	rgba.g = Math.floor((i - rgba.r * Math.pow(256, 3)) / Math.pow(256, 2));
	rgba.b = Math.floor(
		(i - rgba.r * Math.pow(256, 3) - rgba.g * Math.pow(256, 2)) / Math.pow(256, 1)
	);
	rgba.a = Math.floor(
		(i - rgba.r * Math.pow(256, 3) - rgba.g * Math.pow(256, 2) - rgba.b * Math.pow(256, 1)) /
			Math.pow(256, 0)
	);

	return rgba;
}
