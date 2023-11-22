FROM --platform=linux mcr.microsoft.com/playwright:v1.33.0-focal
COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT [ "./execute-tests.sh" ]