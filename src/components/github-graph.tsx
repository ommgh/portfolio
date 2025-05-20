"use client";

import { Activity, ActivityCalendar } from "react-activity-calendar";
import { memo, useCallback, useEffect, useState } from "react";

import { useTheme } from "next-themes";

/**
 * Props for the GitHub contribution graph component
 */
type GithubGraphProps = {
  /** GitHub username to fetch contributions for */
  username: string;
  /** Margin between contribution blocks in pixels */
  blockMargin?: number;
  /** Custom color palette for light theme */
  lightColorPalette?: string[];
  /** Custom color palette for dark theme */
  darkColorPalette?: string[];
};

/**
 * API response type for GitHub contributions
 */
type GithubApiResponse = {
  data: Activity[];
  error?: string;
};

const DEFAULT_LIGHT_PALETTE = [
  "#EFF1F3",
  "#9be9a8",
  "#40c463",
  "#30a14e",
  "#216e39",
];

const DEFAULT_DARK_PALETTE = [
  "#000000",
  "#333333",
  "#666666",
  "#999999",
  "#cccccc",
];

/**
 * GitHub contribution graph component that displays user's contribution activity
 */
export const GithubGraph = memo(
  ({
    username,
    blockMargin,
    lightColorPalette = DEFAULT_LIGHT_PALETTE,
    darkColorPalette = DEFAULT_DARK_PALETTE,
  }: GithubGraphProps) => {
    const [contribution, setContribution] = useState<Activity[]>([]);
    const [loading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { resolvedTheme } = useTheme(); // Use resolvedTheme
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    const fetchData = useCallback(async () => {
      setError(null);
      setIsLoading(true);
      try {
        const contributions = await fetchContributionData(username);
        setContribution(contributions);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch contribution data"
        );
        setContribution([]);
      } finally {
        setIsLoading(false);
      }
    }, [username]);

    useEffect(() => {
      if (isMounted) {
        fetchData();
      }
    }, [fetchData, isMounted]);

    const labels = {
      totalCount: `{{count}} contributions in the last year`,
    };

    if (!isMounted) {
      return (
        <div
          style={{ height: "130px", width: "100%" }}
          className="bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md"
          aria-hidden="true"
        />
      );
    }

    if (error) {
      return (
        <div className="text-red-500 p-4 text-center min-h-[130px] flex items-center justify-center">
          Error: {error}
        </div>
      );
    }

    if (loading) {
      return (
        <div className="relative flex items-center justify-center min-h-[130px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      );
    }

    if (contribution.length === 0 && !loading && !error) {
      return (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400 min-h-[130px] flex items-center justify-center">
          No contributions found for this user in the last year.
        </div>
      );
    }

    return (
      <ActivityCalendar
        data={contribution}
        maxLevel={4}
        blockMargin={blockMargin ?? 2}
        labels={labels}
        theme={{
          light: lightColorPalette,
          dark: darkColorPalette,
        }}
        colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    );
  }
);

GithubGraph.displayName = "GithubGraph";

async function fetchContributionData(username: string): Promise<Activity[]> {
  try {
    const response = await fetch(
      `/api/cg?username=${encodeURIComponent(username)}`
    );

    if (!response.ok) {
      let errorDetails = `HTTP error! status: ${response.status}`;
      try {
        const errorText = await response.text();
        errorDetails += `, message: ${errorText}`;
      } catch (e) {}
      throw new Error(errorDetails);
    }

    let responseBody: GithubApiResponse;
    try {
      responseBody = await response.json();
    } catch (parseError) {
      throw new Error("Failed to parse response data.", {
        cause: parseError instanceof Error ? parseError : undefined,
      });
    }

    if (!responseBody || typeof responseBody.data === "undefined") {
      throw new Error("Malformed response: 'data' field is missing.");
    }

    return responseBody.data;
  } catch (error) {
    console.error(
      "Error fetching GitHub contributions:",
      error instanceof Error ? error.message : String(error)
    );
    throw error;
  }
}
