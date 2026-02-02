"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DeviceCanvas from "./DeviceCanvas";
import PropertiesPanel from "./PropertiesPanel";
import Toolbar from "./Toolbar";

export default function MobileAppTool() {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [previewMode, setPreviewMode] = useState("mobile"); // mobile, tablet
    const [appComponents, setAppComponents] = useState([]);
    const [isPreview, setIsPreview] = useState(false);

    const handleAddComponent = (type) => {
        const newComponent = {
            id: Date.now().toString(),
            type,
            data: getDefaultData(type)
        };
        setAppComponents([...appComponents, newComponent]);
        setSelectedComponent(newComponent);
    };

    const handleUpdateComponent = (id, newData) => {
        setAppComponents(appComponents.map(comp =>
            comp.id === id ? { ...comp, data: { ...comp.data, ...newData } } : comp
        ));
        if (selectedComponent?.id === id) {
            setSelectedComponent(prev => ({ ...prev, data: { ...prev.data, ...newData } }));
        }
    };

    const handleDeleteComponent = (id) => {
        setAppComponents(appComponents.filter(c => c.id !== id));
        if (selectedComponent?.id === id) {
            setSelectedComponent(null);
        }
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] w-full flex-col bg-[#F3F4F6] overflow-hidden font-sans text-slate-900">
            <Toolbar
                previewMode={previewMode}
                setPreviewMode={setPreviewMode}
                isPreview={isPreview}
                setIsPreview={setIsPreview}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <div className={`transition-all duration-300 ease-in-out ${isPreview ? '-ml-[300px]' : 'ml-0'}`}>
                    <Sidebar onDragStart={(e, type) => e.dataTransfer.setData("componentType", type)} />
                </div>

                <div className="flex-1 flex justify-center items-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] p-8 overflow-auto min-h-0 relative">
                    <DeviceCanvas
                        previewMode={previewMode}
                        appComponents={appComponents}
                        selectedComponent={selectedComponent}
                        setSelectedComponent={setSelectedComponent}
                        onAddComponent={handleAddComponent}
                        onDeleteComponent={handleDeleteComponent}
                        isPreview={isPreview}
                    />
                </div>

                <div className={`transition-all duration-300 ease-in-out ${isPreview ? '-mr-[320px]' : 'mr-0'}`}>
                    <PropertiesPanel
                        selectedComponent={selectedComponent}
                        onUpdateComponent={handleUpdateComponent}
                    />
                </div>
            </div>
        </div>
    );
}

const getDefaultData = (type) => {
    switch (type) {
        case 'header': return { title: 'New App' };
        case 'hero': return { text: 'Welcome', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' };
        case 'text': return { content: 'Add your text here...' };
        case 'button': return { label: 'Click Me', color: '#3b82f6', textColor: '#ffffff' };
        case 'card': return { title: 'Product Name', subtitle: '$99.00', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' };
        default: return {};
    }
};
