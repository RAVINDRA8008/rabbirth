import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { sounds } from '../utils/soundEffects';

export default function ThreeCanvas({
  stage = 1,
  candleBlown = false,
  cakeCut = false,
  onBalloonPopped,
  onCandleClick,
  onCakeClick,
}) {
  const mountRef = useRef(null);
  const candleBlownRef = useRef(candleBlown);
  const cakeCutRef = useRef(cakeCut);
  const stageRef = useRef(stage);

  // Keep refs synchronized with props so animation loop and event handlers always have fresh values
  useEffect(() => {
    candleBlownRef.current = candleBlown;
  }, [candleBlown]);

  useEffect(() => {
    cakeCutRef.current = cakeCut;
  }, [cakeCut]);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 7.2); // Start with entrance angle

    // 3. Renderer with ACES Filmic Tone Mapping & Soft Shadows
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Orbit Controls with Gentle Damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0, 0.5, 0);
    controls.maxDistance = 9.5;
    controls.minDistance = 2.8;
    controls.maxPolarAngle = Math.PI / 1.85;
    controls.minPolarAngle = Math.PI / 6;
    controls.enablePan = false;

    // 5. Studio Softbox Lighting - Warm Luxury Gala Atmosphere
    const ambientLight = new THREE.AmbientLight(0xfff6f0, 2.1);
    scene.add(ambientLight);

    // Key Light (Warm Tungsten Spotlight)
    const keyLight = new THREE.DirectionalLight(0xfffaec, 3.5);
    keyLight.position.set(5.5, 8.5, 5.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0008;
    scene.add(keyLight);

    // Rim Light (Rose/Champagne bounce for gloss highlights)
    const rimLight1 = new THREE.DirectionalLight(0xffc5d9, 2.4);
    rimLight1.position.set(-6, 5, -4);
    scene.add(rimLight1);

    // Rim Light 2 (Warm Golden Shimmer from opposite back)
    const rimLight2 = new THREE.DirectionalLight(0xffd166, 1.8);
    rimLight2.position.set(4, 4, -5);
    scene.add(rimLight2);

    // Bottom Fill Light
    const fillLight = new THREE.DirectionalLight(0xffece5, 1.1);
    fillLight.position.set(0, -3, 4);
    scene.add(fillLight);

    // 6. Textures & Materials
    // Procedural noise bump for velvety buttercream texture
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = 256;
    noiseCanvas.height = 256;
    const nCtx = noiseCanvas.getContext('2d');
    for (let x = 0; x < 256; x++) {
      for (let y = 0; y < 256; y++) {
        const val = Math.floor(Math.random() * 45 + 210);
        nCtx.fillStyle = `rgb(${val},${val},${val})`;
        nCtx.fillRect(x, y, 1, 1);
      }
    }
    const noiseTex = new THREE.CanvasTexture(noiseCanvas);
    noiseTex.wrapS = THREE.RepeatWrapping;
    noiseTex.wrapT = THREE.RepeatWrapping;
    noiseTex.repeat.set(6, 6);

    // Velvet Vanilla Buttercream
    const buttercreamMat = new THREE.MeshStandardMaterial({
      color: 0xfffcf7,
      roughness: 0.42,
      metalness: 0.02,
      bumpMap: noiseTex,
      bumpScale: 0.015,
    });

    // Strawberry Rose Buttercream
    const strawberryMousseMat = new THREE.MeshStandardMaterial({
      color: 0xfdbbc6,
      roughness: 0.38,
      metalness: 0.03,
      bumpMap: noiseTex,
      bumpScale: 0.012,
    });

    // Strawberry Mirror Glaze Drip
    const glazeMat = new THREE.MeshPhysicalMaterial({
      color: 0xd90429,
      roughness: 0.1,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.96,
    });

    // 24K Edible Gold Leaf
    const goldLeafMat = new THREE.MeshStandardMaterial({
      color: 0xf5d77f,
      roughness: 0.15,
      metalness: 0.98,
    });

    // Fluted Fine Bone Porcelain Stand
    const porcelainMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.16,
      metalness: 0.04,
      clearcoat: 0.9,
      reflectivity: 0.92,
    });

    // Cake Interior Slice Cut Texture (Sponge chiffon + strawberry coulis + chantilly cream)
    const crumbCanvas = document.createElement('canvas');
    crumbCanvas.width = 256;
    crumbCanvas.height = 256;
    const cCtx = crumbCanvas.getContext('2d');
    // Golden fluffy sponge background
    cCtx.fillStyle = '#FCEADE';
    cCtx.fillRect(0, 0, 256, 256);
    // Moist cake sponge crumbs
    for (let i = 0; i < 4000; i++) {
      const cx = Math.random() * 256;
      const cy = Math.random() * 256;
      const r = Math.random() * 1.5;
      cCtx.fillStyle = Math.random() > 0.5 ? '#F3D5B5' : '#E7BC91';
      cCtx.beginPath();
      cCtx.arc(cx, cy, r, 0, Math.PI * 2);
      cCtx.fill();
    }
    // Strawberry coulis stripes (Layer 1 & 2)
    cCtx.fillStyle = '#C9184A';
    cCtx.fillRect(0, 75, 256, 22);
    cCtx.fillRect(0, 160, 256, 22);
    // Whipped chantilly cream borders
    cCtx.fillStyle = '#FFFDF9';
    cCtx.fillRect(0, 70, 256, 5);
    cCtx.fillRect(0, 97, 256, 5);
    cCtx.fillRect(0, 155, 256, 5);
    cCtx.fillRect(0, 182, 256, 5);
    const crumbTex = new THREE.CanvasTexture(crumbCanvas);
    crumbTex.wrapS = THREE.ClampToEdgeWrapping;
    crumbTex.wrapT = THREE.ClampToEdgeWrapping;

    const interiorCrumbMat = new THREE.MeshStandardMaterial({
      map: crumbTex,
      roughness: 0.65,
      metalness: 0.01,
      bumpMap: noiseTex,
      bumpScale: 0.03,
    });

    // 7. Master Cake Group & Splittable Slice Structure
    const masterCakeGroup = new THREE.Group();
    scene.add(masterCakeGroup);

    // Cake Stand
    const standGroup = new THREE.Group();
    masterCakeGroup.add(standGroup);

    const standBaseGeo = new THREE.CylinderGeometry(1.45, 1.85, 0.14, 64);
    const standBase = new THREE.Mesh(standBaseGeo, porcelainMat);
    standBase.position.y = -0.92;
    standBase.receiveShadow = true;
    standGroup.add(standBase);

    const goldRingGeo = new THREE.TorusGeometry(1.86, 0.025, 16, 64);
    const goldRing = new THREE.Mesh(goldRingGeo, goldLeafMat);
    goldRing.position.y = -0.98;
    goldRing.rotation.x = Math.PI / 2;
    standGroup.add(goldRing);

    const stemGeo = new THREE.CylinderGeometry(0.38, 0.55, 0.45, 48);
    const stem = new THREE.Mesh(stemGeo, porcelainMat);
    stem.position.y = -0.65;
    standGroup.add(stem);

    const platterGeo = new THREE.CylinderGeometry(2.25, 2.25, 0.12, 64);
    const platter = new THREE.Mesh(platterGeo, porcelainMat);
    platter.position.y = -0.38;
    platter.receiveShadow = true;
    standGroup.add(platter);

    const platterGoldGeo = new THREE.TorusGeometry(2.26, 0.022, 16, 64);
    const platterGold = new THREE.Mesh(platterGoldGeo, goldLeafMat);
    platterGold.position.y = -0.32;
    platterGold.rotation.x = Math.PI / 2;
    standGroup.add(platterGold);

    // --- Interactive Splittable Cake Geometry ---
    // Cut angle wedge: 45 degrees (PI / 4) centered at angle Math.PI * 1.85
    const sliceAngle = Math.PI * 0.25; // 45 degrees
    const sliceStartAngle = Math.PI * 1.75; // 315 deg to 360 deg
    const mainArcLength = Math.PI * 2 - sliceAngle; // 315 degrees

    const cakeMainBodyGroup = new THREE.Group();
    const cakeSliceGroup = new THREE.Group();
    masterCakeGroup.add(cakeMainBodyGroup);
    masterCakeGroup.add(cakeSliceGroup);

    // Tier 1 Main (315° Arc)
    const tier1MainGeo = new THREE.CylinderGeometry(1.75, 1.75, 0.8, 48, 1, false, 0, mainArcLength);
    const tier1Main = new THREE.Mesh(tier1MainGeo, buttercreamMat);
    tier1Main.position.y = 0.08;
    tier1Main.castShadow = true;
    tier1Main.receiveShadow = true;
    cakeMainBodyGroup.add(tier1Main);

    // Tier 1 Cut Wedge (45° Arc)
    const tier1SliceGeo = new THREE.CylinderGeometry(1.75, 1.75, 0.8, 16, 1, false, sliceStartAngle, sliceAngle);
    const tier1Slice = new THREE.Mesh(tier1SliceGeo, buttercreamMat);
    tier1Slice.position.y = 0.08;
    tier1Slice.castShadow = true;
    tier1Slice.receiveShadow = true;
    cakeSliceGroup.add(tier1Slice);

    // Cross-Section Cap Planes for Tier 1 (Reveals interior layers when cut)
    // Left cut face
    const cap1LeftGeo = new THREE.PlaneGeometry(1.75, 0.8);
    cap1LeftGeo.translate(1.75 / 2, 0, 0);
    const cap1Left = new THREE.Mesh(cap1LeftGeo, interiorCrumbMat);
    cap1Left.position.y = 0.08;
    cap1Left.rotation.y = 0; // along X axis at angle 0
    cakeMainBodyGroup.add(cap1Left);

    // Right cut face on main body
    const cap1RightGeo = new THREE.PlaneGeometry(1.75, 0.8);
    cap1RightGeo.translate(1.75 / 2, 0, 0);
    const cap1Right = new THREE.Mesh(cap1RightGeo, interiorCrumbMat);
    cap1Right.position.y = 0.08;
    cap1Right.rotation.y = mainArcLength;
    cakeMainBodyGroup.add(cap1Right);

    // Slice Left & Right Caps
    const sliceCap1Left = new THREE.Mesh(cap1LeftGeo, interiorCrumbMat);
    sliceCap1Left.position.y = 0.08;
    sliceCap1Left.rotation.y = sliceStartAngle;
    cakeSliceGroup.add(sliceCap1Left);

    const sliceCap1Right = new THREE.Mesh(cap1RightGeo, interiorCrumbMat);
    sliceCap1Right.position.y = 0.08;
    sliceCap1Right.rotation.y = sliceStartAngle + sliceAngle;
    cakeSliceGroup.add(sliceCap1Right);

    // --- Tier 2 Main & Slice (Top Tier) ---
    const tier2MainGeo = new THREE.CylinderGeometry(1.15, 1.15, 0.7, 48, 1, false, 0, mainArcLength);
    const tier2Main = new THREE.Mesh(tier2MainGeo, strawberryMousseMat);
    tier2Main.position.y = 0.82;
    tier2Main.castShadow = true;
    tier2Main.receiveShadow = true;
    cakeMainBodyGroup.add(tier2Main);

    const tier2SliceGeo = new THREE.CylinderGeometry(1.15, 1.15, 0.7, 16, 1, false, sliceStartAngle, sliceAngle);
    const tier2Slice = new THREE.Mesh(tier2SliceGeo, strawberryMousseMat);
    tier2Slice.position.y = 0.82;
    tier2Slice.castShadow = true;
    tier2Slice.receiveShadow = true;
    cakeSliceGroup.add(tier2Slice);

    // Cross-Section Cap Planes for Tier 2
    const cap2LeftGeo = new THREE.PlaneGeometry(1.15, 0.7);
    cap2LeftGeo.translate(1.15 / 2, 0, 0);
    const cap2Left = new THREE.Mesh(cap2LeftGeo, interiorCrumbMat);
    cap2Left.position.y = 0.82;
    cakeMainBodyGroup.add(cap2Left);

    const cap2Right = new THREE.Mesh(cap2LeftGeo, interiorCrumbMat);
    cap2Right.position.y = 0.82;
    cap2Right.rotation.y = mainArcLength;
    cakeMainBodyGroup.add(cap2Right);

    const sliceCap2Left = new THREE.Mesh(cap2LeftGeo, interiorCrumbMat);
    sliceCap2Left.position.y = 0.82;
    sliceCap2Left.rotation.y = sliceStartAngle;
    cakeSliceGroup.add(sliceCap2Left);

    const sliceCap2Right = new THREE.Mesh(cap2LeftGeo, interiorCrumbMat);
    sliceCap2Right.position.y = 0.82;
    sliceCap2Right.rotation.y = sliceStartAngle + sliceAngle;
    cakeSliceGroup.add(sliceCap2Right);

    // Piped Shell Rosettes around Tier 1 Base
    const rosetteGeo = new THREE.SphereGeometry(0.085, 16, 16);
    rosetteGeo.scale(1, 0.7, 1.3);
    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * Math.PI * 2;
      const rosette = new THREE.Mesh(rosetteGeo, buttercreamMat);
      const isSlice = angle >= sliceStartAngle || angle <= 0.05;
      rosette.position.set(Math.cos(angle) * 1.78, -0.28, Math.sin(angle) * 1.78);
      rosette.rotation.y = -angle + Math.PI / 2;
      if (isSlice) {
        cakeSliceGroup.add(rosette);
      } else {
        cakeMainBodyGroup.add(rosette);
      }
    }

    // Mirror Glaze Drips
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const isSlice = angle >= sliceStartAngle || angle <= 0.05;
      const dripLength = 0.2 + (Math.sin(i * 3.5) * 0.5 + 0.5) * 0.25;
      const dripGeo = new THREE.ConeGeometry(0.09, dripLength, 16);
      dripGeo.translate(0, -dripLength / 2, 0);
      const drip = new THREE.Mesh(dripGeo, glazeMat);
      drip.position.set(Math.cos(angle) * 1.76, 0.48, Math.sin(angle) * 1.76);
      if (isSlice) {
        cakeSliceGroup.add(drip);
      } else {
        cakeMainBodyGroup.add(drip);
      }
    }

    // Cream Rosettes around Tier 2 Edge
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const isSlice = angle >= sliceStartAngle || angle <= 0.05;
      const rosette = new THREE.Mesh(rosetteGeo, buttercreamMat);
      rosette.position.set(Math.cos(angle) * 1.18, 0.49, Math.sin(angle) * 1.18);
      rosette.rotation.y = -angle + Math.PI / 2;
      if (isSlice) {
        cakeSliceGroup.add(rosette);
      } else {
        cakeMainBodyGroup.add(rosette);
      }
    }

    // Gold Pearls Crown around Tier 2 top
    const pearlGeo = new THREE.SphereGeometry(0.05, 16, 16);
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const isSlice = angle >= sliceStartAngle || angle <= 0.05;
      const pearl = new THREE.Mesh(pearlGeo, goldLeafMat);
      pearl.position.set(Math.cos(angle) * 1.14, 1.18, Math.sin(angle) * 1.14);
      if (isSlice) {
        cakeSliceGroup.add(pearl);
      } else {
        cakeMainBodyGroup.add(pearl);
      }
    }

    // Gourmet Fresh Glazed Strawberries & Blueberries
    const berryMat = new THREE.MeshStandardMaterial({
      color: 0xd90429,
      roughness: 0.22,
      metalness: 0.08,
    });
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x2d6a4f,
      roughness: 0.6,
      side: THREE.DoubleSide,
    });
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const isSlice = angle >= sliceStartAngle || angle <= 0.05;
      const berrySub = new THREE.Group();
      berrySub.position.set(Math.cos(angle) * 0.75, 1.25, Math.sin(angle) * 0.75);

      const berryGeo = new THREE.ConeGeometry(0.14, 0.28, 24);
      berryGeo.scale(1, 1, 0.85);
      const berryMesh = new THREE.Mesh(berryGeo, berryMat);
      berryMesh.rotation.x = Math.PI + 0.2;
      berrySub.add(berryMesh);

      const calyxGeo = new THREE.CircleGeometry(0.12, 5);
      const calyxMesh = new THREE.Mesh(calyxGeo, leafMat);
      calyxMesh.position.y = 0.14;
      calyxMesh.rotation.x = -Math.PI / 2;
      berrySub.add(calyxMesh);

      if (isSlice) {
        cakeSliceGroup.add(berrySub);
      } else {
        cakeMainBodyGroup.add(berrySub);
      }
    }

    // Blueberries
    const blueberryMat = new THREE.MeshStandardMaterial({
      color: 0x1d2d44,
      roughness: 0.35,
    });
    const blueberryGeo = new THREE.SphereGeometry(0.075, 16, 16);
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + 0.4;
      const isSlice = angle >= sliceStartAngle || angle <= 0.05;
      const blueberry = new THREE.Mesh(blueberryGeo, blueberryMat);
      blueberry.position.set(Math.cos(angle) * 0.45, 1.22, Math.sin(angle) * 0.45);
      if (isSlice) {
        cakeSliceGroup.add(blueberry);
      } else {
        cakeMainBodyGroup.add(blueberry);
      }
    }

    // 24K Gold Leaf Flakes
    const goldFlakeGeo = new THREE.PlaneGeometry(0.08, 0.08);
    for (let i = 0; i < 16; i++) {
      const angle = Math.random() * Math.PI * 2;
      const rad = 0.3 + Math.random() * 0.7;
      const flake = new THREE.Mesh(goldFlakeGeo, goldLeafMat);
      flake.position.set(Math.cos(angle) * rad, 1.2, Math.sin(angle) * rad);
      flake.rotation.x = -Math.PI / 2;
      flake.rotation.z = Math.random() * Math.PI;
      cakeMainBodyGroup.add(flake);
    }

    // --- The Birthday Candle ---
    const candleGroup = new THREE.Group();
    candleGroup.position.set(0, 1.18, 0);
    masterCakeGroup.add(candleGroup);

    // Beeswax Candle Taper with Gold Ribbon
    const waxGeo = new THREE.CylinderGeometry(0.09, 0.1, 0.85, 32);
    const waxMat = new THREE.MeshStandardMaterial({
      color: 0xfffcf2,
      roughness: 0.25,
      metalness: 0.05,
    });
    const candleWax = new THREE.Mesh(waxGeo, waxMat);
    candleWax.position.y = 0.42;
    candleWax.castShadow = true;
    candleGroup.add(candleWax);

    const spiralGeo = new THREE.TorusGeometry(0.095, 0.015, 8, 32);
    for (let j = 0; j < 4; j++) {
      const spiral = new THREE.Mesh(spiralGeo, goldLeafMat);
      spiral.position.y = 0.2 + j * 0.15;
      spiral.rotation.x = Math.PI / 3.5;
      candleGroup.add(spiral);
    }

    // Candle Wick (Charred tip)
    const wickGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.14, 12);
    const wickMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const wick = new THREE.Mesh(wickGeo, wickMat);
    wick.position.y = 0.9;
    candleGroup.add(wick);

    // --- Multi-Layer Candle Flame ---
    const flameGroup = new THREE.Group();
    flameGroup.position.set(0, 0.98, 0);
    candleGroup.add(flameGroup);

    // Outer Soft Amber Glow Teardrop
    const outerFlameGeo = new THREE.ConeGeometry(0.08, 0.32, 24);
    outerFlameGeo.translate(0, 0.16, 0);
    const outerFlameMat = new THREE.MeshBasicMaterial({
      color: 0xff9900,
      transparent: true,
      opacity: 0.85,
    });
    const outerFlame = new THREE.Mesh(outerFlameGeo, outerFlameMat);
    flameGroup.add(outerFlame);

    // Inner High-Heat Core (Yellow-White)
    const innerFlameGeo = new THREE.ConeGeometry(0.045, 0.22, 20);
    innerFlameGeo.translate(0, 0.11, 0);
    const innerFlameMat = new THREE.MeshBasicMaterial({
      color: 0xfff8cc,
      transparent: true,
      opacity: 0.95,
    });
    const innerFlame = new THREE.Mesh(innerFlameGeo, innerFlameMat);
    flameGroup.add(innerFlame);

    // Blue Base
    const blueBaseGeo = new THREE.SphereGeometry(0.04, 16, 16);
    blueBaseGeo.scale(1, 0.6, 1);
    const blueBaseMat = new THREE.MeshBasicMaterial({
      color: 0x0088ff,
      transparent: true,
      opacity: 0.8,
    });
    const blueBase = new THREE.Mesh(blueBaseGeo, blueBaseMat);
    blueBase.position.y = 0.02;
    flameGroup.add(blueBase);

    // Dynamic Candle Point Light
    const candleLight = new THREE.PointLight(0xffaa33, 4.0, 5.5, 1.8);
    candleLight.position.set(0, 1.15, 0);
    candleLight.castShadow = true;
    candleGroup.add(candleLight);

    // 8. Volumetric Smoke Particles System (Active when candle blown)
    const smokeGroup = new THREE.Group();
    scene.add(smokeGroup);

    const smokeCount = 50;
    const smokeParticles = [];
    const smokeGeo = new THREE.PlaneGeometry(0.12, 0.12);
    const smokeMat = new THREE.MeshBasicMaterial({
      color: 0xd6ccc2,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });

    for (let i = 0; i < smokeCount; i++) {
      const mesh = new THREE.Mesh(smokeGeo, smokeMat.clone());
      mesh.visible = false;
      smokeGroup.add(mesh);
      smokeParticles.push({
        mesh,
        alive: false,
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        scale: 0.05,
        growth: 0.003,
        alpha: 0,
        decay: 0.008,
      });
    }

    const spawnSmokePuff = () => {
      const p = smokeParticles.find((item) => !item.alive);
      if (!p) return;
      p.alive = true;
      p.mesh.visible = true;
      // Spawn at wick tip
      p.x = (Math.random() - 0.5) * 0.04;
      p.y = 2.15;
      p.z = (Math.random() - 0.5) * 0.04;
      p.vx = (Math.random() - 0.5) * 0.008;
      p.vy = 0.015 + Math.random() * 0.012;
      p.vz = (Math.random() - 0.5) * 0.008;
      p.scale = 0.06;
      p.growth = 0.004 + Math.random() * 0.003;
      p.alpha = 0.6;
      p.decay = 0.006 + Math.random() * 0.004;
      p.mesh.position.set(p.x, p.y, p.z);
      p.mesh.scale.set(p.scale, p.scale, p.scale);
      p.mesh.material.opacity = p.alpha;
    };

    // 9. Floating 3D Metallic & Iridescent Helium Balloons
    const balloonsGroup = new THREE.Group();
    scene.add(balloonsGroup);

    const balloonColors = [
      { color: 0xe8a598, metalness: 0.92, roughness: 0.15, name: 'Rose Gold' },
      { color: 0xf5d77f, metalness: 0.95, roughness: 0.12, name: 'Champagne Gold' },
      { color: 0xee6055, metalness: 0.85, roughness: 0.18, name: 'Vibrant Ruby' },
      { color: 0xf7cad0, metalness: 0.72, roughness: 0.22, name: 'Pastel Blush' },
      { color: 0xd4af37, metalness: 0.96, roughness: 0.14, name: 'Classic Gold' },
      { color: 0xff758f, metalness: 0.88, roughness: 0.16, name: 'Raspberry Rose' },
    ];

    const balloonMeshes = [];
    const balloonCount = 12;

    for (let i = 0; i < balloonCount; i++) {
      const bColor = balloonColors[i % balloonColors.length];
      const bMat = new THREE.MeshPhysicalMaterial({
        color: bColor.color,
        metalness: bColor.metalness,
        roughness: bColor.roughness,
        clearcoat: 0.95,
        clearcoatRoughness: 0.1,
        reflectivity: 0.95,
      });

      const bGroup = new THREE.Group();

      // Balloon teardrop body
      const bodyGeo = new THREE.SphereGeometry(0.35, 32, 32);
      bodyGeo.scale(1.0, 1.28, 1.0);
      const bMesh = new THREE.Mesh(bodyGeo, bMat);
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;
      bGroup.add(bMesh);

      // Bottom tie knot
      const knotGeo = new THREE.ConeGeometry(0.06, 0.08, 16);
      const knotMesh = new THREE.Mesh(knotGeo, bMat);
      knotMesh.position.y = -0.46;
      knotMesh.rotation.x = Math.PI;
      bGroup.add(knotMesh);

      // Dangling ribbon string (curved line with 10 segments)
      const stringPoints = [];
      const stringLength = 1.1;
      const segments = 10;
      for (let s = 0; s <= segments; s++) {
        const sy = -0.48 - (s / segments) * stringLength;
        const sx = Math.sin(s * 0.8) * 0.035;
        const sz = Math.cos(s * 0.8) * 0.02;
        stringPoints.push(new THREE.Vector3(sx, sy, sz));
      }
      const stringGeo = new THREE.BufferGeometry().setFromPoints(stringPoints);
      const stringMat = new THREE.LineBasicMaterial({
        color: 0xf5d77f,
        transparent: true,
        opacity: 0.65,
        linewidth: 1,
      });
      const stringLine = new THREE.Line(stringGeo, stringMat);
      bGroup.add(stringLine);

      // Arrange balloons in a flattering golden hemisphere around the cake
      const angle = (i / balloonCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const radius = 2.8 + Math.random() * 1.4;
      const baseY = 0.5 + Math.random() * 2.8;

      bGroup.position.set(
        Math.cos(angle) * radius,
        baseY,
        Math.sin(angle) * radius - 0.5
      );

      balloonsGroup.add(bGroup);

      balloonMeshes.push({
        group: bGroup,
        mesh: bMesh,
        baseX: bGroup.position.x,
        baseY: baseY,
        baseZ: bGroup.position.z,
        phase: Math.random() * Math.PI * 2,
        speed: 1.2 + Math.random() * 0.8,
        swaySpeed: 1.5 + Math.random() * 0.5,
        isPopped: false,
      });
    }

    // 10. 3D Golden Crumb / Confetti Sparkle Emitter for Cake Cutting
    const cutSparkleGroup = new THREE.Group();
    scene.add(cutSparkleGroup);
    const cutSparkles = [];
    const cutSparkleGeo = new THREE.SphereGeometry(0.025, 8, 8);
    const cutSparkleMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
    for (let i = 0; i < 40; i++) {
      const sMesh = new THREE.Mesh(cutSparkleGeo, cutSparkleMat);
      sMesh.visible = false;
      cutSparkleGroup.add(sMesh);
      cutSparkles.push({
        mesh: sMesh,
        alive: false,
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        alpha: 1,
      });
    }

    const triggerCutSparkles = () => {
      cutSparkles.forEach((s) => {
        s.alive = true;
        s.mesh.visible = true;
        s.x = 1.2;
        s.y = 0.5;
        s.z = -0.8;
        const ang = Math.random() * Math.PI * 2;
        const spd = 0.04 + Math.random() * 0.06;
        s.vx = Math.cos(ang) * spd;
        s.vy = 0.03 + Math.random() * 0.05;
        s.vz = Math.sin(ang) * spd;
        s.alpha = 1;
        s.mesh.position.set(s.x, s.y, s.z);
      });
    };

    // 11. Floating Warm Golden Stardust & Bokeh Motes
    const bokehCount = 550;
    const bokehPos = new Float32Array(bokehCount * 3);
    for (let i = 0; i < bokehCount; i++) {
      bokehPos[i * 3] = (Math.random() - 0.5) * 14;
      bokehPos[i * 3 + 1] = Math.random() * 7 - 1.5;
      bokehPos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    const bokehGeo = new THREE.BufferGeometry();
    bokehGeo.setAttribute('position', new THREE.BufferAttribute(bokehPos, 3));
    const bokehMat = new THREE.PointsMaterial({
      color: 0xf6c28b,
      size: 0.075,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const bokehField = new THREE.Points(bokehGeo, bokehMat);
    scene.add(bokehField);

    // 12. Direct Raycaster Interaction (Click balloons to POP, Click Candle to BLOW)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Check Balloon Clicks
      const balloonIntersectTargets = balloonMeshes
        .filter((b) => !b.isPopped)
        .map((b) => b.mesh);
      const balloonHits = raycaster.intersectObjects(balloonIntersectTargets, false);

      if (balloonHits.length > 0) {
        const hitMesh = balloonHits[0].object;
        const targetB = balloonMeshes.find((b) => b.mesh === hitMesh);
        if (targetB && !targetB.isPopped) {
          targetB.isPopped = true;
          sounds.playBalloonPop();

          // Animate Pop in Three.js
          gsap.to(targetB.group.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            duration: 0.08,
            onComplete: () => {
              targetB.group.visible = false;
            },
          });

          if (onBalloonPopped) onBalloonPopped();
          return;
        }
      }

      // Check Candle Click
      const candleHits = raycaster.intersectObjects([candleWax, outerFlame], false);
      if (candleHits.length > 0) {
        if (onCandleClick) onCandleClick();
        return;
      }

      // Check Cake Click
      const cakeHits = raycaster.intersectObjects([tier1Main, tier2Main, tier1Slice, tier2Slice], false);
      if (cakeHits.length > 0) {
        if (onCakeClick) onCakeClick();
        return;
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // 13. State Change Watchers (Animate Slice & Flame Transitions)
    let prevCakeCut = false;
    let prevCandleBlown = false;

    // 14. 60FPS High-Octane Animation Loop
    let animId;
    let smokeTimer = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = performance.now() * 0.001;

      // Gentle continuous turntable rotation
      masterCakeGroup.rotation.y = elapsed * 0.12;
      bokehField.rotation.y = elapsed * 0.015;

      // --- Reactive Cake Cut Animation ---
      const currentCakeCut = cakeCutRef.current;
      if (currentCakeCut !== prevCakeCut) {
        prevCakeCut = currentCakeCut;
        if (currentCakeCut) {
          // Slide out wedge slice smoothly along angle Math.PI * 1.875
          const outAngle = Math.PI * 1.875;
          const outDist = 0.95;
          gsap.to(cakeSliceGroup.position, {
            x: Math.cos(outAngle) * outDist,
            y: 0.12,
            z: Math.sin(outAngle) * outDist,
            duration: 1.2,
            ease: 'power3.out',
          });
          gsap.to(cakeSliceGroup.rotation, {
            y: 0.18,
            duration: 1.2,
            ease: 'power3.out',
          });
          triggerCutSparkles();
          sounds.playCakeSlice();
        } else {
          gsap.to(cakeSliceGroup.position, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          });
          gsap.to(cakeSliceGroup.rotation, {
            y: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          });
        }
      }

      // --- Reactive Candle Flame Physics & Extinguish ---
      const currentCandleBlown = candleBlownRef.current;
      if (currentCandleBlown !== prevCandleBlown) {
        prevCandleBlown = currentCandleBlown;
        if (currentCandleBlown) {
          // Blow out flame
          gsap.to(flameGroup.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.25,
            ease: 'power2.in',
          });
          gsap.to(candleLight, {
            intensity: 0,
            duration: 0.35,
          });
          smokeTimer = 3.0; // Emit smoke for 3 seconds
          sounds.playCandleBlow();
        } else {
          // Relight flame
          gsap.to(flameGroup.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
          });
          gsap.to(candleLight, {
            intensity: 4.0,
            duration: 0.4,
          });
          sounds.playSparkle();
        }
      }

      // Organic Flame Flickering when Lit
      if (!currentCandleBlown) {
        const flick = Math.sin(elapsed * 14) * 0.07 + Math.cos(elapsed * 21) * 0.05;
        const tilt = Math.sin(elapsed * 9) * 0.06;
        flameGroup.scale.set(1 + flick, 1 + flick * 1.3, 1 + flick);
        flameGroup.rotation.z = tilt;
        candleLight.intensity = 4.0 + flick * 2.2;
      }

      // Volumetric Smoke Simulation when Extinguished
      if (smokeTimer > 0) {
        smokeTimer -= 0.016;
        if (Math.random() < 0.35) {
          spawnSmokePuff();
        }
      }

      // Update active smoke particles
      smokeParticles.forEach((p) => {
        if (!p.alive) return;
        p.x += p.vx + Math.sin(elapsed * 3 + p.y) * 0.002;
        p.y += p.vy;
        p.z += p.vz + Math.cos(elapsed * 3 + p.y) * 0.002;
        p.scale += p.growth;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          p.alive = false;
          p.mesh.visible = false;
        } else {
          p.mesh.position.set(p.x, p.y, p.z);
          p.mesh.scale.set(p.scale, p.scale, p.scale);
          p.mesh.material.opacity = p.alpha;
        }
      });

      // Update Cut Crumb Sparkles
      cutSparkles.forEach((s) => {
        if (!s.alive) return;
        s.x += s.vx;
        s.y += s.vy;
        s.z += s.vz;
        s.vy -= 0.0018; // gravity
        s.alpha -= 0.015;
        if (s.alpha <= 0) {
          s.alive = false;
          s.mesh.visible = false;
        } else {
          s.mesh.position.set(s.x, s.y, s.z);
        }
      });

      // 60FPS Floating Physics for 3D Balloons
      balloonMeshes.forEach((b) => {
        if (b.isPopped) return;
        // Harmonic vertical buoyancy bobbing
        b.group.position.y = b.baseY + Math.sin(elapsed * b.speed + b.phase) * 0.18;
        // Subtle wind tilt
        b.group.rotation.z = Math.sin(elapsed * b.swaySpeed + b.phase) * 0.07;
        b.group.rotation.x = Math.cos(elapsed * b.swaySpeed * 0.8 + b.phase) * 0.05;
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 15. Cinematic Camera Swoop Controller based on Stages
    const updateCameraForStage = (newStage) => {
      if (newStage === 1) {
        // Grand Entrance - Wide elegant angle
        gsap.to(camera.position, { x: 0, y: 1.8, z: 7.2, duration: 2.0, ease: 'power3.out' });
        gsap.to(controls.target, { x: 0, y: 0.5, z: 0, duration: 2.0, ease: 'power3.out' });
      } else if (newStage === 2) {
        // Candle Ceremony - Intimate macro close-up focused on the glowing flame
        gsap.to(camera.position, { x: 0, y: 2.0, z: 4.5, duration: 1.8, ease: 'power3.out' });
        gsap.to(controls.target, { x: 0, y: 1.2, z: 0, duration: 1.8, ease: 'power3.out' });
      } else if (newStage === 3) {
        // Cake Cutting - Dynamic lateral orbit showcasing the cut wedge
        gsap.to(camera.position, { x: 2.4, y: 1.8, z: 4.8, duration: 1.8, ease: 'power3.out' });
        gsap.to(controls.target, { x: 0.4, y: 0.6, z: -0.2, duration: 1.8, ease: 'power3.out' });
      } else if (newStage === 4 || newStage === 5) {
        // Balloon & Keepsakes - Celebratory wide view showcasing all floating balloons
        gsap.to(camera.position, { x: 0, y: 2.2, z: 6.4, duration: 1.8, ease: 'power3.out' });
        gsap.to(controls.target, { x: 0, y: 0.6, z: 0, duration: 1.8, ease: 'power3.out' });
      }
    };

    updateCameraForStage(stage);

    // 16. Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [stage]);

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
}
