# Project_ISee Premier rendu

C'est un projet académique de l'école Supinfo, nous devons faire une application de stream. 
Dans cette partie, vous trouverez le front end de l'application.

## Screenshots 
Page d'accueil
![Screenshot (308)](https://user-images.githubusercontent.com/77280622/230801929-5513083f-7f47-4941-807d-9792aec12259.png)

Partage d'une video
![Screenshot (309)](https://user-images.githubusercontent.com/77280622/230801928-633dbf28-230b-4c8b-ba14-d6e5bf99f50a.png)

Login page
![Screenshot (310)](https://user-images.githubusercontent.com/77280622/230801927-0c887814-0785-44c4-8ce2-9e1e7ee0afe1.png)

Signup page
![image_2023-04-10_014102635](https://user-images.githubusercontent.com/77280622/230801907-2ccfe3de-00dc-4cf9-baea-e494e69c1089.png)

## Lancement de l'API

Pour lancer le projet la 1ére fois, il faut télécharger les dépendances du projet, ou plutot, le dossier ‘node_modules’. 
C'est avec la commande ’npm install’ dans le terminal du dossier spécifique du projet.
Ensuite pour lancer le projet, il vous suffira de faire ‘npm start’

## Packages

On a relié sur ces packages pour l'avancement du projet.

#### `npm install bootstrap@5.2.3`
#### `npm install react-bootstrap bootstrap`
#### `npm install axios`
#### `npm install react-router-dom`
#### `npm install mocha`
#### npm install react-redux`
#### npm install react-thunk`
#### npm install redux-devtools-extension`
#### npm install redux-logger`



## Focntionnalités actuelles

- Page d'accueil

Nous y trouvons le 'Navbar': il s'agit du logo, la barre de recherche, bouton pour mettre une video, et logo du profil d'utilisateur qui nous méne vers une page de modifier les données de l'utilisateur s'il est connecté ou une page login,signup s'il n'est pas connecté. Pour le moment, la gestion du connection n'est pas encore établie et se fait d'une manière manuelle vu qu'on n'est pas encore connecté avec un backend. 

- Partage d'une video
Normalement, il se fait que si l'utilisateur est connecté. Sinon, il dirige vers la page de connection. 

- Page de connections
Formulaire pour que l'utilisateur puisse se connecter.
Page login, vérifie les données de l'API pour permettre la connection de l'utilisateur.
Page signup, fait une requete post à l'API pour permettre l'enregistrement de l'utilisateur.

- Redux:
la gestion des variables dans les components de React se fait par la bibliothéque Redux pour faciliser la modification des différents états des variables dans l'interface.
