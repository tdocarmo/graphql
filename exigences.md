## Exigences du Projet

### 1. Authentification et Accès
- **Page de connexion** : Les utilisateurs doivent pouvoir se connecter avec des identifiants valides.
- **Déconnexion** : La fonctionnalité de déconnexion doit être disponible pour les utilisateurs authentifiés.

### 2. Sections du Profil
- **Sections requises** : Le profil doit comporter trois sections principales :
  - Identification de l'utilisateur (nom, XP, grades).
  - Informations sur les audits.
  - Compétences de l'utilisateur.
  
- **Section supplémentaire** : Un quatrième segment dédié aux statistiques graphiques est nécessaire.

### 3. Statistiques Graphiques
- **Graphiques en SVG** : Au moins deux graphiques doivent être présents, illustrant les statistiques suivantes :
  - XP gagné sur une période donnée.
  - XP gagné par projet.
  - Ratio des audits (passé/échoué).
  - Ratio des projets PASS et FAIL.
  - Statistiques de la piscine (JS/Go).
  - Tentatives pour chaque exercice.

### 4. Accessibilité
- **Hébergement en ligne** : Le profil doit être accessible depuis le domaine hôte.

### 5. Requêtes GraphQL
- **API GraphQL** : Le projet doit inclure des requêtes GraphQL obligatoires (normales, imbriquées et avec arguments) pour récupérer les données nécessaires.

### 6. Fonctionnalités Bonus (optionnelles)
- Informations supplémentaires au-delà des trois sections obligatoires.
- Graphiques supplémentaires au-delà des deux requis.
- Création et utilisation d'un environnement GraphiQL personnalisé.

### 7. Validation et Tests
- Vérifier l'exactitude des informations affichées dans chaque section.
- Valider l'affichage correct des graphiques et s'assurer qu'ils contiennent des données précises.
