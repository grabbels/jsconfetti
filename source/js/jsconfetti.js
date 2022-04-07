window.onload = (event) => {
    //Select the color picker square for page background color and bind colorpicker
    const url = new URL(window.location.href);
    searchParams = url.href.split('?');

    if (searchParams[1]) {
        //if search parameters are detected
        setVars();
    } else {
        // set default values on if clean url is detected
        currentColors = [
            'rgba(201, 186, 171, 1)',
            'rgb(255, 0, 57, 1)',
            'rgb(255, 211, 0, 1)',
            'rgba(0, 92, 44, 1)',
            'rgba(0, 119, 192, 1)',
            'rgba(22, 0, 97, 1)',
            'rgba(255, 82, 0, 1)'
        ];
        bgcolor = 'rgba(21, 24, 34, 1)'
        window.bgcolor = bgcolor;
        window.currentColors = currentColors;
        setURLSearchParam('count', '1000');
        setURLSearchParam('shape', 'poly');
        setURLSearchParam('size', '20');
        setURLSearchParam('vari', '50');
        setURLSearchParam('origin', 'center');
        setURLSearchParam('bg', '151822ff');
        var currentColorsNumber = currentColors.length;
        loop(currentColorsNumber, (i) => {
            setURLSearchParam('color' + i, rgbToHex(currentColors[i]).substring(0, 8));
        });
    }
    
    //preset colors on queryless URL

    //First run of populate function and bind button to add addition colors
    initColor();
    addColor();
};

function setURLSearchParam(key, value) {
    //function to add queries to URL and update it without page reload
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState({ path: url.href }, '', url.href);
}

function rgbToHex(orig) {
    var a,
        isPercent,
        rgb = orig
            .replace(/\s/g, '')
            .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
        alpha = ((rgb && rgb[4]) || '').trim(),
        hex = rgb
            ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
              (rgb[2] | (1 << 8)).toString(16).slice(1) +
              (rgb[3] | (1 << 8)).toString(16).slice(1)
            : orig;

    if (alpha !== '') {
        a = alpha;
    } else {
        a = 01;
    }
    // multiply before convert to HEX
    a = ((a * 255) | (1 << 8)).toString(16).slice(1);
    hex = hex + a;

    return hex;
}

function hexaToRgba(hexa) {
    var hexa = hexa.match(/..?/g);
    var rgba = [];
    for (var i = 0; i < hexa.length; i++) {
        switch (hexa[i][0]) {
            case 'a':
                var num1 = 10;
                break;
            case 'b':
                var num1 = 11;
                break;
            case 'c':
                var num1 = 12;
                break;
            case 'd':
                var num1 = 13;
                break;
            case 'e':
                var num1 = 14;
                break;
            case 'f':
                var num1 = 15;
                break;
            default:
                var num1 = parseInt(hexa[i][0]);
        }
        switch (hexa[i][1]) {
            case 'a':
                var num2 = 10;
                break;
            case 'b':
                var num2 = 11;
                break;
            case 'c':
                var num2 = 12;
                break;
            case 'd':
                var num2 = 13;
                break;
            case 'e':
                var num2 = 14;
                break;
            case 'f':
                var num2 = 15;
                break;
            default:
                var num2 = parseInt(hexa[i][1]);
        }
        var rgbVal = num1 * 16 + num2;
        if (i === 3) {
            var rgbVal = parseFloat(rgbVal) / 255;
        }
        rgba.push(rgbVal);
    }
    var rgba = 'rgba(' + rgba.toString() + ')';
    return rgba;
}

function setVars() {
    //triggered on URL with paramters, get parameters and set them to corresponding fields
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    partCount = urlParams.get('count');
    document.getElementById('particle_number').value = partCount;
    document.getElementById('particle_number_text').value = partCount;
    partSize = urlParams.get('size');
    document.getElementById('particle_size').value = partSize;
    document.getElementById('particle_size_text').value = partSize;
    partVari = urlParams.get('vari');
    document.getElementById('particle_variation').value = partVari;
    document.getElementById('particle_variation_text').value = partVari;
    partOri = urlParams.get('origin');
    document.getElementById(partOri).checked = true;
    bgcolor = urlParams.get('bg');
    window.bgcolor = hexaToRgba(bgcolor);
    currentColors = queryString.split('&').splice(6);
    currentColors.forEach(function (part, index) {
        var newColorCode = this[index].split('=');
        this[index] = hexaToRgba(newColorCode[1].substring(0, 8));
    }, currentColors);
}

// function updateURL() {
//     setURLSearchParam('count', '1000');
//     setURLSearchParam('shape', 'poly');
//     setURLSearchParam('size', '20');
//     setURLSearchParam('vari', '50');
//     setURLSearchParam('origin', 'center');
//     setURLSearchParam('bg', '151822ff');
//     var currentColorsNumber = currentColors.length;
//     loop(currentColorsNumber, (i) => {
//         setURLSearchParam('color' + i, rgbToHex(currentColors[i]));
//     });
// }

function initColor() {
    //select required nodes and remove still present color pickers
    var backgroundPicker = document.querySelector('.background_picker');
    if (backgroundPicker) {
        backgroundPicker.remove();
    }
    var backgroundColorContainer = document.querySelector('.color_container.background');
    backgroundColorContainer.insertAdjacentHTML(
        'afterbegin',
        '<div class="background_picker" id="background_picker"></div>'
    );
    var backgroundPicker = document.querySelector('.background_picker');
    
    var bgcolor = window.bgcolor;
    var bgcolor = window.bgcolor;
    var picker = new Picker({
        parent: backgroundPicker,
        popup: true,
        color: bgcolor
    });
    document.body.style.backgroundColor = bgcolor;
    backgroundPicker.style.backgroundColor = bgcolor;
    //set background color of page and picker square itself to match color of the picker
    picker.onDone = function (color) {
        // console.log(color.rgbaString)
        var backgroundPicker = document.querySelector('.background_picker');
        console.log(backgroundPicker)
        document.body.style.backgroundColor = color.rgbaString;
        backgroundPicker.style.backgroundColor = color.rgbaString;
        if (color.rgbaString === 'rgba(255, 255, 255)') {
            backgroundPicker.style.border = '1px solid black'
        }
        bgcolor = backgroundPicker.style.backgroundColor;
        window.bgcolor = bgcolor;
        initColor();
    };
    var colorsContainer = document.querySelector('.usercolors');
    var colorPickers = document.querySelectorAll('.usercolors .color_picker');
    if (colorPickers) {
        colorPickers.forEach(function (el) {
            el.remove();
        });
    }
    //check number of colors in array and loop that number of times to populate and bind the color pickers
    var colorsNumber = currentColors.length;
    loop(colorsNumber, (i) => {
        colorsContainer.insertAdjacentHTML(
            'afterbegin',
            '<div class="color_picker" id="color_' +
                i +
                '" style=""><div class="color_remove"><i class="ai-cross"></i></div></div>'
        );
    });
    var colorPickers = document.querySelectorAll('.usercolors .color_picker');
    colorPickers.forEach(function (el, i) {
        var picker = new Picker({
            parent: el,
            popup: true,
            color: currentColors[i]
        });
        el.style.backgroundColor = currentColors[i];
        if (currentColors[i] === 'rgb(255, 255, 255)') {
            el.style.border = 'solid 1px black';
        }
        //on color picker confirm reset colors array and push the updated color to the array together with the still present colors
        picker.onDone = function (color) {
            el.style.backgroundColor = color.hex;
            currentColors = [];
            var colorPickers = document.querySelectorAll(
                '.usercolors .color_picker'
            );
            colorPickers.forEach(function (el) {
                currentColors.push(el.style.backgroundColor);
            });
            //run intial function after populating array
            initColor();
        };
    });
    //bind remove color button
    removeColor();
    //populate the canvas
    generateParticles();
}

function addColor() {
    //bind add color button and add black color on click
    var addColor = document.querySelector('.color_add');
    addColor.addEventListener('click', function (el) {
        currentColors.push('rgba(0, 0, 0, 1');
        initColor();
    });
}

function getPreviousSiblings(elem, filter) {
    //function to get number of previous siblings
    var sibs = [];
    while ((elem = elem.previousSibling)) {
        if (elem.nodeType === 3) continue; // text node
        if (!filter || filter(elem)) sibs.push(elem);
    }
    return sibs;
}

function removeColor() {
    //bind remove color button, on click remove color from array
    var removeColorButtons = document.querySelectorAll('.color_remove');
    removeColorButtons.forEach(function (el) {
        el.addEventListener('click', function (el) {
            var splicePos = getPreviousSiblings(el.target.parentElement).length;
            currentColors.splice(splicePos, 1);
            window.currentColors = currentColors;
            initColor();
        });
    });
}

const loop = (times, callback) => {
    for (let i = 0; i < times; i++) {
        callback(i);
    }
};
function getRndFloat(min, max) {
    return Math.floor(Math.random() * (max - min)) + min + Math.random();
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function updateSlider() {
    const particle_numberSpan = document.querySelector(
        'input.particle_number_text'
    ).value;
    const particleSizeSpan = document.querySelector(
        'input.particle_size_text'
    ).value;
    const particleVariationSpan = document.querySelector(
        'input.particle_variation_text'
    ).value;
    document.getElementById('particle_size').value = particleSizeSpan;
    document.getElementById('particle_number').value = particle_numberSpan;
    document.getElementById('particle_variation').value = particleVariationSpan;
    generateParticles();
}

function resetSettings() {
    //reset all parameters to default settings and regenerate particles
    var currentColors = [
        'rgba(201, 186, 171, 1)',
        'rgb(255, 0, 57, 1)',
        'rgb(255, 211, 0, 1)',
        'rgba(0, 92, 44, 1)',
        'rgba(0, 119, 192, 1)',
        'rgba(22, 0, 97, 1)',
        'rgba(255, 82, 0, 1)'
    ];
    var bgcolor = 'rgba(21, 24, 34, 1)';
    window.bgcolor = bgcolor;
    window.currentColors = currentColors
    document.getElementById('particle_number').value = 1000;
    document.getElementById('particle_number_text').value = 1000;
    document.getElementById('particle_size').value = 20;
    document.getElementById('particle_size_text').value = 20;
    document.getElementById('particle_variation').value = 50;
    document.getElementById('particle_variation_text').value = 50;
    document.getElementById('center').checked = true;
    initColor();
    generateParticles();
}

function generateParticles() {
    const canvas = document.querySelector('.canvas');
    canvas.innerHTML = '';
    // const numberArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    const particle_number = document.getElementById('particle_number').value;
    const particle_numberSpan = document.querySelector(
        'input.particle_number_text'
    );
    const particleSize = document.getElementById('particle_size').value;
    const particleSizeSpan = document.getElementById('particle_size_text');
    const particleVariation =
        document.getElementById('particle_variation').value;
    const particleVariationSpan = document.getElementById(
        'particle_variation_text'
    );
    const particleShape = document.getElementById('particle_shape').value;
    const particleOrigin = document.querySelector(
        'input[name="dist_origin"]:checked'
    ).value;
    var currentColors = window.currentColors;
    const colorNum = currentColors.length;
    particle_numberSpan.value = particle_number;
    particleSizeSpan.value = particleSize;
    particleVariationSpan.value = particleVariation;

    loop(particle_number, (i) => {
        classNum = Math.floor(Math.random() * colorNum);
        if (particleOrigin === 'center') {
            var result =
                Math.pow(Math.random(), 2 / 1) * 300 + getRndFloat(-80, 80);
            var y = Math.random();
            if (y < 0.5) {
                var result = result * -1;
            }
            ranPosNumberOne = result + Math.random();
            var result =
                Math.pow(Math.random(), 2 / 1) * 300 + getRndFloat(-80, 80);
            var y = Math.random();
            if (y < 0.5) {
                var result = result * -1;
            }
            ranPosNumberTwo = result + Math.random();
            if (
                (ranPosNumberOne > 230 && ranPosNumberTwo > 230) ||
                (ranPosNumberOne < -230 && ranPosNumberTwo < -230) ||
                (ranPosNumberOne > 230 && ranPosNumberTwo < -230) ||
                (ranPosNumberOne > 230 && ranPosNumberTwo > 230)
            ) {
                var translate = '99999999px, 99999999';
            } else {
                var translate = ranPosNumberOne + 'px, ' + ranPosNumberTwo;
            }
            var absolutePosition = 'top:50%;left:50%';
        } else if (particleOrigin === 'spread') {
            var ranPosNumberOne = getRndFloat(-100, 100);
            var ranPosNumberTwo = getRndFloat(-100, 100);
            var translate = '0px, 0';
            var absolutePosition =
                'top:' + ranPosNumberOne + '%;left:' + ranPosNumberTwo + '%';
        }

        const particleShape = document.getElementById('particle_shape').value;
        const particleSize = document.getElementById('particle_size').value;
        const particleVariation =
            document.getElementById('particle_variation').value;
        var extremeMin = 10 - particleVariation * 0.1;
        var extremeMax = particleVariation * 0.1 + 10;
        var scale = getRndInteger(extremeMin, 10) * 0.1;

        if (particleShape === 'poly') {
            var extremeMin = 20 - particleVariation * 0.1;
            var extremeMax = particleVariation * 0.1 + 20;
            var scale1 = getRndInteger(extremeMin, extremeMax) * 0.1;
            var extremeMin = 20 - particleVariation * 0.1;
            var extremeMax = particleVariation * 0.1 + 20;
            var scale2 = getRndInteger(extremeMin, extremeMax) * 0.1;
            const polygonPoints =
                getRndFloat(0, 30) +
                ',' +
                getRndFloat(0, 30) +
                ' ' +
                getRndFloat(70, 100) +
                ',' +
                getRndFloat(0, 30) +
                ' ' +
                getRndFloat(70, 100) +
                ',' +
                getRndFloat(70, 100) +
                ' ' +
                getRndFloat(0, 30) +
                ',' +
                getRndFloat(70, 100);
            var newElem = Object.assign(document.createElement('div'), {
                id: i,
                innerHTML:
                    '<svg  style="transform:translate(' +
                    translate +
                    'px)scale(' +
                    getRndFloat(20, 150) +
                    '%, ' +
                    getRndFloat(20, 150) +
                    '%) rotate(' +
                    getRndFloat(0, 360) +
                    'deg);width:' +
                    particleSize +
                    'px;height:' +
                    particleSize +
                    'px;position:absolute;' +
                    absolutePosition +
                    ';" viewBox="0 0 100 100" preserveAspectRatio="none"><g style="transform:scale(' +
                    scale +
                    ', ' +
                    scale +
                    ' "><polygon style="fill: ' +
                    currentColors[classNum] +
                    '" points="' +
                    polygonPoints +
                    '" /></g></svg>'
            });
        } else if (particleShape === 'circle') {
            var newElem = Object.assign(document.createElement('div'), {
                id: i,
                innerHTML:
                    '<svg  style="transform:translate(' +
                    translate +
                    'px)scale(' +
                    scale +
                    ', ' +
                    scale +
                    ');width:' +
                    particleSize +
                    'px;height:' +
                    particleSize +
                    'px;position:absolute;' +
                    absolutePosition +
                    ';" viewBox="0 0 100 100" preserveAspectRatio="none"><circle cx="50" cy="50" r="50" style="fill: ' +
                    currentColors[classNum] +
                    '" /></svg>'
            });
        } else if (particleShape === 'square') {
            var newElem = Object.assign(document.createElement('div'), {
                id: i,
                innerHTML:
                    '<svg  style="transform:translate(' +
                    translate +
                    'px)scale(' +
                    scale +
                    ', ' +
                    scale +
                    ');width:' +
                    particleSize +
                    'px;height:' +
                    particleSize +
                    'px;position:absolute;' +
                    absolutePosition +
                    ';" viewBox="0 0 100 100" preserveAspectRatio="none"><rect width="100" height="100" style="fill: ' +
                    currentColors[classNum] +
                    '" /></svg>'
            });
        } else if (particleShape === 'tri') {
            var rotate = getRndFloat(0, 360);
            var newElem = Object.assign(document.createElement('div'), {
                id: i,
                innerHTML:
                    '<svg  style="transform:rotate(' +
                    rotate +
                    'deg)translate(' +
                    translate +
                    'px)scale(' +
                    scale +
                    ', ' +
                    scale +
                    ');width:' +
                    particleSize +
                    'px;height:' +
                    particleSize +
                    'px;position:absolute;' +
                    absolutePosition +
                    ';" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="50 15, 100 100, 0 100" style="fill: ' +
                    currentColors[classNum] +
                    '" /></svg>'
            });
        } else if (particleShape === 'flake') {
            var rotate = getRndFloat(0, 360);
            var newElem = Object.assign(document.createElement('div'), {
                id: i,
                innerHTML:
                    '<svg  style="transform:rotate(' +
                    rotate +
                    'deg)translate(' +
                    translate +
                    'px)scale(' +
                    scale +
                    ', ' +
                    scale +
                    ');width:' +
                    particleSize +
                    'px;height:' +
                    particleSize +
                    'px;position:absolute;' +
                    absolutePosition +
                    ';" viewBox="0 0 100 100"><g transform="matrix(0.635666,0,0,0.738224,-236.426,-111.892)" style="fill: ' +
                    currentColors[classNum] +
                    '"><path d="M477.774,281.061C490.233,274.799 504.305,271.293 519.19,271.293C552.855,271.293 582.332,289.325 598.553,316.22C635.442,377.383 702.534,418.279 779.091,418.279C816.995,418.279 852.572,408.236 883.324,390.696L934.639,361.427L876.102,258.797L824.787,288.065C811.307,295.754 795.706,300.128 779.091,300.128C745.425,300.128 715.949,282.096 699.727,255.2C662.839,194.038 595.747,153.142 519.19,153.142C485.232,153.142 453.144,161.207 424.718,175.493L371.933,202.021L424.99,307.589L477.774,281.061Z" /></g></svg>'
            });
        } else if (particleShape === 'string') {
            var rotate = getRndFloat(0, 360);
            var newElem = Object.assign(document.createElement('div'), {
                id: i,
                innerHTML:
                    '<svg  style="transform:rotate(' +
                    rotate +
                    'deg)translate(' +
                    translate +
                    'px)scale(' +
                    scale +
                    ', ' +
                    scale +
                    ');width:' +
                    particleSize +
                    'px;height:' +
                    particleSize +
                    'px;position:absolute;' +
                    absolutePosition +
                    ';" viewBox="0 0 358 171" ><g id="Artboard1" transform="matrix(1,0,0,0.861075,0,0)">< rect x="0" y="0" width="357.693" height="197.497" style="fill:none;" /><clipPath id="_clip1"><rect x="0" y="0" width="357.693" height="197.497"/></clipPath><g clip-path="url(#_clip1)"><g transform="matrix(0.635666,0,0,0.738224,-236.426,-111.892)" style="fill: ' +
                    currentColors[classNum] +
                    '"><path d="M477.774,281.061C490.233,274.799 504.305,271.293 519.19,271.293C552.855,271.293 582.332,289.325 598.553,316.22C635.442,377.383 702.534,418.279 779.091,418.279C816.995,418.279 852.572,408.236 883.324,390.696L934.639,361.427L876.102,258.797L824.787,288.065C811.307,295.754 795.706,300.128 779.091,300.128C745.425,300.128 715.949,282.096 699.727,255.2C662.839,194.038 595.747,153.142 519.19,153.142C485.232,153.142 453.144,161.207 424.718,175.493L371.933,202.021L424.99,307.589L477.774,281.061Z" /></g></g></g></svg>'
            });
        }

        canvas.appendChild(newElem);
    });
    const url = new URL(window.location.href);
    cleanUrl = url.href.split('?')[0];
    window.history.pushState('', '', cleanUrl);
    window.currentColors = currentColors;
    window.bgcolor = bgcolor;
    setURLSearchParam('count', particle_number);
    setURLSearchParam('shape', particleShape);
    setURLSearchParam('size', particleSize);
    setURLSearchParam('vari', particleVariation);
    setURLSearchParam('origin', particleOrigin);
    setURLSearchParam('bg', rgbToHex(bgcolor).substring(0, 8));
    var currentColorsNumber = currentColors.length;
    loop(currentColorsNumber, (i) => {
        setURLSearchParam('color' + i, rgbToHex(currentColors[i]).substring(0, 8));
    });
}

function exportPDF() {
    alert('Coming soon!')
}
