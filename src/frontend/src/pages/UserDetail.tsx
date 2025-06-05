import React, { useEffect, useState } from 'react';
import { Principal } from "@dfinity/principal"
import { formatDate } from '../utils/dateUtils';
import { Certificate, User } from '../declarations/backend/backend.did';
import { useSession } from '../context/sessionContext';
import { useParams } from 'react-router-dom';
import { compressAndConvertImage,  blobToImageUrl, uint8ArrayToBase64 } from "../utils/imageManager"


const UserDetail: React.FC = () => {
    const { id } = useParams();
    const { backend, user } = useSession();

    const [userVisited, setUserVisited] = useState<User | null>(null);
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [avatar, setAvatar] = useState("")

    const fetchData = async () => {
        try {
            setLoading(true);
            if (!id) {
                throw new Error('user id is required');
            }
            const userData = await backend.getUser(Principal.fromText(id));
            
            if(userData.length != 0){
                setUserVisited(userData[0])
                setCertificates(userData[0].certificates);
                const imageUrl = userData[0].avatar.length != 0 ? 
                    blobToImageUrl(userData[0].avatar[0])
                    : null
                
                setAvatar(imageUrl || "https://avatar.iran.liara.run/public/41")
                
            };
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadImage = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const file = target.files[0];
                const photoPreview = await compressAndConvertImage(file, 20)
                const photo = await compressAndConvertImage(file, 700, 800, 800)
                const base64Image =  "data:image/png;base64," +  uint8ArrayToBase64(photo);
                
                //TODO convertir a blob
                const response = await backend.loadAvatar(photo, photoPreview);
                if("Ok" in response) {
                    setAvatar(base64Image)
                }
            }
        };
        input.click();
    };

    useEffect(() => {

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="animate-pulse">
                        <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!userVisited) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-700">User not found</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="bg-white text-gray-700 rounded-lg shadow-lg p-6">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="text-center md:w-1/3">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <img
                                src={avatar}
                                alt={userVisited.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                            {user?.principal.toString() === id && (
                                <svg
                                    onClick={handleUploadImage}
                                    width="18" 
                                    height="18" 
                                    viewBox="1 1 22 22" 
                                    focusable="false" 
                                    className="KkhfNb NMm5M absolute bottom-3 right-3  bg-opacity-50 rounded-full bg-white p-[2px]"
                                >
                                    <path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 14H4V7h16v12zM12 9c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>
                                </svg>
                            )}
                            
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{userVisited.name}</h2>
                        {userVisited.verified && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Verified
                            </span>
                        )}
                    </div>

                    <div className="md:w-2/3">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4">User Information</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {userVisited.email && (
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>{userVisited.email}</span>
                                    </div>
                                )}
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span>Score: {userVisited.score}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Certificates Section */}
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Certificates
                    </h3>
                    <div className="space-y-4">
                        {certificates.length > 0 ? (
                            certificates.map((certificate) => (
                                <div key={certificate.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                    <h4 className="font-medium text-lg mb-2">{certificate.title}</h4>
                                    <p className="text-gray-600 mb-2">{certificate.description}</p>
                                    <div className="text-sm text-gray-500">
                                        <span>Issued: {formatDate(Number(certificate.expeditionDate) / 1000000)}</span>
                                        {certificate.expirationDate && (
                                            <span className="ml-4">Expires: 
                                                {
                                                    certificate.expirationDate.length != 0 ? formatDate(Number(certificate.expirationDate)):' No expire'
                                                }
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <p className="font-medium">No certificates yet</p>
                                <p className="text-sm">Complete tasks to earn certificates</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
