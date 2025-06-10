import Config from "@/yigit433.config";

import HeroImage from "@/components/Home/HeroImage";

export default function Hero() {
    return (
        <div className="mt-4 flex max-[940px]:flex-col-reverse justify-around items-center">
            <div className="max-w-2xl flex flex-col lg:text-left text-center">
                <h1 className="font-semibold text-3xl md:text-4xl text-alignment">
                    Self{" "}
                    <span className="text-gradient-animated">
                        {Config.personal.position}
                    </span>
                </h1>
                <p className="text-md sm:text-lg md:text-xl text-alignment">
                    {Config.personal.description}
                </p>
            </div>
            <HeroImage />
        </div>
    );
}