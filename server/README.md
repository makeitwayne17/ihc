Steps for Pi to act as server.

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
