import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import AgeCalculator from "@/lib/age_calculator";

describe("AgeCalculator", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calculates age correctly for a past birthday", () => {
    const age = AgeCalculator({
      day: "15",
      month: "1",
      year: "2000",
      time: "00:00:00",
      gmt: "GMT+0:00",
    });
    expect(age).toBe(26);
  });

  it("calculates age correctly when birthday has not yet occurred this year", () => {
    const age = AgeCalculator({
      day: "20",
      month: "6",
      year: "2000",
      time: "00:00:00",
      gmt: "GMT+0:00",
    });
    expect(age).toBe(25);
  });

  it("handles GMT offset", () => {
    const age = AgeCalculator({
      day: "1",
      month: "1",
      year: "2000",
      time: "00:00:00",
      gmt: "GMT+3:00",
    });
    expect(age).toBe(26);
  });

  it("returns 0 for a recent birth", () => {
    const age = AgeCalculator({
      day: "1",
      month: "6",
      year: "2025",
      time: "00:00:00",
      gmt: "GMT+0:00",
    });
    expect(age).toBe(0);
  });
});
