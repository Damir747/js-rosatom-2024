// E. Побег К.
const n = 6;
const road = [
	'.xx',
	'..x',
	'x..',
	'.x.',
	'...',
	'..x'
];
// ширина дороги
const widthRoad = 3;

// массив расчета; первая строка 0 для '.'
const dp = Array.from(Array(n), () => Array.from(Array(widthRoad), () => Infinity));
for (let j = 0; j < widthRoad; j++) {
	if (road[0][j] === '.') {
		dp[0][j] = 0;
	}
}

for (let i = 1; i < road.length; i++) {
	for (let j = 0; j < widthRoad; j++) {
		if (road[i][j] === 'x') {
			dp[i][j] = Infinity;
		}
		else {
			switch (j) {
				case 0:
					if (road[i][1] === 'x') {
						dp[i][j] = dp[i - 1][j];
					}
					else {
						dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j + 1] + 1, dp[i - 1][j + 2] + 2);
					}
					break;
				case 1:
					dp[i][j] = Math.min(dp[i - 1][j - 1] + 1, dp[i - 1][j], dp[i - 1][j + 1] + 1);
					break;
				case 2:
					if (road[i][1] === 'x') {
						dp[i][j] = dp[i - 1][j];
					}
					else {
						dp[i][j] = Math.min(dp[i - 1][j - 2] + 2, dp[i - 1][j - 1] + 1, dp[i - 1][j]);
					}
					break;
			}
		}
	}
}
// вывод дороги и результатов расчета
for (let i = 0; i < road.length; i++) {
	console.log(road[i], dp[i]);
};
// минимальное количество перестроений
const min = Math.min(dp[dp.length - 1][0], dp[dp.length - 1][1], dp[dp.length - 1][2]);
if (min === Infinity) {
	console.log('нет возможности сбежать. -1');
	return -1;
}
// определение лучшей дороги для старта
let minRoad = 0;
for (let i = road.length - 1; i >= 0; i--) {
	let min = Infinity;
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