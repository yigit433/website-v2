"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import Config from "@/yigit433.config";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

function isRemoteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export default function HeroImage() {
  const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null);
  const profileSrc = Config.profilePicture.src;
  const isRemote = profileSrc && isRemoteUrl(profileSrc);

  const { data, error } = useSWR(isRemote ? profileSrc : null, fetcher);

  useEffect(() => {
    if (isRemote) {
      const extracted = getNestedValue(data, Config.profilePicture.field);
      if (extracted) setFinalImageUrl(extracted);
    } else {
      setFinalImageUrl(profileSrc?.startsWith("/") ? profileSrc : `/${profileSrc}`);
    }
  }, [data, error, profileSrc]);

  return (
    <div
      id="hero-avatar"
      className={`relative h-52 w-52 rounded-lg bg-gray-600 ${finalImageUrl ? "" : "animate-pulse"}`}
    >
      {finalImageUrl && (
        <Image
          src={finalImageUrl}
          alt="Profile Picture"
          fill
          className="rounded-lg object-cover"
        />
      )}
    </div>
  );
}
