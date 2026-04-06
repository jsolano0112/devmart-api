pipeline {
    agent any

    environment {
        IMAGE_NAME = 'devmart-api'
        CONTAINER_NAME = 'devmart-api'
        PORT = '3000'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Instalando dependencias...'
                dir('devmart-api') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Construyendo imagen Docker...'
                dir('devmart-api') {
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Desplegando contenedor...'
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm ${CONTAINER_NAME} || true"
                sh """
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        --network devmart_network \
                        --env-file ./devmart-api/.env \
                        -p ${PORT}:${PORT} \
                        ${IMAGE_NAME}:latest
                """
            }
        }
    }

    post {
        success {
            echo 'devmart-api desplegado correctamente'
        }
        failure {
            echo 'Error en el pipeline de devmart-api'
        }
    }
}