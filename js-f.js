// F. Задача про провода
// размеры схемы
const n = 5;
const m = 7;
// схема
const arr = [
	['I', 'B', '.', '.', 'B', 'B', '.'],
	['X', 'I', '.', '.', '.', '.', '.'],
	['.', 'B', '.', '.', 'B', 'B', '.'],
	['.', 'I', 'B', '.', '.', 'B', '.'],
	['.', '.', '.', '.', 'I', '.', 'I']
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

// расчет пути между X и I (indexI)
const calcWay = (indexI) => {
	// массив посещенных точек c результатами длин
	const visited = Array.from(Array(n), () => Array.from(Array(m), () => false));
	// все точки 'B' и промежуточные 'I' отметить посещенными
	for (let i = 0; i < visited.length; i++) {
		for (let j = 0; j < visited[i].length; j++) {
			if (arr[i][j] === 'B' || arr[i][j] === 'I' && !(arrI[indexI].i === i && arrI[indexI].j === j)) {
				visited[i][j] = true;
			}
		}
	}
	// начальную точку 'X' кладем в очередь
	const queueX = [[[iX, jX]]];
	// конечную точку 'I' кладем в очередь
	const queueI = [];
	queueI.push([[arrI[indexI].i, arrI[indexI].j]]);
	// начальное положение указателя в очереди
	let countX = 0;
	let countI = 0;

	// поиск друзей точки
	const friends = (queue, len) => {
		queue.push([]);
		// const temp = [];
		queue[len].forEach(el => {
			const [x, y] = el;
			// если точка не посещенная
			if (!visited[x][y]) {
				// console.log('Смотрю точку:', x, y);
				visited[x][y] = true;
				// Если точка '.' или 'X' (начальная) или 'I' (конечная),
				//		тогда её соседей добавлять в очередь - через неё может течь ток
				if (arr[x][y] === '.' || arr[x][y] === 'X' || arr[x][y] === 'I') {
					// если точка не на краю, не посещенная ('B' и не конечная 'I' уже отмечены посещенными),
					//		тогда её соседей добавлять в очередь - через неё может течь ток
					if (x > 0 && !visited[x - 1][y]) {
						queue[len + 1].push([x - 1, y]);
					}
					if (x < arr.length - 1 && !visited[x + 1][y]) {
						queue[len + 1].push([x + 1, y]);
					}
					if (y > 0 && !visited[x][y - 1]) {
						queue[len + 1].push([x, y - 1]);
					}
					if (y < arr[0].length - 1 && !visited[x][y + 1]) {
						queue[len + 1].push([x, y + 1]);
					}
				}
			}
		});
		// queue[len + 1].push(...temp);
	}

	// если очередь X не пуста и если очередь I не пуста
	while (queueX[countX].length > 0 && queueI[countI].length > 0) {
		if (countX === countI) {
			friends(queueX, countX);
			countX++;
		} else {
			friends(queueI, countI);
			countI++;
		}
		let x = 0;
		while (x < queueX[countX].length) {
			let y = 0;
			while (y < queueI[countI].length) {
				if (queueX[countX][x][0] === queueI[countI][y][0] && queueX[countX][x][1] === queueI[countI][y][1]) {
					console.log('Результат поиска:', countX + countI);
					return countX + countI;
				}
				y++;
			}
			x++;
		}
	}
	console.log('Результат поиска:', -1);
	return -1;
}

const result = [];
for (let k = 0; k < arrI.length; k++) {
	const res = calcWay(k);
	if (res === -1) {
		console.log('Ответ:', -1);
		return -1;
	}
	result.push(res);
}
console.log(result);

// найти максимальную длину
let max = 0;
for (let k = 0; k < result.length; k++) {
	if (max < result[k]) {
		max = result[k];
	}
}
console.log(max);
max = max * arrI.length;
// проверка на одинаковую длину (четность/нечетность)
for (let i = 0; i < arrI.length; i++) {
	result[i] = result[i] % 2;
}
// если в массиве только четные (0) или только нечетные (1), тогда вывод длины, иначе -1
console.log([...new Set(result)].length === 1 ? max : -1);
