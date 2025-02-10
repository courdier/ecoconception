# Introduction à CodeCarbon

Codecarbon est un outils dedéveloppement qui permet de moniter des équipements informatique ou de calculer la consommation d'énergie d'un code python.

## Comment ça marche ?

CodeCarbon permet  d'estimer les émissions de CO2 associés à l'exécution d'un code, en utilisant deux principes:

Intensité carbone (C): Elle mesure les émissions de CO₂ par kilowattheure (kWh) d’électricité consommée. Cette valeur dépend du mix énergétique local, qui combine des sources fossiles (comme le charbon ou le pétrole) et des sources renouvelables (comme l’énergie solaire ou hydroélectrique).

Énergie consommée (E): C’est l’énergie (en kWh) consommée par l’infrastructure matérielle (CPU, GPU, RAM, etc.) pendant le temps d’exécution du code. CodeCarbon suit cette consommation à des intervalles réguliers (par défaut, toutes les 15 secondes).

Les émissions de CO2 sont ensuite calculées via la formule : 

Émissions (CO2eq) = 𝐶 × 𝐸

## Sources

https://mlco2.github.io/codecarbon/methodology.html

https://github.com/mlco2/codecarbon

https://codecarbon.io/
