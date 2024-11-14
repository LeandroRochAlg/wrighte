import React from 'react';

interface Version {
    id: string;
    date: string;
}

interface VersionModalProps {
    versions: Version[];
    currentVersion: string;
    show: boolean;
    onClose: () => void;
}

const VersionModal: React.FC<VersionModalProps> = ({ versions, currentVersion, show, onClose }) => {
    if (!show || versions.length === 0) return null;

    return (
        <div
            className='absolute right-0 bg-slate-300 p-2 rounded-lg mt-2 w-[200px] max-h-[200px] overflow-y-auto z-10 shadow-lg'
            onMouseLeave={onClose}
        >
            <ul>
                {versions.map((version) => (
                    <li key={version.id} className='p-1 hover:bg-slate-400 cursor-pointer text-xs'>
                        <span>Versão: <span className={version.id === currentVersion ? 'font-bold italic' : 'italic'}>{version.id}</span></span>
                        <br />
                        <span className='text-gray-600'>{new Date(version.date).toLocaleDateString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VersionModal;