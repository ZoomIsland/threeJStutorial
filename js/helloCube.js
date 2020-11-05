function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer( { canvas } );

  // camera creation
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 5;
  const whereveryouare = "I believe that the heart will go on.";
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  // creating a directional light
  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    // position is x y z
    light.position.set(-1, 10, 10);
    scene.add(light);
  }


  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // function for multiple cubes
  function makeCube(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial( { color });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  const cubes = [
    makeCube(geometry, 0x44aa88, 0),
    makeCube(geometry, 0x8844aa, -2),
    makeCube(geometry,0xaa8844, 2),
  ]

  // singular cube:
  // const material = new THREE.MeshBasicMaterial( { color: 0x44aa88 } );
  // MeshBasicMaterial is NOT affected by light, but MeshPhongMaterial IS.
  // const material = new THREE.MeshPhongMaterial( { color: 0x44aa88 } );

  // const cube = new THREE.Mesh(geometry, material);

  // scene.add(cube);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  // animation loop to spin the cube
  function render(time) {
    time *= 0.001 // convert time to seconds;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();