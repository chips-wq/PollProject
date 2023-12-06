# Deschiderea proiectului

In backend creati un fisier cu numele `.env` si introduceti linia. (sau redenumiti .env_example)
```
SECRET_JWT=secret
```

Am folosit node v18.19.0 si (npm v10.2.3).

Intrati in directoarele backend si pollfrontend si rulati `npm install` in fiecare.

Dupa intrati in root-ul proiectului si rulati `sudo docker-compose build && sudo docker-compose up`.

Frontend-ul se poate accesa la http://localhost:5173/

# Tehnologii

Proiectul foloseste MERN stack + docker. Frontend-ul, backend-ul si baza de date ruleaza fiecare intr-un container separat (`docker-compose.yml`).