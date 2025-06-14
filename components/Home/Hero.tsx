"use client";

import { motion } from "framer-motion";

import Config from "@/yigit433.config";
import HeroImage from "@/components/Home/HeroImage";
import AgeCalculator from "@/lib/age_calculator";

export default function Hero() {
    return (
        <motion.div
            className="mt-4 flex max-[940px]:flex-col-reverse justify-around items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="max-w-2xl flex flex-col lg:text-left text-center">
                <h1 className="font-semibold text-3xl md:text-4xl text-alignment">
                    Self-taught{" "}
                    <span className="text-gradient-animated">
                        {Config.personal.position}
                    </span>
                </h1>
                <p className="text-md sm:text-lg md:text-xl text-alignment">
                    {Config.personal.description.replace(
                        "{age}",
                        String(
                            AgeCalculator({
                                day: Config.personal.birthday.day ?? "",
                                month: Config.personal.birthday.month ?? "",
                                year: Config.personal.birthday.year ?? "",
                                time: Config.personal.birthday.time ?? "",
                                gmt: Config.personal.birthday.gmt ?? "",
                            })
                        )
                    )}
                </p>
            </div>
            <HeroImage />
        </motion.div>
    );
}