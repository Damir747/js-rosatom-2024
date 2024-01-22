// const n = 3;
// const arr = [
// 	[1, 9, 10],
// 	[21, 43, 12],
// 	[43, 1, 3]
// ];

// размер мозаики
const n = 4;
//  значения яркости соответствующего пикселя мозаики
const arr = [
	[197, 49, 115, 40],
	[248, 168, 80, 188],
	[92, 233, 245, 240],
	[249, 137, 212, 164]
];
console.log(arr);

// проверка ячейки: есть ли 8 соседей?
const check8neighhood = (x, y) => !(x === 0 || x === arr.length - 1 || y === 0 || y === arr[x].length - 1);

// массив результата
const result = Array.from(Array(n), () => Array.from(Array(n), () => -1));
for (let i = 0; i < arr.length; i++) {
	for (let j = 0; j < arr[i].length; j++) {
		if (check8neighhood(i, j)) {
			// поместить во временный массив 9 ближайших элементов
			const temp = [];
			for (let x = -1; x <= 1; x++) {
				for (let y = -1; y <= 1; y++) {
					temp.push(arr[i + x][j + y]);
				}
			}
			// отсортировать и взять средний элемент в качестве результата
			result[i][j] = temp.sort((a, b) => a - b)[4];
		}
		else {
			// для крайних элементов оставить значения из мозаики без изменений
			result[i][j] = arr[i][j];
		}
	}
}
console.log(result);