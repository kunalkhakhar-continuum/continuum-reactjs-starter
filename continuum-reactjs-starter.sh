
if [ -z "$1" ]
   then
    echo "please provide a project name."
	exit 1;
 else
    # **************** Change Variables Here ************
	package_directory=$(pwd)
	package_name=$1
	replace_term="mynewproject"
	replace_term = "$replace_termNAME"
	# **********************************************************

	echo "***************************************************"
	echo $package_directory
	echo $package_name
	echo repalcing $package_name in directory $package_directory for all files...
	echo "***************************************************"

	find ./ -type f -readable -writable -exec sed -i "s/$replace_term/$package_name/g" {} \;

	echo "your NPM version is"
	npm --version
	echo "will now execute the below steps (this will take a few minutes)"
	echo "**************"
	echo "1. npm install -- to install dependencies"
	echo "2. npm run start -- to build the project and start dev server on localhost:3000"
	echo "3. open chrome browser"
	echo "**************"
	npm i && npm start && start chrome http://localhost:3000
fi
