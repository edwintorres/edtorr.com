# Load ENV variables
source .env

# Create Resource Group
az group create --name $RESOURCE_GROUP_NAME --location $LOCATION

# Deploy excelonline connection to the resource group
# Excel Online is used to store the data from the contact form
az deployment group create \
  --resource-group $RESOURCE_GROUP_NAME \
  --template-file ./iac/excelonline.json \
  --parameters \
    connections_excelonline_name=$EXCEL_CONNECTION_NAME \
    location=$LOCATION \
    subscriptionId=$SUBSCRIPTION_ID 


# Deploy Azure Logic App to the resource group
# The Logic App store the data recived in a http request to the excel online
az deployment group create \
  --resource-group $RESOURCE_GROUP_NAME \
  --template-file ./iac/ContactMe.json \
  --parameters \
    workflows_ContactMe_name=$LOGIC_APP_NAME \
    location=$LOCATION \
    subscriptionId=$SUBSCRIPTION_ID resourceGroupName=$RESOURCE_GROUP_NAME

### NOT WORKING ###
### NOT WORKING ###
### NOT WORKING ###
## READ THE README.md file to understand the issue
# Deploy APIM to the resource group
# The APIM is used to expose the Logic App as an API
# az deployment group create \
#   --resource-group $RESOURCE_GROUP_NAME \
#   --template-file ./iac/edtorrAPIM.json \
#   --parameters apis_contactformapi_path="/submit" \
#                operations_submitform_type="application/json" \
#                subscriptions_67cf526f52b4bf007a070001_displayName="display-name-1" \
#                subscriptions_67cf526f52b4bf007a070002_displayName="display-name-2" \
#                subscriptions_67cf7fa701234e0f208ebc8c_displayName="display-name-3" \
#                users_1_firstName=$FIRST_NAME \
#                users_1_lastName=$LAST_NAME \
#                users_1_email=$EMAIL \
#                service_edtorrAPIM_name=$APIM_NAME \
#                service_host_name=$HOST_NAME \
#                location=$LOCATION \
#                subscriptionId=$SUBSCRIPTION_ID \
#                subscriptionIdPl=$SUBSCRIPTION_ID_PL \
#                resourceGroupName=$RESOURCE_GROUP_NAME \
#                workflows_ContactMe_name=$LOGIC_APP_NAME \




  