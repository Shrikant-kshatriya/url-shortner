import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white text-center p-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg">Oops! The page you are looking for doesn&apos;t exist.</p>
      </div>
    </div>
  );
}
