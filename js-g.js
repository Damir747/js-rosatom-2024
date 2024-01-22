// G.Задача про последовательность
const nn = 10;
const arr = [3, 1, 1, 3, 2, 1, 1, 1, 3, 1];
arr.unshift(0);
const qq = 10;
const queries = [
	'? 7 10 1',
	'? 2 4 1',
	'? 4 9 2',
	'? 8 10 2',
	'? 3 7 2',
	'! 3 1',
	'! 2 1',
	'! 2 2',
	'! 10 2',
	'? 8 9 1'
];

const countQ = (left, right, takeoff) => {
	let count = 0;
	let j = 0;
	for (let i = left; i <= right; i++) {
		if (arr[i] === takeoff[j]) {
			if (j === takeoff.length - 1) {
				count++;
				j = 0;
			}
			else {
				j++;
			}
		}
		else {
			if (j > 0 && i > left) {
				i--;
			}
			j = 0;
		}
	}
	return count;
};
const firstQuery = (str) => {
	const [type, par1, par2, par3] = str.split(' ');
	switch (type) {
		case '?':
			// console.log('Первый тип запроса');
			const left = +par1;
			const right = +par2;
			const t = +par3;

			const takeoffRight = [1, 2, 3];
			const countRight = countQ(left, right, takeoffRight);
			if (t === 1) {
				console.log(countRight);
			}
			else {
				const takeoffLeft = [3, 2, 1];
				const countLeft = countQ(left, right, takeoffLeft);
				console.log(countRight + countLeft);
			}
			break;
		case '!':
			// console.log('Второй тип запроса');
			const pos = +par1;
			const val = +par2;
			arr[pos] = val;
			break;
		default:
			// console.log('Неизвестный типа запроса');
			break;
	}

};

for (let i = 0; i < queries.length; i++) {
	firstQuery(queries[i]);
}