# Gunakan image node
FROM node:14

# Buat dan atur direktori kerja
WORKDIR /app

# Salin file package dan install dependencies
COPY package*.json ./
RUN npm install

# Salin semua kode sumber
COPY . .

# Build TypeScript dan ekspos port
RUN npm run build
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
