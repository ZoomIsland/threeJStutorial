function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setClearColor(0xAAAAAA);
  renderer.shadowMap.enabled = true;

  // camera
  const fov = 40;
  const aspect = 2;
  const zNear = 0.1;
  const zFar = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);

  camera.position.set(0, 10, 25).multiplyScalar(3);
  camera.lookAt(0,0,0);

  controls = new THREE.OrbitControls (camera, renderer.domElement);
  controls.update();

  const scene = new THREE.Scene();

  // light
  {
    const light = new THREE.DirectionalLight(0xffffff, 1);
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
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 50;
  light.shadow.bias = 0.001;
  }

  // Materials
  const groundMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
  const pillarMaterial = new THREE.MeshPhongMaterial({ color: 0x6688AA });
  const backgroundMaterial = new THREE.MeshPhongMaterial({ color: 0x6688AA });
  const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 });

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
  fpLeftMesh.position.z = -5;
  fpLeftMesh.rotation.y = Math.PI * .5;
  fpLeftMesh.castShadow = true;
  fpLeftMesh.receiveShadow = true;
  fpRightMesh.position.x = 12;
  fpRightMesh.position.y = 10;
  fpRightMesh.position.z = -5;
  fpRightMesh.rotation.y = Math.PI * -.5;
  fpRightMesh.castShadow = true;
  fpRightMesh.receiveShadow = true;
  fireplace.add(fpBackMesh);
  fireplace.add(fpLeftMesh);
  fireplace.add(fpRightMesh);



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
  wallMeshRight.receiveShadow = true;
  wall.add(wallMeshLeft);
  wall.add(wallMeshRight);
  // wall above
  const wallUpperHeight = 8;
  const wallUpperWidth = 36;
  const wallUpperGeo = new THREE.PlaneBufferGeometry(wallUpperWidth, wallUpperHeight);
  const wallMeshUpper = new THREE.Mesh(wallUpperGeo, wallMaterial);
  wallMeshUpper.position.y = 20;
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