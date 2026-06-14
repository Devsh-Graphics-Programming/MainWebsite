# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM caddy:2.9-alpine AS runner
WORKDIR /srv

ARG BUILD_DATE="unknown"
ARG VCS_REF="unknown"
ARG VCS_URL="https://github.com/Devsh-Graphics-Programming/MainWebsite"
ARG SOURCE_BRANCH="unknown"
ARG IMAGE_NAME="www-website"
ARG GITHUB_RUN_ID="unknown"
ARG GITHUB_RUN_ATTEMPT="unknown"
ARG GITHUB_RUN_URL="unknown"
ARG GITHUB_ACTOR="unknown"
ARG COMMIT_AUTHOR="unknown"

LABEL org.opencontainers.image.title="DevSH Graphics Programming Website" \
      org.opencontainers.image.description="Static DevSH website served by Caddy" \
      org.opencontainers.image.url="https://www.devsh.eu" \
      org.opencontainers.image.source="${VCS_URL}" \
      org.opencontainers.image.revision="${VCS_REF}" \
      org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.authors="${COMMIT_AUTHOR}"

RUN addgroup -S caddy && adduser -S caddy -G caddy

COPY --from=build --chown=caddy:caddy /app/out ./
COPY --chown=caddy:caddy Caddyfile.site /etc/caddy/Caddyfile

RUN set -eu; \
  json_escape() { printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'; }; \
  { \
    printf '{\n'; \
    printf '  "schemaVersion": 1,\n'; \
    printf '  "image": "%s",\n' "$(json_escape "$IMAGE_NAME")"; \
    printf '  "source": "%s",\n' "$(json_escape "$VCS_URL")"; \
    printf '  "revision": "%s",\n' "$(json_escape "$VCS_REF")"; \
    printf '  "branch": "%s",\n' "$(json_escape "$SOURCE_BRANCH")"; \
    printf '  "created": "%s",\n' "$(json_escape "$BUILD_DATE")"; \
    printf '  "commitAuthor": "%s",\n' "$(json_escape "$COMMIT_AUTHOR")"; \
    printf '  "builder": {\n'; \
    printf '    "actor": "%s",\n' "$(json_escape "$GITHUB_ACTOR")"; \
    printf '    "runId": "%s",\n' "$(json_escape "$GITHUB_RUN_ID")"; \
    printf '    "runAttempt": "%s",\n' "$(json_escape "$GITHUB_RUN_ATTEMPT")"; \
    printf '    "runUrl": "%s"\n' "$(json_escape "$GITHUB_RUN_URL")"; \
    printf '  }\n'; \
    printf '}\n'; \
  } > /srv/build-info.json

EXPOSE 3000
RUN mkdir -p /config/caddy /data/caddy \
  && chown -R caddy:caddy /config /data \
  && setcap -r /usr/bin/caddy
USER caddy
ENTRYPOINT ["caddy", "run", "--config=/etc/caddy/Caddyfile"]
