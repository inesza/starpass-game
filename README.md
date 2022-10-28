# StarPass - A roller derby game

_by: Inès Zallouz_

## What's the plan?

Starpass is a student project I developed during my first project week at Ironhack web development bootcamp in October 2022

Created with :
- HTML/CSS
- JavaScript
- Blood, sweat and tears, but mostly tea

## What are the rules ?

- You’re the jammer
- You must avoid opposing blockers (that’s game mode 1)
- You score points by overlapping them
- If you collide with an opponent, you’ll have to find a way to overlap them using your strength or speed (that’s game mode 2)
    - You lose stamina with every unsuccessful try
    - You can gain stamina by colliding with a teammate
    - If your stamina falls to 0, you lose

## Why this one?

- Because I played roller derby for 5 years and it is a fun sport that deserves public recognition
- It allows for several game mechanics at once

## Features

- Two games in one (a canvas game and a more classic rpg-fight type one)
- The choice between 3 different characters with different avatars and stats
- Hit collisions (if you hit an opponent, the canvas stops and you enter fight mode)
- Booster collisions (if you hit an opponent, the canvas keeps running and you gain +5 stamina if you're not at full stamina)
- Randomly generated opponents for each fight
- Restart game at the end
- CSS animations everywhere
- Amazing (not really) sound effects

## Known issues

- Problem with restarting the game (sometimes you cannot see the blockers, sometimes too many of them are generated at once)
- Unnecessary vertical scroll on smaller screens

## What's next

- Local best score
- Have a proper restart function


## Demo

[StarPass](https://inesza.github.io/starpass-game/ "StarPass - A roller derby game")
