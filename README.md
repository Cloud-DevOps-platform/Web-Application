Deploying the Nodejs application to Azure Web-app with the help of github Actions.

**Pre-requisites:**
1. We need the Azure Account with a subscription.
   a. in the Azure , we should have the web app service and related resources to deloy the application.
3. Need to have the Github account to publish the code and to run the workflows.

**Process**
To start , we need to install the Azure CLI and terraform to automate the Infrastructure in Azure, for 

Install Azure CLI, we can verify the microsoft documents or find the link below.
https://aka.ms/installazurecliwindowsx64
After CLI installation , we can run az login command to check CLI is installed successfully or not and with az login command we login into our azure portal and it will show the confirmation details like below.
  {
    "cloudName": "AzureCloud",
    "homeTenantId": "******-******-******-******",
    "id": "******-******-******-******",
    "isDefault": true,
    "managedByTenants": [],
    "name": "Pavan_Machani",
    "state": "Enabled",
    "tenantId": "******-******-******-******",
    "user": {
      "name": "<azureaccountname>",
      "type": "user"
    }
  }
]

After this, we can say that we successfully logged in Azure with the help of CLI


Install Terraform to automate the Azure Infra, dowloand the terraform from below path
https://developer.hashicorp.com/terraform/install , dowload based on our OS and the required version

run terraform --version , this command will show the version type and on which operating system.

Install any IDE tool(like VS code) for development process

before , we start go to the Github account , create an Organisation, because creating an Organisation is best practise as it helps us in managing our projects effectively, securely, and professionally. It can also provide a better collaborative experience for your team.
now within this Organisation , create a repositories (here i made it as public for the review)or we can maintain the private.
As part of the development , working on git with git cli is more flexible, we can automate and integrate, like push the code into our github repository, we check the git cli by runnig the below command
git --version , this will display the git version like git version 2.44.0

Now open the vs code and clone our repository , what we have created earlier, with the help of git clone, using Https or ssh or github cli command 
ex: git clone https://github.com/<organisation_name>/<repository_name>.git

Now we have the required Prerequisites ready working for the project CDX-platform enginner.

First initially , before Ensure that you have the appropriate Azure subscription and account set up, and that you have the necessary permissions to create and manage resources.
after that we need to create a one resource group , to place all related resources under that group, here i created the resource group with name **CDX-platform** under organisation Cloud-DevOps-platform and under repositroy CICD-terraform-workflow.
organization : Cloud-DevOps-platform.
repository   : CICD-terrform-workflow.






