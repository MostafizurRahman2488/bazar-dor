
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#eff4ef] ">
      <div className="mx-auto flex min-h-[86px] w-full items-center justify-between  bg-[#fafcfb] px-5 py-5 sm:px-10 lg:px-[200px]">

        {/* Left Side */}
        <p className="text-left text-sm font-medium text-[#344037]">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right Side */}
        <p className="text-right text-sm text-[#344037]">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>

      </div>
    </footer>
  );
};

export default Footer;
