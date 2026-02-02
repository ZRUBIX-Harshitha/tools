"use client";

import React, { useState, Suspense, useMemo, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useTexture, Gltf } from "@react-three/drei";
import * as THREE from "three";
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

/* ---------------- CONTROLLERS ---------------- */

function UploadedModel({ url }) {
    return <Gltf src={url} castShadow receiveShadow />;
}

function AdaptiveSlab({ uploadedImage, roughness, metalness, depth, displacementScale }) {
    const texture = useTexture(uploadedImage);
    const meshRef = useRef();

    // Calculate aspect ratio
    const { width, height } = texture.image;
    const aspectRatio = width / height;

    let meshWidth = 4;
    let meshHeight = 4;

    if (aspectRatio > 1) {
        meshHeight = 4 / aspectRatio;
    } else {
        meshWidth = 4 * aspectRatio;
    }

    // Material for the sides (White/Grey)
    const sideMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#dddddd',
        roughness,
        metalness
    }), [roughness, metalness]);

    // Material for the Front/Back (The Image) with Displacement
    const faceMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        map: texture,
        roughness,
        metalness,
        displacementMap: texture, // Use same texture for displacement (brightness = height)
        displacementScale: displacementScale,
        displacementBias: -displacementScale / 2, // Center the displacement
    }), [texture, roughness, metalness, displacementScale]);

    const materials = [
        sideMaterial, sideMaterial, sideMaterial, sideMaterial, faceMaterial, faceMaterial
    ];

    return (
        // High segment count (128x128) needed for displacement quality
        <mesh ref={meshRef} castShadow receiveShadow material={materials} name="generated-model">
            <boxGeometry args={[meshWidth, meshHeight, depth, 1, 1, 1]} />
            {/* Note: BoxGeometry default segments are 1. For displacement on faces,
                we ideally need segments ONLY on the faces. standard box doesn't subdivide faces well for this.
                But 'displacementMap' works on vertices. 
                For a simple box, displacement might just move the whole face unless we subdivide.
                Let's increase width/height segments. Depth segments can be 1.
            */}
            <boxGeometry args={[meshWidth, meshHeight, depth, 64, 64, 1]} />
        </mesh>
    );
}

function DefaultCube({ roughness, metalness }) {
    return (
        <mesh castShadow receiveShadow>
            <boxGeometry args={[3, 3, 3]} />
            <meshStandardMaterial color="white" roughness={roughness} metalness={metalness} />
        </mesh>
    );
}


/* ---------------- MAIN UI ---------------- */
export default function ThreeDDesign() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileType, setFileType] = useState(null);

    // UI State
    const [roughness, setRoughness] = useState(0.2);
    const [metalness, setMetalness] = useState(0.1);
    const [depth, setDepth] = useState(0.2);
    const [displacement, setDisplacement] = useState(0.0); // 3D "Pop" effect

    // Export Ref
    const canvasRef = useRef();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setUploadedFile(objectUrl);
            if (file.name.match(/\.(glb|gltf)$/i)) {
                setFileType('model');
            } else {
                setFileType('image');
            }
        }
    };

    const handleExport = () => {
        const scene = canvasRef.current;
        if (!scene) return;

        const exporter = new GLTFExporter();

        // Find the model mesh to export (searching by name for safety)
        // Or we can just export the whole scene, but that includes lights/grid from Stage.
        // Let's try to export the whole scene for now, user can clean up.
        // Better: Export only the children of the Stage or specific mesh.

        // Simple approach: Export the whole scene.
        exporter.parse(
            scene,
            (gltf) => {
                const output = JSON.stringify(gltf, null, 2);
                const blob = new Blob([output], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.download = 'my-design.gltf'; // GLTFExporter exports .gltf by default (JSON)
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },
            (error) => {
                console.error('An error happened during export:', error);
                alert("Export failed. See console.");
            },
            { binary: true } // Export as .glb (binary)
        );
    };

    // Need to use the GLTFExporter binary option correctly.
    // The library signature: parse( input, onCompleted, onError, options )
    // Options: { binary: true } -> returns ArrayBuffer

    const handleDownloadGLB = () => {
        const scene = canvasRef.current; // This is the Canvas scene? No, canvasRef is checking existence.
        // We need access to the Three.js scene object. 
        // We can't access it easily from outside Canvas unless we use a reference trick or helper.
        // But we can trigger it FROM INSIDE via a context or just use a hacky event?
        // Actually, easiest way is to put the Export Logic Inside a component inside Canvas that listens to a trigger
        // OR use `useThree` inside a component.

        // Let's create a Helper Component called "SceneExporter"
        // See below.
        window.dispatchEvent(new Event('trigger-export'));
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-800">

            {/* CONTROL PANEL */}
            <div className="w-[320px] bg-white border-r border-gray-200 p-6 flex flex-col z-10 shadow-lg overflow-y-auto">
                <h1 className="text-2xl font-bold mb-1">3D Studio</h1>
                <p className="text-xs text-gray-500 mb-8">Professional Mockup Generator</p>

                <div className="space-y-8">
                    {/* Upload */}
                    <div>
                        <h3 className="section-title">1. Upload</h3>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer relative group">
                            <input
                                type="file"
                                accept=".jpg,.png,.jpeg,.webp,.glb,.gltf"
                                onChange={handleFileUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                            </div>
                            <span className="text-sm font-semibold text-gray-700">Select File</span>
                            <span className="text-xs text-center text-gray-400 mt-1 max-w-[150px]">
                                JPG/PNG &rarr; 3D Object<br />
                                GLB &rarr; Real Model
                            </span>
                        </div>
                    </div>

                    {fileType === 'model' && (
                        <div className="p-4 bg-blue-50 text-blue-800 rounded-md text-sm">
                            <strong>3D Model Mode</strong>
                            <p className="text-xs mt-1 opacity-80">Viewing raw 3D file.</p>
                        </div>
                    )}

                    {/* Image Controls */}
                    {(fileType === 'image' || !fileType) && (
                        <>
                            <div>
                                <h3 className="section-title">2. Dimensions</h3>
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs mb-1 font-medium">
                                        <span>Thickness</span>
                                        <span>{Math.round(depth * 100)}%</span>
                                    </div>
                                    <input type="range" min="0.01" max="1.5" step="0.05" value={depth} onChange={(e) => setDepth(parseFloat(e.target.value))} className="slider" />
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1 font-medium">
                                        <span>3D Pop (Displacement)</span>
                                        <span>{Math.round(displacement * 100)}%</span>
                                    </div>
                                    <input type="range" min="0" max="0.5" step="0.05" value={displacement} onChange={(e) => setDisplacement(parseFloat(e.target.value))} className="slider" />
                                </div>
                            </div>

                            <div>
                                <h3 className="section-title">3. Finish</h3>
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs mb-1 font-medium">
                                        <span>Roughness</span>
                                        <span>{Math.round(roughness * 100)}%</span>
                                    </div>
                                    <input type="range" min="0" max="1" step="0.05" value={roughness} onChange={(e) => setRoughness(parseFloat(e.target.value))} className="slider" />
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1 font-medium">
                                        <span>Metalness</span>
                                        <span>{Math.round(metalness * 100)}%</span>
                                    </div>
                                    <input type="range" min="0" max="1" step="0.05" value={metalness} onChange={(e) => setMetalness(parseFloat(e.target.value))} className="slider" />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Export Button */}
                    <div className="pt-6 border-t border-gray-200">
                        <button
                            onClick={handleDownloadGLB}
                            className="w-full bg-[#754DE8] hover:bg-[#643bd9] text-white py-3 rounded-lg font-bold shadow-md transition flex items-center justify-center gap-2"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                            Download 3D Model
                        </button>
                        <p className="text-[10px] text-gray-400 text-center mt-2">Exports as .glb file</p>
                    </div>
                </div>
            </div>

            {/* CANVAS */}
            <div className="flex-grow bg-[#E5E5E5] relative cursor-move">
                <Canvas shadows camera={{ position: [4, 2, 5], fov: 45 }}>
                    <SceneExporterWrapper />
                    <Suspense fallback={null}>
                        <Stage environment="city" intensity={0.6} contactShadow={{ opacity: 0.7, blur: 2 }} adjustCamera={1.2}>
                            <group name="content-to-export">
                                {fileType === 'model' && uploadedFile ? (
                                    <UploadedModel url={uploadedFile} />
                                ) : (
                                    fileType === 'image' && uploadedFile ? (
                                        <AdaptiveSlab
                                            uploadedImage={uploadedFile}
                                            depth={depth}
                                            displacementScale={displacement}
                                            roughness={roughness}
                                            metalness={metalness}
                                        />
                                    ) : (
                                        <DefaultCube
                                            roughness={roughness}
                                            metalness={metalness}
                                        />
                                    )
                                )}
                            </group>
                        </Stage>
                    </Suspense>
                    <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} />
                </Canvas>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-xs font-semibold shadow-sm pointer-events-none">
                    Drag to rotate • Scroll to zoom
                </div>
            </div>

            <style jsx>{`
                .section-title {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-weight: 700;
                    color: #9CA3AF;
                    margin-bottom: 0.75rem;
                }
                .slider {
                    width: 100%;
                    height: 6px;
                    background: #e5e7eb;
                    border-radius: 4px;
                    appearance: none;
                    cursor: pointer;
                }
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    background: #754DE8;
                    border-radius: 50%;
                }
            `}</style>
        </div>
    );
}

/* ---------------- EXPORTER HELPER ---------------- */
// This component sits inside Canvas to have access to the 'scene'
import { useThree } from "@react-three/fiber";

function SceneExporterWrapper() {
    const { scene } = useThree();

    useEffect(() => {
        const handleTrigger = () => {
            const exporter = new GLTFExporter();
            // Find the specific group we want to export
            // The Stage wraps content, so we search recursively for our named group
            const objectToExport = scene.getObjectByName("content-to-export") || scene;

            exporter.parse(
                objectToExport,
                (result) => {
                    const blob = new Blob([result], { type: 'application/octet-stream' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    link.download = 'design.glb';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    setTimeout(() => URL.revokeObjectURL(url), 1000);
                },
                (error) => {
                    console.error('Export error:', error);
                },
                { binary: true }
            );
        };

        window.addEventListener('trigger-export', handleTrigger);
        return () => window.removeEventListener('trigger-export', handleTrigger);
    }, [scene]);

    return null;
}
