# Pokemon Summary APP

This project contains an example application for learning implementation of microfrontends using module federation and Angular. It consumes the open Pokeapi for consulting data and distribute different domains into individual applications.

## Table of Contents

1. [Architecture](#architecture)
2. [Host app](#host)
3. [Home](#home)
4. [Pokemons](#pokemons)

## Architecture

![app mockup](docs/pokemon-app-mockup.png "Poke-Summary App Mockup")

The idea of the development of this project is to create a web host application splitted in two parts:

- A root app that asumes the role of a container who organize and declare all the microfrontends that will be included in the project.
- Some micro applications that represents each functional domain that envolves the business logic, these apps will be considered as microfrontends contained inside the root _host_ app.
  - **Note:** In the first release version it will be develop two microfrontends: a Dashboard (home initial page) and a Pokemon module.

In this project the microfrontend architecture will be implemented in **vertical** aproach, it consist in it will be only one microfrontend per page and per business domain. To acomplish this goal the project will use Angular for each app (host and microfrontends) and implementing as the microfrontend technology tier the [Module Federation](https://www.npmjs.com/package/@angular-architects/module-federation) plugin developed by angular-architects team.

## Host

The host application has the layout of the web page, it includes a header menú to navigate
into each microfront (each federated app has a exlusive url domain, ex: app.com/home, app.com/pokemon).

The effort in this app is put all the config needed to apply module federation and dynamic module load.

## Home

The Home application contains one page component that displays the app title and some info, also it includes a dumb component to render a random pokemon of the day. This feature implies the follow:

- Save in localstorage a variable of the last day that the user visited the web page.
- If the last date is different than today, it will generate a random number for look a pokemon and show a preview.

## Pokemons

The Pokemons application contains two page components that displays a table list of pokemon name, number and a button to go to the pokemon's detail, and the second page is the pokemon detail page, it has some basic info and a picture.
