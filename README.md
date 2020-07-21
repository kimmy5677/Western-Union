# WP Currency Converter

WP Currency Converter is a React currency converter built specifically for WordPress.

<!-- TOC -->

- [WP Currency Converter](#wp-currency-converter)
  - [Setup and installation](#setup-and-installation)
  - [Usage](#usage)
  - [Quick Start](#quick-start)
    - [Introduction](#introduction)
    - [Using the Shortcode](#using-the-shortcode)
    - [Using the Widget](#using-the-widget)
    - [Using the Settings Page](#using-the-settings-page)
  - [Technologies](#technologies)
  - [Tutorials](#tutorials)
  - [Credits](#credits)

<!-- /TOC -->

## Setup and installation

- **Install [Node 8.12.0 LTS or greater](https://nodejs.org)**
- **Install [Yarn](https://yarnpkg.com/en/docs/install)** (Or use npm if you prefer)

## Usage

- Install required modules: `yarn` (or `npm install`)
- Build development version of app and watch for changes: `yarn build` (or `npm run build`)
- Build production version of app:`yarn prod` (or `npm run prod`)

## Quick Start

### Introduction

This boilerplate plugin provides three different WordPress views in which an independant React app can be rendered:

- Shortcode
- Widget
- Settings page in the backend (wp-admin)

Each JavaScript root file will correspond to the independant React app to be bundled by Webpack.

_webpack.config.js_

```javascript =6
entry: {
  'js/admin': path.resolve(__dirname, 'app/admin.js'),
  'js/shortcode': path.resolve(__dirname, 'app/shortcode.js'),
  'js/widget': path.resolve(__dirname, 'app/widget.js'),
},
```

### Using the Shortcode

In order to get the shortcode attributes into our Javascript we need to pass them to an object which will be made available to the _shortcode.js_ app via `wp_localize_script`. Be careful with the security of data you pass here as this will be output in a `<script>` tag in the rendered html.

_includes/Shortcode.php_

```php =81
public function shortcode( $atts ) {
  wp_enqueue_script( $this->plugin_slug . '-shortcode-script' );
  wp_enqueue_style( $this->plugin_slug . '-shortcode-style' );

  $object_name = 'cc_object_' . uniqid();

  $object = shortcode_atts( array(
    'title'       => 'Hello world',
    'api_nonce'   => wp_create_nonce( 'wp_rest' ),
    'api_url'	  => rest_url( 'wp-currency-converter/v1/' ),
  ), $atts, 'wp-currency-converter' );

  wp_localize_script( $this->plugin_slug . '-shortcode-script', $object_name, $object );

  $shortcode = '<div class="wp-currency-converter-shortcode" data-object-id="' . $object_name . '"></div>';
  return $shortcode;
}
```

You can access the shortcode attributes via the `wpObject` prop which is passed into your React container component.

_app/containers/Shortcode.jsx_

```javascript =1
import React, { Component } from "react";

export default class Shortcode extends Component {
  render() {
    return (
      <div className="wrap">
        <h1>WP Currency Converter Frontend</h1>
        <p>Title: {this.props.wpObject.title}</p>
      </div>
    );
  }
}
```

### Using the Widget

In order to get the widget options into our Javascript we need to pass them to an object which will be made available to the _widget.js_ app via `wp_localize_script`. Be careful with the security of data you pass here as this will be output in a `<script>` tag in the rendered html.

_includes/Widget.php_

```php =43
public function widget( $args, $instance ) {
  wp_enqueue_script( $this->plugin_slug . '-widget-script', plugins_url( 'assets/js/widget.js', dirname( __FILE__ ) ), array( 'jquery' ), $this->version );
  wp_enqueue_style( $this->plugin_slug . '-widget-style', plugins_url( 'assets/css/widget.css', dirname( __FILE__ ) ), $this->version );

  $object_name = 'cc_object_' . uniqid();

  $object = array(
    'title'       => $instance['title'],
    'api_nonce'   => wp_create_nonce( 'wp_rest' ),
    'api_url'	  => rest_url( 'wp-currency-converter/v1/' ),
  );

  wp_localize_script( $this->plugin_slug . '-widget-script', $object_name, $object );

  echo $args['before_widget'];

  ?><div class="wp-currency-converter-widget" data-object-id="<?php echo $object_name ?>"></div><?php

  echo $args['after_widget'];
}
```

You can access the widget options via the `wpObject` prop which is passed into your React container component.

_app/containers/Widget.jsx_

```javascript =1
import React, { Component } from "react";

export default class Widget extends Component {
  render() {
    return (
      <div className="wrap">
        <h1>WP Currency Converter Widget</h1>
        <p>Title: {this.props.wpObject.title}</p>
      </div>
    );
  }
}
```

### Using the Settings Page

In our admin class we add a sub menu page to the Settings menu using `add_options_page` and render the React Admin container onto the root DOM node.

_includes/Admin.php_

```php =163
public function display_plugin_admin_page() {
 ?><div id="wp-currency-converter-admin"></div><?php
}
```

## Technologies

| **Tech**                                   | **Description**                                                                          |
| ------------------------------------------ | ---------------------------------------------------------------------------------------- |
| [React](https://facebook.github.io/react/) | A JavaScript library for building user interfaces.                                       |
| [Babel](http://babeljs.io)                 | Compiles next generation JS features to ES5. Enjoy the new version of JavaScript, today. |
| [Webpack](http://webpack.js.org)           | For bundling our JavaScript assets.                                                      |
| [ESLint](http://eslint.org/)               | Pluggable linting utility for JavaScript and JSX                                         |

The boilerplate has been updated to use PHP **namespaces and autoloading**. Please see Tom McFarlin's [article](https://tommcfarlin.com/namespaces-and-autoloading-2017/) on the subject if you are not familiar.

## Tutorials

Building a WordPress plugin with React - [Part 1](https://github.com/SUPERUSER41/building-wordpress-plugin-with-react-part-1/), [Part 2](https://github.com/SUPERUSER41/building-wordpress-plugin-with-react-part-2/)

## Credits

_Made by [SUPERUSER41](https://github.com/SUPERUSER41)_

# fx-currency-converter
