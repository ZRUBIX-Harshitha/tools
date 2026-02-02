'use client';

import React, { useState, Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, Environment, Sparkles, Html, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- 1. SMART PARSER ENGINE ---
// Analyzes text to extract Meaning (Noun) and Style (Adjectives/Colors)

const COLORS = {
    red: '#ef4444', crimson: '#dc2626', ruby: '#e11d48',
    blue: '#3b82f6', azure: '#0ea5e9', indigo: '#6366f1', navy: '#1e3a8a',
    green: '#22c55e', emerald: '#10b981', lime: '#84cc16', forest: '#14532d',
    yellow: '#eab308', gold: '#ffd700', amber: '#f59e0b',
    purple: '#a855f7', violet: '#8b5cf6', plum: '#c026d3',
    pink: '#ec4899', rose: '#f43f5e',
    orange: '#f97316', coral: '#f87171',
    black: '#1f2937', charcoal: '#374151',
    white: '#ffffff', silver: '#c0c0c0', gray: '#9ca3af',
    brown: '#8B4513', bronze: '#cd7f32', wood: '#a0522d'
};

const SHAPES = {
    // Basic
    box: 'box', cube: 'box', block: 'box', square: 'box',
    sphere: 'sphere', ball: 'sphere', orb: 'sphere', planet: 'sphere', moon: 'sphere',
    cone: 'cone', pyramid: 'cone', spike: 'cone',
    cylinder: 'cylinder', tube: 'cylinder', pipe: 'cylinder', pllar: 'cylinder',
    torus: 'torus', donut: 'torus', ring: 'torus', hoop: 'torus',
    knot: 'knot', twist: 'knot', pretzel: 'knot',
    // Complex (Assemblers)
    table: 'table', desk: 'table',
    chair: 'chair', seat: 'chair', stool: 'chair',
    tree: 'tree', plant: 'tree', bush: 'tree',
    robot: 'robot', bot: 'robot', droid: 'robot', mech: 'robot',
    car: 'car', vehicle: 'car', truck: 'car',
    tower: 'tower', building: 'tower', castle: 'tower', skyscraper: 'tower',
    sword: 'sword', dagger: 'sword', blade: 'sword',
    // Animals
    lion: 'animal', tiger: 'animal', dog: 'animal', cat: 'animal', horse: 'animal', wolf: 'animal', fox: 'animal'
};

const MODIFIERS = {
    tall: { scale: [1, 2, 1] }, long: { scale: [1, 1, 2] }, wide: { scale: [2, 1, 1] },
    big: { scale: [1.5, 1.5, 1.5] }, huge: { scale: [2, 2, 2] }, giant: { scale: [3, 3, 3] },
    small: { scale: [0.5, 0.5, 0.5] }, tiny: { scale: [0.3, 0.3, 0.3] },
    flat: { scale: [1, 0.2, 1] }, thin: { scale: [0.2, 1, 0.2] },
    rough: { roughness: 0.9, metalness: 0.1 },
    shiny: { roughness: 0.1, metalness: 0.3 },
    metallic: { roughness: 0.2, metalness: 0.9, color: '#aaa' },
    glass: { roughness: 0, transmission: 1, thickness: 0.5 },
    glowing: { emissive: true, intensity: 2 },
    neon: { emissive: true, intensity: 3 },
    twisted: { distort: 0.6 }, liquid: { distort: 0.8 }, melt: { distort: 1.0 },
    spiky: { rough: true } // mapped differently
};

// --- 2. GENERATIVE GEOMETRY SYSTEM ---

const Assembler = ({ type, color, modifiers, seed }) => {
    // Base Material based on modifiers
    const materialProps = {
        color: color || '#6366f1',
        roughness: modifiers.roughness ?? 0.5,
        metalness: modifiers.metalness ?? 0.1,
    };

    // Helper to Apply Scale Modifiers to a Group
    const groupScale = modifiers.scale || [1, 1, 1];

    switch (type) {
        case 'table':
            return (
                <group scale={groupScale}>
                    <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
                        <boxGeometry args={[2, 0.1, 1.2]} />
                        <meshStandardMaterial {...materialProps} />
                    </mesh>
                    {[-0.8, 0.8].map(x => [-0.4, 0.4].map(z => (
                        <mesh key={`${x}-${z}`} position={[x, 0.4, z]} castShadow receiveShadow>
                            <cylinderGeometry args={[0.05, 0.05, 0.8]} />
                            <meshStandardMaterial {...materialProps} color={color ? color : '#5D4037'} />
                        </mesh>
                    )))}
                </group>
            );
        case 'chair':
            return (
                <group scale={groupScale}>
                    <mesh position={[0, 0.5, 0]} castShadow>
                        <boxGeometry args={[1, 0.1, 1]} />
                        <meshStandardMaterial {...materialProps} />
                    </mesh>
                    <mesh position={[0, 1.25, -0.45]} castShadow>
                        <boxGeometry args={[1, 1.5, 0.1]} />
                        <meshStandardMaterial {...materialProps} />
                    </mesh>
                    {[-0.4, 0.4].map(x => [-0.4, 0.4].map(z => (
                        <mesh key={`${x}-${z}`} position={[x, 0.25, z]} castShadow>
                            <cylinderGeometry args={[0.05, 0.05, 0.5]} />
                            <meshStandardMaterial {...materialProps} />
                        </mesh>
                    )))}
                </group>
            );
        case 'tree':
            return (
                <group scale={groupScale}>
                    <mesh position={[0, 0.5, 0]} castShadow>
                        <cylinderGeometry args={[0.2, 0.3, 1]} />
                        <meshStandardMaterial color="#5D4037" roughness={0.9} />
                    </mesh>
                    <mesh position={[0, 1.5, 0]} castShadow>
                        <dodecahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial color={color || "#22c55e"} roughness={0.8} />
                    </mesh>
                    <mesh position={[0, 2.5, 0]} castShadow>
                        <dodecahedronGeometry args={[0.7, 0]} />
                        <meshStandardMaterial color={color || "#4ade80"} roughness={0.8} />
                    </mesh>
                </group>
            );
        case 'robot':
            return (
                <group scale={groupScale}>
                    <mesh position={[0, 1.5, 0]}>
                        <boxGeometry args={[0.5, 0.5, 0.5]} />
                        <meshStandardMaterial {...materialProps} emissive={modifiers.emissive ? materialProps.color : null} />
                    </mesh>
                    <mesh position={[0, 0.8, 0]}>
                        <cylinderGeometry args={[0.4, 0.3, 1]} />
                        <meshStandardMaterial {...materialProps} color="#94a3b8" />
                    </mesh>
                    {/* Eyes */}
                    <mesh position={[-0.1, 1.55, 0.26]}>
                        <sphereGeometry args={[0.05]} />
                        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
                    </mesh>
                    <mesh position={[0.1, 1.55, 0.26]}>
                        <sphereGeometry args={[0.05]} />
                        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
                    </mesh>
                </group>
            );
        case 'sword':
            return (
                <group scale={groupScale} rotation={[0, 0, Math.PI / 4]}>
                    <mesh position={[0, 1.5, 0]}>
                        <boxGeometry args={[0.3, 2.5, 0.05]} />
                        <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.1} />
                    </mesh>
                    <mesh position={[0, 0.1, 0]}>
                        <boxGeometry args={[0.8, 0.1, 0.2]} />
                        <meshStandardMaterial color={color || "gold"} metalness={0.8} />
                    </mesh>
                    <mesh position={[0, -0.4, 0]}>
                        <cylinderGeometry args={[0.1, 0.1, 1]} />
                        <meshStandardMaterial color="brown" />
                    </mesh>
                </group>
            );
        case 'tower':
            return (
                <group scale={groupScale}>
                    <mesh position={[0, 1.5, 0]}>
                        <boxGeometry args={[1, 3, 1]} />
                        <meshStandardMaterial {...materialProps} color={color || "#94a3b8"} />
                    </mesh>
                    <mesh position={[0, 3.5, 0]}>
                        <coneGeometry args={[0.8, 1.5, 4]} />
                        <meshStandardMaterial color="darkred" />
                    </mesh>
                    {/* Windows */}
                    {[0, 1, 2].map(y => (
                        <mesh key={y} position={[0, y + 0.5, 0.51]}>
                            <planeGeometry args={[0.3, 0.4]} />
                            <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={0.5} />
                        </mesh>
                    ))}
                </group>
            );
        case 'animal':
            const isLion = seed.toLowerCase().includes('lion');
            const isTiger = seed.toLowerCase().includes('tiger');

            // Stylized Low-Poly Colors
            const mainColor = isLion ? '#FFD700' : (isTiger ? '#FF8C00' : (color || '#A0522D'));
            const contrastColor = isLion ? '#8B4513' : (isTiger ? '#000000' : '#4a2c0f');

            return (
                <group scale={groupScale} position={[0, -0.5, 0]}>
                    {/* Stylized Body: Dodecahedron for organic low-poly look */}
                    <mesh position={[0, 0.8, 0]} castShadow>
                        <dodecahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial {...materialProps} color={mainColor} flatShading />
                    </mesh>

                    {/* Neck Connection */}
                    <mesh position={[0, 1.4, 0.6]} rotation={[0.5, 0, 0]}>
                        <cylinderGeometry args={[0.4, 0.6, 0.8, 8]} />
                        <meshStandardMaterial {...materialProps} color={mainColor} flatShading />
                    </mesh>

                    {/* Head Group */}
                    <group position={[0, 2, 0.8]}>
                        {/* Skull */}
                        <mesh castShadow>
                            <boxGeometry args={[0.9, 0.8, 1]} />
                            <meshStandardMaterial {...materialProps} color={mainColor} />
                        </mesh>

                        {/* Snout */}
                        <mesh position={[0, -0.1, 0.55]} castShadow>
                            <boxGeometry args={[0.5, 0.4, 0.4]} />
                            <meshStandardMaterial {...materialProps} color={contrastColor} />
                        </mesh>
                        <mesh position={[0, 0.15, 0.76]}>
                            <boxGeometry args={[0.2, 0.1, 0.1]} />
                            <meshStandardMaterial color="#000" />
                        </mesh>

                        {/* Lion Mane: TorusKnot for volumetric hair */}
                        {isLion && (
                            <mesh position={[0, -0.1, -0.2]} scale={[0.8, 0.9, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
                                <torusKnotGeometry args={[1, 0.4, 64, 8, 2, 3]} />
                                <meshStandardMaterial color={contrastColor} roughness={0.8} />
                            </mesh>
                        )}

                        {/* Tiger Stripes (Torus Rings) */}
                        {isTiger && [-0.2, 0, 0.2].map((z, i) => (
                            <mesh key={i} position={[0, 0, z]} scale={[1.02, 1.02, 1]}>
                                <boxGeometry args={[0.9, 0.8, 0.1]} />
                                <meshStandardMaterial color="black" transparent opacity={0.3} />
                            </mesh>
                        ))}

                        {/* Eyes */}
                        <mesh position={[-0.25, 0.15, 0.51]}>
                            <sphereGeometry args={[0.08]} />
                            <meshStandardMaterial color="#000" emissive="#111" />
                        </mesh>
                        <mesh position={[0.25, 0.15, 0.51]}>
                            <sphereGeometry args={[0.08]} />
                            <meshStandardMaterial color="#000" emissive="#111" />
                        </mesh>

                        {/* Ears */}
                        <mesh position={[-0.35, 0.5, -0.2]} rotation={[0, 0, 0.5]}>
                            <coneGeometry args={[0.15, 0.4, 4]} />
                            <meshStandardMaterial color={mainColor} />
                        </mesh>
                        <mesh position={[0.35, 0.5, -0.2]} rotation={[0, 0, -0.5]}>
                            <coneGeometry args={[0.15, 0.4, 4]} />
                            <meshStandardMaterial color={mainColor} />
                        </mesh>
                    </group>

                    {/* Legs (Tapered) */}
                    {[[-0.5, 0.8], [0.5, 0.8], [-0.5, -0.6], [0.5, -0.6]].map((pos, i) => (
                        <mesh key={i} position={[pos[0], 0, pos[1]]}>
                            <cylinderGeometry args={[0.15, 0.25, 1.6, 8]} />
                            <meshStandardMaterial {...materialProps} color={mainColor} flatShading />
                        </mesh>
                    ))}

                    {/* Tail */}
                    <group position={[0, 0.5, -0.9]} rotation={[0.5, 0, 0]}>
                        <mesh position={[0, 0.4, 0]}>
                            <cylinderGeometry args={[0.05, 0.08, 1]} />
                            <meshStandardMaterial {...materialProps} color={mainColor} />
                        </mesh>
                        <mesh position={[0, 0.9, 0]}>
                            <dodecahedronGeometry args={[0.15]} />
                            <meshStandardMaterial color={contrastColor} />
                        </mesh>
                    </group>
                </group>
            );
        default: return null;
    }
}

// --- 3. ABSTRACT SCULPTOR (For unknown inputs) ---
const AbstractSculptor = ({ seed, color, modifiers }) => {
    // Generate deterministic random values from seed string
    const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rand = (i) => Math.abs(Math.sin(hash + i));

    // Decide base geometry based on hash
    const geoType = rand(1) > 0.5 ? 'knot' : (rand(2) > 0.5 ? 'sphere' : 'box');

    const materialProps = {
        color: color || `hsl(${rand(3) * 360}, 70%, 50%)`,
        roughness: modifiers.roughness ?? 0.2,
        metalness: modifiers.metalness ?? 0.8,
        distort: modifiers.distort ?? (0.3 + rand(4) * 0.4),
        speed: 2
    };

    return (
        <mesh castShadow>
            {geoType === 'knot' && <torusKnotGeometry args={[1, 0.3, 128, 16]} />}
            {geoType === 'sphere' && <sphereGeometry args={[1.5, 64, 64]} />}
            {geoType === 'box' && <boxGeometry args={[2, 2, 2]} />}

            <MeshDistortMaterial {...materialProps} />
        </mesh>
    );
};

// --- MAIN COMPONENT ---

export default function TextTo3D() {
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null); // { type, color, modifiers, valid }
    const [history, setHistory] = useState([]);

    const handleGenerate = () => {
        if (!inputText.trim()) return;
        setLoading(true);
        setResult(null);

        // Simulate "Thinking" time for realism
        setTimeout(() => {
            const text = inputText.toLowerCase();
            const words = text.split(/[\s,]+/);

            // 1. Analyze Color
            let color = null;
            for (const word of words) {
                if (COLORS[word]) color = COLORS[word];
            }

            // 2. Analyze Modifiers
            let modifiers = {};
            for (const word of words) {
                if (MODIFIERS[word]) {
                    modifiers = { ...modifiers, ...MODIFIERS[word] };
                }
            }

            // 3. Analyze Shape/Type
            let type = null;
            let valid = false;

            // Check structured shapes first
            for (const word of words) {
                if (SHAPES[word]) {
                    type = SHAPES[word];
                    valid = true;
                    break;
                }
            }

            // If no type found, use "Abstract" type
            if (!type) {
                type = 'abstract';
            }

            const data = {
                type,
                color,
                modifiers,
                seed: inputText, // Use full text as seed for uniqueness
                text: inputText
            };

            setResult(data);
            setHistory(prev => [data, ...prev].slice(0, 5));
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            {/* Header / Controls */}
            <div className="p-6 bg-gray-800 border-b border-gray-700 shadow-xl z-10">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                            Local 3D Fabricator
                        </h1>
                        <p className="text-xs text-gray-400 font-mono">
                            PROCEURAL GENERATION ENGINE v2.1 • DEBUG MODE 🦁
                        </p>
                    </div>
                </div>

                <div className="flex gap-2 max-w-3xl w-full">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Ex: 'Gold Lion', 'Red Tiger'..."
                        className="flex-1 px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-500"
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className={`px-8 py-3 rounded-lg font-bold tracking-wide transition-all ${loading ? 'bg-gray-700 cursor-wait' : 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/20'
                            }`}
                    >
                        {loading ? 'FABRICATING...' : 'GENERATE'}
                    </button>
                </div>

                {/* Debug Info */}
                {result && (
                    <div className="mt-2 text-[10px] text-gray-500 font-mono">
                        DEBUG: Type=[{result.type}] Seed=[{result.seed}] Lion=[{result.seed.toLowerCase().includes('lion').toString()}]
                    </div>
                )}

                {/* Suggestions */}
                <div className="flex gap-2 mt-3 text-[10px] text-gray-500 overflow-x-auto pb-1">
                    <span>Try:</span>
                    {['Gold Lion', 'Cyberpunk Tiger', 'Neon Robot', 'Twisted Metal'].map(t => (
                        <button key={t} onClick={() => setInputText(t)} className="px-2 py-1 bg-gray-700/50 hover:bg-gray-700 rounded transition-colors whitespace-nowrap">
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 relative bg-[#050505] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-black to-black"></div>

                <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
                    <Suspense fallback={null}>
                        {/* Lighting Environment */}
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                        <pointLight position={[-10, 5, -5]} intensity={0.5} color={result?.color || "white"} />
                        <Environment preset="city" />

                        {result && (
                            <Center>
                                {['table', 'chair', 'tree', 'robot', 'car', 'tower', 'sword', 'animal'].includes(result.type) ? (
                                    <Assembler {...result} />
                                ) : ['box', 'sphere', 'cone', 'cylinder', 'torus', 'knot'].includes(result.type) ? (
                                    <mesh castShadow receiveShadow scale={result.modifiers.scale || [1, 1, 1]}>
                                        {result.type === 'box' && <boxGeometry args={[2, 2, 2]} />}
                                        {result.type === 'sphere' && <sphereGeometry args={[1.2, 32, 32]} />}
                                        {result.type === 'cone' && <coneGeometry args={[1, 2, 32]} />}
                                        {result.type === 'cylinder' && <cylinderGeometry args={[1, 1, 2, 32]} />}
                                        {result.type === 'torus' && <torusGeometry args={[1.5, 0.4, 16, 50]} />}
                                        {result.type === 'knot' && <torusKnotGeometry args={[1, 0.3, 100, 16]} />}

                                        {result.modifiers.distort ? (
                                            <MeshDistortMaterial
                                                color={result.color || '#white'}
                                                roughness={result.modifiers.roughness ?? 0.4}
                                                metalness={result.modifiers.metalness ?? 0.1}
                                                distort={result.modifiers.distort}
                                                speed={2}
                                            />
                                        ) : (
                                            <meshStandardMaterial
                                                color={result.color || '#white'}
                                                roughness={result.modifiers.roughness ?? 0.4}
                                                metalness={result.modifiers.metalness ?? 0.1}
                                                emissive={result.modifiers.emissive ? (result.color || 'white') : null}
                                                emissiveIntensity={result.modifiers.intensity || 0}
                                            />
                                        )}
                                    </mesh>
                                ) : (
                                    // Fallback for completely unknown words -> Abstract Sculptor
                                    <AbstractSculptor {...result} />
                                )}
                            </Center>
                        )}

                        {/* Floor */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                            <planeGeometry args={[100, 100]} />
                            <meshStandardMaterial color="#111" roughness={0.5} metalness={0.5} transparent opacity={0.5} />
                        </mesh>
                        <gridHelper args={[20, 20, '#333', '#111']} position={[0, -1.99, 0]} />

                        <OrbitControls makeDefault autoRotate autoRotateSpeed={1} />
                        {result?.modifiers?.glowing && <Sparkles count={50} scale={6} size={4} speed={0.4} opacity={0.5} color={result.color} />}
                    </Suspense>
                </Canvas>

                {/* Overlay Text for "Originality" */}
                {result && (
                    <div className="absolute bottom-6 left-6 p-4 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 max-w-sm">
                        <div className="text-[10px] uppercase tracking-widest text-emerald-400 mb-1">Generated Output</div>
                        <h2 className="text-xl font-bold capitalize mb-1">{result.text}</h2>
                        <div className="flex gap-2 text-xs text-gray-400">
                            <span className="bg-white/10 px-2 py-0.5 rounded">Type: {result.type}</span>
                            {result.color && <span className="bg-white/10 px-2 py-0.5 rounded" style={{ color: result.color }}>Color: {result.color}</span>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
