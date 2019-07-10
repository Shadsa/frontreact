module.exports = {
    "parser": 'babel-eslint',
    "env": {
        "browser": true,
        "jest": true,
    },
    "extends": ["airbnb", "prettier"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "fetch": false,
        "window": true,
        "document": true,
        "localStorage": true
    },
    "parserOptions": {
        "sourceType": "module",
        "allowImportExportEverywhere": false,
        "codeFrame": false
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "max-len": ["error", {"code": 200}],
        "prefer-promise-reject-errors": ["off"],
        "react/prop-types": ["off"],
        "no-return-assign": ["off"],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/destructuring-assignment": ["off"],
        "react/no-access-state-in-setstate": ["off"],
        "class-methods-use-this": ["off"],
        "jsx-a11y/anchor-is-valid": ["off"],
        "global-require": ["off"],
        "jsx-a11y/label-has-associated-control": ["off"],
        "jsx-a11y/label-has-for": ["off"],
        "react/no-unused-state": ["off"],
        "import/no-extraneous-dependencies": ["off"],
        "import/no-named-as-default": ["off"],
        "import/no-cycle": ["off"],
        "import/prefer-default-export": ["off"],
        "react/prefer-stateless-function": ["off"],
        "react/forbid-prop-types": ["off"],
        "no-plusplus": ["off"],
        "no-unused-expressions": ["off"],
        "no-nested-ternary": ["off"],
        "consistent-return": ["off"],
        "react/jsx-no-bind": ["off"],
        "func-names": ["off"]
    }
};