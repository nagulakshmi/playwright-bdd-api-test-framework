#!/bin/bash

#execute the tests
npm run test:dev

#generate report
npm run generate:report

# create artifactory directory
mkdir -p artifactory

# copy all the files
cp -r /app/logs /app/artifactory
cp -r /app/output /app/artifactory
cp -r /app/report /app/artifactory

# Create a tarball of the source directory and its contents
tar -cvf "/app/upload_artifact.tar.gz" -c "/app/artifactory"

#upload into artifactor, update username, password, repo path and url when its available
curl -u USERNAME:PASSWORD -X PUT "https://YOUR_ARTIFACTORY_URL/artifactory/YOUR_REPO_PATH/your/path/in/repository/your-zip-file.zip" --upload-file /app/upload_artifact.tar.gz