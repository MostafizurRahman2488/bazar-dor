import React from 'react';

const CategoryDetailPage = async({ params }) => {
    const {slug}=await params

    const res=await fetch("")
    const Category=await res.json()
    
    return (
        <div>
            
        </div>
    );
};

export default CategoryDetailPage;