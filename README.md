# LogisticsHelper

The application was written based on experience in the logistics industry. The main task of the application is to count the delivery i.e. to assign appropriate quantities to goods and to fill in the shipping document based on the data from the application.

## Technology stack
- Angular v14.0.0
- IONIC v6.1.9
- Firebase (FireAuth, Firestore) @angular/fire

## Launching the application

- You need to create the file in /src/configs/ named "config.ts" which exports constant "config" of type "Partial < Config >"
```json
{
  "production": false,
  "version": "0.0.0",
  "firebase": {
    "apiKey": "XXXXXXXXXXXXXXXXXXXXXXXXX",
    "authDomain": "XXXXXXXXXXXXXXXXXXXXXXXX",
    "projectId": "XXXXXXXXXXXXXXXXXXXX",
    "storageBucket": "XXXXXXXXXXXXXXXXXXX",
    "messagingSenderId": "XXXXXXXXXXXXXXXXXXXXXX",
    "appId": "XXXXXXXXXXXXXXXXXXXXXX",
    "databaseURL": "XXXXXXXXXXXXXXXXXXXXXXXXXX",
  },
  "auth": {
    "secret": "XXXXXXXXXXXXXXXXXXXXX"
  }
}
```
- After cloning the repository in the folder with the application call the command "npm install"
- Call the command "ng serve"

## Building an Android application
  
To build an Android application you need to:
- Invoke the command "ng build --output-path=www"
- Invoke the command "ionic capacitor copy android"
- Invoke the command "ionic capacitor open android" (Android Studio needed)
- After loading the project into Android Studio, go to Build > Build Bundle(s) / APK(s) > Build APK(s)
- Transfer the created .APK file to the mobile device and install the application

## Screenshots

| Screenshot      | Description |
| :---:  | :---: |
| <img src="https://user-images.githubusercontent.com/88888347/208940600-7d67ea4c-f54b-4fe4-b162-091dedcf665d.png" alt="" width="67.5px" height="150px">     | Main menu      |
| <img src="https://user-images.githubusercontent.com/88888347/208941235-28585fb7-305a-4c82-8f84-4fc19140c330.png" alt="" width="67.5px" height="150px">   | Side panel        |
| <img src="https://user-images.githubusercontent.com/88888347/208962633-b8e387e0-efb0-4e72-b31e-70c51541277c.png" alt="" width="67.5px" height="150px">   | List of assignments        |
| <img src="https://user-images.githubusercontent.com/88888347/208962984-1f802217-039d-4280-bc5f-da29a02386b9.png" alt="" width="67.5px" height="150px">   | Add to assignment menu        |
| <img src="https://user-images.githubusercontent.com/88888347/208963149-047f5207-e518-4291-966e-1c1b698829c0.png" alt="" width="67.5px" height="150px">   | Assignment management panel        |
| <img src="https://user-images.githubusercontent.com/88888347/208978365-4da51afc-f240-4c46-b2be-3e8b9ff5d047.png" alt="" width="67.5px" height="150px">   | Assignment event logs        |
| <img src="https://user-images.githubusercontent.com/88888347/208978487-369220df-d2ce-42b9-b0d8-4e3a36f10430.png" alt="" width="67.5px" height="150px">   | Assignment TC management panel        |
| <img src="https://user-images.githubusercontent.com/88888347/208978584-8f644cda-b582-4d19-b8d2-dc2e4b9cc37a.png" alt="" width="67.5px" height="150px">   | Users management panel        |
| <img src="https://user-images.githubusercontent.com/88888347/208978681-9bed5c1b-0d30-43da-a570-be1b6664d148.png" alt="" width="67.5px" height="150px">   | Page after logout        |
| <img src="https://user-images.githubusercontent.com/88888347/208978743-f66aa32b-0716-49ec-9c12-609e670cbdf6.png" alt="" width="67.5px" height="150px">   | Login page        |
