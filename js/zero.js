function main() {
  const canvas = document.querySelector("#c")
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 40;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 100;
  camera.position.y = 15;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xAAAAAA);

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }
  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(1, -2, -4);
    scene.add(light);
  }

  const objects = [];
  // const spread = 15;
  
  function addObject(x, y, obj) {
    obj.position.x = x;
    obj.position.y = y;
  
    scene.add(obj);
    objects.push(obj);
  }

  function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
      // only necessary if both sides are actually visible
      // faster draw without.
      side: THREE.DoubleSide,
    });
  
    const hue = Math.random();
    const saturation = 1;
    const luminance = .5;
    material.color.setHSL(hue, saturation, luminance);
  
    return material;
  }

  function addSolidGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
  }
  // {
  //   const width = 8;
  //   const height = 8;
  //   const depth = 8;
  //   addSolidGeometry(-2, -2, new THREE.BoxBufferGeometry(width, height, depth));
  // }
  {
    const radiusTop = 4;
    const radiusBottom = 8;
    const height = 10;
    const radialSegments = 12;
    addSolidGeometry(0,0, new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments
    ));
  }
  {
    const radius = 4;
    const height = 9;
    const radialSegments = 12;
    const heightSegments = 1;
    const openEnded = true;
    const thetaStart = Math.PI * 0;
    const thetaLength = Math.PI * 1.85;
    addSolidGeometry(0, 9.5, new THREE.ConeBufferGeometry(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength));
  }

  // renderer
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
  function render() {
    // time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    // objects.forEach((obj, ndx) => {
    //   const speed = .1 + ndx * .05;
    //   const rot = time * speed;
    //   obj.rotation.x = rot;
    //   obj.rotation.y = rot;
    // });

    
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  
  requestAnimationFrame(render);
}
 
main();





