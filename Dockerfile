FROM  node:20-alpine AS builder

WORKDIR /usr/src/app

COPY .npmrc package*.json pnpm*.json tsconfig*.json ./
RUN corepack enable && corepack use pnpm && pnpm install --frozen-lockfile

COPY . .

RUN pnpm build && pnpm prune --prod

FROM public.ecr.aws/lambda/nodejs:20 AS runner

WORKDIR /var/task

COPY  --from=builder /usr/src/app/node_modules ./node_modules
COPY  --from=builder /usr/src/app/build ./build
COPY  --from=builder /usr/src/app/lambda.js ./lambda.js
COPY  --from=builder /usr/src/app/package.json ./package.json

ENTRYPOINT [ "/lambda-entrypoint.sh" ]
CMD [ "lambda.handler" ]