window.onload = () => {const canvas = document.querySelector('#glCanvas');
const gl = canvas.getContext('webgl');

gl.clearColor(1.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);}