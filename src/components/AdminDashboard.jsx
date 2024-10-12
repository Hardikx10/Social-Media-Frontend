import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const AdminDashboard = () => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetchSubmissions();

        
        const interval = setInterval(() => {
            fetchSubmissions();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const fetchSubmissions = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/submissions`);
            setSubmissions(res.data);
        } catch (error) {
            console.error('Error fetching submissions:', error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-10">
            <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Admin Dashboard</h2>
            {submissions.length === 0 ? (
                <p className="text-center text-gray-600">No submissions yet.</p>
            ) : (
                <div className="space-y-6">
                    {submissions.map((submission) => (
                        <div
                            key={submission._id}
                            className="border border-gray-300 rounded-lg p-4 bg-white shadow-md"
                        >
                            <h3 className="text-xl font-semibold text-gray-800">{submission.name}</h3>
                            <p className="text-gray-600">Social Handle: {submission.socialHandle}</p>
                            <div className="flex flex-wrap mt-4">
                                {submission.images.map((img, index) => (
                                    <a
                                        href={img}
                                        key={index}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mr-4 mb-4"
                                    >
                                        <img
                                            src={img}
                                            alt={`Upload ${index}`}
                                            className="w-24 h-24 object-cover rounded-lg border border-gray-200 shadow-sm"
                                        />
                                    </a>
                                ))}
                            </div>
                            <p className="text-gray-500 text-sm mt-2">
                                Submitted on: {new Date(submission.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;


