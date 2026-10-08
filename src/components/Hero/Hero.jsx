
import Image from "next/image";

const Hero = () => {
    return (
        <div className="container mx-auto">
            <div className="flex items-center">
                <div>
                    <button className="btn px-20"></button>

                    <h1>আজকের বাজারের দাম এক নজরে</h1>

                    <p>
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                        বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <button className="btn">সব পণ্য দেখুন</button>
                </div>

                <div>
                    <Image
                        src="/images/bazar-hero.png"
                        alt="Bazar Dor Hero Image"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;

