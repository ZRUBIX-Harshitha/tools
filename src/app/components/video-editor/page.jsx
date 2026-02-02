"use client";

import React, { useState } from "react";
import HomeDashboard from "./HomeDashboard";
import CanvaEditor from "./CanvaEditor";

export default function EditingPage() {
    const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'editor'
    const [editorConfig, setEditorConfig] = useState(null);

    const handleOpenEditor = (config) => {
        setEditorConfig(config);
        setCurrentView('editor');
    };

    const handleCloseEditor = () => {
        setCurrentView('dashboard');
        setEditorConfig(null);
    };

    return (
        <>
            {currentView === 'dashboard' ? (
                <HomeDashboard onOpenEditor={handleOpenEditor} />
            ) : (
                <CanvaEditor onClose={handleCloseEditor} config={editorConfig} />
            )}
        </>
    );
}
