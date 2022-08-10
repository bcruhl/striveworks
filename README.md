Installation steps:

1. Install node v18.x.x (I was using version v18.6.0)
2. Install npm v8.13.2
3. Install yarn v1.22.19
4. Run this on the command line `export NODE_OPTIONS=--openssl-legacy-provider`
5. Inside of the `/striveworks` folder, run `yarn` to install node packages
6. Open `/striveworks/server` in a new tab and run this on the command line `export NODE_OPTIONS=--openssl-legacy-provider`
7. Run `node .` to start the server
8. On your first terminal window, in the `/striveworks` directory, run `yarn start` to bring up the application at `localhost:8080`
