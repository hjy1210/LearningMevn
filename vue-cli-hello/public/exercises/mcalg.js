let mcConfig;

function initConfig() {
	mcConfig = {
		sigma: [ 0, 1, 2, 3, 4, 5, 6, 7 ],
		tao: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ],
		x: [ 0, 0, 0, 0, 0, 0, 0, 0 ],
		y: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
	};
}

function applySigmaX(sigma1, tao1, x1, y1) {
	let sigma = [];
	for (let i = 0; i < sigma1.length; i++) {
		sigma[i] = sigma1[mcConfig.sigma[i]];
	}
	let tao = [];
	for (let i = 0; i < tao1.length; i++) {
		tao[i] = tao1[mcConfig.tao[i]];
	}
	let x = [];
	for (let i = 0; i < x1.length; i++) {
		if (sigma1[i] == i) {
			x[i] = mcConfig.x[i];
		} else {
			x[sigma1[i]] = (x1[sigma1[i]] + mcConfig.x[i]) % 3;
		}
	}
	let y = [];
	for (let i = 0; i < y1.length; i++) {
		if (tao1[i] == i) {
			y[i] = mcConfig.y[i];
		} else {
			y[tao1[i]] = (y1[tao1[i]] + mcConfig.y[i]) % 2;
		}
	}
	mcConfig = { sigma: sigma, tao: tao, x: x, y: y };
}
function cyclicToPerm(n, cyclic) {
	let p = [];
	for (let i = 0; i < n; i++) {
		p[i] = i;
	}
	for (let i = 0; i < cyclic.length; i++) {
		p[cyclic[i]] = cyclic[(i + 1) % cyclic.length];
	}
	return p;
}
function applyMove(move) {
	switch (move) {
		case 'R':
			applySigmaX(
				[ 0, 2, 7, 3, 4, 5, 1, 6 ],
				cyclicToPerm(12, [ 1, 5, 9, 6 ]),
				[ 0, 1, 2, 0, 0, 0, 2, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
			);
			break;
		case 'r':
			//applySigmaX([0,6,1,3,4,5,7,2], [0,1,2,0,0,0,2,1]);
			applyMove('R');
			applyMove('R');
			applyMove('R');
			break;
		case 'L':
			applySigmaX(
				[ 5, 1, 2, 0, 3, 4, 6, 7 ],
				cyclicToPerm(12, [ 3, 7, 11, 4 ]),
				[ 2, 0, 0, 1, 2, 1, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
			);
			break;
		case 'l':
			//applySigmaX([3,1,2,4,5,0,6,7], [1,0,0,2,1,2,0,0]);
			applyMove('L');
			applyMove('L');
			applyMove('L');
			break;
		case 'D':
			applySigmaX(
				[ 0, 1, 2, 3, 5, 6, 7, 4 ],
				cyclicToPerm(12, [ 11, 10, 9, 8 ]),
				[ 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
			);
			break;
		case 'd':
			//applySigmaX([0,1,2,3,7,4,5,6], [0,0,0,0,0,0,0,0]);
			applyMove('D');
			applyMove('D');
			applyMove('D');
			break;
		case 'U':
			applySigmaX(
				[ 3, 0, 1, 2, 4, 5, 6, 7 ],
				cyclicToPerm(12, [ 0, 1, 2, 3 ]),
				[ 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
			);
			break;
		case 'u':
			//applySigmaX([1,2,3,0,4,5,6,7], [0,0,0,0,0,0,0,0]);
			applyMove('U');
			applyMove('U');
			applyMove('U');
			break;
		case 'F':
			applySigmaX(
				[ 1, 6, 2, 3, 4, 0, 5, 7 ],
				cyclicToPerm(12, [ 2, 6, 10, 7 ]),
				[ 1, 2, 0, 0, 0, 2, 1, 0 ],
				[ 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0 ]
			);
			break;
		case 'f':
			applyMove('F');
			applyMove('F');
			applyMove('F');
			break;
		case 'B':
			applySigmaX(
				[ 0, 1, 3, 4, 7, 5, 6, 2 ],
				cyclicToPerm(12, [ 0, 4, 6, 5 ]),
				[ 0, 0, 1, 2, 1, 0, 0, 2 ],
				[ 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0 ]
			);
			break;
		case 'b':
			applyMove('B');
			applyMove('B');
			applyMove('B');
			break;
	}
}
function applyMoveChain(list) {
	for (let i = 0; i < list.length; i++) {
		applyMove(list[i]);
		//print(mcConfig);
	}
}

function doAction() {
	initConfig();
	//applyMoveChain([ 'D', 'R', 'd', 'r' ]);
	//applyMoveChain([ 'F', 'r', 'f', 'L', 'F', 'R', 'f', 'l' ]);
	//applyMoveChain('FrfLFRfl');
	applyMoveChain(moves.value);
	//console.log(mcConfig);
	results.innerHTML = 'sigma:' + mcConfig.sigma + 'tao:' + mcConfig.tao + ' ,x:' + mcConfig.x + ' ,y:' + mcConfig.y;
}
let playButton = document.querySelector('#playButton');
let moves = document.querySelector('#moves');
let results = document.querySelector('#results');
playButton.addEventListener('click', () => {
	doAction();
});
