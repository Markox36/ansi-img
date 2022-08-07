#!/usr/bin/env node
import chalk from 'chalk';
import Jimp from 'jimp';
import fs from 'node:fs';

import { imgMeasurement, intToRGBA } from './utils';

const pixel: string = '\u2584';
const aspectWidth: string = '100%';
const aspectHeigth: string = '100%';
const preserveAspectRatio: boolean = true;
type BitMap = {
	width: number;
	height: number;
	data: Buffer;
};

export async function imgFileToAnsi(path: string): Promise<string> {
	const buffer: Buffer = await fs.readFileSync(path);
	return imgBufferToAnsi(buffer);
}

export async function imgBufferToAnsi(buffer: Buffer): Promise<string> {
	const img = await Jimp.read(buffer);
	const { bitmap }: { bitmap: BitMap } = img;
	const { width, height }: { width: number; height: number } = imgMeasurement(
		bitmap.width as number,
		bitmap.height as number,
		aspectWidth,
		aspectHeigth,
		preserveAspectRatio
	);
	img.resize(width, height);

	let result: string = '';
	for (let y: number = 0; y < img.bitmap.height! - 1; y += 2) {
		for (let x: number = 0; x < img.bitmap.width!; x++) {
			const { r, g, b, a }: { r: number; g: number; b: number; a: number } = intToRGBA(
				img.getPixelColor(x, y)
			);
			const {
				r: r2,
				g: g2,
				b: b2,
			}: { r: number; g: number; b: number; a: number } = intToRGBA(
				img.getPixelColor(x, y + 1)
			);
			result += a === 0 ? chalk.reset(' ') : chalk.bgRgb(r, g, b).rgb(r2, g2, b2)(pixel);
		}
		result += '\n';
	}
	return result;
}
