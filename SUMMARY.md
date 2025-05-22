# DeathWatch - Résumé de l'application

J'ai créé une application SvelteKit qui permet de suivre et d'être informé des décès de proches. Voici un résumé de la structure et des fonctionnalités :

## Structure de l'application

- **Frontend** : SvelteKit avec structure des routes basée sur les fichiers
- **Backend** : Supabase pour l'authentification et la base de données
- **Styles** : CSS intégré dans les composants Svelte

## Pages de l'application

1. **Accueil** : Présentation du projet et de ses fonctionnalités principales
2. **Authentification** :
   - Inscription par email ou OAuth (Google, Facebook)
   - Connexion
3. **Gestion des personnes** :
   - Liste des personnes suivies
   - Ajout d'une nouvelle personne
4. **Consultation des décès** :
   - Derniers décès avec filtrage par ville
5. **Compte utilisateur** :
   - Gestion des informations personnelles
   - Préférences de notification
   - Sécurité et déconnexion

## Fonctionnalités implémentées

- **Authentification complète** avec Supabase (email + OAuth)
- **Gestion de l'état utilisateur** côté client et serveur
- **Protection des routes** pour les utilisateurs connectés/déconnectés
- **CRUD pour les personnes** (ajout, liste, possibilité d'extension vers modification et suppression)
- **Filtrage des décès** par ville
- **Gestion du profil utilisateur**
- **Interface responsive**

## Configuration Supabase

Pour configurer Supabase :

1. Créer un projet sur [Supabase](https://supabase.com)
2. Configurer l'authentification (email + OAuth providers)
3. Créer les tables suivantes :
   - `persons` : pour stocker les personnes suivies
   - `deaths` : pour stocker les informations sur les décès
4. Copier le fichier `.env.example` vers `.env` et ajouter vos clés API Supabase

## Démarrage du projet

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Build pour la production
npm run build
```

## Prochaines étapes possibles

1. Implémentation des pages de détail pour chaque personne
2. Ajout d'une fonction de notification par email
3. Intégration avec des API de données officielles sur les décès
4. Amélioration du design avec un framework CSS (Tailwind, etc.)
5. Tests unitaires et d'intégration
6. Ajout de fonctionnalités sociales (partage, commentaires, etc.)