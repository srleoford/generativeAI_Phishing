// import React, { useState, useRef } from 'react';
// import SignatureCanvas from 'react-signature-canvas';
//
// export const SignatureCaptureComponent = () => {
//     const [signatureData, setSignatureData] = useState(null);
//     const signatureCanvasRef = useRef(null);
//
//     const handleSignatureChange = (signature) => {
//         setSignatureData(signature);
//     };
//
//     const clearSignature = () => {
//         signatureCanvasRef.current.clear();
//         setSignatureData(null);
//     };
//
//     return (
//         <div>
//             <SignatureCanvas
//                 ref={signatureCanvasRef}
//                 canvasProps={{ width: 400, height: 200 }}
//                 onEnd={handleSignatureChange}
//             />
//             {signatureData && (
//                 <button onClick={clearSignature}>Clear Signature</button>
//             )}
//             {signatureData && (
//                 <button onClick={() => console.log(signatureData)}>Save Signature</button>
//             )}
//         </div>
//     );
// };