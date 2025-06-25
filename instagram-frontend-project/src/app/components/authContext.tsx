// 'use client'
// import { useState, useEffect } from 'react';

// export const authContext = () => {
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string>('');
//     const [success, setSuccess] = useState<string>('');

//     useEffect(() => {
//         if (error) {
//             const timer = setTimeout(() => {
//                 setError('');
//             }, 3000);
//             return () => clearTimeout(timer);
//         }
//     }, [error]);

//     return { loading, setLoading, error, setError, success, setSuccess };
// };
