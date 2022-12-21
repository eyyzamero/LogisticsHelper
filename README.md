# LogisticsHelper

## Stack technologiczny
- Angular v14.0.0
- IONIC v6.1.9
- Firebase (FireAuth, Firestore) @angular/fire

## Zamysł aplikacji

Aplikacja została napisana w oparciu o doświadczenie w branży logistycznej. Głównym zadaniem aplikacji jest policzenie dostawy tzn. przypisanie odpowiednich ilości do towarów oraz wypełnienie na podstawie danych z aplikacji dokumentu przewozowego.

## Uruchomienie aplikacji

- Należy w folderze /src/configs/ stworzyć plik: "config.ts" który eksportuje stałą "config" typu "Partial < Config >"
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
- Po sklonowaniu tego repozytorium w folderze z aplikacją wywołać komendę: "npm install"
- Wywołać komendę "ng serve"
  
## Zbudowanie aplikacji na Androida
  
Aby zbudować aplikację na system Android należy:
- Wywołać komendę "ng build --output-path=www"
- Wywołać komendę "ionic capacitor copy android"
- Wywołać komendę "ionic capacitor open android" (Potrzebujemy programu Android Studio)
- Po załadowaniu projektu do Android Studio przechodzimy Build > Build Bundle(s) / APK(s) > Build APK(s)
- Przenieść utworzony plik .APK na urządzenie mobilne oraz zainstalować aplikację

## Screenshoty z aplikacji

| Screenshot      | Opis |
| ----------- | ----------- |
| <img src="https://user-images.githubusercontent.com/88888347/208940600-7d67ea4c-f54b-4fe4-b162-091dedcf665d.png" alt="" width="67.5px" height="150px">     | Menu główne       |
| <img src="https://user-images.githubusercontent.com/88888347/208941235-28585fb7-305a-4c82-8f84-4fc19140c330.png" alt="" width="67.5px" height="150px">   | Panel boczny        |
| <img src="https://user-images.githubusercontent.com/88888347/208962633-b8e387e0-efb0-4e72-b31e-70c51541277c.png" alt="" width="67.5px" height="150px">   | Lista zleceń        |
| <img src="https://user-images.githubusercontent.com/88888347/208962984-1f802217-039d-4280-bc5f-da29a02386b9.png" alt="" width="67.5px" height="150px">   | Menu dodawania do zlecenia        |
| <img src="https://user-images.githubusercontent.com/88888347/208963149-047f5207-e518-4291-966e-1c1b698829c0.png" alt="" width="67.5px" height="150px">   | Menu zarządzania zleceniem        |
| <img src="https://user-images.githubusercontent.com/88888347/208978365-4da51afc-f240-4c46-b2be-3e8b9ff5d047.png" alt="" width="67.5px" height="150px">   | Dziennik zdarzeń zlecenia        |
| <img src="https://user-images.githubusercontent.com/88888347/208978487-369220df-d2ce-42b9-b0d8-4e3a36f10430.png" alt="" width="67.5px" height="150px">   | Panel zarządzania TC (towarami)        |
| <img src="https://user-images.githubusercontent.com/88888347/208978584-8f644cda-b582-4d19-b8d2-dc2e4b9cc37a.png" alt="" width="67.5px" height="150px">   | Panel zarządzania użytkownikami        |
| <img src="https://user-images.githubusercontent.com/88888347/208978681-9bed5c1b-0d30-43da-a570-be1b6664d148.png" alt="" width="67.5px" height="150px">   | Strona po wylogowaniu        |
| <img src="https://user-images.githubusercontent.com/88888347/208978743-f66aa32b-0716-49ec-9c12-609e670cbdf6.png" alt="" width="67.5px" height="150px">   | Strona logowania        |
