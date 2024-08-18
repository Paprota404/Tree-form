
# Tree-Form

## Opis

Podaj krótki opis swojego projektu tutaj.

## Technologia

- **Frontend**: Next.js
- **Backend**: .NET (ASP.NET Core)
- **Baza danych**: PostgreSQL

## Wymagania

Upewnij się, że masz zainstalowane następujące oprogramowanie na swoim komputerze:

- Node.js (w tym npm)
- .NET SDK
- PostgreSQL

## Instrukcje konfiguracyjne

### Klonowanie Repozytorium

1. Otwórz terminal lub wiersz poleceń.
2. Sklonuj repozytorium używając polecenia `git clone` i adresu URL repozytorium.
3. Przejdź do katalogu sklonowanego repozytorium.

### Konfigurowanie Backend

1. Przejdź do katalogu projektu backendu.

2. Przywróć zależności .NET używając polecenia `dotnet restore`.

3. Zastosuj migracje bazy danych. Upewnij się, że PostgreSQL działa i stwórz bazę danych, jeśli to konieczne. Możesz skonfigurować połączenie z bazą danych w plikach konfiguracyjnych.

4. Uruchom serwer backendowy używając polecenia `dotnet run`. Serwer backendowy będzie zazwyczaj dostępny pod adresem `http://localhost:5000`.

### Konfigurowanie Frontend

1. Przejdź do katalogu projektu frontendowego.

2. Zainstaluj niezbędne zależności używając `npm install` lub `yarn install`.

3. Uruchom serwer deweloperski frontendowy za pomocą `npm run dev` lub `yarn dev`. Frontend będzie dostępny pod adresem `http://localhost:3000`.

