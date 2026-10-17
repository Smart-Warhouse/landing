# Smart Warehouse landing page: build the static Vite site, serve it with nginx under a strict CSP.

# ---- build ----
FROM node:22-slim AS build
WORKDIR /app

# Where the "Open dashboard" buttons point; baked into the bundle at build time.
ARG VITE_DASHBOARD_URL=http://localhost:5173
ENV VITE_DASHBOARD_URL=${VITE_DASHBOARD_URL}

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- runtime ----
FROM nginx:1.28-alpine AS final

# The nginx entrypoint runs envsubst over /etc/nginx/templates/*.template (only real env vars such as
# $PORT are substituted) and writes the results into /etc/nginx/conf.d/.
ENV PORT=8080

COPY --from=build /app/dist /usr/share/nginx/html
COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY docker/security-headers.inc.template /etc/nginx/templates/security-headers.inc.template

EXPOSE 8080
