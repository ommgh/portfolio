import { NextRequest, NextResponse } from "next/server";

const GITHUB_ENDPOINT = "https://api.github.com/graphql";

interface GraphqlRequest {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: Record<string, any>;
}

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
}

interface ContributionResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: {
            contributionDays?: ContributionDay[];
          }[];
        };
      };
    };
  };
  errors?: {
    message: string;
    locations: { line: number; column: number }[];
    extensions: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      problems: { path: any[]; explanation: string }[];
    };
  }[];
}

export interface ApiResponse {
  date: string;
  count: number;
  level: number;
}

/**
 * Maps GitHub contribution levels to numeric values
 */
function mapContributionLevel(level: string): number {
  switch (level) {
    case "FIRST_QUARTILE":
      return 1;
    case "SECOND_QUARTILE":
      return 2;
    case "THIRD_QUARTILE":
      return 3;
    case "FOURTH_QUARTILE":
      return 4;
    default:
      return 0; // Use 0 for "NONE" or unknown levels
  }
}

/**
 * Fetches GitHub contribution data for a user
 */
async function getGitHubContributions(
  username: string
): Promise<ApiResponse[]> {
  if (!username) {
    throw new Error("Username parameter is required");
  }

  const currentTime = new Date();
  // Set the 'from' date to the same date last year
  const from = new Date(
    currentTime.getFullYear() - 1,
    currentTime.getMonth(),
    currentTime.getDate()
  );
  // Set the 'to' date to the present date and time
  const to = currentTime;

  // Format the dates in the desired format
  const fromStr = from.toISOString();
  const toStr = to.toISOString();

  const query = `query ($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }`;

  const variables = {
    username,
    from: fromStr,
    to: toStr,
  };

  const requestBody: GraphqlRequest = {
    query,
    variables,
  };

  try {
    const response = await fetch(GITHUB_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = (await response.json()) as ContributionResponse;

    if (data.errors && data.errors.length > 0) {
      throw new Error(`GitHub API error: ${data.errors[0].message}`);
    }

    if (
      !data.data?.user?.contributionsCollection?.contributionCalendar?.weeks
    ) {
      return [];
    }

    const apiResponse: ApiResponse[] = [];
    data.data.user.contributionsCollection.contributionCalendar.weeks.forEach(
      (week) => {
        if (week.contributionDays) {
          week.contributionDays.forEach((day) => {
            apiResponse.push({
              date: day.date,
              count: day.contributionCount,
              level: mapContributionLevel(day.contributionLevel),
            });
          });
        }
      }
    );

    return apiResponse;
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    throw error;
  }
}

// GET handler
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username parameter is required" },
      { status: 400 }
    );
  }

  try {
    const contributions = await getGitHubContributions(username);
    // Return data in the format the client expects: { data: [...] }
    return NextResponse.json({ data: contributions });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
