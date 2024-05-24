import Image from "next/image";
import kaung from "../../public/kaung.png";

export default function Background() {
  return (
    <div className=" absolute -z-20 flex justify-center items-center  h-svh w-svw ">
      <Image
        alt="Mountains"
        src={kaung}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        // style={{
        //   objectFit: "contain",
        // }}
        className=" object-cover sm:object-contain "
      />
    </div>
  );
}
