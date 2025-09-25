Quick deploy (GCP)

- Cloud Run service name: devops-ia-backend
- Required env vars: MONGO_DB_URL, CLIENT_URL
- Set substitutions in cloudbuild.yaml trigger: _MONGO_DB_URL, _CLIENT_URL, _REGION
