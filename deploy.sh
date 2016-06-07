#!/bin/bash

git config --global user.name "dtothefp"
git config --global user.email "dtothefp@gmail.com"

git remote rm origin
git remote add origin https://dtothefp:${GITHUB_API_KEY}@github.com/dtothefp/speedcurve-test.git
