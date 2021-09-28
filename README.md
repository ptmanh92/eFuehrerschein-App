# Praxisprojekt: Elektronischer Führerschein App
This is the frontend part of the App Elektronischer Führerschein using React Native and Expo.
## 1. SETUP PROJECT
This following intruction is for Windows system. For MacOS, you can also follow these following steps (there will certainly be differences in user interface), except for the 4. Step.
### 1.1. Download and install Node.js
Please go to https://nodejs.org/ to download Node.js. Please make sure that you download the current version with lastest features. After that run the setup file to install.
### 1.2. Download and install Python (from version 2)
Please go to https://www.python.org/downloads/ to download Python. Please notice that the version of python should be at least 2. After that run the setup file to install.
### 1.3. Download and install Java SE Development Kit (JDK) Version 8 (or higher)
Link to download: https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
### 1.4. Install Emulator (Android)
If you're not interested in having an emulator in your computer/laptop, then you can skip this step. This project is built with Expo, that means you can install the Expo App on your smartphone and check out the app live (using a QR-Code), so no emulator needed. If you still want to have an emulator, please read below.

This is the instruction for installing an android emulator in windows enviroment. Please go to https://facebook.github.io/react-native/docs/getting-started, select tab "React Native CLI Quickstart", then choose "Window" for "Development OS" and "Android" for "Target OS". Follow the instruction there to install an emulator.

For anyone whose computer/laptop has an AMD instead of an Intel processor, please check out [this page](https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html) or [this video](https://www.youtube.com/watch?v=57vZtl5l9hk) to learn how to enable the Intel HAXM.
(Hint: after configuring like in the above page or video, you should restart you computer/laptop to have Intel HAXM enabled)

If you're using macOS, please check out this page https://facebook.github.io/react-native/docs/getting-started (go to "React Native CLI Quickstart" tab, then choose "macOS" for "Development OS" and "iOS" or "Android" for "Target OS") to get full details.
### 1.5. Download Project from GitHub
Please contact Zhasmina to be added to our GitHub project.
### 1.6. Install Expo and dependencies
#### 1.6.1. Install Expo & node_modules
First, you need to be at the right folder of the project. We assume that you are currently in project folder (which is "driving_licences"). Please type in your terminal:

    cd eFuehrerscheine

And then use the following command line to install Expo:

    npm install expo-cli --global
    
If the above command line is not working, then please download [this file](https://1drv.ms/u/s!Au7A6vOlSuM8iNALtGbwm8TzMeK-Bg?e=O1qr2m) and extract it to:

    C:\Users\<PC-Account>\AppData\Roaming\npm\node_modules (with PC-Acount is the account name of your PC/Laptop)

After that run this command line:

    npm install
        

#### 1.6.2. Install React Navigation
Source: https://reactnavigation.org/docs/en/getting-started.html

Please use the following command lines (in exact order):

    npm install --save react-navigation
    expo install react-native-gesture-handler react-native-reanimated
    npm install --save react-navigation-stack
    npm install --save react-navigation-tabs
    npm install --save react-navigation-drawer
    
#### 1.6.3 Install Expo BarCodeScanner for using the QR-Code Scanner
Source: https://docs.expo.io/versions/latest/sdk/bar-code-scanner/ and https://docs.expo.io/versions/latest/sdk/permissions/

Please use the following command lines (in exact order):

    expo install expo-barcode-scanner
    expo install expo-permissions
    
#### 1.6.4 Install React Native Scalable Image
Source: https://github.com/ihor/react-native-scalable-image

Please use the following command lines:

    npm install react-native-scalable-image --save

#### 1.6.5 Install React Native accordion
Source: https://www.npmjs.com/package/accordion-collapse-react-native

Please use the following command lines:

    npm install --save accordion-collapse-react-native
    
#### 1.6.6 Install React Native collapsible
Source: https://github.com/oblador/react-native-collapsible

Please use the following command lines:

    npm install --save react-native-collapsible

#### 1.6.7 Install Expo Localization
Source: https://docs.expo.io/versions/latest/sdk/localization/

Please use the following command lines:

    expo install expo-localization

#### 1.6.8 Integrates I18n.js with React Native and Expo
Source: https://www.npmjs.com/package/ex-react-native-i18n

Please use the following command lines:

    npm install ex-react-native-i18n --save

### 1.7. Start the App
#### 1.7.1. Change localhost
Please go to file App.js to change the IP address. Use the same IP-Adress that is used by the backend project. (see 2) 

#### 1.7.2. How to launch the app
If you want to test the app with an android emulator, please run the emulator before you run the following command.
You can start the project by typing:

    npm start

or

    expo start

A new browser window will open. On this window you will find the QR-Code to run the app on your mobile device. 
You will also find information about the build status or errors here. 
You can use the buttons on the left to start the app on the emulator. If you're using an android emulator, you can optionally start the app by typing a inside your command prompt. 

Please wait until you see the 'Tunnel ready.' info, before scanning the QR-Code with a mobile device. 

#### 1.7.3. Testing on a mobile device
To test the app on a mobile device, please sign up at https://expo.io/signup first. 
After going through the registration proccess, please download the expo app for your device. 
    
**iOS**  
https://apps.apple.com/de/app/expo-client/id982107779

**Android**    
https://play.google.com/store/apps/details?id=host.exp.exponent&hl=de

Now, please scan the QR-Code.  
If you're using an Android device, please use the expo app to scan the QR-Code.
If you're using an iOS device, you can use the camera. 

#### 1.7.4. Notice!!!
- Please make sure you are at the project folder before you enter the above command line (in our case you should be at ...\driving-licences\eFuehrerscheine\), otherwise it won't work
- The above command lines will not start an emulator, but start an local host and show immediately on your browser. The process will not always be very quick, so please be patient. Until you see in the browser the text "Tunnel ready", then you're good to go. In this browser you can use a QR-Code to show your app directly on your smartphone or click on "Run on Android Device/Emulator" (this will automatically launch a available running android emulator in your PC).
- After entering the above command lines, you may get error with the "about_Execution_Policies" thing. Don't panic, just go to another command prompt (Run as administrator) and type in "Set-ExecutionPolicy Unrestricted" and then choose "Yes to all" (or type A)
- Another error can show up here, something like "metro bundler process exited with code 1". There's a solution for that in [this link](https://stackoverflow.com/questions/58760712/how-to-fix-metro-bundler-process-exited-with-code-1)

## 2. RUN THE PROJECT WITH THE BACKEND PROJECT
In order to see the app in real action, you also need to run the backend project. Please go to [this page](https://github.com/jandriescher/license-api) of the backend team to learn how to install and run localhost and database.
