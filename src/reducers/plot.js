// You can reproduce this figure in plotly.js with the following code!

// Learn more about plotly.js here: https://plot.ly/javascript/getting-started

/* Here's an example minimal HTML template
 *
 * <!DOCTYPE html>
 *   <head>
 *     <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
 *   </head>
 *   <body>
 *   <!-- Plotly chart will be drawn inside this div -->
 *   <div id="plotly-div"></div>
 *     <script>
 *     // JAVASCRIPT CODE GOES HERE
 *     </script>
 *   </body>
 * </html>
 */

let trace1 = {
  x: [15, 15, 25, 25],
  y: [0, 99157.3403829, 99157.3403829, 0],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(0, 67, 88)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(0, 67, 88)',
    width: 1
  },
  marker: {
    color: 'rgb(0, 67, 88)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace0_y',
  type: 'scatter',
  uid: '4817b6',
  yaxis: 'y2'
};
let trace2 = {
  x: [35, 35, 45, 45],
  y: [0, 30418.6672732, 30418.6672732, 0],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(31, 138, 112)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(31, 138, 112)',
    width: 1
  },
  marker: {
    color: 'rgb(31, 138, 112)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace1_y',
  type: 'scatter',
  uid: '5d8b3d',
  yaxis: 'y2'
};
let trace3 = {
  x: [65, 65, 75, 75],
  y: [0, 15792.2823808, 15792.2823808, 0],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(190, 219, 57)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(190, 219, 57)',
    width: 1
  },
  marker: {
    color: 'rgb(190, 219, 57)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace2_y',
  type: 'scatter',
  uid: 'c9c636',
  yaxis: 'y2'
};
let trace4 = {
  x: [55, 55, 70, 70],
  y: [0, 37560.6856679, 37560.6856679, 15792.2823808],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(255, 225, 26)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(255, 225, 26)',
    width: 1
  },
  marker: {
    color: 'rgb(255, 225, 26)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace3_y',
  type: 'scatter',
  uid: 'db372a',
  yaxis: 'y2'
};
let trace5 = {
  x: [145, 145, 155, 155],
  y: [0, 12324.9754758, 12324.9754758, 0],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(253, 116, 0)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(253, 116, 0)',
    width: 1
  },
  marker: {
    color: 'rgb(253, 116, 0)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace4_y',
  type: 'scatter',
  uid: '93637f',
  yaxis: 'y2'
};
let trace6 = {
  x: [135, 135, 150, 150],
  y: [0, 17876.3938188, 17876.3938188, 12324.9754758],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(166, 28, 0)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(166, 28, 0)',
    width: 1
  },
  marker: {
    color: 'rgb(166, 28, 0)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace5_y',
  type: 'scatter',
  uid: 'c8ef3d',
  yaxis: 'y2'
};
let trace7 = {
  x: [125, 125, 142.5, 142.5],
  y: [0, 20598.4523334, 20598.4523334, 17876.3938188],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(0, 67, 88)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(0, 67, 88)',
    width: 1
  },
  marker: {
    color: 'rgb(0, 67, 88)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace6_y',
  type: 'scatter',
  uid: 'e73ec3',
  yaxis: 'y2'
};
let trace8 = {
  x: [115, 115, 133.75, 133.75],
  y: [0, 29029.7948647, 29029.7948647, 20598.4523334],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(31, 138, 112)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(31, 138, 112)',
    width: 1
  },
  marker: {
    color: 'rgb(31, 138, 112)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace7_y',
  type: 'scatter',
  uid: 'cd6875',
  yaxis: 'y2'
};
let trace9 = {
  x: [105, 105, 124.375, 124.375],
  y: [0, 36598.0212229, 36598.0212229, 29029.7948647],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(190, 219, 57)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(190, 219, 57)',
    width: 1
  },
  marker: {
    color: 'rgb(190, 219, 57)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace8_y',
  type: 'scatter',
  uid: 'a30e3e',
  yaxis: 'y2'
};
let trace10 = {
  x: [95, 95, 114.6875, 114.6875],
  y: [0, 53720.829293, 53720.829293, 36598.0212229],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(255, 225, 26)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(255, 225, 26)',
    width: 1
  },
  marker: {
    color: 'rgb(255, 225, 26)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace9_y',
  type: 'scatter',
  uid: '78b182',
  yaxis: 'y2'
};
let trace11 = {
  x: [85, 85, 104.84375, 104.84375],
  y: [0, 58273.7953463, 58273.7953463, 53720.829293],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(253, 116, 0)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(253, 116, 0)',
    width: 1
  },
  marker: {
    color: 'rgb(253, 116, 0)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace10_y',
  type: 'scatter',
  uid: 'a28c48',
  yaxis: 'y2'
};
let trace12 = {
  x: [165, 165, 175, 175],
  y: [0, 47368.8509651, 47368.8509651, 0],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(166, 28, 0)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(166, 28, 0)',
    width: 1
  },
  marker: {
    color: 'rgb(166, 28, 0)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace11_y',
  type: 'scatter',
  uid: '1daff7',
  yaxis: 'y2'
};
let trace13 = {
  x: [185, 185, 195, 195],
  y: [0, 34373.4015715, 34373.4015715, 0],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(0, 67, 88)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(0, 67, 88)',
    width: 1
  },
  marker: {
    color: 'rgb(0, 67, 88)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace12_y',
  type: 'scatter',
  uid: '419ca7',
  yaxis: 'y2'
};
let trace14 = {
  x: [205, 205, 215, 215],
  y: [0, 39474.04874, 39474.04874, 0],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(31, 138, 112)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(31, 138, 112)',
    width: 1
  },
  marker: {
    color: 'rgb(31, 138, 112)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace13_y',
  type: 'scatter',
  uid: '9fdb8e',
  yaxis: 'y2'
};
let trace15 = {
  x: [190, 190, 210, 210],
  y: [34373.4015715, 52789.3091942, 52789.3091942, 39474.04874],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(190, 219, 57)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(190, 219, 57)',
    width: 1
  },
  marker: {
    color: 'rgb(190, 219, 57)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace14_y',
  type: 'scatter',
  uid: '16b7f5',
  yaxis: 'y2'
};
let trace16 = {
  x: [170, 170, 200, 200],
  y: [47368.8509651, 56228.216099, 56228.216099, 52789.3091942],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(255, 225, 26)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(255, 225, 26)',
    width: 1
  },
  marker: {
    color: 'rgb(255, 225, 26)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace15_y',
  type: 'scatter',
  uid: '7d4be8',
  yaxis: 'y2'
};
let trace17 = {
  x: [265, 265, 275, 275],
  y: [0, 2988.6652338, 2988.6652338, 0],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(253, 116, 0)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(253, 116, 0)',
    width: 1
  },
  marker: {
    color: 'rgb(253, 116, 0)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace16_y',
  type: 'scatter',
  uid: 'c1b3b3',
  yaxis: 'y2'
};
let trace18 = {
  x: [255, 255, 270, 270],
  y: [0, 4359.83309471, 4359.83309471, 2988.6652338],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(166, 28, 0)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(166, 28, 0)',
    width: 1
  },
  marker: {
    color: 'rgb(166, 28, 0)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace17_y',
  type: 'scatter',
  uid: '20bf6b',
  yaxis: 'y2'
};
let trace19 = {
  x: [245, 245, 262.5, 262.5],
  y: [0, 5674.14532293, 5674.14532293, 4359.83309471],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(0, 67, 88)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(0, 67, 88)',
    width: 1
  },
  marker: {
    color: 'rgb(0, 67, 88)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace18_y',
  type: 'scatter',
  uid: 'e3d088',
  yaxis: 'y2'
};
let trace20 = {
  x: [305, 305, 315, 315],
  y: [0, 3511.91502887, 3511.91502887, 0],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(31, 138, 112)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(31, 138, 112)',
    width: 1
  },
  marker: {
    color: 'rgb(31, 138, 112)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace19_y',
  type: 'scatter',
  uid: 'e3fedb',
  yaxis: 'y2'
};
let trace21 = {
  x: [295, 295, 310, 310],
  y: [0, 5130.50346252, 5130.50346252, 3511.91502887],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(190, 219, 57)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(190, 219, 57)',
    width: 1
  },
  marker: {
    color: 'rgb(190, 219, 57)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace20_y',
  type: 'scatter',
  uid: '4479eb',
  yaxis: 'y2'
};
let trace22 = {
  x: [285, 285, 302.5, 302.5],
  y: [0, 6017.26492889, 6017.26492889, 5130.50346252],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(255, 225, 26)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(255, 225, 26)',
    width: 1
  },
  marker: {
    color: 'rgb(255, 225, 26)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace21_y',
  type: 'scatter',
  uid: '80a5f4',
  yaxis: 'y2'
};
let trace23 = {
  x: [253.75, 253.75, 293.75, 293.75],
  y: [5674.14532293, 9468.34033067, 9468.34033067, 6017.26492889],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(253, 116, 0)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(253, 116, 0)',
    width: 1
  },
  marker: {
    color: 'rgb(253, 116, 0)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace22_y',
  type: 'scatter',
  uid: 'dba637',
  yaxis: 'y2'
};
let trace24 = {
  x: [335, 335, 345, 345],
  y: [0, 7602.07495629, 7602.07495629, 0],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(166, 28, 0)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(166, 28, 0)',
    width: 1
  },
  marker: {
    color: 'rgb(166, 28, 0)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace23_y',
  type: 'scatter',
  uid: '7b7c9c',
  yaxis: 'y2'
};
let trace25 = {
  x: [325, 325, 340, 340],
  y: [0, 10816.1489847, 10816.1489847, 7602.07495629],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(0, 67, 88)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(0, 67, 88)',
    width: 1
  },
  marker: {
    color: 'rgb(0, 67, 88)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace24_y',
  type: 'scatter',
  uid: '20a4f0',
  yaxis: 'y2'
};
let trace26 = {
  x: [273.75, 273.75, 332.5, 332.5],
  y: [9468.34033067, 15934.9694037, 15934.9694037, 10816.1489847],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(31, 138, 112)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(31, 138, 112)',
    width: 1
  },
  marker: {
    color: 'rgb(31, 138, 112)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace25_y',
  type: 'scatter',
  uid: 'e1c89d',
  yaxis: 'y2'
};
let trace27 = {
  x: [365, 365, 375, 375],
  y: [0, 9349.60777974, 9349.60777974, 0],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(190, 219, 57)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(190, 219, 57)',
    width: 1
  },
  marker: {
    color: 'rgb(190, 219, 57)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace26_y',
  type: 'scatter',
  uid: '3d936c',
  yaxis: 'y2'
};
let trace28 = {
  x: [355, 355, 370, 370],
  y: [0, 16317.6759995, 16317.6759995, 9349.60777974],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(255, 225, 26)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(255, 225, 26)',
    width: 1
  },
  marker: {
    color: 'rgb(255, 225, 26)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace27_y',
  type: 'scatter',
  uid: '2530dc',
  yaxis: 'y2'
};
let trace29 = {
  x: [303.125, 303.125, 362.5, 362.5],
  y: [15934.9694037, 26714.2280106, 26714.2280106, 16317.6759995],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(253, 116, 0)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(253, 116, 0)',
    width: 1
  },
  marker: {
    color: 'rgb(253, 116, 0)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace28_y',
  type: 'scatter',
  uid: 'd20251',
  yaxis: 'y2'
};
let trace30 = {
  x: [235, 235, 332.8125, 332.8125],
  y: [0, 38132.1674112, 38132.1674112, 26714.2280106],
  error_x: {copy_ystyle: true},
  error_y: {
    color: 'rgb(166, 28, 0)',
    thickness: 1,
    width: 1
  },
  line: {
    color: 'rgb(166, 28, 0)',
    width: 1
  },
  marker: {
    color: 'rgb(166, 28, 0)',
    symbol: 'hexagon-open'
  },
  mode: 'lines',
  name: 'trace29_y',
  type: 'scatter',
  uid: '62c0ab',
  yaxis: 'y2'
};
let trace31 = {
  x: [225, 225, 283.90625, 283.90625],
  y: [0, 44357.3662021, 44357.3662021, 38132.1674112],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace30_y',
  type: 'scatter',
  uid: 'd00339',
  yaxis: 'y2'
};
let trace32 = {
  x: [405, 405, 415, 415],
  y: [0, 20619.8145946, 20619.8145946, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace31_y',
  type: 'scatter',
  uid: '259d9f',
  yaxis: 'y2'
};
let trace33 = {
  x: [395, 395, 410, 410],
  y: [0, 29182.2430817, 29182.2430817, 20619.8145946],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace32_y',
  type: 'scatter',
  uid: '0181f8',
  yaxis: 'y2'
};
let trace34 = {
  x: [425, 425, 435, 435],
  y: [0, 17933.3972728, 17933.3972728, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace33_y',
  type: 'scatter',
  uid: 'b7ffcc',
  yaxis: 'y2'
};
let trace35 = {
  x: [445, 445, 455, 455],
  y: [0, 18594.2799202, 18594.2799202, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace34_y',
  type: 'scatter',
  uid: 'c4af6f',
  yaxis: 'y2'
};
let trace36 = {
  x: [430, 430, 450, 450],
  y: [17933.3972728, 31458.9296774, 31458.9296774, 18594.2799202],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace35_y',
  type: 'scatter',
  uid: '46ab0f',
  yaxis: 'y2'
};
let trace37 = {
  x: [402.5, 402.5, 440, 440],
  y: [29182.2430817, 37374.8740443, 37374.8740443, 31458.9296774],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace36_y',
  type: 'scatter',
  uid: 'ea6476',
  yaxis: 'y2'
};
let trace38 = {
  x: [465, 465, 475, 475],
  y: [0, 3248.71670384, 3248.71670384, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace37_y',
  type: 'scatter',
  uid: 'cc1cbd',
  yaxis: 'y2'
};
let trace39 = {
  x: [485, 485, 495, 495],
  y: [0, 1191.43764358, 1191.43764358, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace38_y',
  type: 'scatter',
  uid: '597a0a',
  yaxis: 'y2'
};
let trace40 = {
  x: [505, 505, 515, 515],
  y: [0, 1518.68700757, 1518.68700757, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace39_y',
  type: 'scatter',
  uid: '751572',
  yaxis: 'y2'
};
let trace41 = {
  x: [490, 490, 510, 510],
  y: [1191.43764358, 4409.17642331, 4409.17642331, 1518.68700757],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace40_y',
  type: 'scatter',
  uid: 'fe4749',
  yaxis: 'y2'
};
let trace42 = {
  x: [470, 470, 500, 500],
  y: [3248.71670384, 9629.58079402, 9629.58079402, 4409.17642331],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace41_y',
  type: 'scatter',
  uid: '2b9c36',
  yaxis: 'y2'
};
let trace43 = {
  x: [535, 535, 545, 545],
  y: [0, 8010.75818653, 8010.75818653, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace42_y',
  type: 'scatter',
  uid: 'e5f68b',
  yaxis: 'y2'
};
let trace44 = {
  x: [525, 525, 540, 540],
  y: [0, 23004.8914062, 23004.8914062, 8010.75818653],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace43_y',
  type: 'scatter',
  uid: '8a641d',
  yaxis: 'y2'
};
let trace45 = {
  x: [575, 575, 585, 585],
  y: [0, 3125.25325839, 3125.25325839, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace44_y',
  type: 'scatter',
  uid: '40d9d4',
  yaxis: 'y2'
};
let trace46 = {
  x: [565, 565, 580, 580],
  y: [0, 4777.34844454, 4777.34844454, 3125.25325839],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace45_y',
  type: 'scatter',
  uid: '70dd0d',
  yaxis: 'y2'
};
let trace47 = {
  x: [555, 555, 572.5, 572.5],
  y: [0, 8977.13960361, 8977.13960361, 4777.34844454],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace46_y',
  type: 'scatter',
  uid: 'e10704',
  yaxis: 'y2'
};
let trace48 = {
  x: [595, 595, 605, 605],
  y: [0, 2459.27305167, 2459.27305167, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace47_y',
  type: 'scatter',
  uid: '3cb892',
  yaxis: 'y2'
};
let trace49 = {
  x: [645, 645, 655, 655],
  y: [0, 8284.37083586, 8284.37083586, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace48_y',
  type: 'scatter',
  uid: 'e56246',
  yaxis: 'y2'
};
let trace50 = {
  x: [635, 635, 650, 650],
  y: [0, 14143.7104538, 14143.7104538, 8284.37083586],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace49_y',
  type: 'scatter',
  uid: '579f0a',
  yaxis: 'y2'
};
let trace51 = {
  x: [625, 625, 642.5, 642.5],
  y: [0, 20136.7156946, 20136.7156946, 14143.7104538],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace50_y',
  type: 'scatter',
  uid: '09b5c5',
  yaxis: 'y2'
};
let trace52 = {
  x: [675, 675, 685, 685],
  y: [0, 867.448285436, 867.448285436, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace51_y',
  type: 'scatter',
  uid: '494fb3',
  yaxis: 'y2'
};
let trace53 = {
  x: [665, 665, 680, 680],
  y: [0, 6497.79208226, 6497.79208226, 867.448285436],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace52_y',
  type: 'scatter',
  uid: '8208a5',
  yaxis: 'y2'
};
let trace54 = {
  x: [695, 695, 705, 705],
  y: [0, 8997.75426511, 8997.75426511, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace53_y',
  type: 'scatter',
  uid: '097ecc',
  yaxis: 'y2'
};
let trace55 = {
  x: [735, 735, 745, 745],
  y: [0, 1975.59362005, 1975.59362005, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace54_y',
  type: 'scatter',
  uid: '47595e',
  yaxis: 'y2'
};
let trace56 = {
  x: [725, 725, 740, 740],
  y: [0, 6916.12673165, 6916.12673165, 1975.59362005],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace55_y',
  type: 'scatter',
  uid: '061772',
  yaxis: 'y2'
};
let trace57 = {
  x: [755, 755, 765, 765],
  y: [0, 9773.32548135, 9773.32548135, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace56_y',
  type: 'scatter',
  uid: '72cc61',
  yaxis: 'y2'
};
let trace58 = {
  x: [732.5, 732.5, 760, 760],
  y: [6916.12673165, 12501.4287872, 12501.4287872, 9773.32548135],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace57_y',
  type: 'scatter',
  uid: 'a0e573',
  yaxis: 'y2'
};
let trace59 = {
  x: [775, 775, 785, 785],
  y: [0, 5046.73200784, 5046.73200784, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace58_y',
  type: 'scatter',
  uid: 'aeddb4',
  yaxis: 'y2'
};
let trace60 = {
  x: [835, 835, 845, 845],
  y: [0, 3542.52065624, 3542.52065624, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace59_y',
  type: 'scatter',
  uid: 'b9d91a',
  yaxis: 'y2'
};
let trace61 = {
  x: [825, 825, 840, 840],
  y: [0, 3974.88884295, 3974.88884295, 3542.52065624],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace60_y',
  type: 'scatter',
  uid: '8d2369',
  yaxis: 'y2'
};
let trace62 = {
  x: [815, 815, 832.5, 832.5],
  y: [0, 7184.48515789, 7184.48515789, 3974.88884295],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace61_y',
  type: 'scatter',
  uid: '2e7fa2',
  yaxis: 'y2'
};
let trace63 = {
  x: [805, 805, 823.75, 823.75],
  y: [0, 9147.40536281, 9147.40536281, 7184.48515789],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace62_y',
  type: 'scatter',
  uid: '821a39',
  yaxis: 'y2'
};
let trace64 = {
  x: [795, 795, 814.375, 814.375],
  y: [0, 10324.7619254, 10324.7619254, 9147.40536281],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace63_y',
  type: 'scatter',
  uid: 'a2ada0',
  yaxis: 'y2'
};
let trace65 = {
  x: [780, 780, 804.6875, 804.6875],
  y: [5046.73200784, 13804.529372, 13804.529372, 10324.7619254],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace64_y',
  type: 'scatter',
  uid: 'e3fd59',
  yaxis: 'y2'
};
let trace66 = {
  x: [746.25, 746.25, 792.34375, 792.34375],
  y: [12501.4287872, 14357.7881062, 14357.7881062, 13804.529372],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace65_y',
  type: 'scatter',
  uid: 'a82230',
  yaxis: 'y2'
};
let trace67 = {
  x: [715, 715, 769.296875, 769.296875],
  y: [0, 16694.9056672, 16694.9056672, 14357.7881062],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace66_y',
  type: 'scatter',
  uid: 'd96cc5',
  yaxis: 'y2'
};
let trace68 = {
  x: [700, 700, 742.1484375, 742.1484375],
  y: [8997.75426511, 18969.6239598, 18969.6239598, 16694.9056672],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace67_y',
  type: 'scatter',
  uid: 'a9b4d7',
  yaxis: 'y2'
};
let trace69 = {
  x: [672.5, 672.5, 721.07421875, 721.07421875],
  y: [6497.79208226, 19927.7893914, 19927.7893914, 18969.6239598],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace68_y',
  type: 'scatter',
  uid: '071ad8',
  yaxis: 'y2'
};
let trace70 = {
  x: [855, 855, 865, 865],
  y: [0, 10989.3472732, 10989.3472732, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace69_y',
  type: 'scatter',
  uid: '88ab2d',
  yaxis: 'y2'
};
let trace71 = {
  x: [875, 875, 885, 885],
  y: [0, 17005.5716842, 17005.5716842, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace70_y',
  type: 'scatter',
  uid: '11362f',
  yaxis: 'y2'
};
let trace72 = {
  x: [860, 860, 880, 880],
  y: [10989.3472732, 20707.1994336, 20707.1994336, 17005.5716842],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace71_y',
  type: 'scatter',
  uid: 'd967b9',
  yaxis: 'y2'
};
let trace73 = {
  x: [696.787109375, 696.787109375, 870, 870],
  y: [19927.7893914, 21438.6449783, 21438.6449783, 20707.1994336],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace72_y',
  type: 'scatter',
  uid: 'f214b8',
  yaxis: 'y2'
};
let trace74 = {
  x: [633.75, 633.75, 783.393554688, 783.393554688],
  y: [20136.7156946, 23588.5930181, 23588.5930181, 21438.6449783],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace73_y',
  type: 'scatter',
  uid: '173539',
  yaxis: 'y2'
};
let trace75 = {
  x: [615, 615, 708.571777344, 708.571777344],
  y: [0, 26448.8501832, 26448.8501832, 23588.5930181],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace74_y',
  type: 'scatter',
  uid: '829183',
  yaxis: 'y2'
};
let trace76 = {
  x: [600, 600, 661.785888672, 661.785888672],
  y: [2459.27305167, 28648.241225, 28648.241225, 26448.8501832],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace75_y',
  type: 'scatter',
  uid: '8cb50f',
  yaxis: 'y2'
};
let trace77 = {
  x: [563.75, 563.75, 630.892944336, 630.892944336],
  y: [8977.13960361, 32540.2483892, 32540.2483892, 28648.241225],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace76_y',
  type: 'scatter',
  uid: '1c0ffa',
  yaxis: 'y2'
};
let trace78 = {
  x: [895, 895, 905, 905],
  y: [0, 21498.2301952, 21498.2301952, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace77_y',
  type: 'scatter',
  uid: 'fa24cd',
  yaxis: 'y2'
};
let trace79 = {
  x: [945, 945, 955, 955],
  y: [0, 3994.29097164, 3994.29097164, 0],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace78_y',
  type: 'scatter',
  uid: 'b7d8c4',
  yaxis: 'y2'
};
let trace80 = {
  x: [935, 935, 950, 950],
  y: [0, 8049.71891272, 8049.71891272, 3994.29097164],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace79_y',
  type: 'scatter',
  uid: 'd3417b',
  yaxis: 'y2'
};
let trace81 = {
  x: [925, 925, 942.5, 942.5],
  y: [0, 13151.2674242, 13151.2674242, 8049.71891272],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace80_y',
  type: 'scatter',
  uid: 'c8aafa',
  yaxis: 'y2'
};
let trace82 = {
  x: [915, 915, 933.75, 933.75],
  y: [0, 26280.5186974, 26280.5186974, 13151.2674242],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace81_y',
  type: 'scatter',
  uid: '18127d',
  yaxis: 'y2'
};
let trace83 = {
  x: [900, 900, 924.375, 924.375],
  y: [21498.2301952, 32758.8872907, 32758.8872907, 26280.5186974],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace82_y',
  type: 'scatter',
  uid: '794a3c',
  yaxis: 'y2'
};
let trace84 = {
  x: [597.321472168, 597.321472168, 912.1875, 912.1875],
  y: [32540.2483892, 36601.6870175, 36601.6870175, 32758.8872907],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace83_y',
  type: 'scatter',
  uid: 'f7381e',
  yaxis: 'y2'
};
let trace85 = {
  x: [532.5, 532.5, 754.754486084, 754.754486084],
  y: [23004.8914062, 39048.8033624, 39048.8033624, 36601.6870175],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace84_y',
  type: 'scatter',
  uid: 'ca1c68',
  yaxis: 'y2'
};
let trace86 = {
  x: [485, 485, 643.627243042, 643.627243042],
  y: [9629.58079402, 43208.3432519, 43208.3432519, 39048.8033624],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace85_y',
  type: 'scatter',
  uid: '17518c',
  yaxis: 'y2'
};
let trace87 = {
  x: [421.25, 421.25, 564.313621521, 564.313621521],
  y: [37374.8740443, 50406.5239313, 50406.5239313, 43208.3432519],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace86_y',
  type: 'scatter',
  uid: '120928',
  yaxis: 'y2'
};
let trace88 = {
  x: [385, 385, 492.78181076, 492.78181076],
  y: [0, 56256.7848849, 56256.7848849, 50406.5239313],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace87_y',
  type: 'scatter',
  uid: '09ddcd',
  yaxis: 'y2'
};
let trace89 = {
  x: [254.453125, 254.453125, 438.89090538, 438.89090538],
  y: [44357.3662021, 62081.0056969, 62081.0056969, 56256.7848849],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace88_y',
  type: 'scatter',
  uid: 'd573df',
  yaxis: 'y2'
};
let trace90 = {
  x: [185, 185, 346.67201519, 346.67201519],
  y: [56228.216099, 75150.2355232, 75150.2355232, 62081.0056969],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace89_y',
  type: 'scatter',
  uid: '99322a',
  yaxis: 'y2'
};
let trace91 = {
  x: [94.921875, 94.921875, 265.836007595, 265.836007595],
  y: [58273.7953463, 80040.1666672, 80040.1666672, 75150.2355232],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace90_y',
  type: 'scatter',
  uid: '9d4b38',
  yaxis: 'y2'
};
let trace92 = {
  x: [62.5, 62.5, 180.378941298, 180.378941298],
  y: [37560.6856679, 94547.8722798, 94547.8722798, 80040.1666672],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace91_y',
  type: 'scatter',
  uid: 'c8e076',
  yaxis: 'y2'
};
let trace93 = {
  x: [40, 40, 121.439470649, 121.439470649],
  y: [30418.6672732, 127525.462116, 127525.462116, 94547.8722798],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace92_y',
  type: 'scatter',
  uid: 'dccc97',
  yaxis: 'y2'
};
let trace94 = {
  x: [20, 20, 80.7197353244, 80.7197353244],
  y: [99157.3403829, 166101.265808, 166101.265808, 127525.462116],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace93_y',
  type: 'scatter',
  uid: '9e653f',
  yaxis: 'y2'
};
let trace95 = {
  x: [5, 5, 50.3598676622, 50.3598676622],
  y: [0, 414261.848109, 414261.848109, 166101.265808],
  line: {width: 1},
  marker: {color: 'blue'},
  mode: 'lines',
  name: 'trace94_y',
  type: 'scatter',
  uid: 'cf8930',
  yaxis: 'y2'
};
let trace96 = {
  x: [0, -33307.735449, -33307.735449, 0],
  y: [25, 25, 35, 35],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace95_y',
  type: 'scatter',
  uid: '266a68',
  xaxis: 'x2'
};
let trace97 = {
  x: [0, -52065.2112316, -52065.2112316, 0],
  y: [45, 45, 55, 55],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace96_y',
  type: 'scatter',
  uid: '82f9b7',
  xaxis: 'x2'
};
let trace98 = {
  x: [-33307.735449, -58008.9258947, -58008.9258947, -52065.2112316],
  y: [30, 30, 50, 50],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace97_y',
  type: 'scatter',
  uid: '66e87f',
  xaxis: 'x2'
};
let trace99 = {
  x: [0, -71511.444005, -71511.444005, -58008.9258947],
  y: [15, 15, 40, 40],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace98_y',
  type: 'scatter',
  uid: '362f66',
  xaxis: 'x2'
};
let trace100 = {
  x: [0, -80986.0179938, -80986.0179938, -71511.444005],
  y: [5, 5, 27.5, 27.5],
  line: {width: 1},
  marker: {color: 'rgb(255,133,27)'},
  mode: 'lines',
  name: 'trace99_y',
  type: 'scatter',
  uid: 'a977e6',
  xaxis: 'x2'
};
let trace101 = {
  x: [0, -15103.6165702, -15103.6165702, 0],
  y: [75, 75, 85, 85],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace100_y',
  type: 'scatter',
  uid: 'b2f91c',
  xaxis: 'x2'
};
let trace102 = {
  x: [0, -18286.443241, -18286.443241, -15103.6165702],
  y: [65, 65, 80, 80],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace101_y',
  type: 'scatter',
  uid: '9a01f9',
  xaxis: 'x2'
};
let trace103 = {
  x: [0, -19181.4980168, -19181.4980168, 0],
  y: [95, 95, 105, 105],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace102_y',
  type: 'scatter',
  uid: '3973bd',
  xaxis: 'x2'
};
let trace104 = {
  x: [-18286.443241, -30067.3019564, -30067.3019564, -19181.4980168],
  y: [72.5, 72.5, 100, 100],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace103_y',
  type: 'scatter',
  uid: '612931',
  xaxis: 'x2'
};
let trace105 = {
  x: [0, -11115.866341, -11115.866341, 0],
  y: [135, 135, 145, 145],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace104_y',
  type: 'scatter',
  uid: '60b2ec',
  xaxis: 'x2'
};
let trace106 = {
  x: [0, -13397.536226, -13397.536226, -11115.866341],
  y: [125, 125, 140, 140],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace105_y',
  type: 'scatter',
  uid: '7c7aa6',
  xaxis: 'x2'
};
let trace107 = {
  x: [0, -17293.4694777, -17293.4694777, -13397.536226],
  y: [115, 115, 132.5, 132.5],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace106_y',
  type: 'scatter',
  uid: 'd14fb9',
  xaxis: 'x2'
};
let trace108 = {
  x: [0, -13077.9270867, -13077.9270867, 0],
  y: [175, 175, 185, 185],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace107_y',
  type: 'scatter',
  uid: '1db437',
  xaxis: 'x2'
};
let trace109 = {
  x: [0, -14889.3465252, -14889.3465252, -13077.9270867],
  y: [165, 165, 180, 180],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace108_y',
  type: 'scatter',
  uid: 'e04d0a',
  xaxis: 'x2'
};
let trace110 = {
  x: [0, -18078.6473886, -18078.6473886, -14889.3465252],
  y: [155, 155, 172.5, 172.5],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace109_y',
  type: 'scatter',
  uid: '5b9c1f',
  xaxis: 'x2'
};
let trace111 = {
  x: [-17293.4694777, -20966.4979308, -20966.4979308, -18078.6473886],
  y: [123.75, 123.75, 163.75, 163.75],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace110_y',
  type: 'scatter',
  uid: '0d789d',
  xaxis: 'x2'
};
let trace112 = {
  x: [0, -14018.9586307, -14018.9586307, 0],
  y: [215, 215, 225, 225],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace111_y',
  type: 'scatter',
  uid: '90e134',
  xaxis: 'x2'
};
let trace113 = {
  x: [0, -17761.3181482, -17761.3181482, -14018.9586307],
  y: [205, 205, 220, 220],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace112_y',
  type: 'scatter',
  uid: '9f4dcf',
  xaxis: 'x2'
};
let trace114 = {
  x: [0, -21160.4070082, -21160.4070082, -17761.3181482],
  y: [195, 195, 212.5, 212.5],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace113_y',
  type: 'scatter',
  uid: '8ed281',
  xaxis: 'x2'
};
let trace115 = {
  x: [-20966.4979308, -27365.6331225, -27365.6331225, -21160.4070082],
  y: [143.75, 143.75, 203.75, 203.75],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace114_y',
  type: 'scatter',
  uid: '4c642b',
  xaxis: 'x2'
};
let trace116 = {
  x: [0, -10193.3596676, -10193.3596676, 0],
  y: [245, 245, 255, 255],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace115_y',
  type: 'scatter',
  uid: '105d19',
  xaxis: 'x2'
};
let trace117 = {
  x: [0, -20562.8802838, -20562.8802838, -10193.3596676],
  y: [235, 235, 250, 250],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace116_y',
  type: 'scatter',
  uid: '238759',
  xaxis: 'x2'
};
let trace118 = {
  x: [0, -12867.014552, -12867.014552, 0],
  y: [265, 265, 275, 275],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace16_x, trace117_y',
  type: 'scatter',
  uid: 'e33df2',
  xaxis: 'x2'
};
let trace119 = {
  x: [0, -15201.3766077, -15201.3766077, 0],
  y: [295, 295, 305, 305],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace118_y',
  type: 'scatter',
  uid: 'ef95cc',
  xaxis: 'x2'
};
let trace120 = {
  x: [0, -16731.5513409, -16731.5513409, -15201.3766077],
  y: [285, 285, 300, 300],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace119_y',
  type: 'scatter',
  uid: 'e73267',
  xaxis: 'x2'
};
let trace121 = {
  x: [-12867.014552, -23868.9018429, -23868.9018429, -16731.5513409],
  y: [270, 270, 292.5, 292.5],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace120_y',
  type: 'scatter',
  uid: 'ed6c8a',
  xaxis: 'x2'
};
let trace122 = {
  x: [-20562.8802838, -30738.3759976, -30738.3759976, -23868.9018429],
  y: [242.5, 242.5, 281.25, 281.25],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace121_y',
  type: 'scatter',
  uid: 'b8be62',
  xaxis: 'x2'
};
let trace123 = {
  x: [-27365.6331225, -37898.3661482, -37898.3661482, -30738.3759976],
  y: [173.75, 173.75, 261.875, 261.875],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace122_y',
  type: 'scatter',
  uid: '023f25',
  xaxis: 'x2'
};
let trace124 = {
  x: [-30067.3019564, -50543.1893423, -50543.1893423, -37898.3661482],
  y: [86.25, 86.25, 217.8125, 217.8125],
  line: {width: 1},
  marker: {color: 'rgb(255,65,54)'},
  mode: 'lines',
  name: 'trace123_y',
  type: 'scatter',
  uid: '01ff2e',
  xaxis: 'x2'
};
let trace125 = {
  x: [0, -40215.8364093, -40215.8364093, 0],
  y: [355, 355, 365, 365],
  line: {width: 1},
  marker: {color: 'rgb(0,116,217)'},
  mode: 'lines',
  name: 'trace124_y',
  type: 'scatter',
  uid: '67ead3',
  xaxis: 'x2'
};
let trace126 = {
  x: [0, -51351.640348, -51351.640348, -40215.8364093],
  y: [345, 345, 360, 360],
  line: {width: 1},
  marker: {color: 'rgb(0,116,217)'},
  mode: 'lines',
  name: 'trace125_y',
  type: 'scatter',
  uid: '619e50',
  xaxis: 'x2'
};
let trace127 = {
  x: [0, -49319.9828403, -49319.9828403, 0],
  y: [375, 375, 385, 385],
  line: {width: 1},
  marker: {color: 'rgb(0,116,217)'},
  mode: 'lines',
  name: 'trace126_y',
  type: 'scatter',
  uid: '5f39e2',
  xaxis: 'x2'
};
let trace128 = {
  x: [0, -38114.0690586, -38114.0690586, 0],
  y: [405, 405, 415, 415],
  line: {width: 1},
  marker: {color: 'rgb(0,116,217)'},
  mode: 'lines',
  name: 'trace31_x, trace127_y',
  type: 'scatter',
  uid: '406fd1',
  xaxis: 'x2'
};
let trace129 = {
  x: [0, -51286.6625238, -51286.6625238, -38114.0690586],
  y: [395, 395, 410, 410],
  line: {width: 1},
  marker: {color: 'rgb(0,116,217)'},
  mode: 'lines',
  name: 'trace32_x, trace128_y',
  type: 'scatter',
  uid: 'fc046b',
  xaxis: 'x2'
};
let trace130 = {
  x: [-49319.9828403, -59672.6318071, -59672.6318071, -51286.6625238],
  y: [380, 380, 402.5, 402.5],
  line: {width: 1},
  marker: {color: 'rgb(0,116,217)'},
  mode: 'lines',
  name: 'trace129_y',
  type: 'scatter',
  uid: '995cf1',
  xaxis: 'x2'
};
let trace131 = {
  x: [-51351.640348, -67263.9841684, -67263.9841684, -59672.6318071],
  y: [352.5, 352.5, 391.25, 391.25],
  line: {width: 1},
  marker: {color: 'rgb(0,116,217)'},
  mode: 'lines',
  name: 'trace130_y',
  type: 'scatter',
  uid: 'f58cac',
  xaxis: 'x2'
};
let trace132 = {
  x: [0, -68707.5973163, -68707.5973163, 0],
  y: [425, 425, 435, 435],
  line: {width: 1},
  marker: {color: 'rgb(0,116,217)'},
  mode: 'lines',
  name: 'trace33_x, trace131_y',
  type: 'scatter',
  uid: 'a51401',
  xaxis: 'x2'
};
let trace133 = {
  x: [-67263.9841684, -78127.5358543, -78127.5358543, -68707.5973163],
  y: [371.875, 371.875, 430, 430],
  line: {width: 1},
  marker: {color: 'rgb(0,116,217)'},
  mode: 'lines',
  name: 'trace132_y',
  type: 'scatter',
  uid: 'fbda61',
  xaxis: 'x2'
};
let trace134 = {
  x: [0, -93119.7231804, -93119.7231804, -78127.5358543],
  y: [335, 335, 400.9375, 400.9375],
  line: {width: 1},
  marker: {color: 'rgb(0,116,217)'},
  mode: 'lines',
  name: 'trace133_y',
  type: 'scatter',
  uid: '246d8b',
  xaxis: 'x2'
};
let trace135 = {
  x: [0, -101184.137367, -101184.137367, -93119.7231804],
  y: [325, 325, 367.96875, 367.96875],
  line: {width: 1},
  marker: {color: 'rgb(0,116,217)'},
  mode: 'lines',
  name: 'trace134_y',
  type: 'scatter',
  uid: '449257',
  xaxis: 'x2'
};
let trace136 = {
  x: [0, -119653.871681, -119653.871681, -101184.137367],
  y: [315, 315, 346.484375, 346.484375],
  line: {width: 1},
  marker: {color: 'blue'},
  mode: 'lines',
  name: 'trace135_y',
  type: 'scatter',
  uid: 'eb536f',
  xaxis: 'x2'
};
let trace137 = {
  x: [-50543.1893423, -134890.793087, -134890.793087, -119653.871681],
  y: [152.03125, 152.03125, 330.7421875, 330.7421875],
  line: {width: 1},
  marker: {color: 'blue'},
  mode: 'lines',
  name: 'trace136_y',
  type: 'scatter',
  uid: 'dfc5ae',
  xaxis: 'x2'
};
let trace138 = {
  x: [-80986.0179938, -164839.481399, -164839.481399, -134890.793087],
  y: [16.25, 16.25, 241.38671875, 241.38671875],
  line: {width: 1},
  marker: {color: 'blue'},
  mode: 'lines',
  name: 'trace137_y',
  type: 'scatter',
  uid: 'dd8f88',
  xaxis: 'x2'
};
let trace139 = {
  x: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335, 345, 355, 365, 375, 385, 395, 405, 415, 425, 435, 445, 455, 465, 475, 485, 495, 505, 515, 525, 535, 545, 555, 565, 575, 585, 595, 605, 615, 625, 635, 645, 655, 665, 675, 685, 695, 705, 715, 725, 735, 745, 755, 765, 775, 785, 795, 805, 815, 825, 835, 845, 855, 865, 875, 885, 895, 905, 915, 925, 935, 945, 955],
  y: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335, 345, 355, 365, 375, 385, 395, 405, 415, 425, 435],
  z: [[2344.667138, 363.033302, 0, 2057.183352, 2467.100107, 13225.270748, 14425.850093, 7965.858507, 0, 785.589085, 6329.485936, 0, 11602.951518, 1728.047708, 3633.491454, 6.993141, 0, 706.717914, 2054.623488, 0, 8385.678741, 3172.032478, 175.893719, 0, 166.189065, 0, 0, 5518.268038, 0, 17.839894, 9252.313279, 676.580558, 106.127305, 83.302787, 0, 1076.414612, 2958.451848, 0, 1357.468378, 3553.696181, 3281.883456, 655.433451, 22745.070829, 4422.869486, 0, 0, 4432.700187, 105.584826, 1190.150841, 15.280081, 0, 0, 21.961643, 344.584229, 231.672102, 4570.317751, 507.430973, 1930.100346, 0, 27.335728, 0, 11304.268474, 0, 6914.753384, 6833.504947, 84.670422, 11.721401, 3726.034816, 0, 0, 0, 6205.51627, 111.841704, 815.370939, 0, 6939.378267, 99.825654, 174.803243, 4131.608123, 0, 74.791976, 1570.089065, 5497.055174, 0, 1916.138674, 831.252186, 67.187174, 492.212881, 12.721331, 311.04474, 59.745571, 686.656045, 2095.167037, 19.535668, 3631.013811, 1084.054787], [1663.586314, 97.916847, 11.522993, 3978.671444, 2497.720421, 8294.507523, 14343.754973, 7192.048418, 726.603757, 519.797717, 5602.808569, 0, 14446.665189, 4485.145019, 4018.081137, 0, 139.139635, 771.588608, 1227.773544, 0, 8658.56463, 2972.716666, 0, 1447.511602, 2805.714773, 0, 1014.632316, 950.29977, 714.670499, 0, 5549.095898, 433.63002, 143.113571, 22.190372, 5.224332, 2639.331957, 704.027618, 0, 1380.757911, 1652.942324, 3034.171691, 652.771162, 5170.746133, 4108.03497, 141.07311, 0, 4879.483457, 357.40115, 889.169066, 73.266127, 0, 0, 17.550567, 83.780769, 0, 2686.591395, 970.435254, 827.745241, 0, 40.971555, 0, 4171.610478, 0, 5113.769009, 4154.639781, 576.925129, 412.153065, 6762.404277, 71.719644, 0, 0, 4823.216922, 0, 960.607587, 0, 10640.901375, 2035.439278, 27.938674, 1735.045375, 0, 39.846489, 560.05158, 4388.088104, 0, 714.539877, 749.231037, 0, 0, 0, 1519.040531, 18.88394, 698.394675, 2070.04598, 43.713204, 3376.310153, 1386.087115], [3167.89723, 520.113448, 0, 6082.71367, 3888.695518, 17257.585316, 19493.349494, 13961.408047, 116.66405, 1930.904408, 3803.554053, 0, 2270.378229, 1529.367213, 2033.769319, 0, 0, 210.816826, 2895.430173, 0, 945.19915, 5230.22154, 0, 912.425185, 1470.174454, 0, 0, 894.946661, 0, 0, 7357.597135, 945.013076, 163.047946, 32.672569, 0, 0, 0, 0, 2177.883658, 2130.206563, 5360.2874, 1030.904847, 18085.700209, 6474.344061, 569.124346, 18.151312, 5313.804156, 8.282382, 1960.637949, 0, 0, 0, 0, 344.553438, 996.383715, 6365.378029, 774.1175, 0, 0, 115.050608, 0, 3892.946622, 0, 8785.138253, 8963.095947, 52.435224, 0, 642.375943, 57.599059, 767.265894, 0, 8766.858846, 2974.111393, 79.698142, 6.354826, 7508.450751, 171.400357, 699.315922, 4653.536849, 0, 26.520567, 222.009427, 8041.90292, 26.841487, 260.694967, 1485.699512, 0, 0, 0, 304.990725, 58.204141, 1946.424002, 2517.784809, 0, 5002.398825, 1653.020273], [1839.651193, 187.083412, 267.524298, 4330.372167, 2579.966957, 9954.620406, 15127.411962, 8734.202901, 501.901342, 1174.553622, 2146.071851, 0, 7235.277858, 1520.88901, 1089.065537, 80.536795, 352.757609, 968.012231, 1532.034414, 0, 4078.237552, 2959.448339, 259.857958, 70.81957, 0, 0, 102.675637, 1942.752013, 0, 102.351533, 7040.064553, 640.358087, 1038.695148, 71.063692, 0, 2096.058008, 1023.841024, 0, 1321.50522, 1861.711559, 3476.80592, 827.706057, 10846.563637, 4046.702197, 775.415706, 0, 4431.036888, 522.417531, 1434.230681, 117.315774, 0, 0, 12.489982, 87.213706, 13.62994, 3728.738897, 2789.656636, 1450.484139, 0, 43.64381, 0, 4175.168069, 16.961705, 6002.999044, 4832.436941, 155.865579, 239.982195, 3178.594666, 187.919188, 1322.511313, 0, 4912.199519, 849.145329, 750.235094, 0, 13730.977608, 325.389709, 507.010137, 2831.280675, 0, 0, 0, 4769.485112, 0, 385.544412, 918.831721, 0, 33.591639, 0, 51.594885, 39.615288, 492.579731, 1954.179143, 5.04344, 3808.474146, 1330.172174], [3165.979885, 68.42943, 0, 4377.189741, 5113.087952, 11612.586716, 33163.710587, 35881.233416, 1267.374193, 4508.262002, 1076.678847, 0, 4866.537034, 375.331104, 1806.799242, 7.750893, 24.122034, 1246.652999, 3025.993281, 3.325317, 2584.168351, 4551.721158, 0, 227.203063, 91.127653, 70.69225, 0, 423.808976, 0, 0, 342.500224, 757.595292, 89.141715, 0, 24.500304, 482.694321, 84.656615, 0, 1810.919305, 5585.315972, 11582.504579, 3466.484192, 18163.469022, 4227.385107, 3083.895538, 17.097303, 16448.7653, 70.215363, 864.067336, 16.935774, 23.716083, 0, 89.25153, 48.243309, 301.046824, 3699.915894, 1440.681883, 0, 22.581032, 0, 9.268072, 4174.403639, 22.037415, 5840.883488, 5606.078819, 123.480256, 25.257945, 347.929688, 18.085416, 0, 0, 6998.077329, 570.218102, 110.795002, 11.972037, 12605.650841, 113.063771, 103.33028, 2779.66739, 0, 0, 52.281231, 7007.784779, 0, 0, 3716.67535, 0, 21.82189, 0, 105.339788, 118.245052, 69.187231, 4437.527877, 0, 9830.465837, 4890.714078], [2471.762818, 377.510432, 258.667775, 1738.17072, 2789.04682, 13506.313163, 13756.293464, 22391.612776, 0, 2474.160961, 2451.188355, 0, 5957.691313, 1137.006402, 2254.111112, 0, 132.861637, 935.779499, 2208.937733, 0, 8300.781382, 2599.361476, 322.203883, 0, 0, 0, 0, 1839.754008, 0, 37.923862, 5925.689051, 1324.871537, 5.188971, 0, 8.97058, 97.491236, 351.888812, 0, 957.707945, 2540.68364, 5854.976331, 1041.835605, 31634.122989, 6125.855239, 955.907609, 0, 9213.430221, 17.188395, 664.645605, 615.651083, 0, 0, 0, 229.33849, 39.014925, 1967.074105, 457.410628, 0, 0, 21.935265, 0, 10023.484618, 0, 3671.995106, 5103.821193, 217.637216, 0, 249.960031, 0, 0, 0, 4729.401723, 0, 2430.439617, 0, 10329.85237, 0, 2319.214301, 5880.091371, 0, 0, 287.959533, 7048.720346, 0, 693.482748, 1977.646582, 0, 0, 0, 833.378903, 26.227509, 38.107601, 2697.02813, 0, 3535.098585, 3038.17651], [2518.977611, 533.214603, 18.340271, 11575.890599, 2199.953778, 13902.796525, 14590.189122, 13275.840011, 0, 1165.077375, 1991.138509, 0, 9390.909963, 1227.906276, 451.039748, 0, 0, 1443.70279, 1730.3414, 3.626291, 7246.439587, 2378.687002, 0, 0, 0, 0, 0, 1370.435153, 0, 0, 10545.874105, 911.67016, 79.788414, 0, 15.512921, 0, 781.760598, 41.456433, 1623.705483, 4621.068459, 4765.187807, 1126.685046, 29369.642663, 5419.123371, 0, 0, 5443.621733, 0, 549.708725, 0, 0, 0, 17.696296, 280.345521, 9.655717, 3842.060067, 917.638217, 2714.151146, 0, 45.854093, 0, 15402.569856, 0, 6455.912896, 6243.465545, 5.386255, 0, 148.468926, 19.722316, 866.957206, 0, 5944.345851, 0, 148.25826, 0, 671.238826, 187.687991, 394.389238, 4688.592186, 82.327694, 0, 1001.802884, 5318.251632, 0, 815.754646, 1164.349407, 0, 0, 0, 438.609919, 35.903509, 18.86233, 1440.412689, 4.722448, 3538.088702, 1613.491819], [4016.342086, 190.896361, 0, 4797.94214, 5771.298551, 13395.625931, 34719.10212, 37671.720428, 25.470125, 2120.917077, 977.112863, 0, 7371.011667, 913.53149, 90.638466, 4.03406, 25.109306, 424.902826, 2066.951764, 0, 1808.358715, 6566.579026, 82.255683, 108.432368, 199.839054, 0, 71.327407, 1442.097476, 0, 43.299777, 335.546471, 715.076563, 128.616377, 208.234065, 9.019847, 0, 61.215387, 0, 2150.186794, 6137.013067, 11961.609576, 2757.394106, 23209.808212, 4629.261665, 0, 0, 22115.663871, 105.573215, 1256.76248, 35.257848, 0, 0, 0, 156.41813, 0, 4585.437769, 1674.939005, 174.558455, 5.876307, 0, 9.647396, 4689.02073, 0, 8759.171297, 5375.778682, 15.424089, 27.046413, 1464.425745, 94.128093, 0, 0, 6522.147953, 38.710179, 102.515233, 18.693045, 1759.847209, 46.709436, 1747.840198, 3802.063978, 43.658097, 0, 66.082649, 7523.736025, 0, 157.048985, 4124.186286, 0, 0, 0, 109.651151, 63.572841, 0, 4500.561821, 0, 9424.666244, 6166.038668], [1075.238803, 77.612215, 0, 6184.321871, 5756.708166, 972.313697, 38662.008574, 30546.488648, 0, 4441.992083, 3543.938277, 10.008624, 2326.57372, 633.718677, 3158.8444, 0, 1788.649557, 642.123217, 3487.9354, 0, 588.682507, 7186.989021, 0, 0, 0, 46.636951, 0, 1040.847221, 0, 0, 2152.509649, 83.669151, 341.768629, 0, 7.065113, 0, 0, 23.802965, 1631.418095, 3302.808363, 10303.579718, 2662.614136, 21123.677966, 600.939505, 103.132357, 0, 14808.700899, 391.884927, 1223.443015, 13.503098, 0, 4.203264, 0, 12.397443, 77.65621, 2331.663732, 1433.963864, 1651.090763, 4.501033, 0, 0, 4545.629018, 0, 5782.542526, 341.444144, 110.266582, 631.854573, 1242.307903, 7.209861, 0, 0, 1276.65341, 3103.424516, 39.376216, 68.799148, 12261.398822, 786.129345, 2090.557059, 209.039154, 20.064283, 0, 23.819691, 2646.859479, 0, 121.015316, 2814.057924, 0, 0, 78.693411, 45.812012, 73.795086, 0, 4533.929832, 6.905515, 7265.070275, 3814.729612], [2213.857453, 428.005887, 0, 1229.504804, 1779.422615, 14029.807, 14345.492858, 11401.377911, 2466.340602, 1598.440793, 5948.544397, 0, 8292.204174, 1439.74428, 2105.404069, 0, 306.355546, 2953.154452, 1667.367582, 3.248641, 7276.732639, 2018.791688, 339.405412, 1835.249464, 821.737826, 0, 1688.128753, 5598.379359, 0, 60.072906, 5491.419194, 935.70685, 493.006054, 451.000872, 17.587129, 978.461793, 1388.125394, 320.68349, 1119.973288, 1923.820471, 4095.504651, 1439.850196, 26463.99268, 4484.154955, 2590.323705, 0, 5467.165532, 365.846862, 486.749329, 181.997822, 0, 0, 911.568429, 255.926306, 77.851341, 2550.103824, 1367.005752, 3161.172008, 0, 206.291469, 9.054362, 4482.052537, 0, 3149.365213, 6646.933645, 598.33947, 12.691922, 3679.861351, 0, 0, 0, 5645.598849, 1453.225031, 48.96433, 0, 1800.80271, 0, 694.014849, 3423.088143, 0, 0, 134.985757, 6353.067602, 765.721972, 1019.336105, 1325.999919, 0, 0, 13.774645, 982.330225, 32.962561, 709.71455, 1889.336241, 0, 3746.733062, 1819.319482], [2751.030411, 379.753777, 6.416441, 6394.220173, 3328.900433, 14380.441147, 26161.531572, 20497.592416, 0, 2446.124663, 3569.665617, 0, 10271.290803, 1543.77624, 311.343897, 18.476046, 230.001799, 1455.161767, 3802.995252, 0, 5970.160216, 5924.591612, 0, 6232.523253, 0, 0, 876.740451, 134.451332, 0, 0, 7043.6969, 936.747129, 281.674765, 342.358999, 0, 175.104249, 210.57776, 334.287171, 2372.035039, 3334.945212, 7336.85417, 1441.294379, 21051.217199, 4625.20062, 0, 0, 9370.771753, 86.78681, 1831.688121, 0, 891.961505, 16.755281, 0, 264.480414, 14.070876, 5068.559768, 802.201054, 0, 44.855927, 86.609156, 0, 4795.907183, 0, 8103.691042, 6637.23203, 62.793334, 61.936438, 456.754984, 14.370258, 0, 0, 6856.51534, 19.699228, 0, 0, 978.168567, 2969.546556, 328.415496, 3669.685835, 226.615181, 20.413188, 320.462755, 6774.494215, 0, 954.579621, 1704.419845, 0, 0, 0, 0, 93.23002, 54.974589, 3736.933609, 6.881827, 5817.617972, 2858.790804], [1873.590385, 98.645502, 89.520921, 2913.062721, 2976.716773, 8979.066838, 23650.70824, 25455.374173, 0, 2271.459429, 3881.950894, 38.780866, 5867.991135, 929.337775, 5166.768251, 5.986364, 37.261075, 499.884889, 1703.606834, 0, 6641.718755, 2870.146699, 76.929341, 128.962607, 0, 0, 29.971103, 2029.070274, 194.817376, 13.361292, 11276.171594, 535.664829, 214.549427, 7.923332, 13.211599, 117.149377, 0, 41.71769, 1402.694326, 3882.94282, 7765.038996, 2519.298052, 21026.577565, 4305.927749, 660.758385, 8.803017, 13034.881966, 249.058588, 582.493055, 17.440353, 8.140889, 0, 58.488598, 65.978648, 506.051734, 2613.013077, 1714.777103, 563.662177, 14.533627, 0, 0, 3260.27879, 0, 3221.35413, 2473.042461, 43.234121, 33.446381, 3512.856332, 171.06104, 81.871854, 0, 3192.718672, 1174.413905, 1143.69589, 49.335956, 5542.844677, 2938.101984, 206.167168, 2480.807385, 0, 7.682729, 17.305353, 5565.067162, 0, 849.858209, 3449.019304, 0, 325.844616, 0, 123.270726, 15.554984, 160.309279, 2930.84644, 2.229758, 6725.66464, 3439.319092], [1388.934904, 95.431999, 0, 2658.252899, 1686.474124, 8004.869546, 13134.013767, 9112.943017, 254.733018, 831.494116, 1645.865384, 0, 6203.403841, 1375.373332, 1411.814062, 5.291439, 790.455213, 948.98594, 2093.127084, 0, 3350.459495, 1828.512991, 422.24225, 539.837011, 2694.142879, 0, 97.143892, 3639.660796, 950.090536, 0, 1980.598841, 584.613682, 4.993837, 10.505331, 211.308156, 0, 1167.163041, 0, 1136.990119, 1201.725169, 4084.853821, 1009.946293, 12763.424853, 3751.539797, 242.490885, 0, 5003.073333, 852.180736, 571.192859, 0, 16.19068, 0, 160.636069, 82.431174, 102.760484, 1860.252199, 1000.6, 2725.655257, 0, 29.767564, 44.29039, 3104.171959, 932.76968, 3420.227594, 3730.472926, 3.371938, 3308.185467, 4771.201063, 6.173345, 1245.147568, 0, 4005.724902, 8.462629, 9693.612021, 0, 733.99976, 3150.558036, 4047.365196, 2229.899856, 11.45318, 112.364464, 35.691753, 3839.366718, 0, 498.806101, 1260.39989, 0, 0, 9.625737, 52.301222, 15.725605, 23.616637, 1598.480791, 2.956377, 3664.36146, 1575.927444], [3614.179737, 141.903453, 7.569968, 4898.113714, 4349.271149, 17329.054202, 24938.805787, 34778.850392, 0, 3454.70389, 3156.331529, 0, 9272.339706, 824.116832, 4062.795484, 2.781901, 0, 736.495159, 3422.805862, 0, 7435.531657, 3440.103824, 745.699353, 215.558362, 648.801844, 0, 149.23449, 150.595352, 0, 25.282245, 1142.506909, 1237.978376, 133.734678, 552.303099, 0, 0, 0, 0, 1434.113824, 3563.424805, 11076.082312, 2564.489299, 16724.900601, 5540.571224, 271.705496, 0, 17740.293081, 151.207458, 1262.308433, 559.219989, 0, 0, 23.297148, 99.490586, 0, 4690.991632, 563.857817, 0, 0, 33.196772, 0, 3537.179539, 0, 4906.996769, 4993.77394, 620.462254, 18.651285, 1433.36696, 233.679608, 0, 0, 5408.245387, 0, 178.32526, 0, 1765.465472, 4623.189613, 398.681311, 5534.375555, 12.042699, 0, 300.23104, 7983.74956, 0, 0, 3397.207313, 0, 0, 0, 68.741589, 80.612198, 0, 3739.123144, 0, 6474.047853, 5082.694539], [1951.803643, 168.898422, 37.725446, 1865.511592, 2325.300813, 8787.39773, 11777.477768, 7455.548129, 0, 1063.155798, 7280.639253, 0, 5348.246786, 870.598949, 3258.410134, 0, 1065.870439, 7762.670817, 866.648563, 0, 1991.962125, 2173.321561, 0, 137.16517, 55.05153, 0, 0, 431.353443, 32.598153, 0, 281.718478, 589.093862, 45.923995, 0, 4.846652, 0, 442.020837, 0, 717.433315, 1045.171694, 3271.990409, 805.452436, 8863.080773, 3871.770259, 0, 9.1701, 3537.8408, 4.363681, 1497.572399, 1667.17467, 0, 395.117179, 4.538229, 52.49568, 0, 2178.662796, 1567.594964, 1428.79055, 0, 0, 0, 2871.738697, 0, 4992.572976, 3316.804344, 13.813092, 1030.255318, 2826.008773, 1294.797532, 0, 0, 3697.461163, 20.800214, 137.711763, 0, 9547.919952, 3406.963048, 3735.008083, 2935.501226, 9.383556, 0, 187.9852, 4646.606938, 0, 210.000966, 1010.00793, 0, 0, 0, 262.457639, 19.523851, 464.376877, 1804.806004, 0, 3344.10956, 1467.525941], [2020.559064, 197.959671, 0, 3936.526357, 2965.288494, 8605.049179, 20187.934041, 27357.824498, 0, 3960.96502, 2921.272959, 8.565191, 6848.650838, 1254.125254, 1737.835658, 2.644313, 2567.613045, 933.425935, 2365.25759, 0, 5956.497044, 3448.587154, 0, 0, 85.293822, 405.911219, 157.690669, 527.182521, 0, 32.40592, 4426.483452, 708.166931, 339.081328, 0, 64.731978, 0, 2215.380152, 0, 1271.438415, 4298.820057, 8061.158558, 2376.76764, 24658.556419, 4737.758988, 0, 0, 14779.345488, 686.705279, 496.984116, 196.446822, 97.092406, 14.388269, 11.072457, 171.222956, 0, 3714.258624, 840.195974, 2140.438866, 0, 89.395547, 0, 5661.63288, 541.320128, 3542.383337, 3406.689385, 175.247523, 8.864413, 701.881185, 18.510187, 14.514033, 0, 3726.595713, 8.458127, 4293.7055, 8.411403, 6715.323975, 81.720273, 414.215657, 4633.998374, 17.170634, 0, 22.932495, 6424.059658, 0, 38.872584, 2790.629769, 0, 0, 28.861855, 392.050522, 75.235146, 212.436679, 2480.75844, 788.93272, 4868.713158, 4280.999953], [2411.12913, 389.471378, 12.420549, 3758.490137, 3451.506998, 11751.703189, 21791.150777, 13685.846221, 0, 1172.559749, 1738.540423, 0, 8513.481091, 1127.538149, 2371.680325, 0, 25.269983, 762.784866, 3029.674252, 3.483566, 3958.348974, 4210.530092, 0, 154.269246, 0, 0, 66.518831, 225.676851, 0, 0, 1287.457088, 685.115949, 282.84647, 0, 0, 0, 0, 0, 1781.115325, 3831.367781, 5761.140985, 1541.223611, 14369.309654, 5393.715418, 158.089983, 0, 7693.645129, 24.51895, 1264.499911, 35.483466, 8.28157, 11.045296, 246.497186, 285.274488, 18.551377, 5105.228317, 1349.047768, 3097.399747, 0, 16.858103, 0, 4239.436713, 0, 7443.844691, 6202.177314, 175.924942, 136.097428, 1505.491288, 0, 25.775232, 0, 6936.958596, 51.943851, 355.866556, 18.812662, 6918.023333, 0, 13.530959, 2648.522293, 35.149974, 0, 340.351763, 6888.182918, 0, 656.211605, 1848.856381, 20.347973, 0, 14.770764, 80.256594, 8.278844, 0, 3410.557837, 36.292648, 6570.91537, 2331.736113], [2360.317212, 395.643865, 6.492783, 2542.7594, 2110.871552, 12523.983875, 14247.01802, 15953.770721, 0, 1413.847258, 3433.023291, 0, 7645.208934, 372.12484, 331.810657, 2.271993, 494.956646, 77.612838, 2073.621748, 0, 4366.697803, 2745.978956, 329.909964, 1474.610083, 425.425224, 0, 2114.274512, 751.509072, 19.475404, 12.913824, 3956.780151, 828.588567, 197.037136, 9.021377, 181.908013, 230.874638, 2441.816911, 62.827358, 1145.592354, 2733.949037, 5106.893214, 1449.073857, 13879.626359, 5021.879997, 966.499445, 0, 7372.730268, 86.901729, 480.960328, 9.928651, 0, 64.902611, 0, 83.80267, 10.381743, 2464.775856, 1437.277592, 0, 62.881454, 14.001923, 0, 6251.884188, 0, 2725.20995, 5256.496307, 498.047924, 0, 3529.652089, 63.615791, 0, 0, 5382.284802, 50.870544, 956.575934, 7.018643, 6759.747676, 207.304953, 1120.687448, 3564.321731, 0, 0, 1077.129801, 5298.236212, 0, 553.32792, 1483.212346, 0, 0, 0, 1117.218204, 47.836815, 60.841846, 1294.271166, 926.649962, 2714.34636, 1826.387106], [2188.102127, 235.706087, 3.323769, 2363.092611, 2613.102933, 13182.385592, 14522.50381, 22078.613658, 101.852467, 2157.246732, 2633.318766, 0, 5237.813813, 1750.645739, 829.29656, 0, 427.418717, 801.476135, 1499.081212, 0, 3251.398094, 2588.639883, 0, 1083.102544, 653.478171, 0, 639.337012, 2119.011234, 0, 0, 7371.766824, 1226.199775, 199.93578, 0, 7.049929, 0, 5033.81995, 52.548339, 876.884853, 3553.316875, 5599.313725, 1837.917411, 33848.562914, 5437.573909, 1251.906817, 14.603955, 8563.506617, 34.559642, 385.93078, 105.029837, 70.03761, 0, 1322.666646, 244.350195, 54.911432, 1972.013502, 234.817798, 0, 0, 7.030073, 0, 10315.51765, 0, 2430.063008, 4665.328962, 389.454852, 0, 1085.571096, 16.022788, 1297.342371, 0, 4106.430392, 691.884048, 98.158919, 0, 8155.101771, 17.538182, 6053.449014, 5251.42016, 178.358939, 0, 79.403309, 6407.581311, 1993.611662, 66.457807, 1461.439188, 0, 618.659854, 0, 101.810038, 30.711624, 91.944724, 1704.156415, 0, 3363.858445, 2223.212213], [2188.985827, 378.367445, 20.037926, 4217.673854, 3731.310188, 8967.625365, 23016.983173, 21435.789298, 857.565115, 1942.663171, 3491.296508, 0, 6754.355759, 1122.27322, 558.855566, 3.979693, 2848.65297, 328.54352, 3419.130812, 0, 5374.259713, 4489.116644, 323.181374, 798.497913, 1695.016986, 0, 167.693439, 262.062989, 486.164991, 14.148857, 7013.574288, 433.175077, 149.227926, 0, 0, 261.560124, 0, 0, 1730.085416, 4014.474123, 7056.429762, 1833.73336, 17848.081997, 3680.821415, 1235.652441, 0, 9742.715768, 0, 1252.944651, 156.521976, 1315.117333, 10.827208, 49.992171, 195.729094, 18.184982, 5993.652515, 1985.056987, 0, 0, 0, 0, 4005.375612, 0, 5804.668216, 5325.919593, 15.21621, 40.022845, 4318.532713, 0, 0, 0, 6713.042209, 1234.760327, 250.628731, 6.147037, 9637.399173, 1123.939648, 13.263721, 1703.80383, 0, 0, 3.834825, 5083.712639, 0, 1158.751678, 1942.750977, 0, 0, 14.479039, 216.346662, 20.543679, 1047.962493, 3267.237583, 13.340948, 5587.79456, 3125.706782], [3033.557474, 210.384137, 0, 4681.609191, 5048.432846, 10131.73701, 28488.956182, 33373.815043, 0, 2773.70034, 1459.510504, 0, 9116.488688, 2831.546792, 981.057064, 0, 530.011861, 632.356819, 3395.300526, 0, 3381.467826, 5358.318788, 0, 0, 1320.838336, 0, 803.756998, 837.87815, 0, 0, 500.413593, 754.183805, 44.152358, 837.927299, 19.376216, 0, 0, 0, 1598.355074, 4056.052636, 10529.378982, 2891.949474, 27463.589445, 3412.893772, 0, 14.613821, 14048.06577, 0, 994.424269, 0, 0, 0, 7.751161, 267.92959, 329.885748, 6432.11862, 2085.983323, 165.340423, 0, 67.371043, 0, 9237.660434, 0, 7246.059373, 4282.841433, 169.86497, 0, 3107.033425, 8.638579, 0, 0, 4503.515127, 355.261573, 340.980108, 0, 1176.038312, 11.744184, 3763.407699, 3866.062072, 0, 0, 781.278172, 7144.393969, 0, 1735.523017, 3142.880776, 0, 0, 0, 9.148367, 23.957864, 578.332794, 4712.727453, 0, 7998.043545, 4008.991028], [2700.321451, 94.813632, 50.072738, 4681.951177, 3560.489519, 14352.486168, 26541.261163, 17523.164399, 551.307888, 1925.929629, 1332.66065, 0, 11075.204395, 3828.978959, 4372.192698, 0, 927.739567, 754.321965, 2037.645728, 4.736761, 2814.904135, 6180.368736, 0, 3309.650215, 4385.345096, 58.186566, 798.374148, 2239.037213, 529.605154, 10.551338, 1406.230109, 661.230782, 32.46368, 0, 0, 140.466403, 2677.189931, 25.438635, 1621.462112, 3980.289346, 6780.904447, 1193.217661, 13293.380706, 7702.596696, 2036.383847, 0, 10204.980086, 0, 1802.556707, 72.372684, 0, 7.509428, 0, 144.650402, 0, 4196.31837, 2192.47104, 0, 0, 89.853191, 0, 4883.756307, 0, 10843.206425, 6782.248707, 189.963276, 18.505777, 797.285288, 25.761839, 0, 12.415497, 8603.626808, 35.315189, 175.358182, 0, 7226.649458, 1946.975252, 0, 2613.484634, 0, 13.120195, 154.263838, 7515.824264, 0, 527.375031, 2229.907393, 0, 0, 0, 0, 66.662994, 98.554017, 3746.462788, 0, 6587.448079, 3630.992088], [3143.835881, 341.041996, 4.080679, 2376.351578, 3397.73339, 15378.489632, 18545.125302, 16385.086764, 1119.284249, 1742.452489, 4585.52364, 0, 13108.29207, 1640.307258, 5887.993548, 31.491936, 0, 806.839754, 1980.408541, 0, 10663.353496, 4421.073679, 0, 0, 2196.068643, 0, 1218.923836, 5811.899033, 1046.614238, 0, 1333.111241, 978.555757, 357.334564, 500.178822, 55.020505, 0, 1156.451636, 0, 1677.574659, 2874.109972, 5396.564654, 1075.139573, 17522.555301, 5317.315489, 0, 0, 7728.166909, 1086.802134, 1931.238799, 39.320102, 0, 0, 273.149603, 145.116841, 0, 4123.912364, 1525.321245, 456.151512, 0, 57.829937, 0, 7002.831017, 0, 7426.176888, 8032.522073, 5.733728, 60.325164, 597.065761, 10.497311, 0, 10.118015, 7869.138539, 0, 14.290824, 0, 357.270586, 302.662096, 344.861767, 4113.083292, 0, 38.75445, 91.036732, 7142.412752, 733.771035, 1347.399755, 1966.272534, 0, 0, 0, 1122.795653, 38.062109, 542.137343, 2846.343092, 5.027096, 5163.162405, 2572.085871], [2224.779575, 381.907968, 4.039012, 2673.272699, 2700.357778, 12410.012736, 18151.247884, 12840.425943, 482.135954, 2368.806961, 3393.499354, 0, 10222.78932, 1990.693056, 1382.730904, 54.239906, 882.971544, 1080.842431, 2476.705184, 0, 8135.925004, 4518.440645, 0, 1023.749017, 693.959646, 0, 260.786783, 1719.340775, 0, 0, 2516.076131, 733.229883, 466.622836, 0, 0, 0, 4774.483012, 0, 1681.058655, 2588.75152, 5197.755635, 1172.689332, 24679.464704, 4908.582712, 2940.720746, 0, 6747.23793, 41.996539, 2702.264212, 0, 0, 11.351185, 183.440881, 403.293633, 867.453081, 4007.621328, 2217.62973, 0, 182.330322, 0, 0, 11841.042283, 0, 5694.061103, 6291.297084, 680.646055, 0, 3941.239883, 9.735367, 0, 0, 6015.013934, 13.345566, 371.098791, 0, 7947.267688, 339.666881, 528.41491, 3795.091473, 0, 39.664841, 1475.494782, 5827.235439, 0, 123.634689, 1589.580445, 0, 0, 0, 1299.044855, 79.019527, 74.486884, 2393.568351, 69.9331, 4669.73239, 2382.691627], [2568.745532, 412.603708, 2.77955, 3632.224084, 3565.2921, 13597.983607, 18522.182494, 11428.330395, 0, 2301.849614, 2906.490745, 0, 11130.80432, 1898.524993, 550.81176, 6.128768, 3376.048088, 427.44933, 1252.841365, 0, 3811.959117, 3757.251895, 0, 0, 1545.777535, 49.035705, 0, 3450.109151, 0, 23.943071, 2134.706408, 754.708068, 806.922525, 0, 107.848124, 17.960753, 379.790836, 0, 1118.376873, 2372.615663, 4703.926245, 1244.093027, 13668.828651, 5762.055901, 0, 0, 5856.213165, 265.264733, 1013.874937, 0, 6.250908, 4.168502, 198.886859, 219.562853, 252.045559, 4758.759348, 1702.092676, 907.758357, 4.463804, 84.483965, 0, 5776.610722, 0, 6630.273117, 4851.70939, 445.229345, 20.545199, 1040.649123, 0, 335.853219, 0, 5965.165645, 1382.049817, 2266.736033, 0, 12159.123696, 495.895261, 194.049548, 3855.070966, 0, 21.84915, 97.443556, 6276.187559, 0, 427.683485, 2116.613873, 0, 0, 0, 537.625076, 0, 533.398741, 2444.656628, 27.393599, 4115.130206, 1730.773554], [5117.804561, 2162.791465, 0, 120.934355, 21.080996, 37726.771316, 566.755663, 2897.620228, 0, 605.213861, 7174.522385, 0, 44624.111973, 3589.826268, 1624.679869, 0, 85.729568, 3019.079609, 186.225669, 0, 1003.307114, 0, 0, 18584.696211, 1320.509354, 0, 19898.027824, 5234.500976, 1748.833723, 0, 14034.104514, 2367.412511, 257.139416, 0, 0, 0, 8950.719177, 6406.015105, 123.764311, 2300.154859, 479.147202, 0, 105510.538275, 10274.569811, 31094.182121, 60.764253, 1111.629278, 138.636103, 0, 300.9482, 0, 0, 144.181547, 1811.914806, 0, 0, 0, 0, 260.821773, 402.431243, 32.938672, 19636.904874, 156.64168, 63.371772, 20865.098747, 298.416704, 92.343349, 2311.792259, 32.13773, 41.902167, 9354.904269, 14031.754284, 132.166418, 24763.429258, 0, 0, 0, 0, 14154.743592, 0, 0, 437.974072, 10717.172378, 0, 8786.941468, 101.407871, 0, 0, 0, 680.685415, 0, 0, 181.060225, 0, 51.359851, 198.355793], [6682.840107, 2117.296058, 0, 90.068601, 231.127728, 41504.975146, 2531.628127, 4246.185546, 0, 25.317408, 9358.284546, 0, 37786.680856, 1955.419248, 4337.990293, 0, 48.555175, 3597.524256, 85.136986, 0, 13681.690241, 297.994476, 1283.484554, 18547.794863, 310.563618, 0, 10629.238556, 1572.403857, 0, 84.867505, 4542.046064, 2708.229329, 4107.896546, 30.974852, 30.263506, 0, 9078.483849, 558.03196, 153.296939, 99.114023, 1225.396532, 589.431523, 52824.621818, 14534.568486, 5640.335243, 0, 413.912199, 15.704034, 277.751028, 0, 0, 0, 11563.193958, 1119.029927, 0, 416.53529, 0, 0, 0, 162.239706, 0, 16829.789217, 0, 2061.804333, 19528.199171, 328.090024, 0, 11875.443378, 36.404082, 47.464768, 0, 15845.73618, 0, 99.119527, 0, 619.497046, 74.23725, 0, 12751.903026, 0, 0, 999.748999, 13643.745868, 12010.871911, 1091.292268, 100.076248, 0, 87.850437, 141.906907, 38.552391, 0, 0, 124.061997, 0, 1152.692466, 533.281195], [5795.172507, 1571.095484, 87.207949, 64.147196, 0, 39581.671509, 365.272563, 1396.741936, 2141.486863, 0, 11300.81594, 44.488845, 8488.983388, 6279.365285, 77.150168, 0, 0, 78.199182, 35.668424, 23.570469, 10851.706171, 75.907236, 0, 0, 0, 4453.990076, 1721.242627, 15872.311604, 1258.545411, 0, 25633.709459, 2526.481012, 23.929672, 0, 0, 0, 3326.514635, 2102.877684, 114.581115, 291.273333, 293.39452, 55.095929, 69256.488035, 11965.570876, 1318.24168, 0, 122.543566, 0, 30.222955, 0, 0, 0, 57.511944, 1455.878359, 0, 0, 0, 0, 0, 0, 0, 18787.995226, 156.205279, 17.023216, 20192.643054, 0, 46.043041, 1554.772039, 0, 501.425137, 0, 15214.150264, 0, 7748.801041, 42.430006, 545.371881, 0, 0, 12871.493129, 0, 0, 26.469932, 11734.483782, 0, 12847.033909, 233.568098, 0, 0, 0, 33.939451, 18.126973, 0, 26.158642, 0, 244.486725, 43.885181], [8478.567009, 1168.384125, 4559.475466, 300.153864, 277.239437, 60008.500539, 3394.353826, 4013.985168, 0, 0, 2157.593329, 0, 8741.771685, 1259.555563, 0, 80.397164, 166.806007, 228.868564, 2131.915952, 68.984601, 21323.570841, 682.695456, 38734.163531, 0, 0, 0, 2384.624263, 1120.962002, 0, 169.920969, 1253.869084, 3512.649401, 25.087162, 0, 0, 0, 9824.972142, 0, 314.824981, 333.245235, 2240.590486, 431.625845, 66698.991492, 16859.777833, 19077.72693, 0, 1219.079727, 107.898991, 197.553515, 117.112377, 0, 0, 0, 1619.286839, 61.228396, 2170.678082, 0, 0, 0, 0, 0, 10834.293828, 0, 3894.862544, 30377.048246, 34.155076, 66765.486095, 313.821471, 62.531128, 0, 0, 21750.245831, 0, 425.642915, 0, 0, 85.011325, 89.317254, 22767.444265, 0, 0, 25.823524, 13904.387436, 0, 474.755558, 481.979947, 0, 0, 0, 132.442537, 0, 29543.412778, 445.13279, 0, 1424.124018, 343.301205], [2997.054006, 1652.384754, 0, 894.948075, 1241.459408, 27142.325464, 9740.743854, 8982.281858, 262.655266, 1619.699372, 8612.951478, 127.569179, 11269.290041, 2655.048318, 10562.888099, 0, 0, 261.603544, 779.044937, 56.322458, 17066.335048, 2196.360966, 527.740047, 5935.876772, 393.748759, 0, 2280.678683, 23232.296578, 841.33715, 0, 16106.544664, 1664.405038, 12.375683, 364.89184, 20.497168, 1235.856982, 15568.631401, 1443.022636, 804.410074, 792.036171, 2492.343553, 506.276628, 79668.966161, 11882.633944, 1804.842061, 0, 3274.24666, 52.856461, 481.701502, 0, 0, 17.858114, 0, 675.914366, 179.963663, 2392.046565, 0, 0, 0, 81.834205, 94.186589, 10146.967834, 74.651594, 4636.865684, 11941.939666, 0, 0, 1229.853367, 0, 0, 0, 10345.714598, 461.906734, 508.955633, 60.832787, 2606.370283, 208.222419, 0, 9116.43301, 0, 0, 5022.115659, 7858.410876, 342.593715, 0, 607.59377, 65.797378, 0, 0, 64.879603, 119.110133, 0, 930.077998, 0, 2242.063597, 853.096297], [5212.024469, 1490.390087, 15.737597, 242.153401, 345.785917, 41796.3983, 1776.799094, 2154.187763, 3523.123203, 122.959389, 4180.123088, 54.371012, 19184.802718, 3012.29526, 754.298328, 6286.297023, 1044.805112, 3201.572156, 63.917543, 0, 4232.604653, 226.22863, 0, 1942.537878, 21613.815293, 8850.832337, 241.121363, 19776.076187, 1514.211616, 37.379477, 9380.840486, 3839.312319, 17.456606, 0, 20416.626101, 4860.345889, 5496.364797, 0, 76.599073, 151.884041, 675.750194, 216.477755, 125196.98036, 17837.0833, 11311.135888, 37.025164, 1201.656004, 1672.572273, 43.197469, 36.67722, 34.240735, 22.833687, 35.143445, 1271.591982, 19.175491, 251.024604, 222.171202, 0, 24.45148, 85.194323, 60.214624, 16753.667097, 0, 76.192985, 16800.068575, 21072.452867, 28.135217, 13661.269562, 58.750439, 76.600639, 0, 11310.931708, 187.919809, 373.24762, 25.927425, 2982.944142, 53.247643, 0, 20962.206755, 0, 0, 460.982005, 18863.325582, 0, 0, 299.780969, 63.097589, 0, 213.74765, 456.26146, 42.574658, 0, 416.92182, 93.784059, 437.46116, 503.021803], [7216.688044, 1536.833004, 6666.610328, 269.334962, 208.994449, 47799.671441, 2812.233693, 1390.153903, 14761.951435, 472.771189, 3293.931444, 131.40167, 27709.589518, 7048.882899, 683.609175, 40.567342, 0, 577.420193, 1017.72646, 0, 568.288244, 362.459779, 7005.469695, 3242.1303, 0, 0, 0, 8696.330553, 0, 40.135904, 8752.152081, 3388.146641, 118.083119, 0, 0, 0, 3153.578543, 0, 1450.268544, 692.887287, 1427.307573, 1265.188855, 134730.973234, 16562.212151, 0, 89.488574, 2730.17786, 81.666597, 0, 0, 0, 0, 42.46663, 2032.514198, 2224.442554, 326.591848, 862.903852, 808.888317, 29.546675, 13192.114641, 0, 12771.645454, 0, 663.385186, 21705.255908, 1706.185601, 475.972424, 30403.228402, 47.328565, 370.250677, 0, 17209.26528, 194.638723, 1995.27366, 0, 6430.270561, 0, 0, 18705.30344, 0, 192.830877, 0, 16371.998825, 0, 3805.463551, 734.898612, 0, 0, 0, 0, 0, 362.118555, 519.501393, 0, 469.691184, 647.381597], [5098.528303, 1558.403477, 0, 0, 0, 51079.653776, 1237.152029, 327.283093, 0, 0, 6503.736723, 31402.905752, 1445.954537, 55.978202, 0, 13.101281, 0, 74.591474, 0, 14861.295182, 6680.474141, 32.008077, 2377.520077, 1527.991123, 3358.907249, 0, 1372.502931, 17871.927718, 0, 0, 3473.554894, 3188.471168, 13.816853, 0, 68.903168, 0, 22838.058317, 0, 68.69535, 0, 93.671701, 10.315403, 86176.184523, 18367.186168, 20576.507818, 0, 365.282681, 0, 11.132126, 0, 0, 0, 0, 1104.040732, 29.932789, 319.670367, 0, 0, 0, 61.46616, 21775.404651, 19582.638238, 25925.786334, 85.153505, 24339.511051, 0, 0, 357.975863, 0, 39.857663, 0, 19292.447602, 83.81181, 8611.507655, 25740.512208, 1040.42246, 115.134687, 0, 15656.470172, 0, 0, 0, 14449.468327, 6325.061187, 50.456832, 113.754407, 10046.473241, 14827.927919, 0, 30625.482581, 22928.252668, 0, 189.29316, 0, 125.505393, 82.075643], [2766.297727, 799.384047, 0, 707.641767, 328.545619, 23808.033762, 1346.83313, 856.295982, 0, 13.475038, 2728.029976, 0, 17371.371927, 10439.026476, 4041.984453, 0, 351.917978, 5077.283884, 160.937591, 0, 9677.160609, 484.655923, 0, 3064.477521, 6327.033586, 405.708826, 914.106064, 1252.372861, 1793.76374, 78.757337, 1496.355535, 1558.787021, 381.564435, 11735.195921, 0, 373.938141, 3152.021088, 75.470664, 21.522385, 90.643103, 246.735583, 23.757021, 47224.361874, 9642.947012, 2420.154985, 0, 259.224209, 51.736193, 82.056244, 22.461559, 492.781516, 0, 107.611282, 781.721194, 11.743294, 142.849662, 425.612048, 0, 7.487187, 198.551976, 98.336375, 27863.611465, 0, 247.858479, 10529.370125, 366.843111, 0, 5697.926226, 1834.952268, 4863.120189, 0, 8200.822421, 263.049803, 3200.136904, 0, 8163.614554, 32.60948, 428.264873, 8487.65658, 0, 0, 341.744618, 6851.194938, 0, 1097.415202, 56.364482, 12.880566, 0, 0, 114.308122, 0, 206.463508, 18.519878, 0, 137.952547, 222.052773], [3124.499538, 222.240358, 0, 702.240484, 504.584349, 20244.329739, 6938.691132, 5870.173764, 0, 181.799721, 3368.811037, 0, 22041.47138, 5006.482809, 2142.154881, 8.290543, 1393.281699, 1935.272937, 265.387101, 0, 9802.063823, 682.982546, 0, 0, 0, 0, 284.969897, 3379.874735, 0, 45.850958, 1120.589412, 1275.309074, 26.49384, 263.353373, 55.611028, 659.83075, 3626.410482, 0, 166.9376, 529.95327, 2845.596736, 571.666097, 111276.040787, 7041.958894, 1716.907106, 0, 2420.074248, 417.244746, 367.175863, 108.689485, 33.823064, 33.832946, 0, 185.516417, 56.82476, 1850.550031, 617.57765, 0, 12.07661, 35.6854, 0, 15460.520658, 0, 1073.619796, 9878.763993, 0, 0, 3656.817818, 0, 5044.417327, 0, 6788.663858, 106.072887, 2607.198398, 0, 1642.353718, 105.196252, 110.524571, 8860.686374, 0, 0, 351.505131, 8918.655341, 108.176315, 4801.39591, 803.666059, 0, 0, 30.162906, 61.458539, 0, 777.045564, 740.47886, 583.632476, 1754.63029, 778.530735], [5333.801375, 3033.471369, 0, 447.585219, 47.43107, 40263.145662, 734.670195, 1660.130255, 827.620066, 0, 5701.213283, 0, 20608.577512, 2656.737184, 10653.723639, 0, 0, 19486.937215, 9.385061, 0, 191.787497, 81.510211, 935.915767, 9942.310374, 8105.194152, 0, 9785.931051, 5241.989216, 97.099197, 0, 30871.509456, 2245.661845, 17678.505531, 67.952295, 0, 1153.476731, 10127.334867, 266.14973, 55.05171, 301.790886, 406.557692, 84.407681, 155160.122245, 12947.29412, 929.025706, 0, 260.438262, 0, 0, 0, 0, 0, 0, 2580.337658, 0, 962.197684, 0, 0, 0, 94.808419, 0, 20131.416579, 0, 2280.987494, 19539.949335, 65.432757, 229.474996, 400.803361, 0, 52.063845, 1962.918805, 14984.132852, 54.739348, 54.361835, 0, 2705.579748, 0, 0, 13193.020037, 0, 24241.227026, 4980.135488, 11130.465691, 0, 0, 84.045037, 0, 0, 0, 0, 0, 1298.468253, 22.041744, 0, 172.257151, 157.941798], [3330.491711, 1183.568727, 0, 102.253048, 530.001249, 24009.505044, 3624.512879, 1658.114568, 0, 55.303016, 8571.412057, 0, 7140.1987, 1345.09541, 288.540626, 43.322417, 8628.888776, 2047.227861, 252.336922, 0, 17284.021133, 246.69589, 0, 404.150532, 10475.881812, 0, 0, 15516.569083, 63.094034, 0, 17116.559848, 1776.0414, 17.585639, 619.271544, 38.746223, 17209.86412, 4534.489635, 0, 242.401201, 118.924702, 1013.61414, 244.274937, 81917.674374, 10661.566753, 0, 0, 366.151875, 0, 0, 0, 16083.6296, 20531.836347, 2630.340244, 852.446872, 415.714693, 0, 0, 0, 0, 0, 0, 7597.73455, 1034.667682, 681.685602, 11406.596216, 44.171124, 25.498084, 5411.33703, 0, 606.273476, 0, 9210.019518, 0, 19646.247236, 0, 7889.821144, 192.396884, 0, 10052.477556, 0, 0, 16.698163, 8908.688716, 0, 1870.578915, 109.670549, 4320.899623, 0, 24903.477384, 42.820398, 0, 38.671134, 710.581382, 18976.437836, 852.938939, 214.623589], [3727.299389, 1039.534562, 0, 174.677713, 393.087035, 28983.792733, 862.148493, 3754.342436, 1445.096867, 61.049195, 2225.091472, 0, 31145.888089, 6461.829422, 10429.060388, 8254.02097, 8204.847728, 21.817013, 83.429763, 0, 5239.161807, 582.748455, 0, 987.620384, 2332.142695, 0, 46.173445, 23956.092789, 0, 68.405794, 21474.785847, 2151.773444, 498.937719, 9646.617783, 0, 354.136381, 2147.631266, 0, 259.706106, 172.130398, 600.778724, 213.21605, 64840.390885, 10674.332689, 6280.007334, 0, 818.781846, 92.569738, 48.488982, 100.474174, 0, 10.425243, 738.089368, 939.884504, 23440.046765, 823.403467, 0, 0, 11.163797, 76.864287, 18.328102, 17028.961582, 0, 247.824408, 13400.90757, 0, 102.765433, 17560.21756, 0, 5992.12751, 0, 9762.859695, 15149.551692, 486.895535, 0, 304.309709, 0, 25.542639, 10588.007243, 0, 0, 908.345383, 8876.044875, 0, 0, 150.149152, 19.205618, 0, 0, 18.937729, 14.864585, 0, 102.814876, 17.127572, 110.523996, 221.849148], [4190.207474, 855.695201, 0, 215.513277, 167.770226, 25402.837096, 644.774734, 4664.048759, 7196.953651, 139.058904, 4822.425883, 26.956353, 13348.820392, 3295.07656, 28989.527298, 0, 18129.968682, 23.690935, 143.795013, 0, 12497.516125, 106.77733, 5175.724038, 18490.359961, 31964.354471, 754.333844, 8870.052323, 21332.864671, 4081.528092, 89.043602, 1903.617479, 2334.717123, 30.763866, 0, 75.443318, 26228.212497, 16631.357029, 1255.646766, 81.528101, 95.862063, 1050.76868, 108.684697, 77067.36161, 9666.331495, 9752.522697, 46.402367, 1904.841385, 33.506935, 46.298667, 36.368059, 0, 0, 34.847213, 926.478159, 0, 147.159188, 0, 0, 24.245372, 317.183536, 59.707062, 8425.83883, 47.323375, 201.514075, 11516.420691, 53.032559, 139.490297, 1364.356966, 174.765656, 3579.903868, 0, 8849.506759, 399.290977, 1321.79082, 25.708876, 0, 26.399403, 27.736565, 11508.769592, 0, 0, 48.115398, 9979.537162, 0, 4418.706842, 321.056733, 20.855241, 46.860555, 0, 20.564343, 104.352971, 0, 47.744712, 0, 224.846561, 501.602068], [2341.942323, 423.088657, 0, 757.103661, 1546.698331, 16897.918973, 16400.649129, 18589.00794, 0, 1456.666269, 2371.766045, 0, 4230.843003, 513.794467, 331.585404, 0, 408.258307, 3939.768354, 1709.622071, 0, 1764.152682, 2291.990463, 0, 0, 0, 0, 0, 0, 0, 23.541491, 4262.290445, 1291.295488, 13.196324, 0, 0, 41.532764, 919.436168, 0, 1165.860045, 1809.433862, 5231.539298, 1316.285291, 67365.485538, 7821.149405, 324.238657, 28.937591, 6205.327983, 13.204158, 367.568135, 0, 0, 0, 0, 323.365303, 29.971345, 1320.326471, 1906.955867, 0, 0, 29.902412, 0, 8172.438723, 0, 4797.185026, 7126.812555, 451.411232, 219.877108, 307.231674, 0, 0, 0, 5172.83867, 209.799408, 15900.571453, 0, 2343.965794, 668.284644, 21.86043, 8708.581526, 13075.393147, 0, 3286.564777, 8219.618849, 0, 2061.114507, 1493.640956, 0, 0, 0, 16.20768, 25.732313, 29.274337, 1274.111764, 0, 5442.168772, 2128.770737], [6252.095237, 1740.902832, 2298.577633, 136.479362, 17.668606, 40580.390987, 1569.291468, 1973.792467, 1886.687083, 52.558819, 2644.916808, 28.985926, 16592.544476, 2893.161149, 9198.648423, 26.84628, 55.699982, 18367.22433, 323.286155, 15.356925, 501.435371, 33.8804, 1370.348253, 6605.556581, 28129.635961, 239.072208, 12407.197067, 28563.125657, 18894.623666, 19612.301145, 1209.557195, 3518.134909, 574.179711, 106.598243, 63.541185, 6678.161189, 22013.68934, 1486.59307, 500.825155, 59.67291, 408.869001, 48.724426, 89667.200809, 15018.996016, 11473.679225, 11567.710698, 1283.018924, 37848.099361, 0, 39.10625, 0, 0, 1330.216869, 1278.494733, 12695.739064, 477.78133, 0, 0, 15551.252071, 141.103664, 85.603296, 11411.263524, 0, 299.580476, 17130.103493, 34.215264, 2258.231462, 803.40145, 647.293623, 81.673687, 0, 13517.08149, 114.49441, 33738.053431, 13.822262, 1776.637391, 56.774088, 0, 18334.491452, 0, 0, 206.952238, 16459.748131, 0, 229.536386, 163.572956, 0, 0, 0, 66.337963, 22.697129, 0, 114.892245, 0, 1606.856375, 560.062216], [3208.676622, 840.859896, 0, 188.731182, 353.361715, 22995.65564, 5319.356128, 2188.695538, 2487.843496, 358.984288, 9924.290103, 0, 11645.966616, 2993.091434, 4968.333104, 6.650419, 6995.647241, 1116.982609, 302.951589, 0, 24855.753507, 461.30595, 1092.647521, 4077.675032, 12355.128712, 0, 1670.093899, 1584.037092, 8109.379582, 8.945583, 103.719509, 1583.832606, 729.099437, 739.388956, 51.685144, 11706.543349, 3709.820142, 405.111111, 282.565571, 106.255185, 1292.519931, 476.890409, 52826.468563, 7560.336734, 340.386118, 29.34037, 1930.017595, 1315.703247, 684.620748, 19355.595403, 0, 0, 5026.404531, 1113.29187, 15.19436, 2510.508152, 464.229503, 0, 19.374971, 96.392214, 0, 11399.178363, 0, 780.488678, 11178.088336, 279.70402, 22.293907, 726.856939, 0, 0, 0, 9283.254543, 42.544205, 3664.542724, 10.272242, 1320.337421, 21.0963, 88.659416, 8660.15503, 0, 0, 1736.658039, 8340.11072, 0, 52.950674, 553.85437, 0, 0, 0, 328.667683, 0, 29.682004, 937.744523, 0, 1273.22123, 814.874512], [4785.244871, 911.920038, 0, 83.507334, 49.11713, 27736.468651, 1522.359502, 1073.429938, 4517.293104, 113.475171, 6634.585358, 0, 31756.283581, 18148.483987, 7252.360188, 7.335954, 0, 542.969433, 1516.337968, 0, 7933.522197, 0, 5235.404305, 8428.925684, 15884.28043, 0, 12342.891446, 2535.228261, 4906.527407, 38.613465, 3470.469405, 1858.189102, 0, 0, 24.109266, 8616.15019, 2126.49559, 1718.471778, 204.624844, 33.235238, 282.599441, 49.36801, 61413.726341, 10505.720028, 1990.107718, 0, 527.323287, 73.840483, 114.563607, 2564.660753, 0, 0, 0, 749.838237, 4692.972975, 584.406994, 0, 0, 0, 65.893156, 0, 13507.846758, 0, 42.097527, 12549.453419, 9.349587, 24.591998, 19128.239678, 15268.566177, 111.589846, 16.498733, 9747.60692, 20977.589198, 5429.607905, 0, 2912.879778, 0, 0, 11409.147518, 0, 0, 5492.545609, 9547.218615, 0, 779.204816, 123.704026, 0, 0, 0, 0, 32.483903, 65.483344, 69.851946, 2319.845157, 242.604607, 24.953755], [4160.720977, 636.835368, 7.446748, 129.61755, 71.628092, 23081.02102, 1050.446004, 849.642894, 2232.281152, 81.635986, 7457.091401, 0, 32720.288619, 5448.854982, 415.038137, 16.419708, 0, 1168.559513, 64.811143, 0, 7958.544227, 102.937607, 7079.029808, 5776.631052, 300.24402, 0, 431.720126, 11121.432556, 88.402002, 74.943306, 8194.582941, 2166.656389, 235.892606, 195.592686, 0, 4830.747549, 5285.324856, 0, 29.972417, 81.48726, 409.303589, 263.701981, 127906.178148, 8907.604445, 7326.611615, 30.37509, 232.196877, 958.58653, 202.832745, 0, 0, 390.875898, 2286.0636, 435.160393, 123.346738, 0, 180.657121, 0, 23.918145, 138.805151, 19.633741, 20556.873328, 0, 1993.112581, 8735.568283, 0, 27.521532, 1442.081665, 19.156326, 4146.117076, 0, 5716.061345, 52.520258, 184.426223, 0, 14012.465958, 78.129309, 1203.937611, 12842.939874, 35.540025, 0, 10790.605673, 12983.046338, 0, 2007.759335, 57.928943, 0, 0, 0, 0, 0, 109.926122, 119.842181, 0, 504.481669, 106.084854]],
  autocolorscale: false,
  colorbar: {
    x: 0.96,
    y: 0.9,
    bgcolor: 'rgba(0, 0, 0, 0)',
    bordercolor: '#444',
    borderwidth: 0,
    exponentformat: 'B',
    len: 1,
    lenmode: 'fraction',
    nticks: 0,
    outlinecolor: '#444',
    outlinewidth: 1,
    showexponent: 'all',
    showticklabels: true,
    thickness: 20,
    thicknessmode: 'pixels',
    tickangle: 'auto',
    tickfont: {
      color: '#444',
      family: '"Open sans", verdana, arial, sans-serif',
      size: 12
    },
    ticks: '',
    title: '',
    titlefont: {
      color: '#444',
      family: '"Open sans", verdana, arial, sans-serif',
      size: 12
    },
    titleside: 'top',
    xanchor: 'right',
    xpad: 0,
    yanchor: 'top'
  },
  colorscale: [['0', 'rgb(0,0,130)'], ['0.1', 'rgb(0,180,180)'], ['0.2', 'rgb(40,210,40)'], ['0.4', 'rgb(230,230,50)'], ['0.6', 'rgb(120,70,20)'], ['1', 'rgb(255,255,255)']],
  name: 'trace138_y',
  opacity: 1,
  reversescale: false,
  showscale: true,
  type: 'heatmap',
  uid: '3f3555',
  zauto: true,
  zmax: 155160.122245,
  zmin: 0,
  zsmooth: false
};

let data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9, trace10, trace11, trace12, trace13, trace14, trace15, trace16, trace17, trace18, trace19, trace20, trace21, trace22, trace23, trace24, trace25, trace26, trace27, trace28, trace29, trace30, trace31, trace32, trace33, trace34, trace35, trace36, trace37, trace38, trace39, trace40, trace41, trace42, trace43, trace44, trace45, trace46, trace47, trace48, trace49, trace50, trace51, trace52, trace53, trace54, trace55, trace56, trace57, trace58, trace59, trace60, trace61, trace62, trace63, trace64, trace65, trace66, trace67, trace68, trace69, trace70, trace71, trace72, trace73, trace74, trace75, trace76, trace77, trace78, trace79, trace80, trace81, trace82, trace83, trace84, trace85, trace86, trace87, trace88, trace89, trace90, trace91, trace92, trace93, trace94, trace95, trace96, trace97, trace98, trace99, trace100, trace101, trace102, trace103, trace104, trace105, trace106, trace107, trace108, trace109, trace110, trace111, trace112, trace113, trace114, trace115, trace116, trace117, trace118, trace119, trace120, trace121, trace122, trace123, trace124, trace125, trace126, trace127, trace128, trace129, trace130, trace131, trace132, trace133, trace134, trace135, trace136, trace137, trace138, trace139];

let layout = {
  autosize: false,
  bargap: 0,
  height: 1000,
  hovermode: 'closest',
  margin: {
    r: 20,
    t: 50,
    autoexpand: true,
    l: 20
  },
  showlegend: false,
  title: 'Dendrogram Heatmap',
  width: 1400,
  xaxis: {
    autorange: true,
    domain: [0.15, 0.9],
    mirror: 'allticks',
    range: [0, 960],
    rangemode: 'tozero',
    showgrid: false,
    showline: false,
    showticklabels: true,
    tickmode: 'array',
    ticks: '',
    ticktext: ['2010012O05Rik', '3110007F17Rik', '4732471J01Rik', '4930470H14Rik', '4930511M06Rik', '9030612E09Rik', 'A130077B15Rik', 'A630089N07Rik', 'AY761184', 'Acer2', 'Actb', 'Agr2', 'Apoa1', 'Apoa4', 'Apoc3', 'Atg5', 'Atp5e', 'B2m', 'Ccdc82', 'Chgb', 'Crip1', 'Ctla2a', 'Defa-rs1', 'Defa-rs7', 'Defa17', 'Defa22', 'Defa23', 'Defa24', 'Defa3', 'Emg1', 'Fabp1', 'Foxo1', 'Fuca1', 'Gchfr', 'Ggact', 'Gm14851', 'Gm15284', 'Gm15308', 'Gm16702', 'Gm17644', 'Gm17821', 'Gm20300', 'Gm20594', 'Gm5766', 'Gm7849', 'Gngt2', 'Grk4', 'H2-Ab1', 'H2-Q4', 'Hint1', 'Hsbp1', 'Ifi47', 'Itln1', 'Lce3a', 'Lypd8', 'Mir3470b', 'Mir3473f', 'Mir682', 'Mrfap1', 'Mrpl14', 'Mrpl2', 'NR_003279', 'Ndufb4', 'Olfr856-ps1', 'Pax6', 'Pepd', 'Ppia', 'Prap1', 'Psmb1', 'Psme2', 'Rab10os', 'Rapgef4', 'Reg1', 'Reg3g', 'Rnase4', 'Rnu6', 'Rpl17', 'Rps8', 'S100b', 'Sec11a', 'Selk', 'Slc6a19', 'Smco1', 'Spink4', 'Sprr2b', 'Synj2bp', 'Tceb1', 'Tff3', 'Timm10', 'Tm4sf5', 'Tmigd3', 'Tmsb10', 'Vmn1r58', 'Ywhaq', 'Zfp488', 'Zfp65'],
    tickvals: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335, 345, 355, 365, 375, 385, 395, 405, 415, 425, 435, 445, 455, 465, 475, 485, 495, 505, 515, 525, 535, 545, 555, 565, 575, 585, 595, 605, 615, 625, 635, 645, 655, 665, 675, 685, 695, 705, 715, 725, 735, 745, 755, 765, 775, 785, 795, 805, 815, 825, 835, 845, 855, 865, 875, 885, 895, 905, 915, 925, 935, 945, 955],
    title: '',
    type: 'linear',
    zeroline: false
  },
  xaxis2: {
    autorange: true,
    domain: [0, 0.1],
    range: [-164839.481399, 0],
    showgrid: false,
    showline: false,
    tickmode: 'array',
    ticks: '',
    title: '',
    type: 'linear',
    zeroline: false
  },
  yaxis: {
    autorange: true,
    domain: [0, 0.78],
    mirror: 'allticks',
    range: [0, 457.894736842],
    rangemode: 'tozero',
    showgrid: false,
    showline: false,
    showticklabels: true,
    tickmode: 'array',
    ticks: '',
    ticktext: ['P3_B10: 0', 'P3_A1: 0', 'P3_A12: 0', 'P3_B4: 0', 'P3_E5: 0', 'P3_H1: 0', 'P3_B5: 0', 'P3_F5: 0', 'P3_F12: 0', 'P3_A7: 0', 'P3_D12: 0', 'P3_E6: 0', 'P3_D10: 0', 'P3_F11: 0', 'P3_F10: 0', 'P3_G10: 0', 'P3_D11: 0', 'P3_B12: 0', 'P3_H3: 0', 'P3_D2: 0', 'P3_G12: 0', 'P3_E2: 0', 'P3_B1: 0', 'P3_C10: 0', 'P3_A9: 0', 'P3_B7: 1', 'P3_A2: 1', 'P3_B8: 1', 'P3_E12: 1', 'P3_E3: 1', 'P3_E8: 1', 'P3_F6: 1', 'P3_F8: 1', 'P3_A8: 1', 'P3_C2: 1', 'P3_B6: 1', 'P3_C7: 1', 'P3_C3: 1', 'P3_F1: 1', 'P3_H4: 1', 'P3_E7: 1', 'P3_E4: 1', 'P3_F7: 1', 'P3_G3: 1'],
    tickvals: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335, 345, 355, 365, 375, 385, 395, 405, 415, 425, 435],
    title: '',
    type: 'linear',
    zeroline: false
  },
  yaxis2: {
    autorange: true,
    domain: [0.75, 1],
    overlaying: false,
    range: [-23014.5471172, 437276.395226],
    showgrid: false,
    showline: false,
    tickmode: 'array',
    ticks: 'outside',
    title: '',
    type: 'linear',
    zeroline: false
  }
};


export default function plot(state = {data: data, layout: layout}, action) {
  switch (action.type) {
    // case 'FACETS_SAVE':
    //   return {
    //     data: data,
    //     layout: layout
    //   }
    default:
      return state
  }
}
