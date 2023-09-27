FROM node:18

ENV PORT="8081"
ENV AWS_ACCESS_KEY_ID="AKIA4GODMB7S6O2FV244"
ENV AWS_SECRET_ACCESS_KEY="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"
ENV AWS_REGION="us-east-1"
ENV AWS_S3_BUCKET_NAME="tuannv78-aws-bucket"
ENV LOCAL_PATH="./tmp/"

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run dev
CMD [ "node", "src/server.js" ]