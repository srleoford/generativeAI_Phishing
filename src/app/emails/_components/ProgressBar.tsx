import React from 'react';

interface ProgressBarProps {
    index: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({index, total}) => {
    const percentage = ((index) / total) * 100;

    return (
        <div style={{width: '100%', backgroundColor: '#e0e0df', borderRadius: '5px', position: 'relative'}}>
            <div
                style={{
                    width: `${percentage}%`,
                    height: '10px',
                    backgroundColor: '#76c7c0',
                    borderRadius: '5px',
                }}
            />
            <span style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)'}}>
        {percentage.toFixed(0)}%
      </span>
        </div>
    );
};

export default ProgressBar;