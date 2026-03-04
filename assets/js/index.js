// =============================
// INTRO 3D
// =============================

const introContainer = document.getElementById("intro-3d");

if (introContainer) {

  const introScene = new THREE.Scene();

  const introCamera = new THREE.PerspectiveCamera(
    75,
    introContainer.clientWidth / introContainer.clientHeight,
    0.1,
    1000
  );

  const introRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  introRenderer.setSize(introContainer.clientWidth, introContainer.clientHeight);
  introRenderer.setPixelRatio(window.devicePixelRatio);
  introContainer.appendChild(introRenderer.domElement);

  introCamera.position.z = 3;

  const geometry = new THREE.IcosahedronGeometry(1, 1);

  const material = new THREE.MeshBasicMaterial({
    color: 0xaaaaaa,
    wireframe: true
  });

  const sphere = new THREE.Mesh(geometry, material);
  introScene.add(sphere);

  function animateIntro() {
    requestAnimationFrame(animateIntro);
    sphere.rotation.x += 0.008;
    sphere.rotation.y += 0.008;
    introRenderer.render(introScene, introCamera);
  }

  animateIntro();
}


// =============================
// LOADER EXIT
// =============================

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("loader-hide");
  }, 2500);
});


// =============================
// 3D PARTICLE BACKGROUND
// =============================

const canvas = document.getElementById("bg-canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

camera.position.z = 5;

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 25;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  color: 0x888888
});

const particlesMesh = new THREE.Points(
  particlesGeometry,
  particlesMaterial
);

scene.add(particlesMesh);

function animate() {
  requestAnimationFrame(animate);
  particlesMesh.rotation.y += 0.0004;
  particlesMesh.rotation.x += 0.0002;
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// =============================
// REVEAL ANIMATION
// =============================

const revealElements = document.querySelectorAll("video, img, h2");

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
    }
  });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));
