window.onload = () => {
const canvas = document.querySelector('#glCanvas');
const [w, h] = [canvas.width, canvas.height];
const gl = canvas.getContext('2d');

// gl.clearColor(1.0,0.0,0.0,1.0);
// gl.clear(gl.COLOR_BUFFER_BIT);

gl.beginPath();
// gl.lineTo(100, 75);
// gl.lineTo(100, 25);



gl.arc(w/2, h/2, w/2,degToRad(-90),degToRad(0),false);
gl.moveTo(w/2,h);
gl.arc(w/2, h/2, w/2,degToRad(90),degToRad(180),false);
gl.stroke();

// gl.closePath();
// gl.fill();
}

function degToRad(deg) {
    return deg*Math.PI/180
}