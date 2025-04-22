
import { useState } from 'react';

interface ProductImagesProps {
  imageUrl: string;
  name: string;
}

const ProductImages = ({ imageUrl, name }: ProductImagesProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square bg-secondary rounded-xl overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {Array(4).fill(0).map((_, index) => (
          <div 
            key={index} 
            className="aspect-square bg-secondary rounded-lg overflow-hidden cursor-pointer"
          >
            <img
              src={imageUrl}
              alt={`${name} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
