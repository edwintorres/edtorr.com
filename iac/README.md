# IAC Documentation

This Infrastructure as Code (IAC) script automates the deployment of various services, including Excel Connections, Logic Apps, and API Management (APIM) services. Below are the steps to use this deployment script and details about the current status of the APIM deployment.

### Step 1: Make the Script Executable

To make the deployment script executable, run the following command:

```bash
chmod +x deploy_script.sh
```

## Step 2: Execute the Deployment Script
After making the script executable, navigate to the root directory of the project and run the script as follows:
```
./iac/deploy_script.sh
```
## Step 3: What the Script Does
1. Excel Connection:
    * The script successfully deploys the Excel connection, establishing the integration needed for any Excel-based workflows.

2. Logic Apps:
    * The script also deploys Logic Apps, ensuring that your workflows are up and running.

3. API Management (APIM):
    * *Note: Currently, the APIM deployment is facing an issue due to a certificate-related error. Specifically, when deploying the APIM service through the ARM template, we encountered the following error:*

        ```
        Invalid parameter: EncodedCertificate or keyVaultId or freeCertificateKeyVaultId should be provided to retrieve the custom SSL certificate for type: Proxy and hostname: <apihostnameexample>.

        ```
        This error occurs because the APIM deployment requires a valid SSL certificate for the specified hostname

        * Solution: You will need to provide a certificate either from Azure Key Vault or use the built-in Azure free SSL certificate. The free SSL certificate will automatically be assigned if you specify the "certificateSource": "BuiltIn" in the ARM template.
        * Note: The error related to the azure-api.net hostname has been addressed, and now a custom domain is used for the APIM configuration.

## List of Required Variables for `.env`
To successfully deploy this script, you will need to define the following environment variables in your .env file:
```
# Subscription ID for Azure
SUBSCRIPTION_ID="your-subscription-id"

# Subscription ID for Azure with only alphanumeric characters, this is use in the APIM ARM template
SUBSCRIPTION_ID_PL="yoursubscriptionid"

# Resource Group name where resources will be deployed
RESOURCE_GROUP_NAME="your-resource-group-name"

# Location where resources will be deployed (e.g., East US)
LOCATION="your-region"

# Hostname for the API Management Service (should not end with azure-api.net)
HOST_NAME="yourcustomdomain.com"

# Name of the Logic App workflow
LOGIC_APP_NAME="your-logic-app-name"

# Excel connection details
EXCEL_CONNECTION_NAME="your-excel-connection-name"

# API Management Service name
APIM_NAME="your-apim-service-name"

# Email of the API Management publisher
EMAIL="your-email@example.com"
FIRST_NAME="Juan"
LAST_NAME="Del Pueblo"

# SSL Certificate information (KeyVault or free certificate) **this is not working**
CERTIFICATE_KEYVAULT_ID="your-keyvault-id"
CERTIFICATE_NAME="your-certificate-name"

```