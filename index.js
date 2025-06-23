window.onload = () => {
const canvas = document.querySelector('#glCanvas');
const [w, h] = [canvas.width, canvas.height];
const [centerx, centery] = [w/2, h/2];
const gl = canvas.getContext('2d');

// gl.beginPath();
// // gl.lineTo(100, 75);
// // gl.lineTo(100, 25);



// gl.arc(centerx, centery, centerx,degToRad(-90),degToRad(0),false);
// gl.stroke();
// // gl.moveTo(centerx,h);
// gl.beginPath();
// gl.arc(centerx, centery, centerx,degToRad(90),degToRad(180),false);
// gl.stroke();

// gl.beginPath()
// gl.moveTo(centerx,centery);
// let [endx,endy] = circumferencePoint(45);
// gl.quadraticCurveTo(centerx-50, centery+50, endx, endy);
// gl.stroke()


function drawCurves() {
    //
    let i=0;
    let x=360;
    let offset = 100;
    let sliceWidth = 10;
    while (i < x) {
        

        let [endx,endy] = circumferencePoint(i); //end points of curve1
        let [endx2, endy2] = circumferencePoint(i+sliceWidth) // end points of curve 2
        
        //calc midpoints of curves 1,2
        let midx=(centerx+endx)/2; 
        let midx2=(centerx+endx2)/2; 
        let midy=(centery+endy)/2;
        let midy2=(centery+endy2)/2;
        
        //vec
        let dx = endx-centerx;
        let dy = endy-centery;
        let dx2 = endx2-centerx;
        let dy2 = endy2-centery;

        // console.log(dx, dy)
        
        //norm
        let length = Math.hypot(dx,dy);
        let length2 = Math.hypot(dx2,dy2);
        //alternatively: (centerx === radius)
        // let length = centerx;
        let nx = -dy/length;
        let nx2 = -dy2/length2;
        let ny = dx/length;
        let ny2 = dx2/length2;
        // console.log(nx)
        let cpx = midx+nx * offset;
        let cpx2 = midx2+nx2 * offset;
        let cpy = midy+ny * offset;
        let cpy2 = midy2+ny2 * offset;

        gl.beginPath();
        gl.moveTo(centerx,centery);
        gl.quadraticCurveTo(cpx, cpy, endx, endy);
        
        gl.arc(centerx, centery, centerx,degToRad(i),degToRad(i+sliceWidth),false);
        gl.quadraticCurveTo(cpx2, cpy2, centerx, centery);
        gl.fill();
        i += 45;
    }
}
drawCurves();

function circumferencePoint(deg) { // get the coordinates of a point on the circumference at given angle
    // x = h + r * cos(θ) and y = k + r * sin(θ)
    const x = centerx + centerx * Math.cos(degToRad(deg))
    const y = centery + centerx * Math.sin(degToRad(deg))
    return [x,y]
}
function degToRad(deg) {
    return deg*Math.PI/180
}


}
