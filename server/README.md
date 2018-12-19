Steps for Pi to act as server:

1. In computer terminal after the pi is connected to the same router type: 
ssh pi@raspberrypi.local

2. install homebrew (this might take some time):
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

  check your version using:
  brew -v

3. install node:
  download:
wget https://nodejs.org/dist/v10.14.1/node-v10.14.1.tar.gz

  extract:
tar -xzf node-v10.14.1.tar.gz 

  copy to root:
cd node-v10.14.1/
sudo cp -R * /usr/local/


4. install npm:
sudo apt-get install nodejs npm

5. install version manger for Node.js (https://github.com/creationix/nvm):
download Node Version Manager (NVM):
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
  
  run these commands after install NVM:
  
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
sourse ~/.bash_profile
  
6. change nodejs version to v9.5.0
  run these commands:
 
nvm install 9.5.0
nvm use node
  
  check the version using:
node -v
  - should return: v9.5.0

7. inside the server (ihc/server) folder, install everything:
run the following command:
npm install

8. install and start mongodb (https://treehouse.github.io/installation-guides/mac/mongo-mac.html):

brew update -v #the -v flag is optional, because this command runs a long time, it gives a constant status update
brew install mongodb

9. run follow command to start up server:
npm run make



