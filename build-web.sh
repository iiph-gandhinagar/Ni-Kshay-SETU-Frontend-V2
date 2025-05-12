#!/bin/bash
if [ -d ".git" ]; then
  mv .git .github
fi

npx nx build nikshy-setu-web

if [ -d ".github" ]; then
  mv .github .git
fi
