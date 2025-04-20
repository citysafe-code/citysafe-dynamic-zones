
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const City3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#1E3A8A');
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3B82F6,
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Building materials
    const buildingMaterials = [
      new THREE.MeshStandardMaterial({ color: 0x1E3A8A, roughness: 0.7 }),
      new THREE.MeshStandardMaterial({ color: 0x1E40AF, roughness: 0.7 }),
      new THREE.MeshStandardMaterial({ color: 0x2563EB, roughness: 0.7 })
    ];
    
    // Create buildings
    const buildings: THREE.Mesh[] = [];
    const buildingCount = 50;
    
    for (let i = 0; i < buildingCount; i++) {
      const width = Math.random() * 2 + 1;
      const height = Math.random() * 8 + 2;
      const depth = Math.random() * 2 + 1;
      
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const material = buildingMaterials[Math.floor(Math.random() * buildingMaterials.length)];
      const building = new THREE.Mesh(geometry, material);
      
      // Position randomly within a circle
      const radius = Math.random() * 15 + 2;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      building.position.set(x, height/2, z);
      building.castShadow = true;
      building.receiveShadow = true;
      
      scene.add(building);
      buildings.push(building);
    }
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the scene slightly
      scene.rotation.y += 0.002;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return <div ref={containerRef} className="w-full h-full min-h-[400px] rounded-lg overflow-hidden" />;
};

export default City3D;
