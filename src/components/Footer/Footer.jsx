import React from "react";

const Footer = () => {
return ( 
<footer className="mt-auto w-full border-t border-[#dce5dd] bg-[#eff4ef]"> <div className="mx-auto flex min-h-[82px] max-w-7xl flex-col items-center justify-between gap-3 bg-[#fafcfb] px-5 py-5 sm:flex-row sm:px-8">
{/* Left Side */} 
<p className="text-center text-sm font-medium text-[#344037] sm:text-left">
বাজার দর – প্রয়োজনীয় পণ্যের দাম এক নজরে। </p>


{/* Right Side */}
    <p className="text-center text-sm text-[#344037] sm:text-right">
      সকল দাম সন্ধ্যায়; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
    </p>
  </div>
</footer>
);
};

export default Footer;
