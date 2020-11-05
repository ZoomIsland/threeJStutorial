function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setClearColor(0xAAAAAA);
  renderer.shadowMap.enabled = true;

  function makeCamera(fov = 40) {
    const aspect = 2;
    const zNear = 0.1;
    const zFar = 1000;
    return new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
  }
  const camera = makeCamera();
  camera.position.set(0, 0, 50).multiplyScalar(3);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();

  {
    const light = new THREE.DirectionalLight(0xfffffff, 1);
    light.position.set(0,20,0);
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
  {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1,2,4);
    scene.add(light);
  }
  let spheres = [];

  function makeSphere(row, column, color) {
    const sphereGeometry = new THREE.SphereBufferGeometry( 5, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: color });
    const sphere = new THREE.Mesh( sphereGeometry, material );
    function rowColumnGen(row) {
      if (row === 0) {
        return -30;
      } else if (row === 1) {
        return -10;
      } else if (row === 2) {
        return 10;
      } else {
        return 30;
      }
    }
    sphere.position.x = rowColumnGen(row);
    sphere.position.y = rowColumnGen(column);
    scene.add(sphere);
    spheres.push(sphere);
  }
  for (let i = 0; i < 16; i++) {
    let row = Math.floor( i / 4);
    let column = i % 4;
    makeSphere(row, column, 0x44aa88)
  }




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

  const cameras = [
    { cam: camera, desc: 'detached camera'}
  ];

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      cameras.forEach((cameraInfo) => {
        const camera = cameraInfo.cam;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      });
    }

    const camera = cameras[0];

    renderer.render(scene, camera.cam);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
main();