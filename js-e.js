// E. Побег К.
const n = 7;
const road = [
	'...',
	'xx.',
	'x..',
	'.x.',
	'...',
	'.xx',
	'...'
];
// ширина дороги
const widthRoad = 3;

// массив расчета; первая строка 0 для '.'
const dp = Array.from(Array(road.length), () => Array.from(Array(widthRoad), () => 9));
for (let j = 0; j < widthRoad; j++) {
	if (road[0][j] === '.') {
		dp[0][j] = 0;
	}
}
// заполнить массив расчета для препятствий на дороге
for (let i = 1; i < road.length; i++) {
	for (let j = 0; j < widthRoad; j++) {
		if (road[i][j] === 'x') {
			dp[i][j] = 9;
		}
	}
}

for (let i = 1; i < road.length; i++) {
	// перетащить значения из предыдущего шага
	for (let j = 0; j < widthRoad; j++) {
		if (road[i][j] !== 'x') {
			dp[i][j] = dp[i - 1][j];
		}
	}

	const calc = (j) => {
		if (road[i][j] !== 'x') {
			dp[i][j] = dp[i - 1][j];
			switch (j) {
				case 0:
					dp[i][j] = Math.min(dp[i - 1][j], dp[i][j + 1] + 1);
					break;
				case 1:
					dp[i][j] = Math.min(dp[i][j - 1] + 1, dp[i - 1][j], dp[i][j + 1] + 1);
					break;
				case 2:
					dp[i][j] = Math.min(dp[i][j - 1] + 1, dp[i - 1][j]);
					break;
			}
		}
	}
	// пересчитать значения с учетом текущего шага
	for (let j = 0; j < widthRoad; j++) {
		calc(j);
	}
	for (let j = widthRoad - 1; j >= 0; j--) {
		calc(j);
	}
}
// вывод дороги и результатов расчета
for (let i = 0; i < road.length; i++) {
	console.log(road[i], dp[i]);
};
// минимальное количество перестроений
const min = Math.min(dp[dp.length - 1][0], dp[dp.length - 1][1], dp[dp.length - 1][2]);
if (min === 9) {
	console.log('нет возможности сбежать. -1');
	return -1;
}
// определение лучшей дороги для старта
let minRoad = 0;
for (let i = road.length - 1; i >= 0; i--) {
	let min = 9;
	for (let j = 0; j < widthRoad; j++) {
		// лучшая дорога в случае смены дороги
		let tempRoad = 0;
		if (dp[i][j] < min) {
			min = dp[i][j];
			tempRoad = j;
		}
		// если дорога меняется, то сохраняем
		// иначе остаемся на той же дороге
		if (dp[i][minRoad] !== min) {
			minRoad = tempRoad;
		}
	}
}
// коррекция нумерации дороги для ответа (номер начинается с 1, а не с 0)
minRoad++;
console.log(`дорожка №${minRoad} с минимальным количеством перестроений: ${min}`);
return minRoad + '\n' + min;