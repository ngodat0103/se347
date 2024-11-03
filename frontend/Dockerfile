FROM node:18.19-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install -g @angular/cli
RUN npm ci --legacy-peer-deps
COPY . .
ENV NODE_ENV=production
RUN ng build --configuration production

FROM nginx:stable-alpine3.20-perl
COPY ./config/fe_nginx.conf /etc/nginx/conf.d/fe_nginx.conf
# Copy built application from the build stage
COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html
# Expose port 4200
EXPOSE 4200