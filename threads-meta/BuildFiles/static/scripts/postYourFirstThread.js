async function postYourFirstThread(workflowCtx, portal) {
    return {
      "Step 1": {
        name: "Getting Started",
        stepCallback: async () => {
          return workflowCtx.showContent(`
#### Introduction
Welcome to this guided walkthrough, named "Post Your First Thread," where we'll show you how to set up your app on the Threads platform by Meta and post your first thread. This step-by-step guide will help you navigate through the API setup and posting process effectively, ensuring you can share your content on Threads seamlessly.
Before we get started, we need to ensure you have a Threads account and a Facebook app. If you haven't created these yet, please do so before proceeding.
#### Create Your App
1. **Visit Facebook App Creation:**
- Go to [Facebook App Creation](https://developers.facebook.com/apps/creation/).
2. **Create Your App:**
- Follow the instructions to create your app.
3. **Add Necessary Scopes:**
- Make sure to add all required scopes to your app.
4. **Note Redirect URLs:**
- Keep track of the redirect URLs, as we will need these later.
#### Add Test User
1. **Add a Test User:**
- If it's a new app, you can add a test user.
2. **Verify Yourself:**
- Follow the steps on the Facebook Developers page to verify.
3. **Note Credentials:**
- Record your Client ID and Client Secret in a safe place.

#### Obtain Bearer Token
1. **Click the Generate Token button above:**
- Head on to the header, click the generate token button.
2. **Enter Credentials:**
- Input your Client ID, Client Secret and redirect URI that you obtained in the first step.
3. **Get Authorization Token:**
- Click ‘Get Token’ Button to get the generated Authentication token to this Portal so you can make API calls.
- Now, where you want to use the token, you can hit the use token button and it will automatically insert your token in its required field.
          
By completing these steps, you'll have your app set up and be ready to post your first thread. In the next section, we'll guide you through the process of publishing your first thread on Threads. Let's dive in!`);
        },
      },
      "Step 2": {
        name: "Create a Threads Media Container",
        stepCallback: async (stepState) => {
          await portal.setConfig((defaultConfig) => ({
            ...defaultConfig,
          }));
          return workflowCtx.showEndpoint({
            description: `### Description
In this step, we'll create a media container for your thread. After generating your token using the authentication dropdown, enter the \`access_token\` and \`threads-user-id\` obtained from it. Since we aim to make a text post, basic entries have already been provided for you. Click the "Try it out" button in the bottom right corner. You should receive a 200 response that includes the media ID. Copy this media ID to your clipboard and proceed to the next step.`,
            endpointPermalink: "$e/Publishing/threads",
            verify: (response, setError) => {
              if (response.StatusCode != 200) {
                setError(
                  "Seems like something went wrong. You will find the error message in the API Response. If you have having difficulty with Autentication, we have a guide for you in our docs."
                );
                return false;
              } else {
                return true;
              }
            },
          });
        },
      },
      "Step 3": {
        name: "Publishing your thread media",
        stepCallback: async (stepState) => {
          const step2State = stepState?.["Step 2"];
          const mediaID = step2State?.data?.id;
          await portal.setConfig((defaultConfig) => ({
            ...defaultConfig,
          }));
          return workflowCtx.showEndpoint({
            description: `### Description
Now that we've uploaded our media container, it's time to publish it to the Threads application. Enter the \`access_token\` and \`threads-user-id\` fields from the generated token once again. Use the \`creation_id\` in your clipboard, obtained in the previous step. Click the "Try it out" button. When you receive the 200 OK response, head over to your Threads account and refresh your page. You should see your first post on the app! Proceed to the final section to wrap up.`,
            endpointPermalink: "$e/Publishing/threads_publish",
            args: {
              creation_id: mediaID,
            },
            verify: (response, setError) => {
              if (response.StatusCode == 200 || response.StatusCode == 201) {
                return true;
              } else {
                setError(
                  "Seems like something went wrong. You will find the error message in the API Response."
                );
                return true;
              }
            },
          });
        },
      },
  
      Finish: {
        name: "What's Next",
        stepCallback: async () => {
          return workflowCtx.showContent(`### Congratulations! Guided Walkthrough Completed
We trust this guided walkthrough has provided a valuable learning experience!
While this walkthrough offers insights into utilizing the Threads API by Meta, it may not cover every potential use case. However, fear not! Our AI Chatbot, **API Copilot**, stands ready to assist you in curating code samples tailored to your specific needs.
Whether you're exploring advanced functionalities or seeking solutions for niche scenarios, API Copilot is here to streamline your development journey.`);
        },
      },
    };
}