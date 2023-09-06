# Project Setup Instructions


## Step 1: Create a GCP Project

1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
2. In the top-left corner, click on the project drop-down and select the `New Project` option.
3. Enter a project name and, optionally, select an organization.
4. Click `Create` to establish your new project.

Once the project is created, you will be redirected to the dashboard for that project.

## Step 2: Setup Billing

1. In the Google Cloud Console, on the left side navigation pane, go to `Billing`.
2. Click on `Link a billing account`.
3. If you already have a billing account, select it. If not, you will need to create one by following the on-screen instructions.
4. Once linked, review and ensure that the correct billing account is associated with your project.

## Step 3: Enable Artifact Registry

1. In the Google Cloud Console, go to the Navigation menu (hamburger icon) on the top-left.
2. Navigate to `APIs & Services` > `Library`.
3. Search for "Artifact Registry API" in the search bar.
4. Click on the `Artifact Registry API` from the results.
5. Click `Enable` to activate the Artifact Registry for your project.

## Step 4: Create Artifact Registry Repository

1. In the Google Cloud Console, navigate to the Navigation menu (hamburger icon) on the top-left.
2. Go to `Artifact Registry` > `Repositories`.
3. Click on the `+ CREATE REPOSITORY` button.
4. Choose a name for the repository({name}-app-registry) and select the format (e.g., Docker) based on your needs.
5. Select a region where you want your repository to reside.
6. Follow the on-screen instructions to finalize the creation of your repository.

Once your repository is set up, you can push and pull artifacts as needed.

## Step 5: Create CI/CD Service Account

1. In the Google Cloud Console, go to the Navigation menu (hamburger icon) on the top-left.
2. Navigate to `IAM & Admin` > `Service Accounts`.
3. Click on the `+ CREATE SERVICE ACCOUNT` button.
4. Enter a name for the service account, e.g., "ci-cd-service", and provide a description that indicates its purpose.
5. Click `CREATE`.
6. In the `Grant this service account access to project` section, assign the following roles:
   - `Artifact Registry Admin`
   - `Cloud Run Admin`
   - `Service Account Token Creator`
   - `Service Account User`
   - `Secret Manager Admin`
7. Click `CONTINUE` and then `DONE` to finish creating the service account.
8. Optionally, create and download a key for this service account if your CI/CD platform requires authentication using a key.

With the service account in place and the necessary roles assigned, you can now integrate it with your CI/CD pipelines for deployments and other tasks within the GCP environment.

## Step 6: Create Service Account Key (JSON)

1. In the Google Cloud Console, go back to the Navigation menu (hamburger icon) on the top-left.
2. Navigate to `IAM & Admin` > `Service Accounts`.
3. Find the "ci-cd-service" from the list and click on it.
4. In the `Keys` section, click on the `+ ADD KEY` button.
5. Select `JSON` as the key type.
6. The JSON key will be automatically generated and downloaded to your local machine. Store this file securely, as it provides access to resources based on the permissions assigned to the service account.

**Note**: Treat your service account key with caution. It should be kept secure and never be exposed in public repositories or locations. If compromised, revoke the key immediately and create a new one.

With the service account key in place, you can use it for authentication in various tools, scripts, and CI/CD platforms to interact with GCP resources.

## Step 7: Open in Codespaces

1. Click the `Code` button (usually green) located at the top-right corner of the repository.
2. In the dropdown menu, select `Open with Codespaces`.
3. Choose to create a new codespace or select an existing one.
4. The codespace will initialize and soon present you with a cloud-based IDE where you can start working on the template immediately.

With the template opened in Codespaces, you can now begin development, testing, or any other tasks without needing to set up a local environment.


## Step 8: Initialize and Push Your Project to GitHub using Codespaces

Your project directory should be structured as follows:

```
.
├── Dockerfile
├── LICENSE
├── README.md
├── main.py
├── requirements.txt
├── static
│   ├── css
│   │   └── main.css
│   ├── images
│   └── js
│       └── main.js
└── templates
    ├── home.html
    └── page.html
```

To push this structure to GitHub using GitHub Codespaces:

1. Inside your Codespace, go to the Source Control tab on the left sidebar (it looks like a branch or fork symbol).

2. You should see publish branch and have the choice to name it and publish private or public.

3. Enter a commit message in the text box at the top, such as "Initial commit".

4. Click on the checkmark icon above to commit your staged changes.

5. Now, click on the three-dot icon (ellipsis) to open the more actions menu, and select 'Push'.

6. If prompted, select the remote repository and the branch (typically "main" or "master") where you want to push your changes.

Your project is now pushed to GitHub, and you can share, clone, or work collaboratively with others on it.


## Step 9: Add GCP_SA_KEY to GitHub Repository

To securely store your Google Cloud Platform Service Account Key in your GitHub repository for use in GitHub Actions or other CI/CD integrations, follow these steps:

1. Navigate to your GitHub repository.
2. Click on the `Settings` tab located towards the top-right of the page.
3. In the left sidebar, find and click on `Secrets & variables`.
4. Next, click on the `Actions` tab.
5. Click on the `New repository secret` button.
6. For the `Name`, enter `GCP_SA_KEY`.
7. Go to the location of your downloaded Service Account key JSON file and open it with VSCode (or any text editor of your choice).
8. Copy the entire JSON object from the file.
9. Return to GitHub and paste the copied JSON content into the `Value` field for the secret.
10. Click on the `Add secret` button to save it.

**Note**: Never commit or expose your Service Account key directly in your code or repository files. Storing it as a secret in GitHub ensures that sensitive data remains confidential and is securely passed to GitHub Actions when needed.

## Step 10: CI/CD YML Setup

To set up the continuous integration and continuous delivery (CI/CD) configuration for your project:

1. Return to your Codespaces editor.
2. Locate the `ci_cd.yml` file within your repository and open it.
3. Uncomment the relevant code sections in the file (typically, these sections would be commented using `#` symbols at the start of each line).
4. Pay close attention to the following placeholders:
   - `GCP_PROJECT_NAME`: This is the name of your Google Cloud Platform project.
   - `ARTIFACT_REPO_NAME`: The name of the repository in the Artifact Registry where your artifacts will be stored.
   - `IMAGE_NAME`: This denotes the name of the image you wish to push to the Artifact Registry.
5. Within the file, you'll find an `env` section that defines environment variables. These are placeholders that you need to replace with actual values:

```yml
    env: # Define environment variables here
      GCP_PROJECT_NAME: flask-web-curriculum
      ARTIFACT_REPO_NAME: flask-app-registry
      IMAGE_NAME: flask_app_image
```

**Note**: Ensure that the names you use in the YML file match the actual names you've set up within your GCP project, Artifact Registry, and for your image. A mismatch could lead to deployment issues.

## Step 11: Push to GitHub Repo using Codespaces

To push your changes to your GitHub repository using the Source Control tab within Codespaces:

1. In your Codespaces editor, locate the Source Control tab (usually represented by a branch or fork icon) on the left sidebar.
2. Review the changes you've made to ensure they are as expected.
3. Enter a meaningful commit message in the text box provided at the top.
4. Click on the checkmark icon above the text box to commit your staged changes.
5. After committing, click on the upward-pointing arrow (or an icon that represents 'Push') to push your changes to the GitHub repository.
6. Click `Sync changes` to ensure both your local repository and the remote GitHub repository are in sync.

**Note**: Ensure you have all necessary changes committed before pushing, as this will update the remote repository with your local changes.


## Step 12: Enable Cloud Run API and Service Setup

The previous step will successfully push the image to the Artifact Registry but might encounter issues during deployment on Cloud Run. Here's how to rectify it:

1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
2. From the left sidebar, go to `Cloud Run`.
3. Click on `Create Service`.
4. On the 'Create Service' page, look for the 'Container' section. There you'll find an option to 'Select' a container image URL.
5. Click on `Select` to the right. This will bring up the `Artifact Registry` modal.
6. In the Artifact Registry modal, expand the first dropdown arrow. This will reveal your container repositories.
7. Further expand the dropdown of the relevant repository to view the available images.
8. Select the latest image, and then click `Select`.
9. Name the service `test`.
10. In the `Configuration` section, select `All` for ingress control.
11. For `Authentication`, choose `Allow unauthenticated invocations`.
12. Click `Create`. This process will enable the Cloud Run API and set up the service.
13. Once the service has been created and the dashboard shows it's running, navigate back to the list of services in Cloud Run.
14. Find the `test` service in the list and click on it.
15. With the service details open, locate the `Delete` option, typically towards the top-middle of the screen.
16. Click `Delete` to remove the `test` service. This step ensures that you don't have unnecessary services running.

**Note**: This process is a workaround to ensure the Cloud Run Admin API is enabled and working correctly. Always be cautious when creating and deleting services to avoid unexpected charges or disruptions.

## Step 13: Push Again to GitHub Repo using the Source Control Tab

Having set up Cloud Run, it's now time to push the changes again to the GitHub repository using Codespaces.

1. Navigate back to your Codespaces editor.
2. Ensure any additional changes or configurations you've made are ready for commit.
3. Locate the Source Control tab on the left sidebar, usually represented by a branch or fork icon.
4. Review your staged changes to ensure they are as expected.
5. Enter a descriptive commit message in the text box provided at the top.
6. Click on the checkmark icon above the text box to commit the changes.
7. After committing, click on the upward-pointing arrow (or an icon representing 'Push') to push your updates to the GitHub repository.
8. Lastly, click `Sync changes` to ensure both your local and remote repositories are synchronized.

**Reminder**: It's always a good practice to review your changes and ensure everything is in order before pushing updates to a remote repository.

## Step 14: Test Deployed Web App

After deploying the app on Cloud Run, you'll want to test it to ensure it's running as expected.

1. Navigate back to the [Google Cloud Console](https://console.cloud.google.com/).
2. From the left sidebar, select `Cloud Run`.
3. Wait for a moment; your deployed service might still be in the process of deploying. Once deployment is complete, locate and click on your service from the list.
4. In the service details, you'll see a URL, which is the address of your deployed web app. To the right of this URL, there's a copy button.
5. Click on the copy button to copy the URL.
6. Open a new tab or window in your web browser, paste the copied URL into the address bar, and press `Enter`.
7. You should now see your deployed web app running live.

**Note**: Always test new deployments to ensure they work as intended and address any potential issues before promoting them to production environments.

## Step 15: Test Code Locally

To test your code locally using the terminal within Codespaces:

1. Open the integrated terminal within your Codespace (typically located at the bottom).
2. Install Flask by entering the following command: `pip install flask`
3. Run the following command to test in the codespaces webview: `python main.py`
4. An option in the bottom right will appear to open the webview
5. Now step by step change and add filenames and add your code to project while testing in webview