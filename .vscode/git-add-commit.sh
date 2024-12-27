#!/bin/bash

# Ejecutar git add .
git add .

# Verificar si git add fue exitoso
if [ $? -eq 0 ]; then
    # Ejecutar git commit -m ""
    git commit -m ""
else
    echo "Error al ejecutar git add ."
fi