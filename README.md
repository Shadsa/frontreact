# MapMyWorld Webview

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Architecture

```
➜ tree src
src
├── App.css
├── App.js
├── Component
│  ├── AuthView
│  │  ├── AuthView.css
│  │  └── AuthView.js
│  ├── Home
│  │  ├── Home.css
│  │  └── Home.js
│  └── MapView
│     ├── Leaflet
│     │  ├── Cluster
│     │  │  ├── Cluster.css
│     │  │  ├── Cluster.js
│     │  │  └── DataEnancer
│     │  │     ├── DataEnancer.css
│     │  │     └── DataEnancer.js
│     │  ├── Leaflet.css
│     │  ├── Leaflet.js
│     │  ├── Legend
│     │  │  ├── Legend.css
│     │  │  └── Legend.js
│     │  └── Regions
│     │     └── Regions.js
│     ├── MapView.css
│     ├── MapView.js
│     └── YearSelector
│        ├── YearSelector.css
│        └── YearSelector.js
├── data
│  └── regions.json
├── history.js
├── index.css
├── index.js
├── Login
│  ├── authenticationService.js
│  ├── index.js
│  └── PrivateRoute.jsx
├── logo.svg
├── mmw_icon.png
├── mmw_logo.png
├── NoMatch.js
├── serviceWorker.js
└── tests
   └── MapView
      ├── Leaflet
      │  ├── Cluster
      │  │  ├── Cluster.test.js
      │  │  └── DataEnancer
      │  │     └── DataEnancer.test.js
      │  ├── Leaflet.test.js
      │  ├── Legend
      │  │  └── Legend.test.js
      │  └── Regions
      │     └── Regions.test.js
      └── YearSelector
         └── YearSelector.test.js

```

### Idée à exploiter :
- Prendre la data fournie a Leaflet par le fetch de MapView, 
- la mettre sous format de polygone GeoJSON
- Grâce à Turf.js et a la méthode getBond (zone du viewport) voir si le point d'un de nos polygones et dans le viewport(turf.inside(point, polygon)).
