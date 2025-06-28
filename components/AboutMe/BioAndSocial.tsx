"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Config from "@/yigit433.config";

export default function BioAndSocial() {
    return (
        <div
            className="md:col-span-2 p-6 rounded-2xl shadow-md"
            style={{ backgroundColor: 'var(--card-bg)', color: 'var(--foreground)' }}
        >
            <p className="text-lg leading-relaxed">
                I am a statistics undergraduate with a strong interest in data science, software development, and statistical modeling. I specialize in transforming data into actionable insights using tools like Python, R, and SPSS.
                <br /> <br />
                My technical focus extends to full-stack development, where I utilize technologies such as React, Next.js, Go, and PostgreSQL to build scalable, efficient, and user-centric web applications.
            </p>

            <ul className="mt-6 flex items-center justify-start space-x-4 flex-wrap">
                {Config.personal.socialAccounts.map((account, i) => (
                    <li key={i}>
                        <motion.a
                            href={account.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 rounded-md text-sm font-medium px-4 py-2 transition-all duration-300"
                            style={{
                                color: account.textColor,
                                backgroundColor: account.color,
                            }}
                            initial={{ scale: 1 }}
                            whileHover={{
                                boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)',
                                scale: 1.08,
                            }}
                        >
                            <Image
                                src={account.icon}
                                alt={account.name}
                                width={20}
                                height={20}
                                className="w-5 h-5"
                            />
                            <span>{account.name}</span>
                        </motion.a>
                    </li>
                ))}
            </ul>
        </div>
    );
}