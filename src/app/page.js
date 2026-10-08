import Hero from "@/components/Hero/Hero";
import AllProducts from "@/components/Home/AllProducts";
import FallingProducts from "@/components/Home/FallingProducts";
import RisingProducts from "@/components/Home/RisingProducts";



export default function Home() {
  return (
    <div className="">
      <Hero></Hero>
      <RisingProducts></RisingProducts>
      <FallingProducts></FallingProducts>
      <AllProducts></AllProducts>
    </div>
  );
}
