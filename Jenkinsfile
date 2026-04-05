pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install') {
            steps {
                script {
                    if (isUnix()) { sh 'npm ci' } else { bat 'npm ci' }
                }
            }
        }

        stage('Lint') {
            steps {
                script {
                    if (isUnix()) { sh 'npm run lint' } else { bat 'npm run lint' }
                }
            }
        }

        stage('Build TypeScript') {
            steps {
                script {
                    if (isUnix()) { sh 'npm run build' } else { bat 'npm run build' }
                }
            }
        }

        stage('Build Docker') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker build -t devmart-api .'
                    } else {
                        bat 'docker build -t devmart-api .'
                    }
                }
            }
        }
    }

    post {
        success { echo '✅ devmart-api OK' }
        failure { echo '❌ devmart-api falló' }
        always { cleanWs() }
    }
}