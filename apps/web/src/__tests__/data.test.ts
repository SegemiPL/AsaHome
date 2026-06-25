import { describe, it, expect } from "vitest";
import { siteConfig } from "@/data/site";
import { characters } from "@/data/characters";
import { ttsSamples, ttsProjectInfo } from "@/data/tts-samples";
import { petProjectInfo } from "@/data/pet";

describe("site config", () => {
  it("should have required fields", () => {
    expect(siteConfig.title).toBeTruthy();
    expect(siteConfig.siteUrl).toBeTruthy();
    expect(siteConfig.defaultSeoTitle).toBeTruthy();
  });
});

describe("character data", () => {
  it("should be an array", () => {
    expect(Array.isArray(characters)).toBe(true);
  });
});

describe("tts data", () => {
  it("should have project info", () => {
    expect(ttsProjectInfo.title).toBeTruthy();
    expect(ttsProjectInfo.githubRepo).toBeTruthy();
  });

  it("ttsSamples should be an array", () => {
    expect(Array.isArray(ttsSamples)).toBe(true);
  });
});

describe("pet data", () => {
  it("should have project info", () => {
    expect(petProjectInfo.title).toBeTruthy();
    expect(petProjectInfo.githubRepo).toBeTruthy();
    expect(petProjectInfo.platforms.length).toBeGreaterThanOrEqual(1);
  });
});
