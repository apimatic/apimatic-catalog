async function FetchTheTopStoryAndAuthorDetails(workflowCtx, portal) {
    return {
        "Step 1": {
            name: "Introduction to the Flow",
            stepCallback: async () => {
                return workflowCtx.showContent(`## Introduction
  This walkthrough will guide you through the process of fetching the top story from Hacker News. We'll be using two different API endpoints in sequence to achieve this:
  1. Get a list of top stories.
  2. Fetch details about the top story.
  `);
            },
        },
        "Step 2": {
            name: "Get Top Stories",
            stepCallback: async (stepState) => {
                await portal.setConfig((defaultConfig) => ({}));
                return workflowCtx.showEndpoint({
                    description:
                        "In this step, we will fetch the IDs of the top stories on Hacker News using the `Topstories Json` endpoint.",
                    endpointPermalink: "$e//topstories.json",
                    verify: (response, setError) => {
                        if (response.StatusCode == 401) {
                            setError("Authentication Token is Required");
                            return false;
                        } else if (response.StatusCode == 200) {
                            return true;
                        } else {
                            setError(
                                "API Call wasn't able to get a valid response. Please try again."
                            );
                            return false;
                        }
                    },
                });
            },
        },
        "Step 3": {
            name: "Fetch Story Details",
            stepCallback: async (stepState) => {
                const step2State = stepState?.["Step 2"];
                console.log(step2State?.data?.[0]?.toString());
                await portal.setConfig((defaultConfig) => ({}));
                return workflowCtx.showEndpoint({
                    description:
                        "Now that we have the list of top stories, we'll use the `Get Item` endpoint to fetch details about the first story in the list.",
                    endpointPermalink: "$e//getItem",
                    args: {
                        id: step2State?.data?.[0]?.toString(),
                    },
                    verify: (response, setError) => {
                        if (response.StatusCode != 200) {
                            setError("Oops, your request failed");
                            return false;
                        } else {
                            return true;
                        }
                    },
                });
            },
        },
        "Step 4": {
            name: "Fetch the authors details",
            stepCallback: async (stepState) => {
                const step3State = stepState?.["Step 3"];
                console.log(step3State?.data?.[0]?.toString());
                await portal.setConfig((defaultConfig) => ({}));
                return workflowCtx.showEndpoint({
                    description:
                        "We will now use the author id from the previous response in the `Get User` endpoint to fetch details about the author.",
                    endpointPermalink: "$e//getUser",
                    args: {
                        id: step3State?.data?.by,
                    },
                    verify: (response, setError) => {
                        if (response.StatusCode != 200) {
                            setError("Oops, your request failed");
                            return false;
                        } else {
                            return true;
                        }
                    },
                });
            },
        }
    };
}
