import React from 'react';

interface HeaderProps {
    title?: string;
    description?: string;
    onNewBatch?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, description, onNewBatch }) => {
    return (
        <header className="h-20 border-b border-border-dark flex items-center justify-between px-8 bg-background-dark/80 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-full max-w-md">
                    <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">search</span>
                    <input
                        className="w-full bg-surface-dark border-border-dark rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-600 transition-all focus:outline-none"
                        placeholder="Search batches, IDs, or employees..."
                        type="text"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition-colors">
                    <span className="material-icons text-xl">notifications</span>
                </button>
                {onNewBatch && (
                    <button
                        onClick={onNewBatch}
                        className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
                    >
                        <span className="material-icons text-sm">add</span>
                        New Batch
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
