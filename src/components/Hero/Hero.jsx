
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-[#F0F5F0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid min-h-[340px] items-center gap-6 rounded-[28px] border border-[#DFE8DF] bg-[#FAFCFA] px-5 py-8 shadow-sm sm:px-8 md:grid-cols-[1.5fr_0.8fr] md:px-12 md:py-10 lg:px-14">

          {/* Left Content */}
          <div className="order-2 md:order-1">
            {/* Green Label */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#078A43] px-5 py-2 text-sm font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-white" />
              বাংলাদেশের দৈনিক বাজার দর
            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-[#202B23] sm:text-4xl lg:text-[40px]">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-base leading-8 text-[#465249] sm:text-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার
              দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-
              সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Button */}
            <div className="mt-7">
              <Link
                href="#সব-পণ্য"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#078A43] px-7 py-3.5 font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#067537] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
              >
                সব পণ্য দেখুন
                <span aria-hidden="true" className="text-xl">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 flex items-center justify-center md:order-2">
            <div className="relative flex w-full max-w-[340px] items-center justify-center">
              {/* Soft Background */}
              <div className="absolute h-48 w-48 rounded-full bg-[#E4F2E6] blur-3xl sm:h-60 sm:w-60" />

              <Image
                src="/images/bazar-hero.png"
                alt="বাজারের ঝুড়িতে তাজা শাকসবজি"
                width={400}
                height={320}
                priority
                sizes="(max-width: 768px) 90vw, 35vw"
                className="relative h-auto w-full object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
