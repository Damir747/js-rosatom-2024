// F. Задача про провода
// размеры схемы
const n = 5;
const m = 5;
// схема
const arr = [
	['.', '.', '.', '.', 'I'],
	['I', 'B', '.', 'B', '.'],
	['B', 'B', '.', 'B', '.'],
	['I', '.', '.', 'B', '.'],
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
const visited = Array.from(Array(n), () => Array.from(Array(m), () => -1));
// начальную точку 'X' кладем в очередь с длиной 0
const queue = [[iX, jX, 0]];
// начальное положение указателя в очереди
let queueCounter = 0;
// счетчик точек 'I', чтобы не считать поле полностью при всех найденных точках
let count = arrI.length;
// если очередь не пуста и найдены все точки 'I'
while (queueCounter < queue.length && count > 0) {
	// достать из очереди координаты точки и длину от неё до 'X'
	const [x, y, len] = queue[queueCounter];
	queueCounter++;
	// если точка ещё не посещенная
	if (visited[x][y] === -1) {
		// отметить точку как посещенную
		visited[x][y] = len;
		// если эта точка 'I' - уменьшаем счетчик
		if (arr[x][y] === 'I') {
			count--;
		} else {
			// если точка не на краю, не посещенная, не занята 'B',
			// тогда добавить в очередь
			if (x > 0 && visited[x - 1][y] === -1 && arr[x - 1][y] !== 'B') {
				queue.push([x - 1, y, len + 1]);
			}
			if (x < arr.length - 1 && visited[x + 1][y] === -1 && arr[x + 1][y] !== 'B') {
				queue.push([x + 1, y, len + 1]);
			}
			if (y > 0 && visited[x][y - 1] === -1 && arr[x][y - 1] !== 'B') {
				queue.push([x, y - 1, len + 1]);
			}
			if (y < arr[0].length - 1 && visited[x][y + 1] === -1 && arr[x][y + 1] !== 'B') {
				queue.push([x, y + 1, len + 1]);
			}
		}
	}
}
console.log(visited);
if (count > 0) {
	console.log(-1, 'решения нет');
}

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
