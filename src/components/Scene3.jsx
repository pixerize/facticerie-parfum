import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { a, useSpring } from '@react-spring/three';
import * as THREE from 'three';

export function Model3(props, { onClick }) {
    const model = useGLTF('/parfum_bottle.gltf');
    const { nodes, materials } = model;
    const camera = useThree((state) => state.camera);
    const [capOpen, setCapOpen] = useState(false);

    const { capY } = useSpring({
        capY: capOpen ? 20.5 : 20,
        config: { tension: 120, friction: 10 },
    });

    useLayoutEffect(() => {
        camera.position.set(-0.1, 0.4, 3);
        if (window.matchMedia('(max-width: 48em)').matches) {
            camera.fov = 35;
            camera.updateProjectionMatrix();
        }
    }, [camera]);

    useEffect(() => {
        model.scene.traverse((child) => {
            if (child.isMesh && child.material) {
                const mat = child.material;
                mat.side = THREE.FrontSide;
                mat.depthTest = true;
                mat.envMapIntensity = 2;

                if (child.name.includes('Glass')) {
                    mat.transparent = true;
                    mat.opacity = 0.35;
                    mat.metalness = 0.2;
                    mat.roughness = 0.05;
                    mat.color.set('#111111');
                    mat.ior = 1.45;
                    mat.transmission = 1;
                    mat.thickness = 1.0;
                    mat.depthWrite = true;
                    mat.renderOrder = 1;
                } else if (child.name.includes('Liquid')) {
                    mat.transparent = true;
                    mat.opacity = 1.0;
                    mat.color.set('#ff2a2a');
                    mat.metalness = 0;
                    mat.roughness = 0.1;
                    mat.ior = 1.33;
                    mat.transmission = 1;
                    mat.depthWrite = false;
                    mat.renderOrder = 2;
                } else if (child.name.includes('Nozzle') || child.name.includes('Top')) {
                    mat.metalness = 1;
                    mat.roughness = 0.1;
                    mat.transparent = false;
                    mat.opacity = 1;
                    mat.map = null;
                    mat.depthWrite = true;
                }

                mat.needsUpdate = true;
            }
        });
    }, [model]);

    return (
        <group {...props} dispose={null} onClick={onClick}>
            {/* 💡 Lighting for better appearance */}
            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 2, 5]} intensity={2} castShadow />
            <pointLight position={[-2, 1, -3]} intensity={1.2} />
            <spotLight position={[0, 5, 5]} angle={0.4} penumbra={0.5} intensity={1.5} castShadow />

            <group scale={0.01}>
                <group position={[0, -50, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={30}>
                    <mesh geometry={nodes.Bottle_1_Realistic_Glass_0.geometry} material={materials.Realistic_Glass} />
                    <mesh geometry={nodes.Circle001_Realistic_Glass_0.geometry} material={materials.Realistic_Glass} position={[0, 0, 2.477]} />
                    <mesh geometry={nodes.Liquid_Realistic_Glass001_0.geometry} material={materials['Realistic_Glass.001']} />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload('/parfum_bottle.gltf');
