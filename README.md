# SKILL TRACKER

Une application web permettant l'authentification sécurisée et l'affichage de profils utilisateur avec des statistiques interactives, développée avec React.js et GraphQL.

---

## ✨ Fonctionnalités

- Authentification utilisateur via JWT.
- Connexion sécurisée avec une API dédiée.
- Requêtes GraphQL pour récupérer et afficher les données utilisateur.
- Statistiques visuelles interactives au format SVG.

---

## 🛠️ Technologies Utilisées

- **Frontend** : React.js, Apollo Client
- **Backend** : API GraphQL (consommation uniquement)
- **Déploiement** : Netlify

---

## ⚙️ Installation Locale

### Prérequis

- **Node.js** version 16 ou supérieure
- **npm** ou **yarn**

### Étapes d'installation

1. **Clonez le projet :**
   ```bash
   git clone https://zone01normandie.org/git/tdocarmo/graphql.git
   cd graphql
Installez les dépendances :

bash
Copier le code
npm install
Configuration des variables d'environnement : Créez un fichier .env à la racine du projet et configurez les variables suivantes :

env
Copier le code
REACT_APP_API_URL=https://zone01normandie.org/api/graphql-engine/v1/graphql
REACT_APP_AUTH_URL=https://zone01normandie.org/api/auth/signin
Bonnes pratiques :

Ces URL sont spécifiques à l'API utilisée dans ce projet.
Contactez l'administrateur de l'API ou consultez zone01normandie.org pour obtenir les accès nécessaires.
Ne partagez jamais vos clés .env publiquement.
Lancez le projet en local :

bash
Copier le code
npm start
L'application sera accessible sur http://localhost:3000.

🌍 Déploiement
Ce projet est conçu pour être facilement déployé sur Netlify. Pour déployer votre propre version :

Liez votre repository Git à Netlify.
Ajoutez les variables d'environnement directement dans les paramètres Netlify :
REACT_APP_API_URL
REACT_APP_AUTH_URL
Effectuez un déploiement en suivant le processus Netlify. Vous pouvez aussi forcer un nouveau déploiement en utilisant l’option Clear cache and deploy site.
Si vous travaillez uniquement en local, cette étape est facultative.

🤝 Contribution
Ce projet est fermé aux contributions externes. Pour toute suggestion, ouvrez une issue sur le repository GitHub.

Auteur
Toni Do Carmo
