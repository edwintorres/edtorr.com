# IAC Documentation

```
source ../.env
```

## How to Deploy the Bicep File
1. Create/Use a Resource Group (if not already created):
```
az group create --name $RESOURCE_GROUP --location eastus
```

2. Deploy the Bicep file
```
az deployment group create \
  --name contactFormDeployment \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters apimName=$APIM_NAME \
  --parameters logicAppName=$LOGIC_APP_NAME \
  --parameters oneDriveConnectionName=$ONEDRIVE_CONNECTION \
  --parameters recaptchaSecret=$RECAPTCHA_SECRET
```

## Logic App Workflow JSON


```
az resource update \
  --ids "/subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.Logic/workflows/$LOGIC_APP_NAME" \
  --set properties.definition=@logicapp.json \
  --set properties.parameters.recaptchaSecret.value="$RECAPTCHA_SECRET"

```


## To delete
```
az deployment group delete \
    --name contactFormDeployment \
    --resource-group edtorrRGroup


contactFormDeployment
```
