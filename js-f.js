// F. Задача про провода
// размеры схемы
const n = 5;
const m = 5;
// схема
const arr = [
	['I', '.', '.', '.', '.'],
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
const visited = Array.from(Array(n), () => Array.from(Array(m), () => false));
// начальную точку 'X' кладем в очередь
const queueX = [[[iX, jX]]];
// конечные точки 'I' кладем в очередь
const queueI = [];
const temp = [];
for (let k = 0; k < arrI.length; k++) {
	temp.push([arrI[k].i, arrI[k].j]);
}
queueI.push(temp);
// начальное положение указателя в очереди
let countX = 0;
let countI = 0;

// поиск друзей точки
const friends = (queue, len) => {
	queue.push([]);
	const temp = [];
	queue[len].forEach(el => {
		const [x, y] = el;
		if (!visited[x][y]) {
			// console.log('Смотрю точку:', x, y);
			visited[x][y] = true;
			// если точка не на краю, не посещенная, не занята 'B',
			// тогда добавить в очередь
			if (x > 0 && !visited[x - 1][y] && arr[x - 1][y] !== 'B') {
				temp.push([x - 1, y]);
			}
			if (x < arr.length - 1 && !visited[x + 1][y] && arr[x + 1][y] !== 'B') {
				temp.push([x + 1, y]);
			}
			if (y > 0 && !visited[x][y - 1] && arr[x][y - 1] !== 'B') {
				temp.push([x, y - 1]);
			}
			if (y < arr[0].length - 1 && !visited[x][y + 1] && arr[x][y + 1] !== 'B') {
				temp.push([x, y + 1]);
			}
		}
	});
	queue[len + 1] = temp;
}

const check = () => {
	// если очередь X не пуста и если очередь I не пуста
	while (queueX[countX].length > 0 && queueI[countI].length > 0) {
		let x = 0;
		while (x < queueX[countX].length) {
			let i = 0;
			while (i < queueI[countI].length) {
				if (queueX[countX][x][0] === queueI[countI][i][0] && queueX[countX][x][1] === queueI[countI][i][1]) {
					console.log('Ответ:', countX + countI);
					return countX + countI;
				}
				i++;
			}
			x++;
		}

		if (countX === countI) {
			friends(queueX, countX);
			countX++;
		} else {
			friends(queueI, countI);
			countI++;
		}
	}
	console.log('Ответ:', -1);
	return -1;
}

check();
// console.log(visited);
// if (count > 0) {
// 	console.log(-1, 'решения нет');
// }

const result = [];
// найти максимальную длину
let max = 0;
for (let k = 0; k < arrI.length; k++) {
	const res = visited[arrI[k].i][arrI[k].j];
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
