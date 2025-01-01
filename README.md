<div align="center">

# Better

![GitHub Tag](https://img.shields.io/github/v/tag/matheusmfranco/better) ![ReactNative](https://img.shields.io/badge/framework-ReactNative-brightgreen)

Mobile application thats organize yout lottery games.

</div>

## Preview

<img src="/prints/home.png" height="300" /><img src="/prints/generate.png" height="300" /><img src="/prints/make_yours.png" height="300" /><img src="/prints/favorites.png" height="300" /><img src="/prints/history.png" height="300" />
<img src="/prints/remove.png" height="300" /><img src="/prints/checker.png" height="300" /><img src="/prints/loser.png" height="300" /><img src="/prints/data.png" height="300" /><img src="/prints/clear.png" height="300" />

## Features

### Generate
Generate 6 random numbers or the size that you want. When you generate a game, this game will appear in history page. It's possible to add this same number to your favorite game list.

### Make your Game
It's possible make your game by yourself and save this to your favorite game list. Every game that you make will appear in the history list.


### Favorite your Best Games
You can favorite games that you genarate or make, see these games in a list and remove them.

### History
All games that were generated or made.

### Manage Data
- Import a txt file and save these games in favorite list;
- Export the favorite list to txt;
- Clear favorite list;
- Clear history lsit.

## Check if you won
You can verify how many games you have won by setting the minimum number of numbers that the app must filter.


## Stack

- **React Native Elements**: Cross-platform UI library that provides pre-styled, customizable components to speed up app development in React Native.;
- **Prettier**: Code formatter that enforces consistent style for readability and simplicity;
- **ESLint**: Linting tool that identifies and fixes potential errors and code quality issues;
- **Standard-version**: Versioning tool that automates semantic versioning and changelog generation;
- **Commitlint**: Tool that enforces standardized commit messages for better readability and changelog consistency;
- **Husky**: Git hooks manager that enhances code quality by enabling pre-commit and pre-push checks.

## Before add something

This project uses husky para automate commits to still in pattern and pushes, so before to add something in this project, please run this command:

```bash
npm run prepare
```

To know more about how to create a good commit message, [read this documentation](https://www.conventionalcommits.org/en/v1.0.0/).

## Run Local

```bash
npm install
npm start
```

### Android

Set up your [android environment](https://reactnative.dev/docs/next/set-up-your-environment?platform=android), then:
```bash
npm run android
```

### iOS

Set up your [iOS environment](https://reactnative.dev/docs/next/set-up-your-environment?platform=ios), then:

```bash
cd ios
pod install
npm run ios
```



![Tiger](https://64.media.tumblr.com/3a2ae613b8ffdc44b3f7d17dd6828ac0/tumblr_nhzjnaaM2g1to8m3co1_640.gif)
