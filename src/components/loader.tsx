import React from 'react';
import { Spinner } from '@/once-ui/components'

const Loader = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p style={{marginRight: '20px', fontSize:'25px'}}>Loading...</p>
        <Spinner style={{width:'70px',height:'70px'}} size="xl" />
    </div>
);

export default Loader;