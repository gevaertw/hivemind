# Build and upload to Azure Storage
cd /root/gitlocal/hivemind/frontend
npm run build
az storage blob upload-batch --account-name hivemindbe --destination '$web' --source ./dist --overwrite --auth-mode login