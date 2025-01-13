FROM  node:20-alpine AS builder

WORKDIR /usr/src/app

COPY  package*.json tsconfig*.json ./
RUN corepack enable && corepack prepare pnpm@latest --activate && pnpm install

COPY . .

RUN pnpm build && pnpm prune --prod

FROM public.ecr.aws/lambda/nodejs:20 AS runner

WORKDIR /var/task

COPY  --from=builder /usr/src/app/node_modules ./node_modules
COPY  --from=builder /usr/src/app/build ./build

ENTRYPOINT [ "/lambda-entrypoint.sh" ]
CMD [ "build/lambda.handler" ]