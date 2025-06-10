"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import Config from "@/yigit433.config";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function getNestedValue<T>(
  obj: Record<string, unknown>,
  path: string
): T | undefined {
  return path.split('.').reduce<unknown>((acc, part) => {
    if (typeof acc === 'object' && acc !== null && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj) as T | undefined;
}

function isRemoteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export default function HeroImage() {
  const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null);

  const profileSrc = Config.profilePicture.src;
  const fieldPath = Config.profilePicture.field;
  const isRemote = profileSrc && isRemoteUrl(profileSrc);

  interface RemoteData {
    [key: string]: unknown;
  }

  const { data, error } = useSWR<RemoteData>(isRemote ? profileSrc : null, fetcher);

  useEffect(() => {
    if (isRemote && data && fieldPath) {
      const extracted = getNestedValue<string>(data, fieldPath);
      if (extracted) {
        setFinalImageUrl(extracted);
      }
    } else {
      setFinalImageUrl(
        profileSrc?.startsWith("/") ? profileSrc : `/${profileSrc}`
      );
    }
  }, [data, error, profileSrc, isRemote, fieldPath]);

  return (
    <div
      id="hero-avatar"
      className={`relative h-52 w-52 rounded-lg bg-gray-600 ${
        finalImageUrl ? "" : "animate-pulse"
      }`}
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