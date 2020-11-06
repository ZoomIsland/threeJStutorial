function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setClearColor(0xAAAAAA);
  renderer.shadowMap.enabled = true;

  // camera
  const fov = 75;
  const aspect = 2;
  const zNear = 0.1;
  const zFar = 500;
  const camera = new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);

  camera.position.set(0, 15, 25).multiplyScalar(3);
  camera.lookAt(0,12,0);

  controls = new THREE.OrbitControls (camera, renderer.domElement);
  controls.update();

  const scene = new THREE.Scene();

  // light
  {
    const light = new THREE.DirectionalLight(0xffffff, .75);
  light.position.set(-20, 20, 30);
  scene.add(light);
  light.castShadow = true;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;

  const d = 50;
  light.shadow.camera.left = -d;
  light.shadow.camera.right = d;
  light.shadow.camera.top = d;
  light.shadow.camera.bottom = -d;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 500;
  light.shadow.bias = 0.001;
  }

  // Materials
  const groundMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
  const pillarMaterial = new THREE.MeshPhongMaterial({ color: 0x6688AA });
  const backgroundMaterial = new THREE.MeshPhongMaterial({ color: 0x6688AA });
  const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
  const greenStocking = new THREE.MeshPhongMaterial({color: "green"});
  const redStocking = new THREE.MeshPhongMaterial({color: "red"});
  const purpleStocking = new THREE.MeshPhongMaterial({color: "rebeccapurple"});
  const orangeStocking = new THREE.MeshPhongMaterial({color: "orange"});

  //floor
  const groundGeometry = new THREE.PlaneBufferGeometry(50, 50);
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.rotation.x = Math.PI * -.5;
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);

  //fireplace
  const fireplace = new THREE.Object3D();
  scene.add(fireplace);

  // pillars
  const pillarRadius = 2;
  const pillarHeight = 16;
  const pillarRadialSegments = 12;
  const pillarGeometry = new THREE.CylinderBufferGeometry(
    pillarRadius, pillarRadius, pillarHeight, pillarRadialSegments
  );
  const pillarMeshOne = new THREE.Mesh(pillarGeometry, pillarMaterial);
  const pillarMeshTwo = new THREE.Mesh(pillarGeometry, pillarMaterial);
  pillarMeshOne.position.x = -12;
  pillarMeshTwo.position.x = 12;
  pillarMeshOne.position.y = 8;
  pillarMeshTwo.position.y = 8;
  pillarMeshOne.castShadow = true;
  pillarMeshTwo.castShadow = true;
  fireplace.add(pillarMeshOne);
  fireplace.add(pillarMeshTwo);
  // mantle
  const mantleWidth = 30;
  const mantleHeight = 4;
  const mantleDepth = 8;
  const mantleGeometry = new THREE.BoxBufferGeometry(mantleWidth, mantleHeight, mantleDepth);
  const mantleMesh = new THREE.Mesh(mantleGeometry, pillarMaterial);
  mantleMesh.position.y = 16;
  mantleMesh.castShadow = true;
  fireplace.add(mantleMesh);
  // base
  const baseWidth = 30;
  const baseHeight = 1;
  const baseDepth = 10;
  const baseGeo = new THREE.BoxBufferGeometry(baseWidth, baseHeight, baseDepth);
  const baseMesh = new THREE.Mesh(baseGeo, pillarMaterial);
  baseMesh.position.z = -5.01;
  baseMesh.position.y = .5;
  baseMesh.receiveShadow = true;
  fireplace.add(baseMesh);
  // fireplace background
  const fpBackgroundHeight = 20;
  const fpBackgroundWidth = 24;
  const fpBackgroundDepth = 10;
  const fpBackGeo = new THREE.PlaneBufferGeometry(fpBackgroundWidth, fpBackgroundHeight);
  const fpBackMesh = new THREE.Mesh(fpBackGeo, backgroundMaterial);
  const fpSideGeo = new THREE.PlaneBufferGeometry(fpBackgroundDepth, fpBackgroundHeight);
  const fpLeftMesh = new THREE.Mesh(fpSideGeo, backgroundMaterial);
  const fpRightMesh = new THREE.Mesh(fpSideGeo, backgroundMaterial);
  fpBackMesh.position.z = -10;
  fpBackMesh.position.y = 10;
  fpBackMesh.receiveShadow = true;
  fpLeftMesh.position.x = -12;
  fpLeftMesh.position.y = 10;
  fpLeftMesh.position.z = -6;
  fpLeftMesh.rotation.y = Math.PI * .5;
  fpLeftMesh.castShadow = true;
  fpLeftMesh.receiveShadow = true;
  fpRightMesh.position.x = 12;
  fpRightMesh.position.y = 10;
  fpRightMesh.position.z = -6;
  fpRightMesh.rotation.y = Math.PI * -.5;
  fpRightMesh.castShadow = true;
  fpRightMesh.receiveShadow = true;
  fireplace.add(fpBackMesh);
  fireplace.add(fpLeftMesh);
  fireplace.add(fpRightMesh);

  
  
  
  // stockings
  const shape = new THREE.Shape();
  shape.moveTo(0, -2); // cp 0, 0
  shape.lineTo(0, 4);
  shape.bezierCurveTo(.5, 5, 1.5, 6, 2, 6); // cp 2, 6
  shape.lineTo(4, 6);
  shape.bezierCurveTo(4.5, 6, 5.5, 5, 6, 4);
  shape.bezierCurveTo(6, 3.5, 5, 2.5, 4, 2);
  shape.lineTo(4, -2);
  shape.lineTo(0, -2);
  const extrudeSettings = {
    steps: 1,
    depth: 2,
    bevelEnabled: true,
    bevelThickness: 0.33,
    bevelSize: .75,
    bevelSegments: 2
  }
  const stockingGeo = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
  const stockingOne = new THREE.Mesh(stockingGeo, greenStocking);
  const stockingTwo = new THREE.Mesh(stockingGeo, redStocking);
  const stockingThree = new THREE.Mesh(stockingGeo, purpleStocking);
  const stockingFour = new THREE.Mesh(stockingGeo, orangeStocking);
  stockingOne.scale.set(.7, .7, .7);
  stockingOne.rotation.z = Math.PI * 1.1;
  stockingOne.position.y = 14;
  stockingOne.position.z = 4;
  stockingOne.position.x = -2;
  stockingOne.castShadow = true;
  stockingTwo.scale.set(.7, .7, .7);
  stockingTwo.rotation.z = Math.PI * 1.15;
  stockingTwo.position.y = 14;
  stockingTwo.position.z = 4;
  stockingTwo.position.x = -9;
  stockingTwo.castShadow = true;
  stockingThree.scale.set(.7, .7, .7);
  stockingThree.rotation.z = Math.PI * 1.07;
  stockingThree.position.y = 14;
  stockingThree.position.z = 4;
  stockingThree.position.x = 5;
  stockingThree.castShadow = true;
  stockingFour.scale.set(.7, .7, .7);
  stockingFour.rotation.z = Math.PI * 1.12;
  stockingFour.position.y = 14;
  stockingFour.position.z = 4;
  stockingFour.position.x = 11;
  stockingFour.castShadow = true;
  fireplace.add(stockingOne);
  fireplace.add(stockingTwo);
  fireplace.add(stockingThree);
  fireplace.add(stockingFour);
  
  // fire
  const fire = new THREE.Object3D();
  fire.position.y = 2;
  fire.position.z = -5;
  fireplace.add(fire);
  // logs
  const logRadius = 1;
  const logHeight = 10;
  const logRadialSegments = 12;
  const logGeo = new THREE.CylinderBufferGeometry(logRadius, logRadius, logHeight, logRadialSegments);
  const logMaterial = new THREE.MeshPhongMaterial({color: "brown"});
  const logOne = new THREE.Mesh(logGeo, logMaterial);
  const logTwo = new THREE.Mesh(logGeo, logMaterial);
  const logThree = new THREE.Mesh(logGeo, logMaterial);
  logOne.rotation.z = Math.PI * .5;
  logTwo.rotation.z = Math.PI * .5;
  logThree.rotation.z = Math.PI * .5;
  logTwo.position.z = -2;
  logThree.position.z = -1;
  logThree.position.y = 1.6666;
  logOne.castShadow = true;
  logTwo.castShadow = true;
  logThree.castShadow = true;
  fire.add(logOne);
  fire.add(logTwo);
  fire.add(logThree);
  // flames
  const flameShape = new THREE.Shape();
  flameShape.moveTo(0, 0);
  flameShape.bezierCurveTo(-.5, 0, -2, 1.5, -2, 2);
  flameShape.lineTo(-2, 4);
  flameShape.bezierCurveTo(-1.5, 4.5, -1, 5.5, -1, 6);
  flameShape.bezierCurveTo(-1, 7, -1.5, 8, -1.5, 8);
  flameShape.lineTo(-.5, 7);
  flameShape.bezierCurveTo(-.5, 6.5, -1, 5.5, -1, 5);
  flameShape.bezierCurveTo(-1, 4.2, 0, 4.2, 0, 4);
  flameShape.bezierCurveTo(.5, 4, 1, 2, 1, 2);
  flameShape.bezierCurveTo(1, 1.2, .8, .8, 0, 0);
  const flameExtrusion = {
    steps: 1,
    depth: 1,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 2,
    bevelSegments: 10
  }
  const flameGeo = new THREE.ExtrudeBufferGeometry(flameShape, flameExtrusion);
  const flameMaterial = new THREE.MeshPhongMaterial({color: "red", emissive: "red"});
  const yellowFlame = new THREE.MeshPhongMaterial({color: "yellow", emissive: "yellow"});
  const flameMesh = new THREE.Mesh(flameGeo, flameMaterial);
  const tinyFlame = new THREE.Mesh(flameGeo, yellowFlame);
  flameMesh.scale.set(.5,.5,.5);
  flameMesh.position.y = 1.5;
  flameMesh.position.x = -.2;
  tinyFlame.scale.set(.2,.2,.2);
  tinyFlame.position.y = 1.5;
  tinyFlame.position.z = 1;
  fire.add(flameMesh);
  fire.add(tinyFlame);
  //fire light
  const fireLight = new THREE.DirectionalLight("red", 1);
  fireLight.position.set(0, 0, 0);
  fireLight.target = stockingTwo;
  fireLight.shadow.mapSize.width = 2048;
  fireLight.shadow.mapSize.height = 2048;

  const d = 50;
  fireLight.shadow.camera.left = -d;
  fireLight.shadow.camera.right = d;
  fireLight.shadow.camera.top = d;
  fireLight.shadow.camera.bottom = -d;
  fireLight.shadow.camera.near = 0.1;
  fireLight.shadow.camera.far = 500;
  fireLight.shadow.bias = 0.001;
  fireLight.castShadow = true;
  fire.add(fireLight);
  
  // walls
  const wall = new THREE.Object3D();
  scene.add(wall);
  // left and right wall
  const wallHeight = 24;
  const wallWidth = 12;
  const wallGeo = new THREE.PlaneBufferGeometry(wallWidth, wallHeight);
  const wallMeshLeft = new THREE.Mesh(wallGeo, wallMaterial);
  const wallMeshRight = new THREE.Mesh(wallGeo, wallMaterial);
  wallMeshLeft.position.x = -19;
  wallMeshRight.position.x = 19;
  wallMeshLeft.position.y = 12;
  wallMeshRight.position.y = 12;
  wallMeshLeft.receiveShadow = true;
  wallMeshLeft.castShadow = true;
  wallMeshRight.receiveShadow = true;
  wallMeshRight.castShadow = true;
  wall.add(wallMeshLeft);
  wall.add(wallMeshRight);
  // wall above
  const wallUpperHeight = 8;
  const wallUpperWidth = 36;
  const wallUpperGeo = new THREE.PlaneBufferGeometry(wallUpperWidth, wallUpperHeight);
  const wallMeshUpper = new THREE.Mesh(wallUpperGeo, wallMaterial);
  wallMeshUpper.position.y = 20;
  wallMeshUpper.receiveShadow = true;
  wallMeshUpper.castShadow = true;
  wall.add(wallMeshUpper);



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

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
main();