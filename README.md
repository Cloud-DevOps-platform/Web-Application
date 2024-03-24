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
github url : [https://github.com/Cloud-DevOps-platform/CICD-terraform-workflow/tree/main/sourcecode/terraform](https://github.com/Cloud-DevOps-platform/CICD-terraform-workflow)
organization : Cloud-DevOps-platform.
repository   : CICD-terrform-workflow.

In the repository , created the folder sourcecode/terraform 

under this path : CICD-terraform-workflow/sourcecode/terraform

In provider.tf   --> in this file we need configure the azure provider and the terraform version.
In main.tf       --> in this file we can have the resource related code, 
like  
1. resource group creation (CDX-platform) , we specified the resource group name and location
2. storage account creation (infracdxbackup) , we specify the account_tier and account_replication_tye and under which resource group and location this storage account should be part of.
3. cotainer creation in storage account(cdxtffile-container), here we need to specofy the storage_account_name and the container_access_type and it is used to store the terraform state file.
In webapp.tf    --> in this file we have the code for the azure linux_web_app and service plan for the the webapp.
like
1. azure service plan creation (hdforwebapp) , this service plan provides the a set of compute resources is created for that plan in that region like
   Operating System (Windows, Linux)
   Region (West US, East US, and so on)
   Number of VM instances
   Size of VM instances (Small, Medium, Large)
   Pricing tier (Free, Shared, Basic, Standard, Premium, PremiumV2, PremiumV3, Isolated, IsolatedV2)
2. in azure appservice , we create the web app (webppcdx)for sample webapplication deployment , here we specify the app service plan id and the resource group name, location for this resource.

Now , for testing purpose of the code, we run the code and create the resources, running the below commnds,

terraform init --> This command will initialize your Terraform working directory and prepare it for further operations and It's important to note that this terraform init command should be run in the directory where your Terraform configuration files are located and Create a .terraform directory in your working directory. This directory will store the downloaded provider plugins and the backend configuration

terraform plan --> The terraform plan command is used to generate an execution plan for your Terraform configuration. It compares the current state of your infrastructure with the desired state specified in your configuration and generates a plan that describes the changes that Terraform will make to bring your infrastructure to the desired state. and terraform plan does not make any changes to your infrastructure. It only generates a plan of the changes that Terraform will make if you decide to apply the plan.

after all final check, now we run the terraform apply.
terraform apply --> The terraform apply command is used to apply the changes specified in the execution plan generated by terraform plan. It creates, updates, and deletes infrastructure resources according to the Terraform configuration files and after running the terraform apply the state file is created which is used to keep track of the managed resources and their current state, for security reasons we should not share this any one as it contains our infrastructure details and we store it in the azure blob container under the storage account what we created with the help of the terraform backend.

after running the terraform apply we got to the azure portal and see the changes/resources what we have created.

Now, to store the state file we use terraform backend.
Terraform backend --> A Terraform backend is a configuration option in Terraform that allows you to store and manage the state of your infrastructure. It enables you to manage your Terraform state file remotely, providing several benefits such as version control, collaboration, and remote executions.
under the github path : CICD-terraform-workflow/sourcecode/terraform
we can see the backend.tf  --> in this file we create the terraform backend with the details resoucre group name, storage account name and container name, key (with .tfstate extension) for statefile storage.
we can add the storage_access_key for intiall access and later we can place it in the github secrets.
Now if we run the terraform init, it will ask us to reconfigure as we defined the terraform backends , so for that we run below command.

terraform init -reconfigure, this command is used to reinitialize the backend configuration in your Terraform working directory. This command is useful when you want to change the backend configuration or reinitialize the backend with the same configuration.

When you run terraform init -reconfigure, Terraform will:

1.Clear the current state and other files from the previous backend.
2.Initialize the backend with the new or same configuration.
3.Download and install the necessary backend plugins.
4.Initialize the backend and create a new state file.

After running the terraform , backend we can run again 
terraform paln --> will show the execution plan/changes that are going to replace for the current infrastructure, then run
terraform apply --> will execute the changes which are in terraform plan.

after a successful apply , we can go to the Azure portal https://portal.azure.com/ and verfiy the resources/changes that are made/created and we can verify the storage container and we can see that state file is being stored init.

After this successful testing, we can destroy all this resources by running terraform destroy command.
terraform destroy --> The terraform destroy command is used to destroy the resources that were created by a Terraform configuration. It is the opposite of the terraform apply command, which creates or updates infrastructure. When you run terraform destroy, Terraform will generate a destruction plan that shows you the resources that will be destroyed, and then prompt you for confirmation before proceeding and error.tfstate file is created in the local repository as the state file is stored in the storage continer is deleted, so it provides as the backup.

Now we have to Automate this entire process by configuring the terraform workflow in the github action for the ci/cd deployment.










