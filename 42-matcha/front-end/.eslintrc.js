module.exports = {
  "extends": ["standard", "plugin:react/all"],
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true
    },
    "impliedStrict": true,
    "sourceType": "module"
  },
  "rules": {
    "brace-style": "off",
    "curly": "off",
    "no-throw-literal": "off",
    "react/no-multi-comp": "off",
    "react/no-set-state": "off",
    "react/forbid-prop-types": "off",
    "react/forbid-component-props": "off",
    "react/jsx-no-bind": "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "react/jsx-curly-brace-presence": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-first-prop-new-line": "off",
    "react/jsx-max-props-per-line": "off"
  },
  "plugins": [ "react" ]
}
