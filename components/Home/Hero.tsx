"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import Config from "@/yigit433.config";
import HeroImage from "@/components/Home/HeroImage";
import AgeCalculator from "@/lib/age_calculator";

export default function Hero() {
    const tHome = useTranslations("Home");
    const tConfig = useTranslations("Config");

    const age = AgeCalculator({
        day: Config.personal.birthday.day ?? "",
        month: Config.personal.birthday.month ?? "",
        year: Config.personal.birthday.year ?? "",
        time: Config.personal.birthday.time ?? "",
        gmt: Config.personal.birthday.gmt ?? "",
    });

    return (
        <motion.div
            className="mt-4 flex max-[940px]:flex-col-reverse justify-around items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="max-w-2xl flex flex-col lg:text-left text-center">
                <h1 className="font-semibold text-3xl md:text-4xl text-alignment">
                    {tHome("selfTaught")}{" "}
                    <span className="text-gradient-animated">
                        {tConfig("position")}
                    </span>
                </h1>
                <p className="text-md sm:text-lg md:text-xl text-alignment">
                    {tConfig("description", { age: String(age) })}
                </p>
            </div>
            <HeroImage />
        </motion.div>
    );
}
