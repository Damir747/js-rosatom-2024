// длительность красного сигнала
const red = 5;
// длительность зеленого сигнала
const green = 1;
// время, к которому повозка Меркурия подъедет к светофору
const n = 23;

// длительность желтого сигнала
const yellow = 1;
// остаток цикла светофора
let rest = n % (red + yellow + green);
// целое количество циклов поездки
let result = n - rest;
// что произойдёт позже: включение зеленого света или время подъезда
if (rest < red + yellow) {
	result += red + yellow;
}
else {
	result += rest;
}
console.log(result);