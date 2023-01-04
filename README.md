# leave-app

# Initialize the Project

-   Initialize the project 1st time. - You need to configure the amplify 1st. Read the "Amplify configuration" section below. - Then run the follwing commands. Following two commands pulls the both amplify dev env and prod env. And this is only for 1st time.
    $ yarn amplify:dev
    $ yarn amplify:prod

-   If you want to run the project locally, before that you need to run the fullowing command (This is a must)
    $ yarn dev:int

    Run the project
    $ yarn android
    $ yarn ios

# Production release

-   If you want to give a production release, before that you need to run the following command (This is must)
    $ yarn prod:int

    In addition to that change the src/configs/index.ts file. You need to change the deploymentEnv to PROD.
    Then you can run or buld the Android & IOS projects.

    Note that, After you give the release change the deploymentEnv to STG and run $ yarn dev:int

# Amplify configuration

if you are a new developer - As a developer you need to have a aws credentials with cognito access (Please contact the aws admin). - Then you need to configure amplify cli. - Then, if you are in dev(STG or QA) environment
$ amplify pull --appId d20c5hyqdk0hvi --envName dev

    - If you are in prod(PROD) environment
        $ amplify pull --appId d20c5hyqdk0hvi --envName prod


    Note that, If above commands went wrong, go to aws profile, then go to Amplify service
    after that select leaveapp, then select "backend environments". In there you can find
    similar commands based on the environment.

    *** Please note that, QA & STG environments are using dev env from amplify, whereas PROD environment is using prod env from the amplify.
    *** Before the deployement, just checks the currently point amplify environment.

# Other Info

After installing firebase, if you got pod issue try following steps
$ cd ios
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 pod install
$ arch -x86_64 pod update

Clone amplify environment - Go to aws console => amplify => leaveapp => backend environments => actions => clone => (new environment name) - After the creation, select edit backend => copy the command that showing there and paste it in your project terminal. - Provide the answeres that they are asking.

View the all environments
$ amplify env list

Change amplify environment
$ amplify env checkout <env_name>

Remove amplify environment (You can't remove the env when you are currenly in same branch)
$ amplify remove env <env_name>

Other commands
https://docs.amplify.aws/cli/teams/commands/
