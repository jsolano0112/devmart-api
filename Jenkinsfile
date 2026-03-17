pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                echo 'Starting installing dependencies...'

                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Down containers') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker compose down'
                    } else {
                        bat 'docker compose down'
                    }
                }
            }
        }

         stage('Build and up containers') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker compose up --build -d'
                    } else {
                        bat 'docker compose up --build -d'
                    }
                }
            }
        }
    }
}
