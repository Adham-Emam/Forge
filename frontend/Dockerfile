FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Run the production build
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
