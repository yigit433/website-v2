"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import useSWR from "swr";

interface GitHubRepo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    updated_at: string;
    archived: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RepositoriesPage() {
    const t = useTranslations("Repositories");
    const { data, error, isLoading } = useSWR(
        "https://api.github.com/users/yigit433/repos",
        fetcher
    );

    if (isLoading) {
        return (
            <section className="py-32 px-4 max-w-6xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl font-semibold text-[color:var(--foreground)]"
                >
                    {t("loading")}
                </motion.div>
            </section>
        );
    }

    if (error || !Array.isArray(data)) {
        return (
            <section className="py-32 px-4 max-w-6xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl font-semibold text-red-500"
                >
                    {t("error")}
                </motion.div>
            </section>
        );
    }

    return (
        <section className="py-16 px-4 max-w-6xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-12 text-center text-gradient-animated"
            >
                {t("title")}
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
                {data.filter((repo: GitHubRepo) => !["bolt.new", "yigit433"].includes(repo.name)).sort(
                    (a: GitHubRepo, b: GitHubRepo) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
                ).map((repo: GitHubRepo) => {
                    const isPortfolio = repo.name === "website-v2";
                    const isOldPortfolio = repo.name === "website";
                    const isArchived = repo.archived;

                    return (
                        <motion.a
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ scale: isPortfolio ? 1.05 : 1.02 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            viewport={{ once: true }}
                            className={`relative p-5 rounded-xl transition duration-300 shadow-md hover:shadow-lg flex flex-col justify-between
                ${isPortfolio ? "border-2 border-yellow-400/40" : ""}
                ${isOldPortfolio ? "opacity-60 hover:opacity-80 border border-gray-400/30" : ""}
                ${isArchived ? "opacity-40 hover:opacity-100 border border-red-300/30 transition-opacity duration-300" : ""}
                bg-[color:var(--card-bg)] text-[color:var(--foreground)]`}
                        >
                            {isPortfolio && (
                                <div className="absolute top-3 right-3 bg-yellow-300 text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-sm">
                                    {t("portfolio")}
                                </div>
                            )}
                            {isOldPortfolio && (
                                <div className="absolute top-3 right-3 bg-gray-400 text-white text-[10px] font-semibold px-2 py-1 rounded-full uppercase shadow-sm">
                                    {t("oldVersion")}
                                </div>
                            )}
                            {isArchived && (
                                <div className="absolute top-3 left-3 bg-red-400 text-white text-[10px] font-semibold px-2 py-1 rounded-full uppercase shadow-sm">
                                    {t("archived")}
                                </div>
                            )}

                            <div>
                                <h3 className="text-lg font-semibold mb-1">{repo.name}</h3>
                                <p className="text-sm opacity-80 mb-3">{repo.description || t("noDescription")}</p>
                            </div>

                            <div className="flex justify-between items-center text-xs font-medium">
                                <span className="opacity-70">{repo.language || t("unknown")}</span>
                                <span className="opacity-70">⭐ {repo.stargazers_count}</span>
                            </div>
                        </motion.a>
                    );
                })}
            </div>
        </section>
    );
}
