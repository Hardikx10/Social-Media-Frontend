import React, { useState } from 'react';
import axios from 'axios';

const SubmissionForm = () => {
    const [name, setName] = useState('');
    const [socialHandle, setSocialHandle] = useState('');
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !socialHandle || images.length === 0) {
            setMessage('Please fill all fields and upload at least one image.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('socialHandle', socialHandle);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            const res = await axios.post('https://social-media-backend-5t0a.onrender.com/api/submissions', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Submission successful!');
            setName('');
            setSocialHandle('');
            setImages([]);
            document.getElementById('images').value=null
        } catch (error) {
            setMessage('Submission failed. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">User Submission Form</h2>
            {message && (
                <p className={`mb-4 text-center ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                    {message}
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Social Media Handle:</label>
                    <input
                        type="text"
                        value={socialHandle}
                        onChange={(e) => setSocialHandle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Upload Images:</label>
                    <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SubmissionForm;

