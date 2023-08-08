From node:18.16.1

WORKDIR /S09P12E202/frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 5173

CMD ["npm", "run", "dev"]


