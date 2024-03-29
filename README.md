
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
after that we need to create a one resource group , to place all related resources under that group, here i created the resource group under organisation Cloud-DevOps-platform and under repositroy CICD-terraform-workflow.
github url : [https://github.com/Cloud-DevOps-platform/CICD-terraform-workflow/tree/main/sourcecode/terraform](https://github.com/Cloud-DevOps-platform/CICD-terraform-workflow)
organization : Cloud-DevOps-platform.
repository   : CICD-terrform-workflow.

In the repository , created the folder sourcecode/terraform 

under this path : CICD-terraform-workflow/sourcecode/terraform

In provider.tf   --> in this file we need configure the azure provider and the terraform version.
In main.tf       --> in this file we can have the resource related code, 
like  
1. resource group creation , we specified the resource group name and location
2. storage account creation, we specify the account_tier and account_replication_tye and under which resource group and location this storage account should be part of.
3. cotainer creation in storage account , here we need to specofy the storage_account_name and the container_access_type and it is used to store the terraform state file.
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

For the deployment of the terraform workflow , we need to specify the yaml in the github actions , when ever an event happens (like push, workflow dispatch, branche, pullrequest) then the pipeline will get triggered and automatically terraform plan and apply will get excuted and resources will be created.

to configure the yml pipeline, we navigate to the github actions and we can find the option ** set-up-workflow** , we can select this option and we can start writting our own yaml file for the pipeline. 
or we can search for the workflow pipeline in the github action, like terraform workflow, it will give the configuration pipeline in yaml file with all related information, we may review that file and make the necessary changes for that.

yaml file is created under .github/workflowterraformplan.yml , this is the path for the workflow configuration file, here i named the workflow file as terraformplan.yaml, 
in this file we have created the pipeline in an event driven way, like when ever happens pipline will get triggered, for that we specify with the on:

like 

on: 
push:
    branches:
      - main
  pull_request:

  here pipline will trigger when ever we the apply the push to main brach ro we can create the new branch and raised the pull request and later we can get this merged.

  here we specified we specified the Azure client id , tenant id , subscrition id and client secret as the environment variables for the authentication of the github actions as shown below.
  env:

 ARM_CLIENT_ID: ${{secrets.AZURE_CLIENT_ID}}
 ARM_CLIENT_SECRET: ${{secrets.AZURE_CLIENT_SECRET}}
 ARM_SUBSCRIPTION_ID: ${{secrets.AZURE_SUBSCRIPTION_ID}}
 ARM_TENANT_ID: ${{secrets.AZURE_TENANT_ID}}
 ROOT_PATH : '${{ github.workspace }}/sourcecode/terraform'
here we specified the ROOT_PATH to the starting location or base directory from which an application or system begins accessing files or navigating through directories, we can specify the default root path as github.worksapce, refering to our terraform configuration files.

Now we specify the Jobs to run , like how terraform plan and terrafrom apply and on which environment they need to run and undert the jobs section we mention 

runs-on: unbuntu-latest --> ubuntu-latest is a pre-configured environment in GitHub Actions that you can use in your workflow files to run your GitHub Actions workflow on a specific operating system, which in this case is Ubuntu and When you set runs-on: ubuntu-latest in your workflow, you are indicating that all the steps of the job will be executed on an Ubuntu machine, which is updated with the latest version of the Ubuntu operating system, The benefit of using ubuntu-latest in your workflow configuration is that you can leverage the latest Ubuntu updates and packages without having to worry about the maintenance and configuration of the underlying environment.
 and we use the the Bash shell regardless whether the GitHub Actions runner is ubuntu-latest, macos-latest, or windows-latest by specifying the 
shell : bash --> this will Specifying the shell in a GitHub Action YAML file allows you to select the type of shell that runs the commands in the run statement.
aafter that we specify the steps and under the steps we define all the steps that need to run in the pipeline , initiall we specify the -name:checkout and it uses the latest verion, like 
-name: checkout
uses: actions/checkout@v3 , this will define step in the workflow that checks out your repository's content. This enables subsequent steps to access and modify the source code.
now we specify the command to download the terraform and setup the in the yaml configuration file.
- name: Setup Terraform
      uses: hashicorp/setup-terraform@v1
      with:
        cli_config_credentials_token: ${{ secrets.TF_API_TOKEN }}
  
  that block states name: Setup Terraform step sets up the required version of Terraform using the hashicorp/setup-terraform GitHub Action. The cli_config_credentials_token argument is set to the TF_API_TOKEN secret available in the GitHub repository.

  After this we can specify the Initialize a new or existing Terraform working directory by creating initial files, loading any remote state, downloading modules, etc and we can define the terrafrom plan and terraform apply command in the file to create the new resources, like mentioned below.

  - name: Terraform Init
          run: terraform init
          working-directory: ${{env.ROOT_PATH}}

that block will - name: Terraform Init step in a GitHub Actions YAML file initializes Terraform in the specified working directory, which is ROOT_PATH and terraform init command is run, it performs the following tasks:

Initializes the backend for storing the Terraform state.
Downloads the required providers.
Initializes the modules.

 After this we will define the terraform plan , like 

 name: Terraform Plan
      run: terraform plan
      working-directory: ${{env.ROOT_PATH}}

this block will, A GitHub Actions workflow step that executes the terraform plan command in the directory specified by the ROOT_PATH and The terraform plan command will show you the planned changes that Terraform will make to your infrastructure, but it won't modify the infrastructure. Instead, it generates and displays an execution plan for a given Terraform configuration.

and finally we run the terraform apply , like 

        - name: Terraform apply
          run: terraform apply --auto-approve
          working-directory: ${{env.ROOT_PATH}}
This will execute a terraform apply command, which will apply the changes described in the configuration files in the ROOT_PATH directory. The --auto-approve flag skips the interactive approval prompt during the apply.

path to yaml file: https://github.com/Cloud-DevOps-platform/CICD-terraform-workflow/blob/main/.github/workflows/terraformplan.yml

after all this opertaion we can say that resources has been created and we cann login to the Azure portal and can validate the resources.


After the web app deployment is successfull we can check the resoource in the Azure portal and can setup a sample web application (Nodejs) deployment via Azure portal with the help of the deployment center or we can create a template file file for the Nodejs web app deployment configuration from the githuib market place.

path to the web-application deployment : https://github.com/Cloud-DevOps-platform/Web-Application/actions/runs/8405998037/workflow.

 The pipeline building for the webapplication from deployment cneter is pretty straight farward.

 1. login to the Azure portal.
 2. navigate to the web app that we have created.
 3. go to the deployment center and navigate to the settings section, under source select the Option as Github and To change the provider, select Change provider > App Service Build Service > OK.
 4. If you're deploying from GitHub for the first time, select Authorize and follow the authorization prompts. If you want to deploy from a different user's repository, select Change Account.
 5. After you authorize your Azure account with GitHub, select the Organization, Repository, and Branch you want.
 6. Under Authentication type, select User-assigned identity for better security.
 7. To see the file before saving your changes, select Preview file and finally save it, then we can see under the github section pipeline is triggered and sample web application "welcome to 2024" is deployed the successfully
 8. now by webapp url link we can browse and see the application is running succesfully.

                   **THANK YOU **






