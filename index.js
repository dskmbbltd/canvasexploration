document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#glCanvas');
    const [w, h] = [canvas.width, canvas.height];
    const [centerx, centery] = [w / 2, h / 2];
    const gl = canvas.getContext('2d');

    const counter = document.getElementById('counter');
    const counterVal = document.getElementById('counterVal');
    const counterMax = document.getElementById('counterMax');
    const slicewidth = document.getElementById('slicewidth');
    const slicewidthVal = document.getElementById('slicewidthVal');
    const slicewidthMax = document.getElementById('slicewidthMax');

    //ANIMATION
    let rotation = 0;
    const ROTATION_SPEED = 0.5; // degrees per frame
    let isAnimating = false;
    let frame = null;

    const animateButton = document.getElementById('animate');
    function animate() {
        rotation = (rotation + ROTATION_SPEED) % 360;
        const sliceCount = parseInt(counter.value, 10);
        const sliceWidth = parseInt(slicewidth.value, 10);

        drawCurves(sliceCount, sliceWidth, rotation);
        frame = requestAnimationFrame(animate);
    }

    function toggleAnimate() {
        isAnimating = !isAnimating;

        if (isAnimating) {
            animate();
        } else {
            cancelAnimationFrame(frame)
        }
    }

    animateButton.addEventListener('click', () => {
        toggleAnimate();
    })
    //ANIMATION


    //counter and width handling
    const MIN_SLICECOUNT = 2;
    const MIN_SLICEWIDTH = 2;
    const MIN_GAP = 2;

    counter.addEventListener('input', () => {
        const slicecount = parseInt(counter.value, 10);

        if (!isNaN(slicecount) && slicecount >= MIN_SLICECOUNT) {
            const maxWidth = Math.floor((360 - (slicecount * MIN_GAP)) / slicecount);

            slicewidth.max = maxWidth;
            slicewidth.value = Math.max(MIN_SLICEWIDTH, Math.min(parseInt(slicewidth.value, 10), maxWidth));

            counterVal.textContent = slicecount;
            counterMax.textContent = counter.max;
            slicewidthMax.textContent = slicewidth.max;
            slicewidthVal.textContent = slicewidth.value;
            drawCurves(slicecount, slicewidth.value);
        }
    })
    slicewidth.addEventListener('input', () => {
        const slicewidthN = parseInt(slicewidth.value, 10);

        if (!isNaN(slicewidthN) && slicewidthN >= MIN_SLICEWIDTH) {
            const maxCount = Math.floor(360 / (slicewidthN + MIN_GAP));

            counter.max = maxCount;
            counter.value = Math.max(MIN_SLICECOUNT, Math.min(parseInt(counter.value, 10), maxCount));

            counterVal.textContent = counter.value;
            counterMax.textContent = maxCount;
            slicewidthMax.textContent = slicewidth.max;
            slicewidthVal.textContent = slicewidthN;
            drawCurves(counter.value, slicewidthN);
        }
    })
    //counter and width handling

    counter.dispatchEvent(new Event('input'));


    function drawCurves(sliceCount = MIN_SLICECOUNT, sliceWidth = MIN_SLICEWIDTH) {
        gl.clearRect(0, 0, w, h);

        gl.save(); // Save canvas state
        gl.translate(centerx, centery);
        gl.rotate(degToRad(rotation));
        gl.translate(-centerx, -centery); // Rotate around center

        const gap = (360 - (sliceCount * sliceWidth)) / sliceCount;
        console.log('gap', gap)
        let i = 0;
        let x = 360;
        let offset = 100;


        while (i < x) {

            let [endx, endy] = circumferencePoint(i); //end points of curve1
            let [endx2, endy2] = circumferencePoint(i + parseInt(sliceWidth, 10)) // end points of curve 2

            let [cpx, cpy] = calcControlPoints(endx, endy, offset);
            let [cpx2, cpy2] = calcControlPoints(endx2, endy2, offset);

            gl.beginPath();
            gl.moveTo(centerx, centery);
            gl.quadraticCurveTo(cpx, cpy, endx, endy);

            gl.arc(centerx, centery, centerx, degToRad(i), degToRad(i + parseInt(sliceWidth, 10)), false);
            gl.quadraticCurveTo(cpx2, cpy2, centerx, centery);
            gl.fill();
            i += (parseInt(sliceWidth, 10) + gap);
        }
        gl.restore();
    }

    //
    function circumferencePoint(deg) { // get the coordinates of a point on the circumference at given angle
        // x = h + r * cos(θ) and y = k + r * sin(θ)
        const x = centerx + centerx * Math.cos(degToRad(deg))
        const y = centery + centerx * Math.sin(degToRad(deg))
        return [x, y]
    }

    function degToRad(deg) {
        return deg * Math.PI / 180
    }

    function calcControlPoints(endx, endy, offset) {
        let midx = (centerx + endx) / 2;
        let midy = (centery + endy) / 2;
        let dx = endx - centerx;
        let dy = endy - centery;
        let length = Math.hypot(dx, dy);
        let nx = -dy / length;
        let ny = dx / length;
        let cpx = midx + nx * offset;
        let cpy = midy + ny * offset;
        return [cpx, cpy];
    }

})


//TODO
//[ ] reduce draw calcs
//[ ] controls for curve