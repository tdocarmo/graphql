## Programme de Développement du Projet

### 1. Réflexion et Analyse

- **Compréhension de l'énoncé et de l'audit** : 
  - Analyse des exigences et des critères d'évaluation.
  - Identification des utilisateurs cibles et de leurs besoins.

- **Définition des fonctionnalités** : 
  - **Informations à afficher** : Basic user identification, XP amount, grades, audits, skills.
  - **Statistiques graphiques à générer** :
    - XP earned in a time period (progress over time).
    - XP earned by project.
    - Audit ratio.
    - Projects PASS and FAIL ratio.
    - Piscine (JS/Go) stats.
    - PASS and FAIL ratio.
    - Attempts for each exercise.

- **Diagrammes à réaliser** :
  - **Diagramme de cas d'utilisation** : Montre les interactions entre les utilisateurs et les différentes fonctionnalités de l'application.

### 2. Conception

- **Zoning** : 
  - Crée un schéma simple montrant la structure générale de l'application.
  - Liste les fonctionnalités clés pour chaque section.

- **Maquettes Figma** (ou autre outil de design) : 
  - Créer des maquettes pour visualiser l'interface utilisateur (UI).
  - Inclure les sections requises (profil et statistiques).
  - Penser à la navigation et à l'expérience utilisateur (UX).

- **Diagrammes à réaliser** :
  - **Diagramme de flux de données (DFD)** : Montre comment les données circulent dans l'application.
  - **Diagramme de composants** : Représente les différents composants de l'application (React, Apollo Client, D3.js, etc.) et leurs interactions.

### 3. Choix des Outils, Langages et Frameworks

- **Front-end** :
  - JavaScript avec React.js pour l'interface utilisateur.
  - Apollo Client pour gérer les requêtes GraphQL.
  - D3.js pour les graphiques en SVG.

- **Back-end** :
  - Node.js (environnement d'exécution) avec Express.js (framework) pour le serveur.
  - Apollo Server pour créer une API GraphQL.

- **Diagrammes à réaliser** :
  - **Schéma GraphQL** : Décrit les types, requêtes et mutations de l'API GraphQL.

### 4. Développement

- **Création de la page de connexion** :
  - Intégrer l'authentification avec JWT.
  - Gérer les erreurs d'authentification.

- **Implémentation de l'API GraphQL** :
  - Établir des requêtes pour récupérer les données nécessaires à partir de l'API GraphQL fournie.

- **Développement de l'interface utilisateur** :
  - Créer les sections de profil et de statistiques en utilisant les maquettes Figma comme guide.
  - Utiliser Apollo Client pour gérer les requêtes de données.

- **Intégration des graphiques** :
  - Utiliser D3.js pour créer les graphiques dans la section des statistiques.

- **Diagrammes à réaliser** :
  - **Diagrammes de séquence** : Illustrent l'interaction entre les composants lors de l'exécution des fonctionnalités.

### 5. Tests et Validation

- **Vérification des fonctionnalités** :
  - Tester la connexion, la récupération des données, et l'affichage correct des informations.

- **Validation des graphiques** :
  - S'assurer que les graphiques affichent les données correctement et reflètent les statistiques attendues.

### 6. Hébergement

- **Choix d'une plateforme d'hébergement** :
  - Utiliser GitHub Pages, Netlify, ou une autre plateforme pour héberger ton projet.

- **Déploiement** : 
  - Publier ton application en ligne et s'assurer qu'elle est accessible.

### 7. Finalisation et Documentation

- **Ajout de la fonctionnalité de déconnexion** : 
  - Implémenter la fonctionnalité pour permettre aux utilisateurs de se déconnecter.

- **Documentation** : 
  - Rédiger des notes sur le projet, y compris les décisions prises, les fonctionnalités implémentées, et les difficultés rencontrées.

- **Diagrammes à réaliser** :
  - **Documentation visuelle** : Inclure des diagrammes de flux et des schémas dans la documentation pour faciliter la compréhension.

### 8. Feedback et Améliorations

- **Obtenir des retours** : 
  - Demander des retours sur le produit final de la part de tes pairs ou mentors.

- **Mettre à jour le projet** : 
  - Apporte des modifications basées sur les commentaires reçus.
