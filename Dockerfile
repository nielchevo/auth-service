FROM node:12-alpine3.10

# Working dir
WORKDIR /app

# Copy all installed dependency
COPY . .

# Install all dependency
RUN yarn install

# Build the app entrypoint
RUN yarn build

EXPOSE 8080

# Run Application
CMD ["yarn", "start:prod"]
