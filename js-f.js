// F. Задача про провода
// размеры схемы
const n = 5;
const m = 5;
// схема
const arr = [
	['.', 'I', '.', '.', '.'],
	['.', 'B', '.', 'B', '.'],
	['B', 'B', '.', 'B', '.'],
	['.', '.', '.', 'B', '.'],
	['B', '.', 'X', '.', '.']
];

// находим координаты единственной 'X' (iX, jX) и всех точек 'I'
let iX = -1;
let jX = -1;
const arrI = [];
for (let i = 0; i < n; i++) {
	for (let j = 0; j < m; j++) {
		if (arr[i][j] === 'I') {
			arrI.push({ i, j });
		}
		else if (arr[i][j] === 'X') {
			iX = i;
			jX = j;
		}
	}
}
console.log('Координаты X:', iX, jX);
console.log('Координаты I:', arrI);

// массив посещенных точек c результатами длин
const visited = Array.from(Array(arrI.length), () => Array.from(Array(n), () => Array.from(Array(m), () => false)));
// начальную точку 'X' кладем в очередь
const queueX = [[[iX, jX]]];
// конечные точки 'I' кладем в очередь
const queueI = Array.from(Array(arrI.length), () => []);
for (let k = 0; k < arrI.length; k++) {
	const temp = [];
	temp.push([arrI[k].i, arrI[k].j]);
	queueI[k].push(temp);
}
for (let k = 0; k < queueI.length; k++) {
	console.log(`queueI[${k}]:`, queueI[k]);
}
// начальное положение указателя в очереди
let countX = 0;
let countI = Array.from(Array(arrI.length), () => 0);

// поиск друзей точки
const friends = (queue, len, checkX) => {
	queue.push([]);
	const temp = [];
	if (checkX) {

	} else {
		queue[len].forEach(el => {
			const [x, y] = el;
			if (!visited[0][x][y]) {
				console.log('Смотрю точку:', x, y);
				visited[0][x][y] = true;
				// если точка не на краю, не посещенная, не занята 'B',
				// тогда добавить в очередь
				if (x > 0 && !visited[0][x - 1][y] && arr[x - 1][y] !== 'B') {
					temp.push([x - 1, y]);
				}
				if (x < arr.length - 1 && !visited[0][x + 1][y] && arr[x + 1][y] !== 'B') {
					temp.push([x + 1, y]);
				}
				if (y > 0 && !visited[0][x][y - 1] && arr[x][y - 1] !== 'B') {
					temp.push([x, y - 1]);
				}
				if (y < arr[0].length - 1 && !visited[0][x][y + 1] && arr[x][y + 1] !== 'B') {
					temp.push([x, y + 1]);
				}
			}
		});
		queue[len + 1] = temp;
	}
}

const check = (k) => {
	// если очередь X не пуста и если очередь I не пуста
	while (queueX[countX].length > 0 && queueI[k][countI[k]].length > 0) {
		console.log(`внутри цикла check(${k})`);
		let x = 0;
		while (x < queueX[countX].length) {
			let i = 0;
			while (i < queueI[k][countI[k]].length) {
				if (queueX[countX][x][0] === queueI[k][countI[k]][i][0] && queueX[countX][x][1] === queueI[k][countI[k]][i][1]) {
					console.log('Ответ:', countX + countI[k]);
					return countX + countI[k];
				}
				i++;
			}
			x++;
		}

		if (countX === countI[k]) {
			friends(queueX, countX, true);
			countX++;
		} else {
			friends(queueI, countI[k], false);
			countI[k]++;
		}
	}
	console.log('Ответ:', -1);
	return -1;
}

for (let k = 0; k < arrI.length; k++) {
	check(k);
}

// console.log(visited[0]);
// if (count > 0) {
// 	console.log(-1, 'решения нет');
// }

const result = [];
// найти максимальную длину
let max = 0;
for (let k = 0; k < arrI.length; k++) {
	const res = visited[0][arrI[k].i][arrI[k].j];
	result.push(res);
	if (max < res) {
		max = res;
	}
}
max = max * arrI.length;
// проверка на одинаковую длину (четность/нечетность)
for (let i = 0; i < arrI.length; i++) {
	result[i] = result[i] % 2;
}
// если в массиве только четные (0) или только нечетные (1), тогда вывод длины, иначе -1
console.log([...new Set(result)].length === 1 ? max : -1);
