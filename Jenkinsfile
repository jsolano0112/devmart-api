pipeline {
    agent any

    environment {
        IMAGE_NAME = 'devmart-api'
        COMPOSE_DIR = 'C:\\Users\\LENOVO\\Desktop\\electiva 3'  // ← faltaba esto
    }

    stages {
        stage('Instalar Dependencias') {
            steps {
                echo 'Instalando dependencias...'
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Construir Imagen Docker') {
            steps {
                echo 'Construyendo imagen Docker...'
                script {
                    if (isUnix()) {
                        sh "docker build -t ${IMAGE_NAME}:latest ."
                    } else {
                        bat "docker build -t %IMAGE_NAME%:latest ."
                    }
                }
            }
        }

        stage('Desplegar Contenedores') {
            steps {
                echo 'Desplegando todas las instancias de devmart-api...'
                script {
                    if (isUnix()) {
                        sh """
                            cd "${COMPOSE_DIR}"
                            docker compose --env-file ./devmart-api/.env up -d --no-deps --force-recreate \
                                devmart-api-1 devmart-api-2 devmart-api-3
                        """
                    } else {
                        bat """
                            cd "%COMPOSE_DIR%"
                            docker compose --env-file ./devmart-api/.env up -d --no-deps --force-recreate devmart-api-1 devmart-api-2 devmart-api-3
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'devmart-api desplegado correctamente en las 3 instancias'
        }
        failure {
            echo 'Error al desplegar devmart-api'
        }
    }
}