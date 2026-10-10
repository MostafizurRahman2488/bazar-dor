
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-[#f4f9f5]">
      <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
        <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between lg:gap-16">

          {/* Left: Hero Content */}
          <div className="w-full md:w-1/2">
            <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
              বাংলাদেশের দৈনিক বাজার দর
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-[#202820] sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম
              <span className="mt-2 block text-green-700">
                এক নজরে
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
              দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="#সব-পণ্য"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-[#07883f] px-6 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              সব পণ্য দেখুন
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Right: Hero Image */}
          <div className="w-full md:w-1/2">
            <div className="relative mx-auto max-w-lg">
              <Image
                src="/images/bazar-hero.png"
                alt="বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের বাজার"
                width={600}
                height={500}
                priority
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;