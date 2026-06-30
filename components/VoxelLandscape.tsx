"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface VoxelLandscapeProps {
  mode?: "day" | "night" | "sunset";
}

export default function VoxelLandscape({ mode = "day" }: VoxelLandscapeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // 1. Scene setup
    const scene = new THREE.Scene();
    
    // Ambient Fog: light sky-blue for day, deep purple-black for night, dark purple for sunset
    const fogColor = mode === "day" ? 0xbce0fd : mode === "sunset" ? 0x3e1b5b : 0x0c0617;
    scene.fog = new THREE.FogExp2(fogColor, mode === "day" ? 0.022 : mode === "sunset" ? 0.024 : 0.025);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(-20, 11, 23);
    camera.lookAt(2, 1.5, 2);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    // 4. Lights
    // Ambient light: bright day sky-blue vs sunset deep purple vs night indigo
    let ambientColor = 0x2e1e4c;
    let ambientIntensity = 0.65;
    if (mode === "day") {
      ambientColor = 0xd2e9ff;
      ambientIntensity = 1.4;
    } else if (mode === "sunset") {
      ambientColor = 0x5e216d;
      ambientIntensity = 1.0;
    }
    const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntensity);
    scene.add(ambientLight);

    // Sun directional light vs Sunset orange light vs Moon directional light
    let sunColor = 0xa5b4fc;
    let sunIntensity = 1.35;
    if (mode === "day") {
      sunColor = 0xfffebb;
      sunIntensity = 2.3;
    } else if (mode === "sunset") {
      sunColor = 0xff7e00; // deep sunset orange
      sunIntensity = 2.6;
    }
    const sunLight = new THREE.DirectionalLight(sunColor, sunIntensity);
    sunLight.position.set(-25, 35, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 85;
    const d = 30;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    scene.add(sunLight);

    // Hemisphere light for sky reflection gradients
    let hemiColor = 0x1d0f36;
    let hemiGround = 0x051a02;
    let hemiIntensity = 0.8;
    if (mode === "day") {
      hemiColor = 0xbae6fd;
      hemiGround = 0x3f6212;
      hemiIntensity = 1.1;
    } else if (mode === "sunset") {
      hemiColor = 0xf472b6; // pink sky gradient reflection
      hemiGround = 0x1d0f36; // dark violet ground
      hemiIntensity = 0.95;
    }
    const hemiLight = new THREE.HemisphereLight(hemiColor, hemiGround, hemiIntensity);
    scene.add(hemiLight);

    // 5. Materials
    const materials = {
      grass: new THREE.MeshLambertMaterial({ color: 0x22c55e }), // vibrant green
      grassHighlight: new THREE.MeshLambertMaterial({ color: 0x86efac }), // bright lime green
      grassShadow: new THREE.MeshLambertMaterial({ color: 0x166534 }), // medium shadow green
      grassDark: new THREE.MeshLambertMaterial({ color: 0x14532d }), // deep forest green
      dirt: new THREE.MeshLambertMaterial({ color: 0xc2a679 }), // warm sandy path brown
      trunk: new THREE.MeshLambertMaterial({ color: 0x5c3a21 }), // wood trunk brown
      leaf: new THREE.MeshLambertMaterial({ color: 0x15803d }), // foliage green
      leafHighlight: new THREE.MeshLambertMaterial({ color: 0x4ade80 }), // foliage highlight green
      leafShadow: new THREE.MeshLambertMaterial({ color: 0x14532d }), // foliage shadow green
      stone: new THREE.MeshLambertMaterial({ color: 0x6b7280 }), // grey mountains
      stoneHighlight: new THREE.MeshLambertMaterial({ color: 0x9ca3af }), // light grey peaks
      blanket: new THREE.MeshLambertMaterial({ color: 0xfefcbf }), // cream blanket
      blanketStripe: new THREE.MeshLambertMaterial({ color: 0xc0a080 }), // brown stripe
      laptop: new THREE.MeshLambertMaterial({ color: 0x9ca3af }), // grey laptop
      laptopScreen: new THREE.MeshLambertMaterial({ color: 0x1f2937 }), // dark screen
      codeGlow: new THREE.MeshBasicMaterial({ color: 0x22c55e }), // green code glow
      flowerYellow: new THREE.MeshBasicMaterial({ color: 0xfde047 }),
      flowerBlue: new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
      flowerWhite: new THREE.MeshBasicMaterial({ color: 0xf9fafb }),
      flowerRed: new THREE.MeshBasicMaterial({ color: 0xf87171 }),
      cloud: new THREE.MeshLambertMaterial({
        color: mode === "day" ? 0xffffff : mode === "sunset" ? 0xffc0e0 : 0xffffff, // pinkish sunset clouds
        transparent: true,
        opacity: mode === "day" ? 0.92 : mode === "sunset" ? 0.8 : 0.45,
      }),
      sun: new THREE.MeshBasicMaterial({ color: mode === "day" ? 0xfef08a : mode === "sunset" ? 0xff7e00 : 0xe0f2fe }), // Yellow Sun vs Orange Sunset vs Silver Moon
      star: new THREE.MeshBasicMaterial({ color: 0xffffff }), // glowing stars (sunset and night)
    };

    // 6. Geometry
    const cubeGeo = new THREE.BoxGeometry(1, 1, 1);

    // 7. World Generation Constants
    const voxelSize = 0.45;
    const size = 64;
    const halfSize = size / 2;
    const startY = -12;
    
    interface VoxelInstance {
      x: number;
      y: number;
      z: number;
      type: keyof typeof materials;
      scale?: { x: number; y: number; z: number };
    }
    const voxels: VoxelInstance[] = [];

    // Path curve generator
    const getPathX = (nz: number) => {
      return -3 + Math.sin(nz * 0.35) * 2.2 - (nz * 0.25);
    };

    // Height generator (procedural landscape)
    const getTerrainHeight = (nx: number, nz: number) => {
      const hill1 = Math.sin(nx * 0.25) * Math.cos(nz * 0.25) * 2.4;
      const hill2 = Math.cos(nx * 0.12) * 1.6;
      let height = hill1 + hill2;

      if (nx > 1 && nz > 1) {
        const rise = (nx - 1) * 0.3 + (nz - 1) * 0.3;
        height += rise;
      }

      if (nx < -1 && nz < -1) {
        const dist = Math.sqrt(Math.pow(nx + 1, 2) + Math.pow(nz + 1, 2));
        height += dist * 0.65;
      }

      return Math.round(height / voxelSize);
    };

    // Define tree parameters outside if-statement for wildflower checks and animation scopes
    const treeGridX = 10;
    const treeGridZ = 8;
    const treeNX = treeGridX * voxelSize;
    const treeNZ = treeGridZ * voxelSize;
    const treeYBase = getTerrainHeight(treeNX, treeNZ) * voxelSize;

    // Generate Voxel Grid (Surface Shell only for extreme optimization)
    for (let x = -halfSize; x <= halfSize; x++) {
      for (let z = -halfSize; z <= halfSize; z++) {
        const nx = x * voxelSize;
        const nz = z * voxelSize;
        const gridY = getTerrainHeight(nx, nz);
        const y = gridY * voxelSize;

        const pathX = getPathX(nz);
        const distToPath = Math.abs(nx - pathX);
        let type: keyof typeof materials = "grass";

        // Paint both sides of the mountains in sunset mode
        const isMountainSide = mode === "sunset"
          ? (nx < -2.2 && nz < -2.2 && gridY >= 10) || (nx > 2.2 && nz > 2.2 && gridY >= 10)
          : (nx < -2.2 && nz < -2.2 && gridY >= 10);

        if (isMountainSide) {
          type = gridY >= 14 ? "stoneHighlight" : "stone";
        } else {
          if (mode === "sunset") {
            // Paint the entire valley floor with a wide synthwave cyan grid
            const isGridLine = (Math.abs(x) % 2 === 0 || Math.abs(z) % 2 === 0);
            type = isGridLine ? "dirt" : "grassDark";
          } else {
            // Day/Night mode uses path dirt and grass highlights
            if (distToPath < 0.65) {
              type = "dirt";
            } else {
              const shadowBias = (nx > 2.0 && nz > 1.5) ? -0.42 : 0;
              const val = Math.sin(nx * 1.2) * Math.cos(nz * 1.2) + Math.cos(nx * 0.6) * 0.5 + shadowBias;
              if (val > 0.42) {
                type = "grassHighlight";
              } else if (val < -0.32) {
                type = "grassShadow";
              } else {
                type = "grass";
              }
            }
          }
        }

        voxels.push({ x: nx, y, z: nz, type });

        // Wall borders for depth outline
        const isBorder = (x === -halfSize || x === halfSize || z === -halfSize || z === halfSize);
        if (isBorder) {
          for (let cy = gridY - 1; cy >= startY; cy--) {
            const wallY = cy * voxelSize;
            voxels.push({
              x: nx,
              y: wallY,
              z: nz,
              type: cy < gridY - 2 ? "stone" : "grassDark"
            });
          }
        }
      }
    }

    // Add Path Fence (non-sunset only)
    if (mode !== "sunset") {
      const fencePosts: { x: number; y: number; z: number }[] = [];
      const fenceZIndices = [22, 14, 6, -2, -10, -18, -26];
      
      fenceZIndices.forEach((zIdx) => {
        const nz = zIdx * voxelSize;
        const pathX = getPathX(nz);
        const postX = Math.round((pathX + 0.8) / voxelSize);
        const postNX = postX * voxelSize;
        const gridY = getTerrainHeight(postNX, nz);
        const y = gridY * voxelSize;
        
        for (let ph = 1; ph <= 3; ph++) {
          voxels.push({ x: postNX, y: y + ph * voxelSize, z: nz, type: "trunk" });
        }
        fencePosts.push({ x: postNX, y: y + 3 * voxelSize, z: nz });
      });

      for (let i = 0; i < fencePosts.length - 1; i++) {
        const p1 = fencePosts[i];
        const p2 = fencePosts[i + 1];
        const zDiff = p2.z - p1.z;
        const steps = Math.round(Math.abs(zDiff) / voxelSize);
        
        for (let step = 1; step < steps; step++) {
          const t = step / steps;
          const currZ = p1.z + zDiff * t;
          const pathX = getPathX(currZ);
          const rx = Math.round((pathX + 0.8) / voxelSize) * voxelSize;
          const ry = THREE.MathUtils.lerp(p1.y, p2.y, t) - 0.22;
          
          voxels.push({
            x: rx,
            y: ry,
            z: currZ,
            type: "trunk",
            scale: { x: 0.1, y: 0.12, z: 0.55 }
          });
          voxels.push({
            x: rx,
            y: ry - voxelSize * 1.1,
            z: currZ,
            type: "trunk",
            scale: { x: 0.1, y: 0.12, z: 0.55 }
          });
        }
      }
    }

    // Add Detailed Oak Tree (Right Side - non-sunset only)
    if (mode !== "sunset") {
      // Circular Trunk
      const trunkHeightGrid = 15;
      const trunkOffsets = [
        { dx: 0, dz: 0 },
        { dx: 1, dz: 0 },
        { dx: -1, dz: 0 },
        { dx: 0, dz: 1 },
        { dx: 0, dz: -1 },
      ];

      for (let ty = 1; ty <= trunkHeightGrid; ty++) {
        const y = treeYBase + ty * voxelSize;
        const activeOffsets = ty > trunkHeightGrid * 0.6 ? [{ dx: 0, dz: 0 }] : trunkOffsets;
        activeOffsets.forEach((offset) => {
          voxels.push({
            x: treeNX + offset.dx * voxelSize,
            y,
            z: treeNZ + offset.dz * voxelSize,
            type: "trunk"
          });
        });
      }

      // Branches
      const branchGridY1 = treeYBase + 10 * voxelSize;
      voxels.push({ x: treeNX - voxelSize, y: branchGridY1, z: treeNZ, type: "trunk" });
      voxels.push({ x: treeNX - voxelSize * 2, y: branchGridY1 + voxelSize, z: treeNZ, type: "trunk" });
      voxels.push({ x: treeNX - voxelSize * 3, y: branchGridY1 + voxelSize * 2, z: treeNZ, type: "trunk" });
      voxels.push({ x: treeNX, y: branchGridY1, z: treeNZ - voxelSize, type: "trunk" });
      voxels.push({ x: treeNX, y: branchGridY1 + voxelSize, z: treeNZ - voxelSize * 2, type: "trunk" });
      voxels.push({ x: treeNX + voxelSize, y: branchGridY1 + voxelSize * 0.5, z: treeNZ + voxelSize, type: "trunk" });
      voxels.push({ x: treeNX + voxelSize * 2, y: branchGridY1 + voxelSize * 1.5, z: treeNZ + voxelSize * 2, type: "trunk" });

      // Foliage Spheres
      const leafClusters = [
        { cx: treeNX - 1.35, cy: treeYBase + 5.0, cz: treeNZ, r: 1.5 },
        { cx: treeNX + 1.1, cy: treeYBase + 5.2, cz: treeNZ + 0.9, r: 1.5 },
        { cx: treeNX, cy: treeYBase + 5.8, cz: treeNZ - 1.1, r: 1.8 },
        { cx: treeNX + 0.5, cy: treeYBase + 6.3, cz: treeNZ + 0.9, r: 1.8 },
        { cx: treeNX, cy: treeYBase + 7.2, cz: treeNZ, r: 2.3 },
        { cx: treeNX, cy: treeYBase + 8.5, cz: treeNZ + 0.5, r: 1.4 },
      ];

      leafClusters.forEach((cluster) => {
        const { cx, cy, cz, r } = cluster;
        const gridR = Math.round(r / voxelSize);
        
        for (let dx = -gridR; dx <= gridR; dx++) {
          for (let dy = -gridR; dy <= gridR; dy++) {
            for (let dz = -gridR; dz <= gridR; dz++) {
              const vx = cx + dx * voxelSize;
              const vy = cy + dy * voxelSize;
              const vz = cz + dz * voxelSize;
              
              const distSq = Math.pow(dx * voxelSize, 2) + Math.pow(dy * voxelSize, 2) + Math.pow(dz * voxelSize, 2);
              if (distSq < r * r) {
                if (distSq > Math.pow(r - voxelSize, 2) && Math.random() < 0.35) continue;
                
                let leafType: keyof typeof materials = "leaf";
                if (dy * voxelSize > r * 0.3 && Math.random() < 0.7) {
                  leafType = "leafHighlight";
                } else if (dy * voxelSize < -r * 0.3) {
                  leafType = "leafShadow";
                }
                voxels.push({ x: vx, y: vy, z: vz, type: leafType });
              }
            }
          }
        }
      });
    }

    // Picnic Blanket & Props (non-sunset only)
    const blanketGridXStart = 5;
    const blanketGridXEnd = 9;
    const blanketGridZStart = 11;
    const blanketGridZEnd = 15;
    const blanketNXStart = blanketGridXStart * voxelSize;
    const blanketNZStart = blanketGridZStart * voxelSize;
    const blanketY = getTerrainHeight(3.1, 5.8) * voxelSize + voxelSize;

    if (mode !== "sunset") {
      for (let gx = blanketGridXStart; gx <= blanketGridXEnd; gx++) {
        for (let gz = blanketGridZStart; gz <= blanketGridZEnd; gz++) {
          const isStripe = (gx + gz) % 2 === 0;
          voxels.push({
            x: gx * voxelSize,
            y: blanketY,
            z: gz * voxelSize,
            type: isStripe ? "blanketStripe" : "blanket"
          });
        }
      }

      // Laptop
      const lx = blanketNXStart + voxelSize;
      const lz = blanketNZStart + voxelSize * 1.5;
      for (let dx = 0; dx < 2; dx++) {
        for (let dz = 0; dz < 3; dz++) {
          voxels.push({ x: lx + dx * voxelSize, y: blanketY + voxelSize, z: lz + dz * voxelSize, type: "laptop" });
        }
      }
      for (let dx = -1; dx < 3; dx++) {
        for (let dy = 1; dy <= 3; dy++) {
          voxels.push({ x: lx + dx * voxelSize, y: blanketY + voxelSize + dy * voxelSize, z: lz - voxelSize, type: "laptopScreen" });
          voxels.push({ x: lx + dx * voxelSize, y: blanketY + voxelSize + dy * voxelSize, z: lz - voxelSize * 1.05, type: "laptop" });
        }
      }
      voxels.push({ x: lx + voxelSize * 0.5, y: blanketY + voxelSize * 2.0, z: lz - voxelSize * 0.9, type: "codeGlow", scale: { x: 0.6, y: 0.35, z: 0.2 } });
      voxels.push({ x: lx + voxelSize * 1.5, y: blanketY + voxelSize * 2.5, z: lz - voxelSize * 0.9, type: "codeGlow", scale: { x: 0.45, y: 0.35, z: 0.2 } });

      // Open Book
      const bx = blanketNXStart + voxelSize * 2.5;
      const bz = blanketNZStart + voxelSize * 2.0;
      voxels.push({ x: bx, y: blanketY + voxelSize, z: bz, type: "trunk" });
      voxels.push({ x: bx, y: blanketY + voxelSize, z: bz + voxelSize, type: "trunk" });
      voxels.push({ x: bx - voxelSize, y: blanketY + voxelSize, z: bz, type: "blanket" });
      voxels.push({ x: bx - voxelSize, y: blanketY + voxelSize, z: bz + voxelSize, type: "blanket" });
      voxels.push({ x: bx + voxelSize, y: blanketY + voxelSize, z: bz, type: "blanket" });
      voxels.push({ x: bx + voxelSize, y: blanketY + voxelSize, z: bz + voxelSize, type: "blanket" });

      // Inkwell & Quill
      const ix = blanketNXStart + voxelSize * 0.5;
      const iz = blanketNZStart + voxelSize * 0.5;
      voxels.push({ x: ix, y: blanketY + voxelSize, z: iz, type: "laptopScreen" });
      voxels.push({ x: ix, y: blanketY + voxelSize * 2.0, z: iz, type: "flowerWhite", scale: { x: 0.2, y: 0.6, z: 0.2 } });
      voxels.push({ x: ix - voxelSize * 0.4, y: blanketY + voxelSize * 3.0, z: iz, type: "flowerWhite", scale: { x: 0.2, y: 0.6, z: 0.2 } });
    }

    // Wildflowers (non-sunset only)
    if (mode !== "sunset") {
      for (let x = -halfSize; x <= halfSize; x++) {
        for (let z = -halfSize; z <= halfSize; z++) {
          const nx = x * voxelSize;
          const nz = z * voxelSize;
          const gridY = getTerrainHeight(nx, nz);
          const y = gridY * voxelSize;

          const pathX = getPathX(nz);
          if (Math.abs(nx - pathX) < 1.3) continue;
          if (Math.hypot(nx - treeNX, nz - treeNZ) < 2.5) continue;
          if (nx >= blanketNXStart - voxelSize && nx <= blanketNXStart + 5 * voxelSize &&
              nz >= blanketNZStart - voxelSize && nz <= blanketNZStart + 5 * voxelSize) continue;

          if (Math.random() < 0.08) {
            const colors: (keyof typeof materials)[] = ["flowerYellow", "flowerBlue", "flowerWhite", "flowerRed"];
            const type = colors[Math.floor(Math.random() * colors.length)];
            voxels.push({
              x: nx,
              y: y + voxelSize * 0.8,
              z: nz,
              type,
              scale: { x: 0.22, y: 0.42, z: 0.22 }
            });
          }
        }
      }
    }

    // Skyscraper generator function (Sunset mode only)
    if (mode === "sunset") {
      const spawnSkyscraper = (gridX: number, gridZ: number, widthX: number, widthZ: number, heightVal: number) => {
        const startX = gridX;
        const startZ = gridZ;
        const baseHeight = getTerrainHeight(startX * voxelSize, startZ * voxelSize);

        for (let dx = 0; dx < widthX; dx++) {
          for (let dz = 0; dz < widthZ; dz++) {
            const vx = (startX + dx) * voxelSize;
            const vz = (startZ + dz) * voxelSize;
            
            for (let dy = 1; dy <= heightVal; dy++) {
              const vy = (baseHeight + dy) * voxelSize;
              
              // Only draw windows on the outer walls, spaced out
              const isOuterWall = (dx === 0 || dx === widthX - 1 || dz === 0 || dz === widthZ - 1);
              const isWindow = isOuterWall && (dy % 4 === 1) && ((dx + dz) % 2 === 1) && (dy < heightVal - 1);
              
              let type: keyof typeof materials = "laptopScreen"; // dark charcoal building frame
              if (isWindow) {
                type = "codeGlow"; // green neon window lights
              }
              
              voxels.push({ x: vx, y: vy, z: vz, type });
            }
          }
        }
      };

      // Spawn 3 cyber neon skyscrapers on the right side in the background
      spawnSkyscraper(12, -4, 6, 6, 32);
      spawnSkyscraper(18, 2, 7, 5, 42);
      spawnSkyscraper(14, 8, 5, 6, 26);
    }

    // Spawn Voxel Sun in the center background (Sunset & Day modes)
    if (mode === "sunset" || mode === "day") {
      const sunCenterX = 0;
      const sunCenterY = mode === "sunset" ? 3.5 : 9.5; // lower sun for sunset!
      const sunRadius = 4.2; // radius of sun in units
      
      const gridR = Math.round(sunRadius / voxelSize);
      for (let dx = -gridR; dx <= gridR; dx++) {
        for (let dy = -gridR; dy <= gridR; dy++) {
          const vx = sunCenterX + dx * voxelSize;
          const vy = sunCenterY + dy * voxelSize;
          
          const distSq = Math.pow(dx * voxelSize, 2) + Math.pow(dy * voxelSize, 2);
          if (distSq < sunRadius * sunRadius) {
            voxels.push({
              x: vx,
              y: vy,
              z: -15.8, // just in front of the stars plane
              type: "sun",
            });
          }
        }
      }
    }

    // Clouds
    const clouds: {
      x: number;
      y: number;
      z: number;
      speed: number;
      blocks: { dx: number; dy: number; dz: number }[];
    }[] = [];

    const cloudShapes = [
      [
        { dx: 0, dy: 0, dz: 0 }, { dx: 1, dy: 0, dz: 0 }, { dx: -1, dy: 0, dz: 0 },
        { dx: 0, dy: 0, dz: 1 }, { dx: 0, dy: 0, dz: -1 }, { dx: 1, dy: 0, dz: 1 },
        { dx: -1, dy: 0, dz: -1 }, { dx: 0, dy: 1, dz: 0 }, { dx: 1, dy: 1, dz: 0 },
        { dx: 2, dy: 0, dz: 0 }, { dx: -2, dy: 0, dz: 0 },
      ],
      [
        { dx: 0, dy: 0, dz: 0 }, { dx: 1, dy: 0, dz: 0 }, { dx: 2, dy: 0, dz: 0 },
        { dx: -1, dy: 0, dz: 0 }, { dx: -2, dy: 0, dz: 0 }, { dx: 0, dy: 1, dz: 0 },
        { dx: 1, dy: 1, dz: 0 }, { dx: -1, dy: 1, dz: 0 },
      ]
    ];

    for (let i = 0; i < 3; i++) {
      clouds.push({
        x: -22 + Math.random() * 44,
        y: 11 + Math.random() * 3,
        z: -14 + Math.random() * 28,
        speed: 0.009 + Math.random() * 0.009,
        blocks: cloudShapes[i % cloudShapes.length],
      });
    }

    // Night Stars (Glow stars, night & sunset modes)
    if (mode === "night" || mode === "sunset") {
      const starCount = mode === "night" ? 40 : 15;
      for (let i = 0; i < starCount; i++) {
        voxels.push({
          x: -22 + Math.random() * 44,
          y: 10 + Math.random() * 5,
          z: -16, // flat background plane
          type: "star",
          scale: {
            x: 0.15 + Math.random() * 0.15,
            y: 0.15 + Math.random() * 0.15,
            z: 0.15 + Math.random() * 0.15,
          }
        });
      }
    }

    // 9. Separate voxels by type and create InstancedMeshes
    const voxelTypeGroups: Record<string, VoxelInstance[]> = {};
    voxels.forEach((v) => {
      if (!voxelTypeGroups[v.type]) {
        voxelTypeGroups[v.type] = [];
      }
      voxelTypeGroups[v.type].push(v);
    });

    const instancedMeshes: Record<string, THREE.InstancedMesh> = {};

    Object.entries(voxelTypeGroups).forEach(([type, group]) => {
      let count = group.length;
      if (type === "cloud") {
        let cloudBlocksCount = 0;
        clouds.forEach((c) => {
          cloudBlocksCount += c.blocks.length;
        });
        count = cloudBlocksCount;
      }

      // Stars and Clouds use original geometry size, others scale down to voxelSize
      const geo = (type === "cloud" || type === "star") ? cubeGeo : cubeGeo.clone().scale(voxelSize, voxelSize, voxelSize);
      const mat = materials[type as keyof typeof materials];
      const mesh = new THREE.InstancedMesh(geo, mat, count);
      mesh.castShadow = type !== "cloud" && type !== "star";
      mesh.receiveShadow = type !== "cloud" && type !== "star";
      scene.add(mesh);
      instancedMeshes[type] = mesh;

      // Initialize static positions
      if (type !== "cloud" && type !== "star") {
        const dummy = new THREE.Object3D();
        group.forEach((v, index) => {
          dummy.position.set(v.x, v.y, v.z);
          if (v.scale) {
            dummy.scale.set(v.scale.x, v.scale.y, v.scale.z);
          } else {
            dummy.scale.set(1, 1, 1);
          }
          dummy.updateMatrix();
          mesh.setMatrixAt(index, dummy.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
      }
    });

    // Initialize Cloud InstancedMesh
    const cloudMesh = instancedMeshes["cloud"];
    if (cloudMesh) {
      const dummy = new THREE.Object3D();
      let index = 0;
      clouds.forEach((c) => {
        c.blocks.forEach((b) => {
          dummy.position.set(c.x + b.dx, c.y + b.dy, c.z + b.dz);
          dummy.scale.set(1, 1, 1);
          dummy.updateMatrix();
          cloudMesh.setMatrixAt(index++, dummy.matrix);
        });
      });
      cloudMesh.instanceMatrix.needsUpdate = true;
    }

    // 10. Pixel Particles
    interface Particle {
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      colorType: "leaf" | "firefly" | "pollen" | "petalYellow" | "petalRed" | "petalBlue" | "sparkCyan" | "sparkPurple";
      size: number;
      life: number;
      maxLife: number;
    }
    const particles: Particle[] = [];
    const maxParticles = 140;
    const particleGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    
    const particleMesh = new THREE.InstancedMesh(
      particleGeo,
      new THREE.MeshBasicMaterial({ vertexColors: true }),
      maxParticles
    );
    scene.add(particleMesh);

    // Initial fireflies/pollen
    const initialParticlesCount = mode === "day" ? 40 : mode === "sunset" ? 50 : 65; // more fireflies at night
    for (let i = 0; i < initialParticlesCount; i++) {
      particles.push({
        position: new THREE.Vector3(
          -12 + Math.random() * 24,
          1 + Math.random() * 8,
          -12 + Math.random() * 24
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.015
        ),
        colorType: Math.random() < (mode === "day" ? 0.6 : mode === "sunset" ? 0.7 : 0.8) ? "firefly" : "pollen",
        size: 0.5 + Math.random() * 0.5,
        life: Math.random() * 100,
        maxLife: 120 + Math.random() * 200,
      });
    }

    // Spawns clicks sparks
    const spawnPetalBurst = (x: number, y: number, z: number) => {
      // Day = Colorful petals, Sunset = Warm glow & fireflies, Night = Magical glowing neon sparks
      const typesDay: ("petalYellow" | "petalRed" | "petalBlue")[] = ["petalYellow", "petalRed", "petalBlue"];
      const typesSunset: ("petalYellow" | "firefly" | "sparkPurple")[] = ["petalYellow", "firefly", "sparkPurple"];
      const typesNight: ("sparkCyan" | "sparkPurple" | "firefly")[] = ["sparkCyan", "sparkPurple", "firefly"];
      
      for (let i = 0; i < 18; i++) {
        if (particles.length >= maxParticles) {
          particles.shift();
        }
        particles.push({
          position: new THREE.Vector3(x, y + 0.3, z),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.16,
            0.05 + Math.random() * 0.15,
            (Math.random() - 0.5) * 0.16
          ),
          colorType: mode === "day" 
            ? typesDay[Math.floor(Math.random() * typesDay.length)]
            : mode === "sunset"
            ? typesSunset[Math.floor(Math.random() * typesSunset.length)]
            : typesNight[Math.floor(Math.random() * typesNight.length)],
          size: 0.6 + Math.random() * 0.6,
          life: 0,
          maxLife: 50 + Math.random() * 40,
        });
      }
    };

    // 11. Interaction Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraAngleX = -0.68;
    let targetCameraAngleY = 0.37;
    let currentCameraAngleX = -0.68;
    let currentCameraAngleY = 0.37;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      targetCameraAngleX = -0.68 + mouseX * 0.18;
      targetCameraAngleY = 0.37 - mouseY * 0.12;
    };

    const handleCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const clickY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(clickX, clickY), camera);

      const intersects = raycaster.intersectObjects(intersectableMeshes);
      if (intersects.length > 0) {
        const point = intersects[0].point;
        spawnPetalBurst(point.x, point.y, point.z);
      } else {
        spawnPetalBurst(0, 1.8, 0);
      }
    };

    // Raycast target collection
    const intersectableMeshes: THREE.Object3D[] = [];
    scene.children.forEach((c) => {
      if (c instanceof THREE.InstancedMesh && c !== cloudMesh && c !== instancedMeshes["star"]) {
        intersectableMeshes.push(c);
      }
    });

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleCanvasClick);

    // 12. Animation Loop
    const startTime = performance.now();
    let animationFrameId: number;
    let isIntersecting = true;

    const dummyObj = new THREE.Object3D();
    const particleColors = new Float32Array(maxParticles * 3);
    const cLeaf = new THREE.Color(0x15803d);
    const cFirefly = new THREE.Color(0xfef08a);
    const cPollen = new THREE.Color(0xffffff);
    const cPetalYellow = new THREE.Color(0xfde047);
    const cPetalRed = new THREE.Color(0xf87171);
    const cPetalBlue = new THREE.Color(0x3b82f6);
    const cSparkCyan = new THREE.Color(0x22d3ee);
    const cSparkPurple = new THREE.Color(0xc084fc);

    const animate = () => {
      if (!isIntersecting) return;

      const time = (performance.now() - startTime) * 0.001;

      // Camera lerp
      currentCameraAngleX += (targetCameraAngleX - currentCameraAngleX) * 0.05;
      currentCameraAngleY += (targetCameraAngleY - currentCameraAngleY) * 0.05;

      const idleOrbit = Math.sin(time * 0.06) * 0.025;
      const finalAngleX = currentCameraAngleX + idleOrbit;

      const radius = 30.5;
      camera.position.x = radius * Math.sin(finalAngleX) * Math.cos(currentCameraAngleY);
      camera.position.z = radius * Math.cos(finalAngleX) * Math.cos(currentCameraAngleY);
      camera.position.y = radius * Math.sin(currentCameraAngleY);
      camera.lookAt(2, 1.5, 2);

      // Clouds movement
      const cMesh = instancedMeshes["cloud"];
      if (cMesh) {
        let blockIndex = 0;
        clouds.forEach((c) => {
          c.x += c.speed;
          if (c.x > 26) {
            c.x = -26;
            c.z = -14 + Math.random() * 28;
          }
          c.blocks.forEach((b) => {
            dummyObj.position.set(c.x + b.dx, c.y + b.dy + Math.sin(time + c.x * 0.1) * 0.025, c.z + b.dz);
            dummyObj.scale.set(1, 1, 1);
            dummyObj.updateMatrix();
            cMesh.setMatrixAt(blockIndex++, dummyObj.matrix);
          });
        });
        cMesh.instanceMatrix.needsUpdate = true;
      }

      // Twinkling stars (night mode only)
      const starMesh = instancedMeshes["star"];
      const starGroup = voxelTypeGroups["star"];
      if (starMesh && starGroup) {
        starGroup.forEach((v, index) => {
          const twinkle = 0.5 + Math.sin(time * 3.5 + v.x * 6) * 0.5;
          dummyObj.position.set(v.x, v.y, v.z);
          dummyObj.scale.set(v.scale!.x * twinkle, v.scale!.y * twinkle, v.scale!.z * twinkle);
          dummyObj.updateMatrix();
          starMesh.setMatrixAt(index, dummyObj.matrix);
        });
        starMesh.instanceMatrix.needsUpdate = true;
      }
      // Slowly spawn leaves naturally dropping from the big oak tree (non-sunset only)
      if (mode !== "sunset" && Math.random() < 0.06) {
        if (particles.length < maxParticles) {
          particles.push({
            position: new THREE.Vector3(
              treeNX + (Math.random() - 0.5) * 6,
              treeYBase + 4 + Math.random() * 3,
              treeNZ + (Math.random() - 0.5) * 6
            ),
            velocity: new THREE.Vector3(
              -0.01 - Math.random() * 0.025, // drift left
              -0.025 - Math.random() * 0.03, // fall down
              (Math.random() - 0.5) * 0.015
            ),
            colorType: "leaf",
            size: 0.5 + Math.random() * 0.5,
            life: 0,
            maxLife: 160 + Math.random() * 100,
          });
        }
      }

      // Update Particles
      let pIndex = 0;
      const colorAttr = new THREE.InstancedBufferAttribute(particleColors, 3);
      particleMesh.geometry.setAttribute("color", colorAttr);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        if (p.colorType === "leaf") {
          p.velocity.x += Math.sin(time * 2 + p.position.y) * 0.002;
        } else if (p.colorType === "firefly" || p.colorType === "pollen") {
          p.velocity.x += (Math.random() - 0.5) * 0.004;
          p.velocity.y += (Math.random() - 0.5) * 0.003;
          p.velocity.z += (Math.random() - 0.5) * 0.004;
          p.velocity.clampLength(0, 0.02);
        } else {
          // Petal/Spark sparks fall with gravity
          p.velocity.y -= 0.006;
          p.velocity.x *= 0.95;
          p.velocity.z *= 0.95;
        }

        p.position.add(p.velocity);

        dummyObj.position.copy(p.position);
        const lifeRatio = 1.0 - p.life / p.maxLife;
        const scale = p.size * (p.colorType.startsWith("petal") || p.colorType.startsWith("spark") ? lifeRatio : Math.min(1.0, lifeRatio * 4));
        dummyObj.scale.set(scale, scale, scale);
        dummyObj.updateMatrix();
        particleMesh.setMatrixAt(pIndex, dummyObj.matrix);

        let pColor = cPollen;
        if (p.colorType === "leaf") pColor = cLeaf;
        else if (p.colorType === "firefly") pColor = cFirefly;
        else if (p.colorType === "petalYellow") pColor = cPetalYellow;
        else if (p.colorType === "petalRed") pColor = cPetalRed;
        else if (p.colorType === "petalBlue") pColor = cPetalBlue;
        else if (p.colorType === "sparkCyan") pColor = cSparkCyan;
        else if (p.colorType === "sparkPurple") pColor = cSparkPurple;

        particleColors[pIndex * 3] = pColor.r;
        particleColors[pIndex * 3 + 1] = pColor.g;
        particleColors[pIndex * 3 + 2] = pColor.b;

        pIndex++;
      }

      for (let i = pIndex; i < maxParticles; i++) {
        dummyObj.position.set(0, -999, 0);
        dummyObj.updateMatrix();
        particleMesh.setMatrixAt(i, dummyObj.matrix);
      }

      particleMesh.instanceMatrix.needsUpdate = true;
      particleMesh.geometry.getAttribute("color").needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Setup IntersectionObserver
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const wasIntersecting = isIntersecting;
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && !wasIntersecting) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(container);

    // Initial trigger
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleCanvasClick);
      renderer.dispose();

      cubeGeo.dispose();
      particleGeo.dispose();
      Object.values(materials).forEach((m) => m.dispose());
    };
  }, [mode]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none"
      style={{
        background: mode === "day"
          ? "linear-gradient(to bottom, #4ea5e9 0%, #7ec2f3 40%, #bae6fd 70%, #dbeafe 100%)"
          : mode === "sunset"
          ? "linear-gradient(to bottom, #1d0f36 0%, #3e1b5b 35%, #76226c 65%, #c2417e 90%, #f472b6 100%)"
          : "linear-gradient(to bottom, #07030e 0%, #0d061a 35%, #180b2a 65%, #2a1145 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-pointer touch-none pointer-events-auto"
      />
      {/* Soft color dodge overlay for warm sunbeams / sunset glow / cool moon glow */}
      <div className={`absolute inset-0 pointer-events-none opacity-20 mix-blend-color-dodge bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] ${
        mode === "day"
          ? "from-amber-100 via-transparent to-transparent"
          : mode === "sunset"
          ? "from-pink-300 via-transparent to-transparent"
          : "from-indigo-200 via-transparent to-transparent"
      }`} />
    </div>
  );
}
