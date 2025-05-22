# DeathWatch

Une application permettant de suivre et d'être informé des décès de vos proches.

## Fonctionnalités

- Inscription et connexion (email/mot de passe, Google, Facebook)
- Ajout et gestion des personnes à suivre
- Consultation des derniers décès par zone géographique
- Notifications en cas de décès d'un proche
- Gestion du compte utilisateur

## Technologies utilisées

- SvelteKit
- Supabase (authentification et base de données)
- TypeScript

## Installation

1. Clonez ce dépôt
2. Installez les dépendances : `npm install`
3. Copiez `.env.example` vers `.env` et configurez vos variables d'environnement Supabase
4. Lancez le serveur de développement : `npm run dev`

## Structure de l'application

```
├── src/
│   ├── app.css                # Styles globaux
│   ├── routes/                # Pages de l'application
│   │   ├── +layout.svelte     # Layout principal
│   │   ├── +page.svelte       # Page d'accueil
│   │   ├── auth/              # Authentification
│   │   │   ├── login/         # Connexion
│   │   │   └── register/      # Inscription
│   │   ├── persons/           # Gestion des personnes
│   │   │   ├── +page.svelte   # Liste des personnes
│   │   │   └── add/           # Ajout d'une personne
│   │   ├── deaths/            # Derniers décès
│   │   └── account/           # Gestion du compte
│   ├── lib/                   # Librairies partagées
│   │   └── supabase.js        # Client Supabase
│   └── components/            # Composants réutilisables
├── static/                    # Fichiers statiques
└── supabase/                  # Configuration Supabase
```

## Déploiement

L'application peut être déployée sur n'importe quelle plateforme compatible avec SvelteKit (Vercel, Netlify, etc.).