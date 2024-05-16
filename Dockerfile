FROM node:20-buster-slim

RUN mkdir /app
WORKDIR /app
COPY . .
RUN rm -rf .vscode .git .github .gitignore .sample-env
RUN npm install
RUN npm run build

CMD ["node", "dist"]
